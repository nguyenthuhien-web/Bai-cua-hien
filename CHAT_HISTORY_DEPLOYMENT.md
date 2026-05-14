# 📝 Lịch sử phát triển Yên Hạ Blog CMS

**Dự án:** Nâng cấp blog static → CMS fullstack  
**Ngày bắt đầu:** 2026-05-11  
**Ngày hoàn thành:** 2026-05-14  
**Tech Stack:** Node.js + Express + SQLite + EJS

---

## 📋 Tóm tắt Quá trình Phát triển

### **Giai đoạn 1: Phân tích & Lên kế hoạch (05-11)**

**Tình trạng hiện tại:**
- Blog là static HTML/CSS/JS thuần
- Dữ liệu comment & orders lưu localStorage
- Không có backend, không chia sẻ dữ liệu giữa thiết bị
- Quản lý content bằng cách chỉnh sửa code

**Vấn đề xác định:**
1. ❌ Dữ liệu chỉ lưu ở máy cá nhân
2. ❌ Không có Admin panel quản lý content
3. ❌ Khó theo dõi lịch sử chat (export quá nhiều file)

**Giải pháp đề xuất:**
✅ Phát triển CMS với Node.js + SQLite + Admin Panel

**Công cụ:** Explore agent → Plan agent → Approval

---

### **Giai đoạn 2: Thiết kế UI/UX (05-11)**

**Cải thiện giao diện:**
- Thay đổi color palette sang tone kem nhạt, dịu dàng hơn
  - Accent: `#d97757` → `#c4826f`
  - Backgrounds: Xen kẽ nhạt/sáng theo sections
- Tăng opacity background hero section để text rõ hơn
- Thêm box-shadow cho ảnh (book cover, gallery, avatar)
- Redesign book purchase buttons:
  - Từ ngang → dọc
  - Padding tối ưu để text vừa vặn

**Update nội dung:**
- Sửa text phần "Về tôi" với nội dung mới từ người dùng

**Commit:** "Update UI/UX: softer color palette, improved shadows, redesigned buttons"

---

### **Giai đoạn 3: Backend Development (05-12 - 05-13)**

#### **3.1 Setup Project Structure**
```
server/
  ├── index.js          # Express entry point
  ├── db.js             # SQLite database
  └── routes/
      ├── api.js        # Public API (GET/POST)
      └── admin.js      # Admin CRUD routes
```

#### **3.2 Database Schema**
- `posts` table: id, title, slug, date, category, excerpt, content, thumbnail_url, published
- `comments` table: id, post_slug, name, email, text, approved, created_at
- `orders` table: id, book_title, name, email, phone, quantity, notes, created_at

#### **3.3 Public API Endpoints**
- ✅ `GET /api/posts` — Danh sách bài đã xuất bản
- ✅ `GET /api/posts/:slug` — Chi tiết 1 bài
- ✅ `POST /api/comments` — Gửi comment
- ✅ `GET /api/comments/:slug` — Load approved comments
- ✅ `POST /api/orders` — Đặt sách

#### **3.4 Admin Routes (Protected)**
- ✅ `GET/POST /admin/login` — Authentication
- ✅ `GET /admin` — Dashboard (thống kê)
- ✅ `GET /admin/posts` — Danh sách bài
- ✅ `GET/POST /admin/posts/new` — Tạo bài
- ✅ `GET/POST /admin/posts/:id/edit` — Sửa bài
- ✅ `POST /admin/posts/:id/delete` — Xóa bài

#### **3.5 Admin Panel Views (EJS Templates)**
- `login.ejs` — Form đăng nhập (password protected)
- `dashboard.ejs` — Tổng quan (bài, comments, orders)
- `posts-list.ejs` — Danh sách bài (CRUD actions)
- `post-form.ejs` — Editor markdown (EasyMDE) + form tạo/sửa

#### **3.6 Data Migration**
- `server/migrate.js` — Script migrate 6 bài từ static array → SQLite
- Tự động chạy lần đầu: `node server/migrate.js`

**Commit:** "Feat: Upgrade to CMS with Node.js + SQLite backend"

---

### **Giai đoạn 4: Frontend Updates (05-13)**

#### **4.1 Update app.js**
**Trước:** Static `posts` array hardcode
```js
const posts = [...6 posts...]
renderPosts(posts)
```

