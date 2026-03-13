'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowLeft, Save, Loader2, User, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/insforge/client';
import { updateClientAction } from '../../actions';

export default function EditClientPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchClient = async () => {
            const insforge = createClient();
            const { data, error } = await insforge.database
                .from('clients')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error || !data) {
                setError('Cliente no encontrado');
                setLoading(false);
                return;
            }

            setFullName(data.full_name || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            setLoading(false);
        };

        fetchClient();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);

        const result = await updateClientAction(params.id, formData);

        if (result.success) {
            router.push(`/admin/clients/${params.id}`);
        } else {
            setError(result.error || 'Error al actualizar');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-gold)]" />
                <p>Cargando datos del cliente...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-8 px-4">
            <Link
                href={`/admin/clients/${params.id}`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium mb-2"
            >
                <ArrowLeft className="w-4 h-4" /> Volver al Perfil
            </Link>

            <h1 className="text-3xl font-display font-medium text-white">Editar Cliente</h1>

            <GlassCard className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <User className="w-4 h-4 text-white/40" /> Nombre Completo *
                        </label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-white/40" /> Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-white/40" /> Teléfono
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-white/40" /> Dirección
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors resize-none"
                        />
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                        <Link
                            href={`/admin/clients/${params.id}`}
                            className="px-5 py-2.5 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold hover:bg-[var(--accent-gold)]/90 transition-all shadow-[0_0_15px_rgba(209,164,88,0.2)] disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}
