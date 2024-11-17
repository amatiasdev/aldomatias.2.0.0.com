// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabaseClient'; // Asegúrate de tener una instancia configurada en este archivo

export async function POST(request: NextRequest) {
  const { name, company, email, message } = await request.json();

    // Intentar obtener la IP del usuario desde la cabecera 'x-forwarded-for'
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'IP no disponible';

  // Guardar los datos en Supabase
  const { error } = await supabase.from('contact_messages').insert({
    name,
    company,
    email,
    message,
    ip_address: ip,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
  
  return NextResponse.json({ message: 'Message saved successfully' }, { status: 200 });
}
