import express from 'express';
import db from '../db.js';
import { marked } from 'marked';

const router = express.Router();

// GET /api/posts - danh sách bài đã xuất bản
router.get('/posts', (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT id, title, slug, date, category, excerpt, thumbnail_url
      FROM posts
      WHERE published = 1
      ORDER BY date DESC
    `).all();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:slug - chi tiết bài viết
router.get('/posts/:slug', (req, res) => {
  try {
    const post = db.prepare(`
      SELECT *
      FROM posts
      WHERE slug = ? AND published = 1
    `).get(req.params.slug);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    const html = marked(post.content);
    res.json({ ...post, contentHtml: html });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/comments - gửi comment mới
router.post('/comments', (req, res) => {
  try {
    const { postSlug, name, email, text } = req.body;

    if (!postSlug || !name || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = db.prepare(`
      INSERT INTO comments (post_slug, name, email, text, approved)
      VALUES (?, ?, ?, ?, 0)
    `).run(postSlug, name, email || null, text);

    res.json({ id: result.lastInsertRowid, message: 'Comment submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/comments/:slug - lấy comments đã approved
router.get('/comments/:slug', (req, res) => {
  try {
    const comments = db.prepare(`
      SELECT id, name, text, created_at
      FROM comments
      WHERE post_slug = ? AND approved = 1
      ORDER BY created_at DESC
    `).all(req.params.slug);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders - đặt sách
router.post('/orders', (req, res) => {
  try {
    const { bookTitle, name, email, phone, quantity, notes } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = db.prepare(`
      INSERT INTO orders (book_title, name, email, phone, quantity, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(bookTitle || null, name, email || null, phone || null, quantity || 1, notes || null);

    res.json({ id: result.lastInsertRowid, message: 'Order submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
