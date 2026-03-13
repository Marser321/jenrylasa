'use server';

import { createClient } from '@/lib/insforge/server';
import { revalidatePath } from 'next/cache';
import { staffMemberSchema } from '@/lib/validations/schemas';

export type StaffMember = {
    id: string;
    name: string;
    role: string;
    specialty: string | null;
    experience: string | null;
    status: 'Activo' | 'Inactivo';
    created_at?: string;
};

export async function getStaffMembers() {
    const insforge = createClient();

    const { data, error } = await insforge.database
        .from('staff')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching staff members:', error);
        return [];
    }

    return data as StaffMember[];
}

export async function saveStaffMemberAction(formData: FormData) {
    const insforge = createClient();

    const id = formData.get('id') as string;

    // Validar inputs con Zod
    const parsed = staffMemberSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        specialty: formData.get('specialty') || null,
        experience: formData.get('experience') || null,
        status: formData.get('status') || 'Activo',
    });

    if (!parsed.success) {
        const firstError = parsed.error.issues[0]?.message || 'Datos inválidos';
        return { success: false, error: firstError };
    }

    const payload: Partial<StaffMember> = parsed.data;

    if (id) {
        const { error } = await insforge.database
            .from('staff')
            .update(payload)
            .match({ id });

        if (error) return { success: false, error: error.message };
    } else {
        const { error } = await insforge.database
            .from('staff')
            .insert(payload);

        if (error) return { success: false, error: error.message };
    }

    revalidatePath('/admin/staff');
    return { success: true };
}

export async function deleteStaffMemberAction(id: string) {
    const insforge = createClient();

    const { error } = await insforge.database
        .from('staff')
        .delete()
        .match({ id });

    if (error) {
        console.error('Error deleting staff member:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/staff');
    return { success: true };
}
