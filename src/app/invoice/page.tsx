"use client";

import React, { useState } from "react";
import { DynamicLogo } from "@/components/ui/DynamicLogo";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Printer } from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export default function InvoicePage() {
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Date.now().toString().slice(-6)}`
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "Bespoke Kitchen Cabinetry",
      quantity: 1,
      price: 5000,
    },
  ]);
  const [notes, setNotes] = useState(
    "Thank you for choosing LASA. We appreciate your business and look forward to delivering exceptional craftsmanship."
  );
  const [paymentTerms, setPaymentTerms] = useState(
    "Payment due within 30 days of invoice date. A deposit of 50% is required to begin fabrication."
  );

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.22;
  const total = subtotal + tax;

  const formatCurrency = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <>
      {/* ── Print Button ── */}
      <div className="print:hidden flex justify-center pt-8 pb-4">
        <button
          onClick={() => window.print()}
          className="group relative px-10 py-3 bg-[#C9A227] text-[#1a1207] rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#d4af37] transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#C9A227]/20 hover:shadow-[#C9A227]/40 cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Imprimir / Descargar PDF
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          INVOICE DOCUMENT
         ══════════════════════════════════════════════════════════ */}
      <div
        id="invoice-document"
        className="max-w-[850px] mx-auto bg-[#0d0d0d] print:bg-white text-white print:text-[#1a1a1a] relative overflow-hidden"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* ── Diagonal Watermark ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] print:opacity-[0.04]"
          aria-hidden="true"
        >
          <span
            className="text-[180px] font-display tracking-[0.15em] uppercase rotate-[-30deg] whitespace-nowrap text-white print:text-[#C9A227]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LASA
          </span>
        </div>

        {/* ═══ TOP GOLD BAR ═══ */}
        <div className="h-2 bg-gradient-to-r from-[#8B6914] via-[#C9A227] to-[#8B6914]" />

        {/* ═══ HEADER ═══ */}
        <div className="px-10 pt-10 pb-8 print:px-12 print:pt-10">
          <div className="flex justify-between items-start">
            {/* Logo & Company Info */}
            <div className="space-y-4">
              <DynamicLogo
                className="w-28 print:w-24"
                lasaTextColor="#FFFFFF"
                goldColor="#C9A227"
                navyColor="#4A3728"
                subtextColor="#999"
              />
              <div className="text-[11px] text-white/40 print:text-[#888] space-y-0.5 leading-relaxed pl-1">
                <p className="font-medium text-white/60 print:text-[#555]">
                  LASA Kitchen &amp; Closet
                </p>
                <p>123 Luxury Lane, Design District</p>
                <p>Miami, FL 33137</p>
                <p>contact@lasakitchens.com</p>
                <p>+1 (555) LASA-WOOD</p>
              </div>
            </div>

            {/* INVOICE Title Block */}
            <div className="text-right space-y-4">
              <div>
                <h1
                  className="text-5xl tracking-[0.2em] text-[#C9A227] leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  FACTURA
                </h1>
                <div className="mt-2 h-[2px] bg-gradient-to-l from-[#C9A227] via-[#C9A227]/60 to-transparent" />
              </div>

              {/* Invoice Meta */}
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/30 print:text-[#999] uppercase tracking-[0.15em] font-semibold">
                    Nº
                  </span>
                  <input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="bg-transparent border-b border-white/10 print:border-[#ddd] text-white print:text-[#1a1a1a] text-right focus:border-[#C9A227] outline-none pb-0.5 w-32 font-medium"
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/30 print:text-[#999] uppercase tracking-[0.15em] font-semibold">
                    Fecha
                  </span>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="bg-transparent border-b border-white/10 print:border-[#ddd] text-white print:text-[#1a1a1a] text-right focus:border-[#C9A227] outline-none pb-0.5 w-32 font-medium"
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/30 print:text-[#999] uppercase tracking-[0.15em] font-semibold">
                    Vence
                  </span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-transparent border-b border-white/10 print:border-[#ddd] text-white print:text-[#1a1a1a] text-right focus:border-[#C9A227] outline-none pb-0.5 w-32 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ GOLD SEPARATOR ═══ */}
        <div className="mx-10 print:mx-12 h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />

        {/* ═══ BILL TO / FROM ═══ */}
        <div className="px-10 py-8 print:px-12 grid grid-cols-2 gap-12">
          {/* Bill To */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#C9A227] rounded-full" />
              <h3
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C9A227]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Facturar a
              </h3>
            </div>
            <input
              placeholder="Nombre del cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 print:border-[#ddd] text-white print:text-[#1a1a1a] focus:border-[#C9A227] outline-none pb-1 text-sm font-medium placeholder:text-white/20 print:placeholder:text-[#ccc]"
            />
            <input
              placeholder="Dirección"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 print:border-[#ddd] text-white/70 print:text-[#555] focus:border-[#C9A227] outline-none pb-1 text-[12px] placeholder:text-white/20 print:placeholder:text-[#ccc]"
            />
            <input
              placeholder="Teléfono"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 print:border-[#ddd] text-white/70 print:text-[#555] focus:border-[#C9A227] outline-none pb-1 text-[12px] placeholder:text-white/20 print:placeholder:text-[#ccc]"
            />
            <input
              placeholder="Email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 print:border-[#ddd] text-white/70 print:text-[#555] focus:border-[#C9A227] outline-none pb-1 text-[12px] placeholder:text-white/20 print:placeholder:text-[#ccc]"
            />
          </div>

          {/* Payment Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#C9A227] rounded-full" />
              <h3
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C9A227]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Datos de pago
              </h3>
            </div>
            <div className="text-[12px] text-white/50 print:text-[#777] space-y-1.5 leading-relaxed">
              <p>
                <span className="text-white/30 print:text-[#999] uppercase tracking-wider text-[10px] font-semibold">
                  Banco:
                </span>{" "}
                <span className="text-white/70 print:text-[#444]">
                  BROU — Suc. Punta del Este
                </span>
              </p>
              <p>
                <span className="text-white/30 print:text-[#999] uppercase tracking-wider text-[10px] font-semibold">
                  Cuenta:
                </span>{" "}
                <span className="text-white/70 print:text-[#444]">
                  001-0012345-0001
                </span>
              </p>
              <p>
                <span className="text-white/30 print:text-[#999] uppercase tracking-wider text-[10px] font-semibold">
                  RUT:
                </span>{" "}
                <span className="text-white/70 print:text-[#444]">
                  21-XXXXXXX-001
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ═══ ITEMS TABLE ═══ */}
        <div className="px-10 print:px-12 pb-2">
          {/* Table Header */}
          <div
            className="grid grid-cols-12 gap-3 py-3 border-y-2 border-[#C9A227]/40 print:border-[#C9A227]/60 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9A227]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <div className="col-span-6 pl-2">Descripción</div>
            <div className="col-span-2 text-center">Cant.</div>
            <div className="col-span-2 text-right">Precio Unit.</div>
            <div className="col-span-2 text-right pr-2">Total</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5 print:divide-[#eee]">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  "grid grid-cols-12 gap-3 items-center py-3 group transition-colors duration-200",
                  idx % 2 === 0
                    ? "bg-white/[0.02] print:bg-[#fafaf7]"
                    : "bg-transparent print:bg-white",
                  "hover:bg-white/[0.05] print:hover:bg-[#f5f5f0]"
                )}
              >
                <div className="col-span-6 flex items-center gap-2 pl-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="print:hidden text-white/15 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <input
                    placeholder="Descripción del item..."
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    className="w-full bg-transparent text-white/90 print:text-[#1a1a1a] text-[13px] outline-none placeholder:text-white/15 print:placeholder:text-[#ccc]"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full bg-white/5 print:bg-[#f0ede5] border border-white/10 print:border-[#ddd] rounded px-2 py-1.5 text-center text-[13px] text-white/80 print:text-[#333] outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full bg-white/5 print:bg-[#f0ede5] border border-white/10 print:border-[#ddd] rounded px-2 py-1.5 text-right text-[13px] text-white/80 print:text-[#333] outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <div className="col-span-2 text-right pr-2 text-[13px] font-semibold text-white/90 print:text-[#1a1a1a]">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Button */}
          <button
            onClick={addItem}
            className="print:hidden flex items-center gap-2 text-[#C9A227] hover:text-[#d4af37] transition-colors text-[11px] font-semibold mt-4 tracking-wider uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Item
          </button>
        </div>

        {/* ═══ TOTALS ═══ */}
        <div className="px-10 print:px-12 py-8">
          <div className="flex justify-end">
            <div className="w-72 space-y-2">
              {/* Subtotal */}
              <div className="flex justify-between text-[12px] text-white/40 print:text-[#888] py-1">
                <span className="uppercase tracking-wider">Subtotal</span>
                <span className="font-medium text-white/60 print:text-[#555]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between text-[12px] text-white/40 print:text-[#888] py-1">
                <span className="uppercase tracking-wider">IVA (22%)</span>
                <span className="font-medium text-white/60 print:text-[#555]">
                  {formatCurrency(tax)}
                </span>
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-[#C9A227]" />

              {/* Total */}
              <div className="flex justify-between items-center py-3">
                <span
                  className="text-lg uppercase tracking-[0.2em] text-[#C9A227] font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Total
                </span>
                <span
                  className="text-2xl text-[#C9A227] font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Gold accent bar under total */}
              <div className="h-1 bg-gradient-to-r from-[#8B6914] via-[#C9A227] to-[#8B6914] rounded-full" />
            </div>
          </div>
        </div>

        {/* ═══ NOTES & TERMS ═══ */}
        <div className="px-10 print:px-12 pb-8 grid grid-cols-2 gap-12">
          {/* Notes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#C9A227]/40 rounded-full" />
              <h3
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 print:text-[#999]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Notas
              </h3>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/[0.02] print:bg-[#fafaf7] border border-white/5 print:border-[#eee] rounded-lg p-3 min-h-[80px] outline-none focus:border-[#C9A227]/40 transition-colors text-[11px] text-white/50 print:text-[#666] italic leading-relaxed resize-none"
            />
          </div>

          {/* Terms */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#C9A227]/40 rounded-full" />
              <h3
                className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 print:text-[#999]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Términos
              </h3>
            </div>
            <textarea
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full bg-white/[0.02] print:bg-[#fafaf7] border border-white/5 print:border-[#eee] rounded-lg p-3 min-h-[80px] outline-none focus:border-[#C9A227]/40 transition-colors text-[11px] text-white/50 print:text-[#666] leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="px-10 print:px-12 py-6 border-t border-white/5 print:border-[#eee]">
          <div className="flex justify-between items-center">
            <p
              className="text-[10px] text-white/20 print:text-[#bbb] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gracias por su confianza
            </p>
            <p className="text-[9px] text-white/15 print:text-[#ccc] tracking-wider">
              LASA Kitchen &amp; Closet © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* ═══ BOTTOM GOLD BAR ═══ */}
        <div className="h-2 bg-gradient-to-r from-[#8B6914] via-[#C9A227] to-[#8B6914]" />
      </div>

      {/* Bottom spacing */}
      <div className="h-12 print:hidden" />

      {/* ═══ PRINT STYLES ═══ */}
      <style jsx global>{`
        @media print {
          /* Reset page */
          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Hide everything except the invoice */
          body > *:not(#invoice-document) {
            /* Next.js wraps in __next */
          }

          header,
          nav,
          .print\\:hidden {
            display: none !important;
          }

          #invoice-document {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          /* Inputs look like plain text */
          input,
          textarea {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            outline: none !important;
          }

          input[type="date"] {
            -webkit-appearance: none;
            appearance: none;
          }

          input[type="date"]::-webkit-calendar-picker-indicator {
            display: none;
          }

          input[type="number"] {
            -moz-appearance: textfield;
            background: transparent !important;
            border: none !important;
          }

          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            display: none;
          }

          /* Preserve gold accents */
          .bg-gradient-to-r {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
}
