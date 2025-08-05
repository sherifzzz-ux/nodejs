import { Router } from 'express';
import { sendEmail } from '../utils/email';
import { clientMessage, adminMessage } from '../templates/message';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email } = req.body as { name: string; email: string };

  try {
    const client = clientMessage(name);
    await sendEmail({
      to: email,
      subject: 'Votre message a été reçu',
      ...client,
    });

    const admin = adminMessage(name);
    const adminEmail = process.env.ADMIN_EMAIL || email;
    await sendEmail({
      to: adminEmail,
      subject: 'Nouveau message',
      ...admin,
    });

    res.json({ status: 'sent' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to send email' });
  }
});

export default router;
