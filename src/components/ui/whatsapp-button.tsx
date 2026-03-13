"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
    phoneNumber?: string;
    message?: string;
    className?: string;
}

export function WhatsAppButton({
    phoneNumber = "17862713720",
    message = "Hola! Me gustaría agendar una cita en Lasa Kitchens & Closets.",
    className
}: WhatsAppButtonProps) {

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className={cn(
                "fixed bottom-8 right-8 z-50 flex items-center justify-center p-4 rounded-full",
                "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.3)]",
                "after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-tr after:from-white/20 after:to-transparent after:opacity-50",
                "group overflow-hidden",
                className
            )}
        >
            {/* Liquid Effect Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--accent-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <MessageCircle className="w-6 h-6 text-white group-hover:text-[var(--accent-gold)] transition-colors duration-300 relative z-10" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Hablá con nosotros
            </span>
        </motion.button>
    );
}
