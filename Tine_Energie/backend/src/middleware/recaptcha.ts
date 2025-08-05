import { Request, Response, NextFunction } from 'express';

export default async function verifyRecaptcha(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.body.recaptchaToken;
    if (!token) {
      res.status(400).json({ error: 'Missing reCAPTCHA token' });
      return;
    }

    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      res.status(500).json({ error: 'reCAPTCHA secret not configured' });
      return;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    if (!data.success) {
      res.status(400).json({ error: 'Invalid reCAPTCHA token' });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
}
