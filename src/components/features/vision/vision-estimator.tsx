"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface VisionEstimatorProps {
    className?: string;
}

interface EstimationResult {
    estimatedDimensions: {
        width: string;
        depth: string;
        height: string;
    };
    confidence: number;
    suggestions: string[];
}

export function VisionEstimator({ className }: VisionEstimatorProps) {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<EstimationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleEstimate = async () => {
        if (!image) return;

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await fetch("/api/vision/estimate", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            const data = await response.json();
            setResult(data);
        } catch (_err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className={cn("p-6 max-w-xl mx-auto", className)}>
            <h3 className="text-2xl text-white mb-4 font-light">Lasa Vision™</h3>
            <p className="text-white/60 mb-6 text-sm">
                Upload a photo of your space. Our AI will estimate the dimensions and suggest layouts.
            </p>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 hover:bg-white/5 transition-colors text-center cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Room Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-2xl"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📸</span>
                        <span className="text-white/40 font-medium uppercase tracking-wider text-xs">
                            Tap to Upload
                        </span>
                    </div>
                )}
            </div>

            {/* Action Button */}
            {image && !result && (
                <button
                    onClick={handleEstimate}
                    disabled={isLoading}
                    className="mt-6 w-full py-4 bg-white text-black font-medium text-lg rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Analyzing Space..." : "Reveal Dimensions"}
                </button>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Width</div>
                            <div className="text-xl text-white font-light">{result.estimatedDimensions.width}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Depth</div>
                            <div className="text-xl text-white font-light">{result.estimatedDimensions.depth}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Height</div>
                            <div className="text-xl text-white font-light">{result.estimatedDimensions.height}</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-white/60 text-sm italic">
                            &ldquo;Based on the analysis, {result.suggestions[0]}&rdquo;
                        </p>
                    </div>

                    <button className="w-full py-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-colors">
                        Book a Consultant
                    </button>
                </div>
            )}
        </GlassCard>
    );
}
