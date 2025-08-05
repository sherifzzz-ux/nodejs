// Point d'entrée principal du backend Node.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Exemple de route API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
