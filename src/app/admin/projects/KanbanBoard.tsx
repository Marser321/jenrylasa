'use client';

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { updateProjectStatus } from "./actions";
import { GripVertical, FolderOpen, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Types based on our DB schema
type Project = {
    id: string;
    client_id: string;
    title: string;
    description: string;
    status: 'draft' | 'in_progress' | 'completed';
    start_date: string | null;
    end_date: string | null;
    created_at: string;
    clients?: { full_name: string }; // Joined
};

type BoardData = {
    draft: Project[];
    in_progress: Project[];
    completed: Project[];
};

export default function KanbanBoard({ initialProjects }: { initialProjects: Project[] }) {
    // 1. Initialize State preventing Hydration issues (Dnd needs mounted state)
    const [isMounted, setIsMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // 2. Organize initial data into columns
    const [columns, setColumns] = useState<BoardData>({
        draft: [],
        in_progress: [],
        completed: []
    });

    useEffect(() => {
        setIsMounted(true);
        if (initialProjects) {
            setColumns({
                draft: initialProjects.filter(p => p.status === 'draft'),
                in_progress: initialProjects.filter(p => p.status === 'in_progress'),
                completed: initialProjects.filter(p => p.status === 'completed'),
            });
        }
    }, [initialProjects]);

    // Handle the Drag End Event
    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        // If dropped outside a valid column, do nothing
        if (!destination) return;

        // If dropped in the exact same spot, do nothing
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColId = source.droppableId as keyof BoardData;
        const destColId = destination.droppableId as keyof BoardData;

        // Optimistic UI Update: Clone state and move the item
        const newColumns = { ...columns };
        const sourceCol = [...newColumns[sourceColId]];
        const destCol = [...newColumns[destColId]];

        const [movedItem] = sourceCol.splice(source.index, 1);

        // Update the item's status in memory
        movedItem.status = destColId as 'draft' | 'in_progress' | 'completed';

        destCol.splice(destination.index, 0, movedItem);

        newColumns[sourceColId] = sourceCol;
        newColumns[destColId] = destCol;

        setColumns(newColumns);
        setIsSaving(true);

        // Server Action Call
        try {
            const res = await updateProjectStatus(draggableId, destColId);
            if (!res.success) {
                // Revert state if error
                setColumns(columns);
                alert("Hubo un error al guardar el nuevo estado: " + res.error);
            }
        } catch {
            setColumns(columns); // Revert
            alert("Error de red al actualizar el tablero.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isMounted) return <div className="p-8 text-center text-white/50 animate-pulse">Cargando Tablero Ejecutivo...</div>;

    const columnConfig: Array<{ id: keyof BoardData; title: string; color: string; border: string }> = [
        { id: 'draft', title: 'Cotización (Draft)', color: 'bg-amber-500/10 text-amber-500', border: 'border-amber-500/20' },
        { id: 'in_progress', title: 'En Producción', color: 'bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]', border: 'border-[var(--accent-gold)]/20' },
        { id: 'completed', title: 'Completado / Instalado', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-medium text-white flex items-center gap-3">
                        Tablero de Proyectos
                        {isSaving && <Loader2 className="w-4 h-4 text-[var(--accent-gold)] animate-spin" />}
                    </h1>
                    <p className="text-white/60 text-sm mt-1">
                        Arrastra las tarjetas para cambiar el estado de producción de tus obras.
                    </p>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                >
                    {columnConfig.map((col, colIdx) => (
                        <motion.div
                            key={col.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: colIdx * 0.1 }}
                            className="flex flex-col gap-4"
                        >
                            {/* Column Header */}
                            <div className={`p-4 rounded-xl border ${col.border} ${col.color.split(' ')[0]} backdrop-blur-md`}>
                                <h3 className={`font-medium ${col.color.split(' ')[1]} flex items-center justify-between`}>
                                    {col.title}
                                    <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">
                                        {columns[col.id].length}
                                    </span>
                                </h3>
                            </div>

                            {/* Column Dropzone */}
                            <Droppable droppableId={col.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`min-h-[500px] p-2 rounded-xl transition-colors ${snapshot.isDraggingOver ? 'bg-white/5 border border-dashed border-white/20' : ''
                                            }`}
                                    >
                                        {columns[col.id].map((project, index) => (
                                            <Draggable key={project.id} draggableId={project.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`mb-3 outline-none ${snapshot.isDragging ? 'z-50' : ''}`}
                                                    >
                                                        <GlassCard
                                                            className={`p-4 border-white/10 hover:border-[var(--accent-gold)]/40 hover:bg-white/10 transition-all ${snapshot.isDragging ? 'shadow-2xl shadow-[var(--accent-gold)]/20 rotate-2 border-[var(--accent-gold)]/50' : ''
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="mt-1 text-white/20 hover:text-white/60 transition-colors cursor-grab active:cursor-grabbing"
                                                                >
                                                                    <GripVertical className="w-4 h-4" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-white font-medium truncate" title={project.title}>
                                                                        {project.title}
                                                                    </h4>

                                                                    {project.clients && (
                                                                        <Link
                                                                            href={`/admin/clients/${project.client_id}`}
                                                                            className="text-white/40 text-xs mt-1 block truncate hover:text-[var(--accent-gold)] transition-colors"
                                                                        >
                                                                            👤 {project.clients.full_name}
                                                                        </Link>
                                                                    )}

                                                                    <div className="mt-4 flex items-center justify-between">
                                                                        <div className="text-[10px] text-white/30 flex items-center gap-1">
                                                                            <Calendar className="w-3 h-3" />
                                                                            {new Date(project.created_at).toLocaleDateString()}
                                                                        </div>
                                                                        <FolderOpen className="w-4 h-4 text-white/20" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </GlassCard>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </motion.div>
                    ))}
                </motion.div>
            </DragDropContext>
        </div>
    );
}
