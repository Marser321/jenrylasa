'use client';

import React, { useState } from 'react';
import { X, Edit2, Trash2, CheckCircle, XCircle, Clock, MapPin, Hammer, User, FileText, Calendar, AlertCircle } from 'lucide-react';
import { Consultation, updateConsultationStatus, deleteConsultation } from './actions';

type ConsultationDetailModalProps = {
    isOpen: boolean;
    consultation: Consultation | null;
    onClose: () => void;
    onEdit: (consultation: Consultation) => void;
};

const statusConfig: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
    Pendiente: { label: 'Pendiente', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
    Confirmada: { label: 'Confirmada', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
    Completada: { label: 'Completada', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
    Cancelada: { label: 'Cancelada', color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
};

export function ConsultationDetailModal({ isOpen, consultation, onClose, onEdit }: ConsultationDetailModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen || !consultation) return null;

    const statusInfo = statusConfig[consultation.status] || statusConfig.Pendiente;

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true);
        try {
            const result = await updateConsultationStatus(consultation.id, newStatus);
            if (result.success) {
                onClose();
            } else {
                alert('Error al actualizar estado: ' + result.error);
            }
        } catch {
            alert('Error de conexión');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta visita? Esta acción no se puede deshacer.')) return;

        setIsDeleting(true);
        try {
            const result = await deleteConsultation(consultation.id);
            if (result.success) {
                onClose();
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        } catch {
            alert('Error de conexión');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatTime = (time: string) => {
        const [h, m] = time.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[var(--accent-gold)]/10 to-transparent border-b border-white/10 p-5 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-display text-white">{consultation.customer_name}</h2>
                        <span className={`inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${statusInfo.bgColor} ${statusInfo.color} border ${statusInfo.borderColor}`}>
                            {statusInfo.label}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Detalle */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><Hammer className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Proyecto</p>
                                <p className="text-sm text-white">{consultation.project_description}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><User className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Experto</p>
                                <p className="text-sm text-white">{consultation.expert}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><Calendar className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Fecha</p>
                                <p className="text-sm text-white capitalize">{formatDate(consultation.scheduled_date)}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><Clock className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Hora</p>
                                <p className="text-sm text-white">{formatTime(consultation.scheduled_time)}</p>
                            </div>
                        </div>
                    </div>

                    {consultation.location && (
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><MapPin className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Ubicación</p>
                                <p className="text-sm text-white">{consultation.location}</p>
                            </div>
                        </div>
                    )}

                    {consultation.notes && (
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-[var(--accent-gold)] mt-0.5"><FileText className="w-4 h-4" /></div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Notas</p>
                                <p className="text-sm text-white/80 leading-relaxed">{consultation.notes}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Acciones de Estado */}
                <div className="p-5 border-t border-white/10 space-y-3">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Cambiar Estado</p>
                    <div className="flex flex-wrap gap-2">
                        {consultation.status !== 'Confirmada' && (
                            <button
                                onClick={() => handleStatusChange('Confirmada')}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors border border-green-500/20 disabled:opacity-50"
                            >
                                <CheckCircle className="w-4 h-4" /> Confirmar
                            </button>
                        )}
                        {consultation.status !== 'Completada' && (
                            <button
                                onClick={() => handleStatusChange('Completada')}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors border border-blue-500/20 disabled:opacity-50"
                            >
                                <CheckCircle className="w-4 h-4" /> Completar
                            </button>
                        )}
                        {consultation.status !== 'Cancelada' && (
                            <button
                                onClick={() => handleStatusChange('Cancelada')}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20 disabled:opacity-50"
                            >
                                <XCircle className="w-4 h-4" /> Cancelar
                            </button>
                        )}
                        {consultation.status !== 'Pendiente' && (
                            <button
                                onClick={() => handleStatusChange('Pendiente')}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg transition-colors border border-yellow-500/20 disabled:opacity-50"
                            >
                                <Clock className="w-4 h-4" /> Pendiente
                            </button>
                        )}
                    </div>
                </div>

                {/* Acciones Principales */}
                <div className="p-5 border-t border-white/5 flex gap-3">
                    <button
                        onClick={() => onEdit(consultation)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors border border-white/5"
                    >
                        <Edit2 className="w-4 h-4" /> Editar Visita
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 hover:bg-red-500/10 text-red-400 text-sm rounded-lg transition-colors border border-red-500/10 hover:border-red-500/20 disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <><AlertCircle className="w-4 h-4 animate-pulse" /> Eliminando...</>
                        ) : (
                            <><Trash2 className="w-4 h-4" /> Eliminar</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
