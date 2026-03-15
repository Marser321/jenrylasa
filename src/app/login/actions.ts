'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'E-mail y contraseña requeridos' }
    }

    // TODO: Integrar llamada real a insforge.auth.signInWithPassword
    // Por el momento simulamos un login exitoso y seteamos la cookie
    // para habilitar el acceso al panel admin (hasta que configuremos InsForge Users).

    if (email === 'lasa.kitchencorp@gmail.com' && password === 'admin123') { // Mock temporal
        const cookieStore = await cookies()
        // En el futuro, aca se guarda el token JWT real que devuelve InsForge
        cookieStore.set('lasa_admin_token', 'mock-valid-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 semana
            path: '/'
        })

        redirect('/admin')
    } else {
        return { error: 'Credenciales inválidas' }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    // TODO: Llamar a insforge.auth.signOut() 
    cookieStore.delete('lasa_admin_token')
    redirect('/login')
}
