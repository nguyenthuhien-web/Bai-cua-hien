import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from './db.js';
import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'admin', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'yenha-blog-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(fs.readFileSync(indexPath, 'utf8'));
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  // For other paths, try to serve as static, fallback to index.html
  res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8'));
});

app.listen(PORT, () => {
  console.log(`🚀 Yên Hạ Blog running on http://localhost:${PORT}`);
  console.log(`📝 Admin panel: http://localhost:${PORT}/admin`);
});

export default app;
