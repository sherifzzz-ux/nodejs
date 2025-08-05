export const clientQuotation = (name: string) => ({
  text: `Bonjour ${name},\nMerci pour votre demande de devis.`,
  html: `<p>Bonjour ${name},</p><p>Merci pour votre demande de devis.</p>`,
});

export const adminQuotation = (name: string) => ({
  text: `Nouvelle demande de devis de ${name}.`,
  html: `<p>Nouvelle demande de devis de <strong>${name}</strong>.</p>`,
});
