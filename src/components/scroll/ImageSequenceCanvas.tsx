"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useFrameLoader } from "@/hooks/useFrameLoader";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ─── Props ────────────────────────────────────────────────────
interface ImageSequenceCanvasProps {
    /** Ruta base de los frames (e.g., "/scroll/sequence-1") */
    sequencePath: string;
    /** Cantidad total de frames */
    frameCount: number;
    /** Clase CSS adicional para el contenedor exterior */
    className?: string;
    /** Prefijo del nombre de archivo (default: "ezgif-frame-") */
    fileNamePrefix?: string;
    /** Formato de imagen (default: "png") */
    format?: "png" | "webp";
    /** Dígitos para padding del nombre (default: 3) */
    digits?: number;
    /** Factor de escala para hacer zoom y recortar bordes (default: 1.15) */
    scale?: number;
    /** Factor de suavizado para el scrub (default: 0.5) */
    scrubSmooth?: number;
}

export function ImageSequenceCanvas({
    sequencePath,
    frameCount,
    className,
    fileNamePrefix = "ezgif-frame-",
    format = "webp",
    digits = 3,
    scrubSmooth = 0.5,
    scale = 1.15,
}: ImageSequenceCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrameRef = useRef(0);

    // ─── Cargar frames progresivamente ────────────────────────
    const { frames, isReady, loadProgress, requestFrame } = useFrameLoader({
        sequencePath,
        frameCount,
        fileNamePrefix,
        format,
        digits,
        criticalCount: 50,
    });

    // ─── Mantener referencia estable a frames para evitar re-crear renderFrame ───
    const framesRef = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        framesRef.current = frames;
    }, [frames]);

    // ─── Dibujar con "object-fit: cover" ──────────────────────
    const drawImageCover = useCallback((
        ctx: CanvasRenderingContext2D,
        img: HTMLImageElement,
        canvasW: number,
        canvasH: number,
        scale: number
    ) => {
        const canvasRatio = canvasW / canvasH;
        const imgRatio = img.width / img.height;

        let drawW = canvasW;
        let drawH = canvasH;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
            drawH = canvasH;
            drawW = img.width * (canvasH / img.height);
            offsetX = (canvasW - drawW) / 2;
        } else {
            drawW = canvasW;
            drawH = img.height * (canvasW / img.width);
            offsetY = (canvasH - drawH) / 2;
        }

        if (scale !== 1) {
            const originalW = drawW;
            const originalH = drawH;

            drawW *= scale;
            drawH *= scale;

            offsetX -= (drawW - originalW) / 2;
            offsetY -= (drawH - originalH) / 2;
        }

        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }, []);

    // ─── Dibujar frame en canvas ──────────────────────────────
    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const safeIndex = Math.min(Math.max(Math.round(index), 0), frameCount - 1);
            // Usar la referencia estable
            const currentFrames = framesRef.current;
            const img = currentFrames[safeIndex];

            // Si el frame no está cargado, pedirlo y usar el más cercano
            if (!img) {
                requestFrame(safeIndex);
                // Buscar el frame más cercano disponible
                for (let offset = 1; offset < 10; offset++) {
                    const nearFrame =
                        currentFrames[safeIndex - offset] || currentFrames[safeIndex + offset];
                    if (nearFrame) {
                        drawImageCover(ctx, nearFrame, canvas.width, canvas.height, scale);
                        return;
                    }
                }
                return;
            }

            drawImageCover(ctx, img, canvas.width, canvas.height, scale);
        },
        [frameCount, requestFrame, scale, drawImageCover] // Include drawImageCover dependency
    );



    // ─── Resize handler ───────────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // Usar devicePixelRatio para pantallas retina
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Removed ctx.scale(dpr, dpr) to avoid double-scaling since drawImageCover uses physical pixels (canvas.width/height)


            renderFrame(currentFrameRef.current);
        };

        // ResizeObserver para mejor rendimiento que window.resize
        const observer = new ResizeObserver(handleResize);
        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }

        handleResize();
        return () => observer.disconnect();
    }, [isReady, renderFrame]);

    // ─── GSAP ScrollTrigger ───────────────────────────────────
    useGSAP(
        () => {
            if (!isReady || !containerRef.current) return;

            // Dibujar primer frame
            renderFrame(0);

            // Objeto animable que GSAP interpola
            const progress = { value: 0 };

            gsap.to(progress, {
                value: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: scrubSmooth,
                    fastScrollEnd: true,
                    // NO usar preventOverlaps: causa que el canvas se pause
                    // cuando otros ScrollTriggers se activan
                    onUpdate: (self) => {
                        const frameIndex = Math.floor(self.progress * (frameCount - 1));
                        if (frameIndex !== currentFrameRef.current) {
                            currentFrameRef.current = frameIndex;
                            // Renderizar directo sin doble-RAF: GSAP ticker ya corre en RAF
                            renderFrame(frameIndex);
                        }
                    },
                },
            });
        },
        {
            scope: containerRef,
            dependencies: [isReady, frameCount, scrubSmooth, renderFrame],
        }
    );

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full", className)}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full"
                    style={{ display: "block" }}
                />

                {/* Indicador de carga */}
                {!isReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-void,#131313)]">
                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white/60 rounded-full transition-all duration-300"
                                style={{ width: `${loadProgress * 100}%` }}
                            />
                        </div>
                        <span className="mt-4 text-sm text-white/40 tracking-[0.15em] uppercase font-light">
                            Loading experience
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
