'use server';

import { createClient } from '@/lib/insforge/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProjects() {
    const insforge = createClient();

    // Auth Check — Delegado al middleware
    /*
    const { data: { user } } = await insforge.auth.getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    */

    const { data: projects, error } = await insforge.database
        .from('projects')
        .select(`
            *,
            clients (
                id,
                full_name
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching projects:', error);
        return [];
    }

    return projects;
}

export async function updateProjectStatus(projectId: string, newStatus: string) {
    const insforge = createClient();

    // Auth Check — Delegado al middleware
    /*
    const { data: { user } } = await insforge.auth.getCurrentUser();
    if (!user) {
        return { success: false, error: 'No autorizado' };
    }
    */

    const { error } = await insforge.database
        .from('projects')
        .update({ status: newStatus })
        .eq('id', projectId);

    if (error) {
        console.error('Error updating status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/projects');
    return { success: true };
}
