/**
 * Schemas de validación Zod para las Server Actions del Admin.
 * Centralizados en lib/validations para reutilización.
 */
import { z } from 'zod';

// ─── Staff ───────────────────────────────────────────────
export const staffMemberSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    role: z.string().min(1, 'El rol es obligatorio'),
    specialty: z.string().nullable().optional(),
    experience: z.string().nullable().optional(),
    status: z.enum(['Activo', 'Inactivo']).default('Activo'),
});

// ─── Clients ─────────────────────────────────────────────
export const clientSchema = z.object({
    fullName: z.string().min(2, 'El nombre completo debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido').nullable().optional(),
    phone: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
});

// ─── Invoices ────────────────────────────────────────────
export const invoiceItemSchema = z.object({
    item_type: z.string().min(1, 'El tipo de ítem es obligatorio'),
    description: z.string().min(1, 'La descripción es obligatoria'),
    quantity: z.number().positive('La cantidad debe ser positiva'),
    unit_measure: z.string().min(1, 'La unidad de medida es obligatoria'),
    unit_price: z.number().nonnegative('El precio unitario no puede ser negativo'),
});

export const invoiceSchema = z.object({
    clientName: z.string().min(1, 'El nombre del cliente es obligatorio'),
    projectTitle: z.string().min(1, 'El título del proyecto es obligatorio'),
    issueDate: z.string().min(1, 'La fecha de emisión es obligatoria'),
    dueDate: z.string().optional(),
    taxRate: z.number().nonnegative(),
    subtotal: z.number().nonnegative(),
    total: z.number().nonnegative(),
    items: z.array(invoiceItemSchema).min(1, 'Debe haber al menos un ítem'),
});

// ─── Consultations / Visitas ─────────────────────────────
export const consultationSchema = z.object({
    customerName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    projectDescription: z.string().min(2, 'La descripción del proyecto es obligatoria'),
    scheduledDate: z.string().min(1, 'La fecha es obligatoria'),
    scheduledTime: z.string().min(1, 'La hora es obligatoria'),
    expert: z.string().min(1, 'El experto asignado es obligatorio'),
    status: z.enum(['Pendiente', 'Confirmada', 'Completada', 'Cancelada']).default('Pendiente'),
    location: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
});
