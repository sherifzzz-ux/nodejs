export const clientMessage = (name: string) => ({
  text: `Bonjour ${name},\nNous avons bien reçu votre message.`,
  html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message.</p>`,
});

export const adminMessage = (name: string) => ({
  text: `Nouveau message de ${name}.`,
  html: `<p>Nouveau message de <strong>${name}</strong>.</p>`,
});
