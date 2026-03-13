'use client';

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { User, Mail, Phone, MapPin, Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveClientAction } from "../actions";

export default function NewClientPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim()) return alert("El nombre es requerido.");

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('address', address);

            const result = await saveClientAction(formData);

            if (result.success) {
                // Success redirect
                router.push('/admin/clients');
                router.refresh();
            } else {
                alert(`Error al guardar: ${result.error}`);
            }
        } catch (_error) {
            alert('Fallo de conexión al guardar cliente.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto py-8">
            <Link
                href="/admin/clients"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Volver al Directorio
            </Link>

            <div>
                <h1 className="text-3xl font-display font-medium text-white">Nuevo Cliente</h1>
                <p className="text-white/60 text-sm mt-1">
                    Ingresa los datos de contacto para abrirle un perfil.
                </p>
            </div>

            <form onSubmit={handleSave}>
                <GlassCard className="p-8 space-y-6 border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-gold)]/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre Completo */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <User className="w-4 h-4 text-white/40" /> Nombre Completo / Empresa *
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ej: Juan Pérez / Inmobiliaria Sur"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-white/40" /> Correo Electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="juan@correo.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-white/40" /> Teléfono / WhatsApp
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+598 9X XXX XXX"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-white/40" /> Dirección de Facturación / Obra
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows={2}
                                placeholder="Artigas 1234, Ciudad..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold hover:bg-[var(--accent-gold)]/90 transition-all shadow-[0_0_15px_rgba(209,164,88,0.2)] disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? "Guardando..." : "Guardar Cliente"}
                        </button>
                    </div>
                </GlassCard>
            </form>
        </div>
    );
}
