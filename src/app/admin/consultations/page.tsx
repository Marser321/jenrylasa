'use client';

import React, { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Hammer,
    Plus,
    Filter,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { Consultation, getConsultations } from "./actions";
import { ConsultationFormModal } from "./consultation-form-modal";
import { ConsultationDetailModal } from "./consultation-detail-modal";

// ─── Configuración de estados ─────────────────────────────
const statusConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    Pendiente: { color: 'text-yellow-500', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
    Confirmada: { color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
    Completada: { color: 'text-white/50', bgColor: 'bg-white/10', borderColor: 'border-white/20' },
    Cancelada: { color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
};

const statusFilters = ['Todas', 'Pendiente', 'Confirmada', 'Completada', 'Cancelada'];

export default function ConsultationsPage() {
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [statusFilter, setStatusFilter] = useState('Todas');
    const [showFilters, setShowFilters] = useState(false);

    // Modales
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
    const [editingConsultation, setEditingConsultation] = useState<Consultation | undefined>(undefined);

    // ─── Fetch de consultas ───────────────────────────────
    const fetchConsultations = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getConsultations(selectedDate);
            setConsultations(data);
        } catch (error) {
            console.error("Error cargando consultas:", error);
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchConsultations();
    }, [fetchConsultations]);

    // ─── Navegación de fechas ─────────────────────────────
    const changeDate = (days: number) => {
        const current = new Date(selectedDate + 'T12:00:00');
        current.setDate(current.getDate() + days);
        setSelectedDate(current.toISOString().split('T')[0]);
    };

    const goToToday = () => {
        setSelectedDate(new Date().toISOString().split('T')[0]);
    };

    const isToday = selectedDate === new Date().toISOString().split('T')[0];

    // ─── Formato de fecha para display ────────────────────
    const displayDate = (() => {
        const date = new Date(selectedDate + 'T12:00:00');
        const todayStr = new Date().toISOString().split('T')[0];
        const prefix = selectedDate === todayStr ? 'Hoy, ' : '';
        return prefix + date.toLocaleDateString('es-UY', { weekday: 'long', day: 'numeric', month: 'long' });
    })();

    // ─── Filtrado ─────────────────────────────────────────
    const filteredConsultations = statusFilter === 'Todas'
        ? consultations
        : consultations.filter(c => c.status === statusFilter);

    // ─── Formato de hora ──────────────────────────────────
    const formatTime = (time: string) => {
        const [h, m] = time.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return { time: `${hour12}:${m}`, period: ampm };
    };

    // ─── Handlers de modales ──────────────────────────────
    const handleNewVisit = () => {
        setEditingConsultation(undefined);
        setIsFormOpen(true);
    };

    const handleManage = (consultation: Consultation) => {
        setSelectedConsultation(consultation);
        setIsDetailOpen(true);
    };

    const handleEditFromDetail = (consultation: Consultation) => {
        setIsDetailOpen(false);
        setEditingConsultation(consultation);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingConsultation(undefined);
        fetchConsultations();
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedConsultation(null);
        fetchConsultations();
    };

    return (
        <div className="space-y-6 pt-4 pb-20 md:py-8 max-w-7xl mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white">Consultas y Visitas</h1>
                    <p className="text-white/60 text-sm mt-1">
                        Agenda de mediciones técnicas y consultas de diseño en obra.
                    </p>
                </div>
                <div className="flex w-full sm:w-auto gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center justify-center p-3 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border ${showFilters ? 'border-[var(--accent-gold)]/50 text-[var(--accent-gold)]' : 'border-white/10'}`}
                        title="Filtrar por estado"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNewVisit}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold shadow-[0_0_15px_rgba(209,164,88,0.2)]"
                    >
                        <Plus className="w-5 h-5" /> Nueva Visita
                    </button>
                </div>
            </div>

            {/* Filtros de estado */}
            {showFilters && (
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setStatusFilter(filter)}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors border ${statusFilter === filter
                                    ? 'bg-[var(--accent-gold)]/20 text-[var(--accent-gold)] border-[var(--accent-gold)]/30'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            )}

            {/* Agenda Card */}
            <GlassCard className="p-0 overflow-hidden">
                {/* Barra de fecha con navegación */}
                <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/5">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => changeDate(-1)}
                            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Día anterior"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-medium text-white capitalize">
                            Agenda: {displayDate}
                        </h2>
                        <button
                            onClick={() => changeDate(1)}
                            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Día siguiente"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        {!isToday && (
                            <button
                                onClick={goToToday}
                                className="text-xs text-[var(--accent-gold)] hover:underline ml-2"
                            >
                                Ir a Hoy
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-[var(--accent-gold)] font-medium">
                            <CalendarIcon className="w-4 h-4" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="bg-transparent border-none text-[var(--accent-gold)] focus:outline-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Lista de consultas */}
                <div className="divide-y divide-white/5">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
                            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-gold)]" />
                            <p>Cargando agenda...</p>
                        </div>
                    ) : filteredConsultations.length > 0 ? (
                        filteredConsultations.map((apt) => {
                            const { time, period } = formatTime(apt.scheduled_time);
                            const sts = statusConfig[apt.status] || statusConfig.Pendiente;

                            return (
                                <div key={apt.id} className="p-4 md:p-6 hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start md:items-center gap-4">
                                        <div className="w-16 text-center shrink-0">
                                            <p className="text-lg font-display text-white">{time}</p>
                                            <p className="text-xs text-[var(--accent-gold)] font-medium">{period}</p>
                                        </div>
                                        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                                        <div className="pl-0 md:pl-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-medium text-white">{apt.customer_name}</h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${sts.bgColor} ${sts.color} border ${sts.borderColor}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
                                                <span className="flex items-center gap-1.5">
                                                    <Hammer className="w-4 h-4 text-[var(--accent-gold)]" /> {apt.project_description}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-4 h-4" /> Experto: {apt.expert}
                                                </span>
                                                {apt.location && (
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4" /> {apt.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                                        <button
                                            onClick={() => handleManage(apt)}
                                            className="flex-1 md:flex-none px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/5"
                                        >
                                            Gestionar
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-white/40 text-center">
                            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                            <h3 className="text-lg font-medium text-white/60 mb-1">Sin visitas programadas</h3>
                            <p className="text-sm text-white/40 mb-6 max-w-sm">
                                No hay consultas agendadas para esta fecha{statusFilter !== 'Todas' ? ` con estado "${statusFilter}"` : ''}.
                            </p>
                            <button
                                onClick={handleNewVisit}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-gold)] text-black rounded-lg hover:bg-[var(--accent-gold)]/90 transition-colors font-semibold text-sm"
                            >
                                <Plus className="w-4 h-4" /> Agendar Nueva Visita
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer con conteo */}
                {!loading && filteredConsultations.length > 0 && (
                    <div className="p-4 border-t border-white/5 bg-white/[0.02] flex justify-between items-center text-sm text-white/40">
                        <span>{filteredConsultations.length} visita{filteredConsultations.length !== 1 ? 's' : ''} programada{filteredConsultations.length !== 1 ? 's' : ''}</span>
                        <span>
                            {filteredConsultations.filter(c => c.status === 'Pendiente').length} pendiente{filteredConsultations.filter(c => c.status === 'Pendiente').length !== 1 ? 's' : ''} · {' '}
                            {filteredConsultations.filter(c => c.status === 'Confirmada').length} confirmada{filteredConsultations.filter(c => c.status === 'Confirmada').length !== 1 ? 's' : ''}
                        </span>
                    </div>
                )}
            </GlassCard>

            {/* Modales */}
            <ConsultationFormModal
                isOpen={isFormOpen}
                onClose={handleCloseForm}
                consultation={editingConsultation}
                selectedDate={selectedDate}
            />

            <ConsultationDetailModal
                isOpen={isDetailOpen}
                consultation={selectedConsultation}
                onClose={handleCloseDetail}
                onEdit={handleEditFromDetail}
            />
        </div>
    );
}
