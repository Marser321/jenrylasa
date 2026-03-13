'use server';

import { createClient } from '@/lib/insforge/server';
import { redirect } from 'next/navigation';

export async function getInvoices() {
    const insforge = createClient();

    // Auth Check — Delegado al middleware para el token de admin
    /*
    const { data: { user } } = await insforge.auth.getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    */

    // Fetch invoices with client info
    const { data: invoices, error } = await insforge.database
        .from('invoices')
        .select(`
            *,
            clients(full_name, email)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching invoices:', error);
        return [];
    }

    return invoices;
}
