"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    animate?: boolean;
}

export const Logo = ({ className = "h-12 w-auto", animate: _animate = true }: LogoProps) => {
    return (
        <Image
            src="/logo.svg"
            alt="LASA Kitchens & Closets"
            width={375}
            height={375}
            className={cn("object-contain", className)}
            priority
        />
    );
};
