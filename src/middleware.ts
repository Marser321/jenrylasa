import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Solo aplicar lógica a rutas de administración
    if (pathname.startsWith('/admin')) {
        const tokenToken = request.cookies.get('lasa_admin_token')?.value

        if (!tokenToken || tokenToken !== 'mock-valid-token') {
            const loginUrl = new URL('/login', request.url)
            // Guardar para redirección post-login si se desea
            // loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Aplicar a todas las rutas excepto archivos estáticos y API interna de Next
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
