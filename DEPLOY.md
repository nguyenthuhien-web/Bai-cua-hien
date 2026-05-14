# 🚀 Yên Hạ Blog - Deployment Guide

## ✅ Application Status

**Version:** 2.0 - Full CMS with Admin Panel  
**Status:** Production Ready ✨  
**Last Test:** All endpoints working ✓

---

## 📋 Tested Features

- ✅ **Homepage** - Loads 6 published posts from database
- ✅ **API Endpoints** - All CRUD operations working
  - `GET /api/posts` - List posts
  - `GET /api/posts/:slug` - Get single post
  - `POST /api/comments` - Submit comments
  - `GET /api/comments/:slug` - Get approved comments
  - `POST /api/orders` - Submit book orders
- ✅ **Admin Panel** - Fully functional
  - Login with password: `yenha2026`
  - Create/Edit/Delete posts
  - Dashboard with statistics
  - Markdown editor support
- ✅ **Database** - SQLite working
  - posts, comments, orders tables
  - Data persistence confirmed
- ✅ **Docker** - Dockerfile ready for deployment

---

## 🎯 One-Click Deployment

### Option 1: Render (Recommended)

**Click this link to deploy in 1 minute:**

```
https://render.com/deploy?repo=https://github.com/nguyenthuhien-web/Bai-cua-hien
```

1. Click link → Authorize GitHub → Deploy
2. Live URL: `https://yenha-blog.onrender.com`
3. Auto-deploys on every `git push`

---

### Option 2: Vercel

**Click this link:**

```
https://vercel.com/import/github?repo=nguyenthuhien-web/Bai-cua-hien
```

1. Import → Deploy → Done
2. Live URL: `https://yenha-blog.vercel.app`

---

### Option 3: Fly.io (CLI)

```bash
export FLYCTL_INSTALL="/Users/nguyenthuhien/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
flyctl launch
```

---

## 🔐 Admin Access

After deployment:
- URL: `https://[domain]/admin`
- Password: `yenha2026`
- Features:
  - Create/edit/delete posts
  - Manage comments (approve/delete)
  - View orders
  - Markdown editor for posts

---

## 📊 Default Data

6 pre-loaded posts:
1. "Chuyến tàu trưởng thành đã rời ga"
2. "Khoảnh khắc bạn nhận ra mình đã trưởng thành"
3. "Cô nhóc 18 tuổi và một triệu đồng"
4. "Mỗi cột mốc, một dấu vết âm thầm"
5. "Một đời bình thường"
6. "Nếu cuộc đời chỉ có 60 năm thì sao?"

---

## 🔧 Environment Variables

Production defaults (already set):
```
NODE_ENV=production
PORT=8000
SESSION_SECRET=yenha-blog-secret-2026
```

---

## 📁 File Structure

```
yenha-blog/
├── server/
│   ├── index.js (Express app)
│   ├── db.js (SQLite setup)
│   └── routes/
│       ├── api.js (Public API)
│       └── admin.js (Admin panel)
├── admin/views/ (EJS templates)
├── public/ (Frontend)
│   ├── index.html
│   ├── app.js
│   ├── comments.js
│   └── style.css
├── Dockerfile (Multi-stage build)
├── render.yaml (Render config)
├── package.json (Dependencies)
├── database.sqlite (SQLite DB)
└── DEPLOY.md (This file)
```

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
lsof -ti:8000 | xargs kill -9
npm start
```

**Database issues:**
```bash
rm database.sqlite*
npm start
```

**Dependencies missing:**
```bash
npm install
npm start
```

---

## ✨ Ready to Deploy!

Everything is tested and production-ready.  
Click the deployment link above and your blog will be live in 1-2 minutes! 🎉

**Support:** All features tested and working ✓
