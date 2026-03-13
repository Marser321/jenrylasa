'use client';

import React, { useState } from 'react';
import { X, Save, ShieldCheck, Hammer, Clock, User } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { StaffMember, saveStaffMemberAction } from './actions';

interface StaffFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    member?: StaffMember;
}

export function StaffFormModal({ isOpen, onClose, member }: StaffFormModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        if (member?.id) {
            formData.append('id', member.id);
        }

        try {
            const result = await saveStaffMemberAction(formData);
            if (result.success) {
                onClose();
            } else {
                setError(result.error || 'Error al guardar');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <GlassCard className="w-full max-w-lg p-0 overflow-hidden border-white/20 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                    <h2 className="text-xl font-display font-medium text-white flex items-center gap-2">
                        {member ? 'Editar Integrante' : 'Nuevo Integrante'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <User className="w-4 h-4 text-[var(--accent-gold)]" /> Nombre Completo
                        </label>
                        <input
                            name="name"
                            defaultValue={member?.name}
                            required
                            placeholder="Ej: Roberto Lasa"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                <Hammer className="w-4 h-4 text-[var(--accent-gold)]" /> Puesto / Rol
                            </label>
                            <input
                                name="role"
                                defaultValue={member?.role}
                                required
                                placeholder="Ej: Maestro Carpintero"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" /> Especialidad
                            </label>
                            <input
                                name="specialty"
                                defaultValue={member?.specialty || ''}
                                placeholder="Ej: Diseño & Estructuras"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[var(--accent-gold)]" /> Experiencia
                            </label>
                            <input
                                name="experience"
                                defaultValue={member?.experience || ''}
                                placeholder="Ej: 25 años"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70">Estado</label>
                            <select
                                name="status"
                                defaultValue={member?.status || 'Activo'}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors appearance-none"
                            >
                                <option value="Activo" className="bg-zinc-900">Activo</option>
                                <option value="Inactivo" className="bg-zinc-900">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-white/10 rounded-lg text-white/70 hover:bg-white/5 transition-colors font-medium order-2 sm:order-1"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-lg disabled:opacity-50 order-1 sm:order-2"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Guardando...' : 'Guardar Integrante'}
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
