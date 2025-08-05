import { Router, Request, Response } from 'express';

export interface Message {
  name: string;
  email: string;
  content: string;
  date: string;
}

const messages: Message[] = [];
const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { name, email, content, captcha } = req.body as {
    name?: string;
    email?: string;
    content?: string;
    captcha?: string;
  };

  const expectedCaptcha = process.env.CAPTCHA_SECRET || '42';
  if (captcha !== expectedCaptcha) {
    return res.status(400).json({ error: 'Invalid captcha' });
  }

  if (!name || !email || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const message: Message = { name, email, content, date: new Date().toISOString() };
  messages.push(message);
  return res.status(201).json({ success: true });
});

router.get('/', (req: Request, res: Response) => {
  const adminToken = process.env.ADMIN_TOKEN;
  const token = req.headers['x-admin-token'] as string | undefined;
  if (adminToken && token !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json(messages);
});

export default router;
