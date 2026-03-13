'use server';

import { createClient } from '@/lib/insforge/server';
import { revalidatePath } from 'next/cache';
import { clientSchema } from '@/lib/validations/schemas';

export async function getClients() {
    const insforge = createClient();

    const { data: clients, error } = await insforge.database
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }

    return clients;
}

export async function saveClientAction(formData: FormData) {
    const insforge = createClient();

    // Validar inputs con Zod
    const parsed = clientSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email') || null,
        phone: formData.get('phone') || null,
        address: formData.get('address') || null,
    });

    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || 'Datos inválidos';
        return { success: false, error: firstError };
    }

    const payload = {
        full_name: parsed.data.fullName,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
        address: parsed.data.address ?? null,
    };

    const { data, error } = await insforge.database
        .from('clients')
        .insert(payload)
        .select()
        .single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true, client: data };
}

export async function updateClientAction(id: string, formData: FormData) {
    const insforge = createClient();

    const parsed = clientSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email') || null,
        phone: formData.get('phone') || null,
        address: formData.get('address') || null,
    });

    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || 'Datos inválidos';
        return { success: false, error: firstError };
    }

    const payload = {
        full_name: parsed.data.fullName,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone ?? null,
        address: parsed.data.address ?? null,
    };

    const { error } = await insforge.database
        .from('clients')
        .update(payload)
        .eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    revalidatePath(`/admin/clients/${id}`);
    return { success: true };
}

export async function deleteClientAction(id: string) {
    const insforge = createClient();

    const { error } = await insforge.database
        .from('clients')
        .delete()
        .match({ id });

    if (error) {
        console.error('Error deleting client:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true };
}
