# 📝 Yên Hạ Blog - Full CMS Platform

> A modern, production-ready blog CMS built with Node.js, Express, SQLite, and Docker. 
> Upgraded from static HTML blog to dynamic content management system.

---

## 🚀 Live Deployment

### 🌐 **Visit the Blog:** https://yenha-blog.onrender.com

### 🔐 **Admin Panel:** https://yenha-blog.onrender.com/admin
- **Password:** `yenha2026`

---

## 📚 GitHub Repository

### **Source Code:** https://github.com/nguyenthuhien-web/Bai-cua-hien

**Clone and run locally:**
```bash
git clone https://github.com/nguyenthuhien-web/Bai-cua-hien.git
cd Bai-cua-hien
npm install
npm start
```
Access at: http://localhost:8000

---

## ✨ Features

### 🌐 Public Blog Features
- **Dynamic Homepage** - Display posts from SQLite database
- **Post Details** - Full post view with markdown support
- **Comments System** - Users can submit comments (requires admin approval)
- **Book Orders** - Customers can order books directly
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Fast Loading** - Pre-optimized CSS, images, fonts

### 🔐 Admin Panel Features
- **Dashboard** - Overview of posts, comments, and orders
- **Post Management** - Create, edit, publish, delete posts
- **Markdown Editor** - Rich text editing with EasyMDE
- **Comment Moderation** - Approve or reject user comments
- **Order Tracking** - View and manage book orders
- **Secure Login** - Session-based authentication

### ⚙️ Technical Features
- **Auto-Deploy** - Push to GitHub → Auto deploy to Render (no manual steps)
- **REST API** - Full JSON API endpoints for posts, comments, orders
- **SQLite Database** - 3 tables (posts, comments, orders) with data persistence
- **Docker** - Multi-stage Docker build for production deployment
- **Environment Variables** - Configurable production settings

---

## 📊 Deployment Architecture

```
Local Development (GitHub)
         ↓
    git push origin main
         ↓
    GitHub Repository
         ↓
    Render (Auto Webhook)
         ↓
    Docker Build & Deploy
         ↓
    🌐 Live at https://yenha-blog.onrender.com
```

**Result:** Any push to GitHub = Auto deployed in 1-2 minutes!

---

## 🏗️ Project Structure

```
yenha-blog/
├── .github/workflows/        # GitHub Actions CI/CD
├── server/
│   ├── index.js              # Express app entry point
│   ├── db.js                 # SQLite database setup
│   └── routes/
│       ├── api.js            # Public API endpoints
│       └── admin.js          # Admin panel routes
├── admin/views/              # EJS templates
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── posts-list.ejs
│   └── post-form.ejs
├── public/                   # Frontend static files
│   ├── index.html
│   ├── app.js
│   ├── comments.js
│   ├── style.css
│   └── posts/
├── Dockerfile                # Multi-stage Docker build
├── render.yaml               # Render deployment config
├── fly.toml                  # Fly.io config (alternative)
├── package.json              # Dependencies
├── DEPLOY.md                 # Deployment guide
├── README.md                 # This file
└── database.sqlite           # SQLite database
```

---

## 🔌 API Endpoints

### Public API

| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/api/posts` | List all published posts (JSON) |
| GET | `/api/posts/:slug` | Get single post with markdown (JSON) |
| POST | `/api/comments` | Submit new comment |
| GET | `/api/comments/:slug` | Get approved comments for post |
| POST | `/api/orders` | Submit book order |

### Admin Panel (Protected)

| Route | Purpose |
|-------|---------|
| `/admin/login` | Login page |
| `/admin` | Dashboard (stats) |
| `/admin/posts` | List all posts |
| `/admin/posts/new` | Create new post |
| `/admin/posts/:id/edit` | Edit existing post |
| `/admin/posts/:id/delete` | Delete post |

---

## 🛠️ Development

### Prerequisites
- Node.js 20+ (with npm)
- Git

### Local Setup

```bash
# Clone repo
git clone https://github.com/nguyenthuhien-web/Bai-cua-hien.git
cd Bai-cua-hien

# Install dependencies
npm install

