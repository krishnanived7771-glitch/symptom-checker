import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllSymptoms, predictTop3 } from './src/utils/repoPredictor.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'medicore-backend' });
  });

  // GET /api/symptoms (identical to Flask app.py in repo)
  app.get('/api/symptoms', (_req, res) => {
    try {
      const items = getAllSymptoms();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Internal error' });
    }
  });

  // POST /api/predict (identical to Flask app.py in repo)
  app.post('/api/predict', (req, res) => {
    const data = req.body || {};
    const selected = data.symptoms;

    if (!Array.isArray(selected) || selected.length === 0) {
      return res.status(400).json({ error: "Send a non-empty list called 'symptoms'." });
    }

    try {
      const result = predictTop3(selected);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || 'Prediction failed' });
    }
  });

  // Mount Vite middleware for dev mode or serve dist in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediCore full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
