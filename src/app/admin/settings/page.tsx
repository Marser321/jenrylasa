'use client';

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Save, MapPin, Phone, Mail, Globe, Store, Clock, CheckCircle, Loader2 } from "lucide-react";

type SettingsData = {
    businessName: string;
    rut: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    schedule: Record<string, { open: string; close: string }>;
};

const defaultSettings: SettingsData = {
    businessName: "Lasa Kitchens & Closets",
    rut: "211234560017",
    phone: "+598 99 123 456",
    email: "hola@lasakitchens.com",
    address: "Av. Italia 1234, Montevideo, Uruguay",
    website: "https://lasakitchens.com",
    schedule: {
        Lunes: { open: "10:00", close: "20:00" },
        Martes: { open: "10:00", close: "20:00" },
        Miércoles: { open: "10:00", close: "20:00" },
        Jueves: { open: "10:00", close: "20:00" },
        Viernes: { open: "10:00", close: "20:00" },
        Sábado: { open: "10:00", close: "20:00" },
    }
};

const STORAGE_KEY = "lasa_admin_settings";

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setSettings(JSON.parse(stored));
            } catch {
                // Si hay error de parse, usar defaults
            }
        }
    }, []);

    const handleSave = () => {
        setSaving(true);
        setSaved(false);
        // Simular delay para feedback visual
        setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 500);
    };

    const updateField = (field: keyof Omit<SettingsData, 'schedule'>, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const updateSchedule = (day: string, field: 'open' | 'close', value: string) => {
        setSettings(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: { ...prev.schedule[day], [field]: value }
            }
        }));
    };

    return (
        <div className="space-y-6 pt-4 pb-20 md:py-8 max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white">Configuración del Estudio</h1>
                    <p className="text-white/60 text-sm mt-1">
                        Ajusta la información de la carpintería, horarios de taller y preferencias.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-[0_0_15px_rgba(209,164,88,0.2)] w-full sm:w-auto disabled:opacity-50"
                >
                    {saving ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                    ) : saved ? (
                        <><CheckCircle className="w-5 h-5" /> ¡Guardado!</>
                    ) : (
                        <><Save className="w-5 h-5" /> Guardar Cambios</>
                    )}
                </button>
            </div>

            {saved && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Configuración guardada exitosamente.
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                            <Store className="w-5 h-5 text-[var(--accent-gold)]" /> Información del Negocio
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">Nombre del Estudio</label>
                                    <input
                                        type="text"
                                        value={settings.businessName}
                                        onChange={(e) => updateField('businessName', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">RUT / Identificación Fiscal</label>
                                    <input
                                        type="text"
                                        value={settings.rut}
                                        onChange={(e) => updateField('rut', e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">Teléfono Taller</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type="tel"
                                            value={settings.phone}
                                            onChange={(e) => updateField('phone', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/60">Email de Consultas</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type="email"
                                            value={settings.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-white/60">Showroom / Taller</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type="text"
                                            value={settings.address}
                                            onChange={(e) => updateField('address', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-white/60">Sitio Web</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                        <input
                                            type="url"
                                            value={settings.website}
                                            onChange={(e) => updateField('website', e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard className="p-6">
                        <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[var(--accent-gold)]" /> Horarios
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(settings.schedule).map(([day, hours]) => (
                                <div key={day} className="flex items-center justify-between text-sm">
                                    <span className="text-white/80 w-24">{day}</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="time"
                                            value={hours.open}
                                            onChange={(e) => updateSchedule(day, 'open', e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white/60 focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                        <span className="text-white/40">-</span>
                                        <input
                                            type="time"
                                            value={hours.close}
                                            onChange={(e) => updateSchedule(day, 'close', e.target.value)}
                                            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white/60 focus:border-[var(--accent-gold)] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between text-sm opacity-50">
                                <span className="text-white/80 w-24">Domingo</span>
                                <span className="text-red-400 font-medium px-4">Cerrado</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
