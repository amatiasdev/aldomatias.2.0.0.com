import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, company, email, message, ipAddress } = req.body;

    // Inserta el mensaje en la base de datos de Supabase
    const { error } = await supabase.from('contact_messages').insert([
      {
        name,
        company,
        email,
        message,
        ip_address: ipAddress,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: 'Error saving message' });
    }

    return res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
