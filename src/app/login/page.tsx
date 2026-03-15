'use client'

import React, { useState } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { Logo } from '@/components/ui/Logo'
import { login } from './actions'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        try {
            const response = await login(formData)
            if (response?.error) {
                setError(response.error)
            }
        } catch (e) {
            // Redirect throws an error in Next.js Server Actions, 
            // we need to ignore it to let the navigation happen.
            if ((e as Error).message.includes('NEXT_REDIRECT')) {
                throw e; // Let Next.js handle the redirect
            }
            setError('Ocurrió un error inesperado de conexión.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-4">
            <div className="fixed inset-0 pointer-events-none">
                {/* Decorative background blur mirroring the main site */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] mix-blend-screen opacity-50" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex justify-center mb-8">
                    <Logo className="w-48 h-auto" />
                </div>

                <GlassCard className="p-8 border-white/10 backdrop-blur-xl">
                    <h1 className="text-2xl font-light text-white mb-2 text-center">Acceso Administrativo</h1>
                    <p className="text-white/40 text-sm text-center mb-6">Ingresá tus credenciales para administrar cotizaciones y proyectos.</p>

                    {/* Cartelito temporal para credenciales de prueba */}
                    <div className="bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/20 rounded-md p-3 mb-6 text-center">
                        <p className="text-xs text-white/50 mb-1">Credenciales de prueba:</p>
                        <p className="text-sm text-[var(--accent-gold)] font-mono">lasa.kitchencorp@gmail.com / admin123</p>
                    </div>

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="login-email" className="text-sm text-white/60 font-medium">Correo Electrónico</label>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="tu@correo.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="login-password" className="text-sm text-white/60 font-medium">Contraseña</label>
                            </div>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-medium p-3 rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar al Panel'}
                        </button>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    )
}
