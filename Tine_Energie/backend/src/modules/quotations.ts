import { Router } from 'express';
import { sendEmail } from '../utils/email';
import { clientQuotation, adminQuotation } from '../templates/quotation';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email } = req.body as { name: string; email: string };

  try {
    const client = clientQuotation(name);
    await sendEmail({
      to: email,
      subject: 'Votre demande de devis',
      ...client,
    });

    const admin = adminQuotation(name);
    const adminEmail = process.env.ADMIN_EMAIL || email;
    await sendEmail({
      to: adminEmail,
      subject: 'Nouvelle demande de devis',
      ...admin,
    });

    res.json({ status: 'sent' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to send email' });
  }
});

export default router;
