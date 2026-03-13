'use server';

import { createClient } from '@/lib/insforge/server';

type InvoiceActionArgs = {
    clientName: string;
    projectTitle: string;
    issueDate: string;
    dueDate: string;
    taxRate: number;
    subtotal: number;
    total: number;
    items: Array<{
        item_type: string;
        description: string;
        quantity: number;
        unit_measure: string;
        unit_price: number;
    }>;
};

export async function saveInvoiceAction(data: InvoiceActionArgs) {
    const insforge = createClient();

    try {
        // 1. Create or get "On-the-fly" Client
        // In a real CRM, we'd search first, but here we just create a record to satisfy the FK
        const { data: client, error: clientError } = await insforge.database
            .from('clients')
            .insert({ full_name: data.clientName || 'Cliente Genérico' })
            .select('id')
            .single();

        if (clientError) throw new Error(`Error creando cliente: ${clientError.message}`);

        // 2. Create "On-the-fly" Project
        const { data: project, error: projectError } = await insforge.database
            .from('projects')
            .insert({
                client_id: client.id,
                title: data.projectTitle || 'Proyecto Sin Título',
                start_date: data.issueDate,
            })
            .select('id')
            .single();

        if (projectError) throw new Error(`Error creando proyecto: ${projectError.message}`);

        // 3. Create the Invoice
        const { data: invoice, error: invoiceError } = await insforge.database
            .from('invoices')
            .insert({
                project_id: project.id,
                client_id: client.id,
                issue_date: data.issueDate,
                due_date: data.dueDate || null,
                subtotal: data.subtotal,
                tax_rate: data.taxRate,
                total_amount: data.total,
                status: 'pending'
            })
            .select('id')
            .single();

        if (invoiceError) throw new Error(`Error creando factura: ${invoiceError.message}`);

        // 4. Create Invoice Items
        if (data.items.length > 0) {
            const itemsToInsert = data.items.map(item => ({
                invoice_id: invoice.id,
                item_type: item.item_type,
                description: item.description,
                quantity: item.quantity,
                unit_measure: item.unit_measure,
                unit_price: item.unit_price,
            }));

            const { error: itemsError } = await insforge.database
                .from('invoice_items')
                .insert(itemsToInsert);

            if (itemsError) throw new Error(`Error guardando ítems: ${itemsError.message}`);
        }

        return { success: true, invoiceId: invoice.id, projectId: project.id };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Save Invoice Flow Failed:', error);
        return { success: false, error: message };
    }
}
