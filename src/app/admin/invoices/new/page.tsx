"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Download, Share2, Save, User, Calendar, DollarSign, FileText, Upload, Clock, Box, Hammer, FolderKanban, Loader2 } from "lucide-react";
import { saveInvoiceAction } from "./actions";
import { createClient } from "@/lib/insforge/client";
import { Logo } from "@/components/ui/Logo";

type ItemType = 'labor_hours' | 'wood_material' | 'weight' | 'hardware' | 'other';

interface InvoiceItem {
    id: string;
    item_type: ItemType;
    description: string;
    quantity: number;
    unit_measure: string;
    unit_price: number;
}

export default function NewInvoicePage() {
    // Project & Client state
    const [clientName, setClientName] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState("");

    // Files state
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

    // Invoice details state
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [taxRate, setTaxRate] = useState(0);

    const addItem = (type: ItemType) => {
        let unit = "unit";
        let desc = "Nuevo ítem";
        if (type === 'labor_hours') { unit = "hrs"; desc = "Horas de ensamblaje"; }
        if (type === 'wood_material') { unit = "m2"; desc = "Melamina Roble"; }
        if (type === 'weight') { unit = "kg"; desc = "Material Extra"; }
        if (type === 'hardware') { unit = "piezas"; desc = "Bisagras Blum"; }

        setItems([...items, {
            id: Date.now().toString(),
            item_type: type,
            description: desc,
            quantity: 1,
            unit_measure: unit,
            unit_price: 0
        }]);
    };

    const removeItem = (id: string) => setItems(items.filter(item => item.id !== id));

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (items.length === 0) {
            alert("No puedes guardar una factura vacía. Agrega al menos un ítem.");
            return;
        }

        setIsSaving(true);
        try {
            const result = await saveInvoiceAction({
                clientName,
                projectTitle,
                issueDate: date,
                dueDate,
                taxRate,
                subtotal,
                total,
                items: items.map(i => ({
                    item_type: i.item_type,
                    description: i.description || 'Sin descripción',
                    quantity: i.quantity || 1,
                    unit_measure: i.unit_measure || 'unidad',
                    unit_price: i.unit_price || 0
                }))
            });

            if (result.success && result.projectId && result.invoiceId) {
                // Handle file uploads if any
                if (attachedFiles.length > 0) {
                    const insforge = createClient();
                    let uploadErrors = 0;

                    for (const file of attachedFiles) {
                        try {
                            // Determine file type
                            const fileType = file.type.startsWith('image/') ? 'image' :
                                (file.type === 'application/pdf' ? 'plan_pdf' : 'document');

                            // Upload to storage
                            const { data: uploadData, error: uploadError } = await insforge.storage
                                .from('project_attachments_bucket')
                                .uploadAuto(file);

                            if (uploadError || !uploadData) {
                                console.error('Upload failed:', uploadError);
                                uploadErrors++;
                                continue;
                            }

                            // Get public URL
                            const publicUrl = uploadData.url || insforge.storage
                                .from('project_attachments_bucket')
                                .getPublicUrl(uploadData.key);

                            // Insert reference in database
                            await insforge.database.from('project_attachments').insert({
                                project_id: result.projectId,
                                invoice_id: result.invoiceId,
                                file_url: publicUrl,
                                file_type: fileType,
                                description: file.name
                            });
                        } catch (err) {
                            console.error('Error in file upload loop:', err);
                            uploadErrors++;
                        }
                    }

                    if (uploadErrors > 0) {
                        alert(`Factura guardada, pero hubo problemas subiendo ${uploadErrors} archivo(s).`);
                    } else {
                        alert("¡Cotización/Factura y archivos guardados exitosamente en InsForge!");
                        setItems([]);
                        setAttachedFiles([]);
                        setProjectTitle('');
                    }
                } else {
                    alert("¡Cotización/Factura guardada exitosamente en InsForge!");
                    setItems([]);
                    setProjectTitle('');
                }
            } else {
                alert(`Hubo un error al guardar: ${result.error}`);
            }
        } catch (_error) {
            alert("Error de red o conexión al intentar guardar.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto font-sans invoice-container">
            {/* Header / Print Version Logo */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="print-only-logo mb-6 hidden">
                        <Logo className="w-48 h-auto" animate={false} />
                    </div>
                    <h1 className="text-3xl font-display text-white mb-2">Nueva Factura / Cotización</h1>
                    <p className="text-white/50">Genera presupuestos súper detallados para tus proyectos de carpintería.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm">
                        <Download className="w-4 h-4" /> Exportar PDF
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold hover:bg-[var(--accent-gold)]/90 transition-all shadow-[0_0_15px_rgba(201,162,39,0.2)] text-sm disabled:opacity-50">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Guardando..." : "Guardar en BD"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Side */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-6 border-white/5 space-y-6">
                        <h2 className="text-lg font-display flex items-center gap-2 text-white">
                            <FolderKanban className="w-5 h-5 text-[var(--accent-gold)]" /> Datos del Proyecto
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40">Cliente</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        placeholder="Buscar o crear cliente..."
                                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--accent-gold)] focus:bg-white/10 transition-all outline-none text-sm text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40">Nombre del Proyecto</label>
                                <div className="relative">
                                    <Hammer className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        value={projectTitle}
                                        onChange={(e) => setProjectTitle(e.target.value)}
                                        placeholder="Ej: Cocina Wynwood"
                                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--accent-gold)] focus:bg-white/10 transition-all outline-none text-sm text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40">Fecha de Emisión</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--accent-gold)] focus:bg-white/10 transition-all outline-none text-sm text-white [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-white/40">Vencimiento</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[var(--accent-gold)] focus:bg-white/10 transition-all outline-none text-sm text-white [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 border-white/5 space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <h2 className="text-lg font-display flex items-center gap-2 text-white">
                                <FileText className="w-5 h-5 text-[var(--accent-gold)]" /> Desglose de Costos
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => addItem('wood_material')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md border border-white/10 flex items-center gap-1 transition-colors" title="Agregar material o madera">
                                    <Box className="w-3 h-3 text-amber-500" /> + Material
                                </button>
                                <button onClick={() => addItem('labor_hours')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md border border-white/10 flex items-center gap-1 transition-colors" title="Agregar horas de mano de obra">
                                    <Clock className="w-3 h-3 text-blue-500" /> + Mano de obra
                                </button>
                                <button onClick={() => addItem('hardware')} className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md border border-white/10 flex items-center gap-1 transition-colors">
                                    <Plus className="w-3 h-3" /> + Otro
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {items.length === 0 && (
                                <div className="text-center py-8 text-white/30 text-sm border border-dashed border-white/10 rounded-lg">
                                    No hay ítems registrados. Utiliza los botones superiores para agregar materiales o mano de obra.
                                </div>
                            )}

                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-black/40 border border-white/5 relative group"
                                    >
                                        {/* Icono indicador del tipo de item */}
                                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 self-center">
                                            {item.item_type === 'labor_hours' && <Clock className="w-5 h-5 text-blue-400" />}
                                            {item.item_type === 'wood_material' && <Box className="w-5 h-5 text-amber-400" />}
                                            {(item.item_type === 'hardware' || item.item_type === 'other') && <FileText className="w-5 h-5 text-gray-400" />}
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <input
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                placeholder="Descripción del ítem..."
                                                className="w-full p-2 bg-transparent border-b border-white/10 focus:border-[var(--accent-gold)] outline-none text-white text-sm"
                                            />
                                        </div>

                                        <div className="flex gap-2">
                                            <div className="w-20">
                                                <input
                                                    type="number"
                                                    value={item.quantity || ""}
                                                    onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value))}
                                                    placeholder="Cant."
                                                    className="w-full p-2 bg-white/5 rounded-md border border-white/10 focus:border-[var(--accent-gold)] outline-none text-white text-sm text-center"
                                                />
                                            </div>
                                            <div className="w-20">
                                                <input
                                                    value={item.unit_measure}
                                                    onChange={(e) => updateItem(item.id, "unit_measure", e.target.value)}
                                                    placeholder="Unidad (m2, hr)"
                                                    className="w-full p-2 bg-white/5 rounded-md border border-white/10 focus:border-[var(--accent-gold)] outline-none text-white text-sm text-center text-white/50"
                                                />
                                            </div>
                                            <div className="relative w-28">
                                                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--accent-gold)]" />
                                                <input
                                                    type="number"
                                                    value={item.unit_price || ""}
                                                    onChange={(e) => updateItem(item.id, "unit_price", parseFloat(e.target.value))}
                                                    className="w-full pl-6 pr-2 py-2 rounded-md bg-white/5 border border-white/10 focus:border-[var(--accent-gold)] outline-none text-white text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end w-24 px-2 font-display text-white">
                                            ${(item.quantity * item.unit_price).toFixed(2)}
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute -right-2 -top-2 p-2 bg-red-500/10 text-red-400 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all scale-75 md:scale-100 shadow-xl"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 border-white/5 space-y-4">
                        <h2 className="text-lg font-display flex items-center gap-2 text-white">
                            <Upload className="w-5 h-5 text-[var(--accent-gold)]" /> Archivos Adjuntos (Planos / Entregables)
                        </h2>

                        <label className="block border border-dashed border-white/20 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,application/pdf"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setAttachedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                                    }
                                }}
                            />
                            <Upload className="w-8 h-8 text-white/20 group-hover:text-[var(--accent-gold)] mx-auto mb-3 transition-colors" />
                            <p className="text-sm text-white/60">Clic o arrastra fotos de la cocina terminada o los planos PDF aquí.</p>
                            <p className="text-xs text-white/30 mt-1">Soporta JPG, PNG, PDF (Max 10MB)</p>
                        </label>

                        {attachedFiles.length > 0 && (
                            <div className="space-y-2 mt-4">
                                {attachedFiles.map((file, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <FileText className="w-4 h-4 text-white/40 flex-shrink-0" />
                                            <span className="text-sm text-white/80 truncate">{file.name}</span>
                                        </div>
                                        <button
                                            onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                            className="p-1 hover:bg-red-500/20 text-white/40 hover:text-red-400 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>
                </div>

                {/* Summary Side - Sticky */}
                <div className="space-y-6 relative">
                    <GlassCard className="border-[var(--accent-gold)]/30 sticky top-6 p-6">
                        <h3 className="text-xl font-display mb-6 border-b border-white/10 pb-4">Resumen de Cotización</h3>
                        <div className="space-y-4 text-sm font-light">
                            <div className="flex justify-between text-white/60">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center text-white/60">
                                <span>Impuestos (%)</span>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-16 p-1 bg-white/5 border border-white/10 rounded text-right outline-none focus:border-[var(--accent-gold)] text-white"
                                />
                            </div>

                            {taxAmount > 0 && (
                                <div className="flex justify-between text-white/40 text-xs">
                                    <span>Monto IVA</span>
                                    <span>+${taxAmount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="h-px bg-[var(--accent-gold)]/20 my-4" />

                            <div className="flex justify-between items-baseline">
                                <span className="text-white/80 font-medium">TOTAL</span>
                                <span className="text-3xl font-bold text-[var(--accent-gold)] tracking-tight">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={() => {
                                    const message = `*FACTURA / COTIZACIÓN - LASA KITCHENS & CLOSETS*\n\n*Proyecto:* ${projectTitle}\n*Cliente:* ${clientName}\n*Total:* $${total.toFixed(2)}\n\nContactanos para revisar el desglose y avanzar con el proyecto.`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
                                }}
                                className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-[#25D366]/10 text-[#25D366] font-medium border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
                            >
                                <Share2 className="w-4 h-4" /> Enviar por WhatsApp
                            </button>
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-white/5 text-center">
                            <p className="text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                                Documento Interno & Cliente
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    aside, header, button.no-print, .no-print { display: none !important; }
                    main { background: white !important; color: black !important; padding: 0 !important; }
                    .GlassCard { border: 1px solid #ccc !important; box-shadow: none !important; color: black !important; background: white !important; }
                    input, select { border: none !important; color: black !important; background: transparent !important; }
                    .text-white, .text-white\\/50 { color: black !important; }
                    .bg-black\\/40 { background: #f9f9f9 !important; }
                    body { margin: 0; padding: 0cm; }
                }
            `}</style>
        </div>
    );
}
