import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { body, validationResult } from 'express-validator';
import verifyRecaptcha from './middleware/recaptcha';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

const csrfProtection = csrf({ cookie: true });

app.get('/api/hello', csrfProtection, (_req, res) => {
  res.json({ message: 'Hello from TypeScript backend!' });
});

app.post(
  '/api/hello',
  csrfProtection,
  verifyRecaptcha,
  body('name').isString().trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: `Hello ${req.body.name} from TypeScript backend!` });
  }
);

app.use(errorHandler);

export default app;
