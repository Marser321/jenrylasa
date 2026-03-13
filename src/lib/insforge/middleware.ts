/**
 * Middleware helper para InsForge.
 * Por ahora, InsForge SDK no requiere un middleware de cookies especial como otros ORMs SSR.
 * Este archivo queda como stub para futuras integraciones de auth/session.
 */
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    // InsForge no requiere refresh de sesión via middleware por defecto.
    // Si se necesita en el futuro, se puede agregar lógica de auth aquí.
    return NextResponse.next({ request });
}
