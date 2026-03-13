import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Plus, Calendar, Users, FileText, DollarSign, Hammer } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/insforge/server";

export default async function AdminDashboard() {
    const insforge = createClient();

    // ─── Fetch datos reales en paralelo ───────────────────
    const [projectsRes, clientsRes, invoicesRes, consultationsRes] = await Promise.all([
        insforge.database.from('projects').select('id, status').eq('status', 'in_progress'),
        insforge.database.from('clients').select('id, created_at').order('created_at', { ascending: false }).limit(10),
        insforge.database.from('invoices').select('id, total_amount, status, issue_date').order('created_at', { ascending: false }),
        insforge.database.from('consultations').select('id, scheduled_date, status').eq('scheduled_date', new Date().toISOString().split('T')[0]),
    ]);

    const activeProjects = projectsRes.data?.length || 0;
    const recentClients = clientsRes.data?.length || 0;
    const todayConsultations = consultationsRes.data?.length || 0;

    // Facturado del mes actual
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const monthInvoices = invoicesRes.data?.filter(inv =>
        inv.issue_date >= monthStart && inv.status === 'paid'
    ) || [];
    const monthBilled = monthInvoices.reduce((acc, inv) => acc + Number(inv.total_amount), 0);

    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-display font-medium text-white mb-2 tracking-tight">Bienvenido, Admin</h1>
                    <p className="text-white/50">Resumen general de Lasa Kitchens & Closets</p>
                </div>
                <Link href="/admin/consultations" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-gold)] text-black font-semibold hover:scale-105 transition-transform w-full sm:w-auto justify-center">
                    <Plus className="w-5 h-5" /> Nueva Consulta
                </Link>
            </div>

            {/* Tarjetas principales con datos reales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-amber-500/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400"><Hammer className="w-5 h-5" /></div>
                        <h3 className="text-white/40 uppercase tracking-widest text-xs">Proyectos Activos</h3>
                    </div>
                    <p className="text-4xl font-light text-white mt-2">{activeProjects}</p>
                </GlassCard>

                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-[var(--accent-gold)]/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[var(--accent-gold)]/20 rounded-lg text-[var(--accent-gold)]"><DollarSign className="w-5 h-5" /></div>
                        <h3 className="text-white/40 uppercase tracking-widest text-xs">Facturado Mes</h3>
                    </div>
                    <p className="text-4xl font-light text-[var(--accent-gold)] mt-2">${monthBilled.toLocaleString('en-US')}</p>
                </GlassCard>

                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-green-500/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Users className="w-5 h-5" /></div>
                        <h3 className="text-white/40 uppercase tracking-widest text-xs">Clientes Recientes</h3>
                    </div>
                    <p className="text-4xl font-light text-white mt-2">{recentClients}</p>
                </GlassCard>

                <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/50 to-purple-500/5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Calendar className="w-5 h-5" /></div>
                        <h3 className="text-white/40 uppercase tracking-widest text-xs">Visitas Hoy</h3>
                    </div>
                    <p className="text-4xl font-light text-white mt-2">{todayConsultations}</p>
                </GlassCard>
            </div>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/consultations">
                    <GlassCard className="p-6 border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-[var(--accent-gold)]" />
                            <h3 className="text-white font-medium group-hover:text-[var(--accent-gold)] transition-colors">Consultas y Visitas</h3>
                        </div>
                        <p className="text-white/40 text-sm">Gestionar agenda de mediciones y visitas técnicas.</p>
                    </GlassCard>
                </Link>

                <Link href="/admin/clients">
                    <GlassCard className="p-6 border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="w-5 h-5 text-[var(--accent-gold)]" />
                            <h3 className="text-white font-medium group-hover:text-[var(--accent-gold)] transition-colors">Directorio de Clientes</h3>
                        </div>
                        <p className="text-white/40 text-sm">Ver y gestionar la base de clientes.</p>
                    </GlassCard>
                </Link>

                <Link href="/admin/invoices">
                    <GlassCard className="p-6 border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-[var(--accent-gold)]" />
                            <h3 className="text-white font-medium group-hover:text-[var(--accent-gold)] transition-colors">Finanzas</h3>
                        </div>
                        <p className="text-white/40 text-sm">Cotizaciones, facturas y resumen financiero.</p>
                    </GlassCard>
                </Link>
            </div>
        </div>
    );
}
