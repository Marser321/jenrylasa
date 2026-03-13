"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollSequenceProps {
    sequencePath: string;
    frameCount: number;
    className?: string;
    fileNamePrefix?: string; // e.g., "ezgif-frame-"
    fileNameSuffix?: string; // e.g., ".png"
    digits?: number; // e.g., 3 for "001"
}

export function ScrollSequence({
    sequencePath,
    frameCount,
    className,
    fileNamePrefix = "ezgif-frame-",
    fileNameSuffix = ".webp",
    digits = 3,
}: ScrollSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, _reject) => {
                    const img = new Image();
                    const fileName = `${fileNamePrefix}${String(i).padStart(digits, "0")}${fileNameSuffix}`;
                    img.src = `${sequencePath}/${fileName}`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // Keep order
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${img.src}`);
                        // Resolve anyway to avoid blocking
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [sequencePath, frameCount, fileNamePrefix, fileNameSuffix, digits]);

    // Draw frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Safety check for index
        const safeIndex = Math.min(Math.max(Math.round(index), 0), frameCount - 1);
        const img = images[safeIndex];

        if (!img) return;

        // Responsive drawing: cover
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            // Image is taller than canvas
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(currentIndex, "change", (latest) => {
        renderFrame(latest);
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Set canvas size to match window/container for high fidelity
                // We might want to use window.innerWidth/Height or the parent's size
                // checking sticky container size
                const parent = containerRef.current;
                if (parent) {
                    canvasRef.current.width = parent.clientWidth;
                    canvasRef.current.height = window.innerHeight; // Full screen height usually
                    // Trigger a re-render of current frame
                    renderFrame(currentIndex.get());
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Init

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]); // Re-run when loaded to draw first frame

    // Initial draw
    useEffect(() => {
        if (isLoaded) {
            renderFrame(currentIndex.get());
        }
    }, [isLoaded]);

    return (
        <div ref={containerRef} className={cn("relative h-[300vh] w-full", className)}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Loading State or Fallback? */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground">
                        <span className="animate-pulse">Loading experience...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
