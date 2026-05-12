import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const ADMIN_PASSWORD_HASH = await bcrypt.hash('yenha2026', 10);
const ADMIN_PASSWORD = 'yenha2026';

const requireAuth = (req, res, next) => {
  if (req.session.adminAuth) {
    return next();
  }
  res.redirect('/admin/login');
};

// GET /admin/login
router.get('/login', (req, res) => {
  res.render('login');
});

// POST /admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.adminAuth = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Password incorrect' });
  }
});

// GET /admin/logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// GET /admin - dashboard
router.get('/', requireAuth, (req, res) => {
  try {
    const postCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
    const commentCount = db.prepare('SELECT COUNT(*) as count FROM comments WHERE approved = 0').get().count;
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;

    res.render('dashboard', { postCount, commentCount, orderCount });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /admin/posts - danh sách bài viết
router.get('/posts', requireAuth, (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT id, title, slug, date, published, created_at
      FROM posts
      ORDER BY created_at DESC
    `).all();

    res.render('posts-list', { posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /admin/posts/new - form tạo bài mới
router.get('/posts/new', requireAuth, (req, res) => {
  res.render('post-form', { post: null });
});

// POST /admin/posts - tạo bài mới
router.post('/posts', requireAuth, (req, res) => {
  try {
    const { title, date, category, excerpt, content, thumbnail_url, published } = req.body;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    db.prepare(`
      INSERT INTO posts (title, slug, date, category, excerpt, content, thumbnail_url, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, date, category, excerpt, content, thumbnail_url, published ? 1 : 0);

    res.redirect('/admin/posts');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /admin/posts/:id/edit - form sửa bài
router.get('/posts/:id/edit', requireAuth, (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);

    if (!post) return res.status(404).send('Post not found');

    res.render('post-form', { post });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST /admin/posts/:id - cập nhật bài
router.post('/posts/:id', requireAuth, (req, res) => {
  try {
    const { title, date, category, excerpt, content, thumbnail_url, published } = req.body;

    db.prepare(`
      UPDATE posts
      SET title = ?, date = ?, category = ?, excerpt = ?, content = ?, thumbnail_url = ?, published = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, date, category, excerpt, content, thumbnail_url, published ? 1 : 0, req.params.id);

    res.redirect('/admin/posts');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST /admin/posts/:id/delete - xóa bài
router.post('/posts/:id/delete', requireAuth, (req, res) => {
  try {
    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    res.redirect('/admin/posts');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
