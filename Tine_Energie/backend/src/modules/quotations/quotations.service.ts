export interface Quotation {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

let quotations: Quotation[] = [];
let currentId = 1;

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    return false;
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (_err) {
    return false;
  }
}

export async function createQuotation(data: { name: string; email: string; message: string }): Promise<Quotation> {
  const quotation: Quotation = {
    id: currentId++,
    status: 'pending',
    ...data,
  };

  quotations.push(quotation);
  return quotation;
}

export async function listQuotations(): Promise<Quotation[]> {
  return quotations;
}

export async function updateQuotationStatus(id: number, status: Quotation['status']): Promise<Quotation | undefined> {
  const quotation = quotations.find((q) => q.id === id);
  if (quotation) {
    quotation.status = status;
  }
  return quotation;
}
