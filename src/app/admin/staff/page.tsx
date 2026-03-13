'use client';

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Plus, Search, Clock, ShieldCheck, Edit2, Trash2, AlertCircle } from "lucide-react";
import { StaffMember, getStaffMembers, deleteStaffMemberAction } from "./actions";
import { StaffFormModal } from "./staff-form-modal";

export default function StaffPage() {
    const [members, setMembers] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<StaffMember | undefined>(undefined);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const data = await getStaffMembers();
            setMembers(data);
        } catch (error) {
            console.error("Error loading staff:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAdd = () => {
        setSelectedMember(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (member: StaffMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar a este integrante?")) {
            const result = await deleteStaffMemberAction(id);
            if (result.success) {
                fetchMembers();
            } else {
                alert("Error al eliminar: " + result.error);
            }
        }
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 pt-4 pb-20 md:py-8 max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white">Equipo de Taller</h1>
                    <p className="text-white/60 text-sm mt-1">
                        Gestiona a los artesanos, instaladores y especialistas de Lasa Kitchens.
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-[0_0_15px_rgba(209,164,88,0.2)] w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5" /> Nuevo Integrante
                </button>
            </div>

            <GlassCard className="p-6">
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o puesto..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
                        <div className="w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full animate-spin"></div>
                        <p>Cargando equipo...</p>
                    </div>
                ) : filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers.map((member) => (
                            <div key={member.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-zinc-800/50 transition-colors group relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--accent-gold)] to-yellow-700 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-black/20">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${member.status === 'Activo'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium text-white mb-1 leading-tight">{member.name}</h3>
                                <p className="text-sm text-[var(--accent-gold)] mb-4">{member.role} {member.specialty ? `— ${member.specialty}` : ''}</p>

                                <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                                    <div className="flex items-center gap-1">
                                        <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" /> {member.experience || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> Full Time
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs rounded-lg transition-colors border border-white/5"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 hover:bg-red-500/10 text-red-400 text-xs rounded-lg transition-colors border border-red-500/10 hover:border-red-500/20"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-white/40 text-center uppercase tracking-widest text-xs">
                        <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                        <h3 className="text-lg font-medium text-white/60">No se encontraron integrantes</h3>
                        <p className="text-sm lowercase tracking-normal">Intenta ajustar tu búsqueda o agrega uno nuevo.</p>
                    </div>
                )}
            </GlassCard>

            <StaffFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    fetchMembers();
                }}
                member={selectedMember}
            />
        </div>
    );
}