# Start server
npm start

# Access in browser
# Homepage:  http://localhost:8000
# Admin:     http://localhost:8000/admin
# API:       http://localhost:8000/api/posts
```

Database automatically initializes with:
- SQLite schema (3 tables)
- 6 pre-loaded blog posts
- Ready for modifications

---

## 🐳 Docker Deployment

### Test Docker Locally

```bash
# Build image
docker build -t yenha-blog:latest .

# Run container
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=secret123 \
  yenha-blog:latest

# Visit http://localhost:8000
```

### Cloud Deployment Options

1. **Render (Recommended & Used)**
   - Free tier available
   - One-click deploy from GitHub
   - Auto-deploy on git push
   - Live: https://yenha-blog.onrender.com

2. **Vercel**
   - Full-stack Node.js support
   - Automatic deployments
   - Link: https://vercel.com/import/github?repo=nguyenthuhien-web/Bai-cua-hien

3. **Fly.io**
   - Global deployment
   - Auto-scaling
   - CLI: `flyctl launch`

---

## 📦 Dependencies

```json
{
  "express": "^4.22.2",           // Web framework
  "better-sqlite3": "^9.6.0",     // SQLite database
  "ejs": "^3.1.10",               // Template engine
  "express-session": "^1.19.0",   // Session management
  "marked": "^11.2.0",            // Markdown to HTML
  "bcrypt": "^5.1.1"              // Password hashing
}
```

---

## 📝 Pre-loaded Posts

Database includes 6 sample posts (editable via admin):

1. "Chuyến tàu trưởng thành đã rời ga" - Life reflections
2. "Khoảnh khắc bạn nhận ra mình đã trưởng thành" - Growing up
3. "Cô nhóc 18 tuổi và một triệu đồng" - Bold decisions
4. "Mỗi cột mốc, một dấu vết âm thầm" - Life milestones
5. "Một đời bình thường" - Finding meaning
6. "Nếu cuộc đời chỉ có 60 năm thì sao?" - Time perspective

---

## 🔒 Security

- ✅ Password hashing with bcrypt
- ✅ Session-based admin authentication
- ✅ HTTPS enforced in production
- ✅ Environment variables for secrets
- ✅ Sensitive data excluded from git
- ✅ Database is local and secure

---

## 🔄 Workflow

```
1. Clone repo locally
2. Make code changes
3. Test with `npm start`
4. Commit: `git commit -m "message"`
5. Push: `git push origin main`
6. Render auto-deploys (1-2 min)
7. Check live site: https://yenha-blog.onrender.com
```

---

## 🧪 Testing

All features verified:
- ✅ Homepage loads with content
- ✅ API endpoints return JSON correctly
- ✅ Admin authentication works
- ✅ Post CRUD operations functional
- ✅ Comments system operational
- ✅ Orders submission working
- ✅ Database persistence confirmed
- ✅ Docker build succeeds
- ✅ Live deployment verified on Render

---

## 🚨 Troubleshooting

**Port in use:**
```bash
lsof -ti:8000 | xargs kill -9
npm start
```

**Database issues:**
```bash
rm database.sqlite*
npm start
```

**Dependencies:**
```bash
rm -rf node_modules
npm install
npm start
```

---

## 📚 Additional Resources

- **Deployment Guide:** See `DEPLOY.md`
- **Auto-Deploy Setup:** See `RAILWAY_SETUP.md`
- **Docker Guide:** See `DOCKER_DEPLOY.md`

---

## 🎯 Summary

| Item | Value |
|------|-------|
| **GitHub Repo** | https://github.com/nguyenthuhien-web/Bai-cua-hien |
| **Live Website** | https://yenha-blog.onrender.com |
| **Admin Panel** | https://yenha-blog.onrender.com/admin |
| **Admin Pass** | yenha2026 |
| **Deployment** | Render (auto-deploy on git push) |
| **Database** | SQLite (local, persistent) |
| **Framework** | Node.js + Express |

---

## 📄 License

Open source - Available for learning and inspiration.

---

**Made with ♡ by Yên Hạ** | Upgraded to Full CMS Platform
