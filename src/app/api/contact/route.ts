import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, message } = body;

        // Validación básica
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: 'Nombre, teléfono y mensaje son requeridos.' },
                { status: 400 }
            );
        }

        // Configurar transporte SMTP de Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD, // App Password de Gmail (no la contraseña normal)
            },
        });

        // Email al negocio
        await transporter.sendMail({
            from: `"Lasa Web" <${process.env.GMAIL_USER}>`,
            to: 'lasa.kitchencorp@gmail.com',
            subject: `Nueva consulta de ${name} — Lasa Kitchens`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f5; padding: 32px; border-radius: 12px;">
                    <h2 style="color: #c9a84c; margin: 0 0 24px; font-size: 22px;">Nueva consulta recibida</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; color: #999; width: 120px; vertical-align: top;">Nombre</td>
                            <td style="padding: 10px 0; color: #f5f5f5; font-weight: 500;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #999; vertical-align: top;">Teléfono</td>
                            <td style="padding: 10px 0;">
                                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #c9a84c; text-decoration: none;">${phone}</a>
                            </td>
                        </tr>
                        ${email ? `
                        <tr>
                            <td style="padding: 10px 0; color: #999; vertical-align: top;">Email</td>
                            <td style="padding: 10px 0;">
                                <a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email}</a>
                            </td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 10px 0; color: #999; vertical-align: top;">Mensaje</td>
                            <td style="padding: 10px 0; color: #f5f5f5; line-height: 1.6;">${message}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <a href="https://wa.me/17862713720?text=${encodeURIComponent(`Hola ${name}! Te contactamos desde Lasa Kitchens.`)}" 
                           style="display: inline-block; padding: 12px 24px; background: #c9a84c; color: #000; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                            Responder por WhatsApp
                        </a>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error enviando email:', error);
        return NextResponse.json(
            { error: 'Error al enviar el mensaje. Intentá de nuevo.' },
            { status: 500 }
        );
    }
}
