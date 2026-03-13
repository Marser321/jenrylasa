"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GlassCard v2 — Micro-Lujo
 * - Backdrop blur glassmorphism
 * - Cursor glow effect (radial gradient sigue el mouse)
 * - Transiciones suaves con ease-luxury
 */
const GlassCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, onMouseMove, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    // Combinar refs
    React.useImperativeHandle(ref, () => cardRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cardRef.current.style.setProperty("--mouse-x", `${x}px`);
            cardRef.current.style.setProperty("--mouse-y", `${y}px`);
        }

        // Llamar al handler externo si existe
        onMouseMove?.(e);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={cn(
                // Base glass
                "rounded-xl border border-glass-border bg-glass-background p-6 backdrop-blur-md text-card-foreground",
                // Shadow
                "shadow-[var(--shadow-glass)]",
                // Transition — solo propiedades específicas para evitar reflow
                "transition-[transform,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-luxury)]",
                // Hover
                "hover:scale-[1.02] hover:border-white/20",
                // Cursor glow
                "glass-glow",
                className
            )}
            {...props}
        />
    );
});
GlassCard.displayName = "GlassCard";

export { GlassCard };
