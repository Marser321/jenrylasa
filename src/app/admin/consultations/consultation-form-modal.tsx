'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, User, Hammer, MapPin, Clock, Calendar, FileText } from 'lucide-react';
import { saveConsultationAction, getExperts, Consultation } from './actions';

type Expert = {
    id: string;
    name: string;
    role: string;
    specialty: string | null;
};

type ConsultationFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    consultation?: Consultation;
    selectedDate?: string;
};

export function ConsultationFormModal({ isOpen, onClose, consultation, selectedDate }: ConsultationFormModalProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [experts, setExperts] = useState<Expert[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [customerName, setCustomerName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [expert, setExpert] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('Pendiente');

    const isEditing = !!consultation;

    useEffect(() => {
        if (isOpen) {
            getExperts().then(setExperts);

            if (consultation) {
                setCustomerName(consultation.customer_name);
                setProjectDescription(consultation.project_description);
                setScheduledDate(consultation.scheduled_date);
                setScheduledTime(consultation.scheduled_time?.slice(0, 5) || '');
                setExpert(consultation.expert);
                setLocation(consultation.location || '');
                setNotes(consultation.notes || '');
                setStatus(consultation.status);
            } else {
                // Reset para nueva visita
                setCustomerName('');
                setProjectDescription('');
                setScheduledDate(selectedDate || new Date().toISOString().split('T')[0]);
                setScheduledTime('');
                setExpert('');
                setLocation('');
                setNotes('');
                setStatus('Pendiente');
            }
            setError(null);
        }
    }, [isOpen, consultation, selectedDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const formData = new FormData();
            if (consultation?.id) formData.append('id', consultation.id);
            formData.append('customerName', customerName);
            formData.append('projectDescription', projectDescription);
            formData.append('scheduledDate', scheduledDate);
            formData.append('scheduledTime', scheduledTime);
            formData.append('expert', expert);
            formData.append('status', status);
            formData.append('location', location);
            formData.append('notes', notes);

            const result = await saveConsultationAction(formData);

            if (result.success) {
                onClose();
            } else {
                setError(result.error || 'Error al guardar');
            }
        } catch {
            setError('Fallo de conexión al guardar la consulta.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-[#111] border-b border-white/10 p-5 flex justify-between items-center z-10">
                    <h2 className="text-xl font-display text-white">
                        {isEditing ? 'Editar Visita' : 'Nueva Visita'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-5 space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Nombre del cliente */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <User className="w-4 h-4 text-white/40" /> Nombre del Cliente *
                        </label>
                        <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Ej: Juan Pérez"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    {/* Proyecto */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <Hammer className="w-4 h-4 text-white/40" /> Proyecto / Descripción *
                        </label>
                        <input
                            type="text"
                            required
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            placeholder="Ej: Cocina Americana, Vestidor Principal..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    {/* Fecha y Hora */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white/40" /> Fecha *
                            </label>
                            <input
                                type="date"
                                required
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/40" /> Hora *
                            </label>
                            <input
                                type="time"
                                required
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Experto */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <User className="w-4 h-4 text-white/40" /> Experto Asignado *
                        </label>
                        {experts.length > 0 ? (
                            <select
                                required
                                value={expert}
                                onChange={(e) => setExpert(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            >
                                <option value="" className="bg-[#111]">Seleccionar experto...</option>
                                {experts.map(exp => (
                                    <option key={exp.id} value={exp.name} className="bg-[#111]">
                                        {exp.name} — {exp.role} {exp.specialty ? `(${exp.specialty})` : ''}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                required
                                value={expert}
                                onChange={(e) => setExpert(e.target.value)}
                                placeholder="Nombre del experto"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            />
                        )}
                    </div>

                    {/* Ubicación */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-white/40" /> Ubicación / Zona
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ej: Punta Carretas, Carrasco..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                        />
                    </div>

                    {/* Estado (solo para edición) */}
                    {isEditing && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/80">Estado</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors"
                            >
                                <option value="Pendiente" className="bg-[#111]">Pendiente</option>
                                <option value="Confirmada" className="bg-[#111]">Confirmada</option>
                                <option value="Completada" className="bg-[#111]">Completada</option>
                                <option value="Cancelada" className="bg-[#111]">Cancelada</option>
                            </select>
                        </div>
                    )}

                    {/* Notas */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-white/40" /> Notas adicionales
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Observaciones, instrucciones especiales..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-gold)]/50 transition-colors resize-none"
                        />
                    </div>

                    {/* Botón Guardar */}
                    <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold hover:bg-[var(--accent-gold)]/90 transition-all shadow-[0_0_15px_rgba(209,164,88,0.2)] disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Agendar Visita'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
