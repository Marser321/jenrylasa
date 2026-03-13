import { createClient } from '@insforge/sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!baseUrl || !anonKey) {
    console.error('Faltan variables de entorno: NEXT_PUBLIC_INSFORGE_URL o NEXT_PUBLIC_INSFORGE_ANON_KEY');
    process.exit(1);
}

const insforge = createClient({ baseUrl, anonKey });

async function testConnection() {
    console.log('--- Probando conexión a InsForge ---');
    console.log('Base URL:', baseUrl);

    // 1. Probar consulta a 'invoices'
    console.log('\n1. Consultando tabla "invoices"...');
    try {
        const { data: invoices, error: invError } = await insforge.database.from('invoices').select('*').limit(1);
        if (invError) {
            console.error('Error en "invoices":', JSON.stringify(invError, null, 2));
        } else {
            console.log('Éxito en "invoices". Filas encontradas:', invoices.length);
        }
    } catch (e: any) {
        console.error('Error crítico consultando "invoices":', e.message);
    }

    // 2. Probar consulta a 'clients'
    console.log('\n2. Consultando tabla "clients"...');
    try {
        const { data: clients, error: cliError } = await insforge.database.from('clients').select('*').limit(1);
        if (cliError) {
            console.error('Error en "clients":', JSON.stringify(cliError, null, 2));
        } else {
            console.log('Éxito en "clients". Filas encontradas:', clients.length);
        }
    } catch (e: any) {
        console.error('Error crítico consultando "clients":', e.message);
    }

    // 3. Probar consulta a 'projects'
    console.log('\n3. Consultando tabla "projects"...');
    try {
        const { data: projects, error: proError } = await insforge.database.from('projects').select('*').limit(1);
        if (proError) {
            console.error('Error en "projects":', JSON.stringify(proError, null, 2));
        } else {
            console.log('Éxito en "projects". Filas encontradas:', projects.length);
        }
    } catch (e: any) {
        console.error('Error crítico consultando "projects":', e.message);
    }
}

testConnection();
