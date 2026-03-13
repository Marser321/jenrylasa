import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText, Plus, Search, DollarSign } from "lucide-react";
import Link from "next/link";
import { getInvoices } from "./actions";

// We'll export a standard component, Framer Motion will be applied inside the client components if needed, 
// but since this is a server container, we'll keep it simple and elegant.

export default async function InvoicesMasterPage() {
    const invoices = await getInvoices();

    // Calculamos totales
    const totalBilled = invoices?.reduce((acc, inv) => acc + Number(inv.total_amount), 0) || 0;
    const totalPaid = invoices?.filter(i => i.status === 'paid').reduce((acc, inv) => acc + Number(inv.total_amount), 0) || 0;
    const totalPending = invoices?.filter(i => i.status === 'pending').reduce((acc, inv) => acc + Number(inv.total_amount), 0) || 0;

    return (
        <div className="space-y-6 max-w-7xl mx-auto pt-4 pb-20 md:py-8 px-4 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display text-white">Finanzas & Facturación</h1>
                    <p className="text-white/60 text-sm mt-1">
                        Listado maestro de los ingresos de la carpintería.
                    </p>
                </div>
                <Link
                    href="/admin/invoices/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-[0_0_15px_rgba(209,164,88,0.2)] w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" /> Nueva Cotización
                </Link>
            </div>

            {/* FINANCIAL SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-[var(--accent-gold)]/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[var(--accent-gold)]/20 rounded-lg text-[var(--accent-gold)]"><DollarSign className="w-5 h-5" /></div>
                        <h3 className="text-white/60 font-medium">Volumen Cotizado</h3>
                    </div>
                    <p className="text-3xl font-display text-white mt-2">${totalBilled.toLocaleString('en-US')}</p>
                </GlassCard>

                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-green-500/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><FileText className="w-5 h-5" /></div>
                        <h3 className="text-white/60 font-medium">Facturado (Pagado)</h3>
                    </div>
                    <p className="text-3xl font-display text-green-400 mt-2">${totalPaid.toLocaleString('en-US')}</p>
                </GlassCard>

                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-yellow-500/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><FileText className="w-5 h-5" /></div>
                        <h3 className="text-white/60 font-medium">Próximo a Cobrar</h3>
                    </div>
                    <p className="text-3xl font-display text-yellow-400 mt-2">${totalPending.toLocaleString('en-US')}</p>
                </GlassCard>
            </div>

            <GlassCard className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Buscar cotizaciones..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {invoices && invoices.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-white/60 text-sm">
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Documento</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Cliente</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Fecha</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Total</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv: { id: string; invoice_number: number; valid_until: string | null; client_id: string; clients?: { full_name: string }; issue_date: string; total_amount: number; status: string }) => (
                                    <tr key={inv.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg text-white/40 group-hover:text-[var(--accent-gold)] transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">#{String(inv.invoice_number).padStart(5, '0')}</p>
                                                    <p className="text-white/40 text-xs">Validez: {inv.valid_until ? new Date(inv.valid_until).toLocaleDateString() : 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Link href={`/admin/clients/${inv.client_id}`} className="text-white/80 hover:text-[var(--accent-gold)] hover:underline transition-colors font-medium">
                                                {inv.clients?.full_name || 'Desconocido'}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white/60">
                                            {new Date(inv.issue_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 font-medium text-white">
                                            ${Number(inv.total_amount).toLocaleString('en-US')}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-medium ${inv.status === 'paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                    'bg-white/10 text-white/60'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-display text-white mb-2">No hay facturas aún</h3>
                            <p className="text-white/60 mb-6 max-w-sm mx-auto">Comienza emitiendo tu primera cotización.</p>
                            <Link
                                href="/admin/invoices/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold"
                            >
                                <Plus className="w-5 h-5" /> Nueva Cotización
                            </Link>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
