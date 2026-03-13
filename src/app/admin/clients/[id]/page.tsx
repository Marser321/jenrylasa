import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Phone, MapPin, ArrowLeft, Briefcase, FileText, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/insforge/server";
import { redirect } from "next/navigation";

export default async function ClientProfilePage({ params }: { params: { id: string } }) {
    const insforge = createClient();

    // Auth Check — Delegado al middleware
    /*
    const { data: { user } } = await insforge.auth.getCurrentUser();
    if (!user) {
        redirect('/login');
    }
    */

    // Fetch Client Details
    const { data: client, error: clientError } = await insforge.database
        .from('clients')
        .select('*')
        .eq('id', params.id)
        .single();

    if (clientError || !client) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-display text-white">Cliente no encontrado</h2>
                <Link href="/admin/clients" className="text-[var(--accent-gold)] mt-4 inline-block hover:underline">
                    Volver al directorio
                </Link>
            </div>
        );
    }

    // Fetch Client Projects
    const { data: projects } = await insforge.database
        .from('projects')
        .select('*')
        .eq('client_id', params.id)
        .order('created_at', { ascending: false });

    // Fetch Client Invoices
    const { data: invoices } = await insforge.database
        .from('invoices')
        .select('*')
        .eq('client_id', params.id)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6 max-w-6xl mx-auto py-8">
            <Link
                href="/admin/clients"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium mb-2"
            >
                <ArrowLeft className="w-4 h-4" /> Volver al Directorio
            </Link>

            {/* HEADER PERFIL */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-yellow-700 flex items-center justify-center text-black font-display text-3xl shadow-lg shadow-black/20">
                        {client.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-medium text-white">{client.full_name}</h1>
                        <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
                            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">ID: {client.id.split('-')[0]}</span>
                            Registrado el {new Date(client.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Link href={`/admin/clients/${client.id}/edit`} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all text-sm font-medium">
                        Editar Cliente
                    </Link>
                    <Link href={`/admin/invoices/new?client_id=${client.id}&client_name=${encodeURIComponent(client.full_name)}`} className="flex-1 md:flex-none justify-center flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold hover:bg-[var(--accent-gold)]/90 transition-all shadow-[0_0_15px_rgba(209,164,88,0.2)] text-sm">
                        <Plus className="w-4 h-4" /> Nueva Cotización
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                {/* SIDEBAR: INFO CONTACTO */}
                <div className="lg:col-span-1 space-y-6">
                    <GlassCard className="p-6 border-white/5">
                        <h3 className="text-lg font-display text-white mb-4">Datos de Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><Mail className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-sm text-white">{client.email || 'No registrado'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><Phone className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Teléfono</p>
                                    <p className="text-sm text-white">{client.phone || 'No registrado'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><MapPin className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Dirección Registrada</p>
                                    <p className="text-sm text-white leading-relaxed">{client.address || 'No registrada'}</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* METRICAS RAPIDAS */}
                    <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-black/60 to-[var(--accent-gold)]/5">
                        <h3 className="text-lg font-display text-white mb-4 flex items-center gap-2">
                            Resumen Financiero
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-white/60 text-sm">Proyectos Totales</span>
                                <span className="text-white font-medium">{projects?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                <span className="text-white/60 text-sm">Facturas Emitidas</span>
                                <span className="text-white font-medium">{invoices?.length || 0}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[var(--accent-gold)] font-medium text-sm">Volumen de Negocio (LTV)</span>
                                <span className="text-[var(--accent-gold)] font-display text-xl">
                                    ${invoices?.filter(i => i.status === 'paid').reduce((acc, curr) => acc + Number(curr.total_amount), 0).toLocaleString('en-US') || '0'}
                                </span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* MAIN CONTENT: HISTORIAL */}
                <div className="lg:col-span-2 space-y-6">
                    {/* PROJECTS PANEL */}
                    <GlassCard className="p-6 border-white/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-display text-white flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-[var(--accent-gold)]" /> Proyectos Activos & Historial
                            </h3>
                        </div>
                        {projects && projects.length > 0 ? (
                            <div className="space-y-3">
                                {projects.map(project => (
                                    <div key={project.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/10 transition-colors">
                                        <div>
                                            <h4 className="text-white font-medium flex items-center gap-2">
                                                {project.title}
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                    project.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                                                        project.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-white/10 text-white/60'
                                                    }`}>
                                                    {project.status === 'in_progress' ? 'EN PRODUCCIÓN' : project.status.replace('_', ' ')}
                                                </span>
                                            </h4>
                                            <p className="text-sm text-white/60 mt-1 flex items-center gap-3">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Inicio: {new Date(project.start_date || project.created_at).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <Link href={`/admin/projects/${project.id}`} className="text-sm text-[var(--accent-gold)] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                            Ver Detalles &rarr;
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5">
                                <Briefcase className="w-8 h-8 text-white/20 mx-auto mb-2" />
                                <p className="text-white/40 text-sm">No hay proyectos asociados a este cliente.</p>
                            </div>
                        )}
                    </GlassCard>

                    {/* INVOICES PANEL */}
                    <GlassCard className="p-6 border-white/5">
                        <h3 className="text-lg font-display text-white mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[var(--accent-gold)]" /> Cotizaciones y Facturas
                        </h3>
                        {invoices && invoices.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                                            <th className="pb-3 px-2">Documento</th>
                                            <th className="pb-3 px-2">Fecha</th>
                                            <th className="pb-3 px-2">Total</th>
                                            <th className="pb-3 px-2">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {invoices.map(invoice => (
                                            <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5">
                                                <td className="py-3 px-2">
                                                    <span className="text-white font-medium">#{String(invoice.invoice_number).padStart(5, '0')}</span>
                                                </td>
                                                <td className="py-3 px-2 text-white/60">{new Date(invoice.issue_date).toLocaleDateString()}</td>
                                                <td className="py-3 px-2 text-white font-medium">${Number(invoice.total_amount).toLocaleString('en-US')}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${invoice.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                                                        invoice.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-white/10 text-white/60'
                                                        }`}>
                                                        {invoice.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-black/20 rounded-xl border border-white/5">
                                <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                                <p className="text-white/40 text-sm">No hay registros de facturación.</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
