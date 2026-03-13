'use server';

import { createClient } from '@/lib/insforge/server';
import { revalidatePath } from 'next/cache';
import { consultationSchema } from '@/lib/validations/schemas';

// ─── Tipos ───────────────────────────────────────────────
export type Consultation = {
    id: string;
    client_id: string | null;
    customer_name: string;
    project_description: string;
    scheduled_date: string;
    scheduled_time: string;
    expert: string;
    status: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
    location: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
};

// ─── Obtener Consultas ───────────────────────────────────
export async function getConsultations(date?: string) {
    const insforge = createClient();

    let query = insforge.database
        .from('consultations')
        .select('*')
        .order('scheduled_time', { ascending: true });

    // Filtrar por fecha si se provee
    if (date) {
        query = query.eq('scheduled_date', date);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching consultations:', error);
        return [];
    }

    return data as Consultation[];
}

// ─── Obtener Expertos (del Staff) ────────────────────────
export async function getExperts() {
    const insforge = createClient();

    const { data, error } = await insforge.database
        .from('staff')
        .select('id, name, role, specialty')
        .eq('status', 'Activo')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching experts:', error);
        return [];
    }

    return data || [];
}

// ─── Crear o Actualizar Consulta ─────────────────────────
export async function saveConsultationAction(formData: FormData) {
    const insforge = createClient();

    const id = formData.get('id') as string;

    // Validar con Zod
    const parsed = consultationSchema.safeParse({
        customerName: formData.get('customerName'),
        projectDescription: formData.get('projectDescription'),
        scheduledDate: formData.get('scheduledDate'),
        scheduledTime: formData.get('scheduledTime'),
        expert: formData.get('expert'),
        status: formData.get('status') || 'Pendiente',
        location: formData.get('location') || null,
        notes: formData.get('notes') || null,
    });

    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || 'Datos inválidos';
        return { success: false, error: firstError };
    }

    const payload = {
        customer_name: parsed.data.customerName,
        project_description: parsed.data.projectDescription,
        scheduled_date: parsed.data.scheduledDate,
        scheduled_time: parsed.data.scheduledTime,
        expert: parsed.data.expert,
        status: parsed.data.status,
        location: parsed.data.location ?? null,
        notes: parsed.data.notes ?? null,
    };

    if (id) {
        // Actualizar existente
        const { error } = await insforge.database
            .from('consultations')
            .update(payload)
            .match({ id });

        if (error) return { success: false, error: error.message };
    } else {
        // Crear nueva
        const { error } = await insforge.database
            .from('consultations')
            .insert(payload);

        if (error) return { success: false, error: error.message };
    }

    revalidatePath('/admin/consultations');
    return { success: true };
}

// ─── Cambiar Estado de Consulta ──────────────────────────
export async function updateConsultationStatus(id: string, newStatus: string) {
    const insforge = createClient();

    const { error } = await insforge.database
        .from('consultations')
        .update({ status: newStatus })
        .eq('id', id);

    if (error) {
        console.error('Error updating consultation status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/consultations');
    return { success: true };
}

// ─── Eliminar Consulta ───────────────────────────────────
export async function deleteConsultation(id: string) {
    const insforge = createClient();

    const { error } = await insforge.database
        .from('consultations')
        .delete()
        .match({ id });

    if (error) {
        console.error('Error deleting consultation:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/consultations');
    return { success: true };
}

// ─── Contar consultas de hoy (para dashboard) ────────────
export async function getTodayConsultationsCount() {
    const insforge = createClient();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await insforge.database
        .from('consultations')
        .select('id', { count: 'exact' })
        .eq('scheduled_date', today);

    if (error) return 0;
    return data?.length || 0;
}
