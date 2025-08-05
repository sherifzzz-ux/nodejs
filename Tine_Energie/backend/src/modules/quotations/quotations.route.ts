import { Router } from 'express';
import {
  createQuotation,
  listQuotations,
  updateQuotationStatus,
  verifyRecaptcha,
} from './quotations.service';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;
  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const recaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaValid) {
    return res.status(400).json({ error: 'Invalid reCAPTCHA token' });
  }

  const quotation = await createQuotation({ name, email, message });
  res.status(201).json(quotation);
});

router.get('/', async (_req, res) => {
  const quotations = await listQuotations();
  res.json(quotations);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const quotation = await updateQuotationStatus(id, status);
  if (!quotation) {
    return res.status(404).json({ error: 'Quotation not found' });
  }

  res.json(quotation);
});

export default router;