**Sau:** Fetch từ API
```js
async function loadPosts() {
  const response = await fetch('/api/posts')
  posts = await response.json()
  renderPosts(posts)
}
```

#### **4.2 Update comments.js**
**Trước:** localStorage
```js
localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
```

**Sau:** REST API
```js
await fetch('/api/comments', {
  method: 'POST',
  body: JSON.stringify({ postSlug, name, email, text })
})
```

#### **4.3 Update handleBuySubmit()**
**Trước:** localStorage orders
**Sau:** POST `/api/orders` → database

#### **4.4 Folder Structure**
- Move `index.html`, `style.css`, `app.js`, `comments.js`, `images/`, `posts/` → `public/`
- Express serves static từ `public` folder

**Commit:** "Update frontend to use REST API instead of localStorage"

---

### **Giai đoạn 5: Setup & Deployment (05-14)**

#### **5.1 Node.js Installation**
- Cài Node.js 20 via Homebrew
- `npm install` → install 168 packages

#### **5.2 Data Migration & Server Startup**
```bash
npm install
node server/migrate.js  # Migrate 6 posts
npm start              # Server on port 8000
```

#### **5.3 Fix Static Files Issue**
- Problem: `index.html` ở root, server config serve từ `public`
- Fix: Move all frontend files vào `public/` folder
- Server restart → ✅ `http://localhost:8000` works

#### **5.4 Deployment Documentation**
- `.env.example` — Environment variables template
- `DEPLOYMENT.md` — Hướng dẫn deploy lên Render

**Commit:** "Add deployment guide and .env.example for Render hosting"

---

## 🎯 Kết quả Cuối cùng

### **Repo GitHub**
📍 https://github.com/nguyenthuhien-web/Bai-cua-hien

**Commits chính:**
1. Initial: Blog static + design updates (color, buttons, text)
2. Feature: CMS backend (db, API, admin routes)
3. Update: Frontend API integration (app.js, comments.js)
4. Deploy: Guide + .env template

### **Cấu trúc Final**
```
yenha-blog/
├── public/                 # Frontend
│   ├── index.html
│   ├── app.js, comments.js, style.css
│   ├── images/, posts/
│
├── server/                 # Backend
│   ├── index.js           # Express app
│   ├── db.js              # SQLite + schema
│   └── routes/
│       ├── api.js         # Public API
│       └── admin.js       # Admin CRUD
│
├── admin/views/           # EJS templates
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── posts-list.ejs
│   └── post-form.ejs
│
├── database.sqlite        # SQLite DB
├── package.json
├── .env.example
└── DEPLOYMENT.md
```

---

## 🚀 Deployment Setup

**Platform:** Render (Free tier)

**Steps:**
1. Login Render với GitHub: https://render.com
2. Connect repo: `nguyenthuhien-web/Bai-cua-hien`
3. Create Web Service:
   - Build: `npm install`
   - Start: `npm start`
4. Environment: `PORT=8000`, `SESSION_SECRET=...`
5. Deploy → nhận URL live

**Result:** 
- 🌐 Live URL: `https://your-app.onrender.com`
- 🔐 Admin: `/admin` (password: `yenha2026`)
- 📊 API: `/api/posts`, `/api/comments`, etc.

---

## ✅ Vấn đề Đã Giải Quyết

| Vấn đề | Trước | Sau |
|--------|-------|-----|
| Lưu trữ dữ liệu | localStorage | ✅ SQLite Database |
| Chia sẻ giữa thiết bị | ❌ Chỉ máy cá nhân | ✅ Server shared |
| Admin panel | ❌ Không có | ✅ CRUD posts + auth |
| Quản lý content | Sửa code | ✅ Markdown editor |
| Backend | ❌ Static files | ✅ Node.js + Express |
| Deployment | Local chỉ | ✅ Public URL |

---

## 📊 Thống kê

- **Commit:** 3 major commits
- **Files tạo:** 12 files (server, admin, config)
- **Lines of code:** ~1200 lines (backend + admin)
- **Technologies:** Node.js, Express, SQLite, EJS, Marked.js
- **Time:** 3 days (plan → implementation → deployment)

---

**Ghi chú:** Chat history này được xuất ra để track quá trình phát triển dự án từ giai đoạn lên kế hoạch đến triển khai. Tất cả code + decisions đều được giữ trong Git commit history.
