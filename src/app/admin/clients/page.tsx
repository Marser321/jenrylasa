'use client';

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Users, Plus, Search, Trash2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getClients, deleteClientAction } from "./actions";

type Client = {
    id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    created_at: string;
};

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await getClients();
            setClients(data as Client[]);
        } catch (error) {
            console.error("Error cargando clientes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Eliminar al cliente "${name}"? Esta acción no se puede deshacer.`)) return;

        const result = await deleteClientAction(id);
        if (result.success) {
            fetchClients();
        } else {
            alert("Error al eliminar: " + result.error);
        }
    };

    const filteredClients = clients.filter(client =>
        client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone?.includes(searchQuery)
    );

    return (
        <div className="space-y-6 pt-4 pb-20 md:py-8 max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white">Directorio de Clientes</h1>
                    <p className="text-white/60 text-sm mt-1">
                        Gestiona tus leads, clientes activos y su historial de proyectos.
                    </p>
                </div>
                <Link
                    href="/admin/clients/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-[0_0_15px_rgba(209,164,88,0.2)] w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4" /> Nuevo Cliente
                </Link>
            </div>

            <GlassCard className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o teléfono..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
                            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-gold)]" />
                            <p>Cargando clientes...</p>
                        </div>
                    ) : filteredClients.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-white/60 text-sm">
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Cliente</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider">Contacto</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider hidden md:table-cell">Dirección</th>
                                    <th className="pb-3 px-4 font-medium uppercase tracking-wider hidden sm:table-cell">Registro</th>
                                    <th className="pb-3 px-4 font-medium text-right uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map((client) => (
                                    <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-yellow-700 flex items-center justify-center text-black font-bold shadow-lg shadow-black/20">
                                                    {client.full_name?.charAt(0).toUpperCase() || 'C'}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{client.full_name}</p>
                                                    <p className="text-white/40 text-xs">ID: {client.id.split('-')[0]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col gap-1">
                                                {client.email ? (
                                                    <a href={`mailto:${client.email}`} className="text-sm text-white/80 hover:text-[var(--accent-gold)] transition-colors">{client.email}</a>
                                                ) : <span className="text-sm text-white/40">Sin email</span>}
                                                {client.phone ? (
                                                    <a href={`tel:${client.phone}`} className="text-sm text-white/60 hover:text-[var(--accent-gold)] transition-colors">{client.phone}</a>
                                                ) : <span className="text-sm text-white/40">Sin teléfono</span>}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white/60 max-w-[200px] truncate hidden md:table-cell">
                                            {client.address || <span className="text-white/30 italic">No registrada</span>}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-white/60 hidden sm:table-cell">
                                            {new Date(client.created_at).toLocaleDateString('es-UY')}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/clients/${client.id}`} className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="Ver Perfil">
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(client.id, client.full_name)}
                                                    className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    title="Eliminar Cliente"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : clients.length > 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-display text-white mb-2">Sin resultados</h3>
                            <p className="text-white/60 max-w-sm mx-auto">No se encontraron clientes con &quot;{searchQuery}&quot;.</p>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-display text-white mb-2">No hay clientes aún</h3>
                            <p className="text-white/60 mb-6 max-w-sm mx-auto">Comienza agregando tu primer cliente para empezar a gestionar sus proyectos y cotizaciones.</p>
                            <Link
                                href="/admin/clients/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold"
                            >
                                <Plus className="w-5 h-5" /> Agregar Mi Primer Cliente
                            </Link>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
