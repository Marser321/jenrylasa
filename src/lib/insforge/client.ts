/**
 * Cliente InsForge para componentes del lado del cliente (Client Components, hooks, etc.)
 * Usa las variables de entorno NEXT_PUBLIC_INSFORGE_URL y NEXT_PUBLIC_INSFORGE_ANON_KEY.
 */
import { createClient as createInsForgeClient } from '@insforge/sdk';

export function createClient() {
    return createInsForgeClient({
        baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
        anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    });
}
