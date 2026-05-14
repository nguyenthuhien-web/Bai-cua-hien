# 🚀 Hướng dẫn Deploy Yên Hạ Blog CMS

## Deploy lên Render (Miễn phí)

### Bước 1: Chuẩn bị
1. Đảm bảo code đã push lên GitHub: https://github.com/nguyenthuhien-web/Bai-cua-hien
2. Tạo tài khoản Render: https://render.com (dùng GitHub login)

### Bước 2: Tạo Web Service trên Render
1. Vào https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Chọn repo: `nguyenthuhien-web/Bai-cua-hien`
4. Điền thông tin:
   - **Name:** `yenha-blog` (hoặc tên khác)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Bước 3: Environment Variables
Thêm vào Render dashboard:
```
PORT=8000
SESSION_SECRET=your_random_secret_here
NODE_ENV=production
```

### Bước 4: Deploy
- Click **"Create Web Service"**
- Đợi ~2-3 phút
- Nhận link: `https://your-app-name.onrender.com`

---

## Cấu trúc Deploy

```
yenha-blog/
├── public/              # Frontend files
├── server/              # Backend (Express)
│   ├── index.js
│   ├── db.js
│   └── routes/
├── admin/               # Admin panel views
├── database.sqlite      # Auto-created
├── package.json
└── DEPLOYMENT.md
```

---

## Verify Deploy Thành Công

✅ Trang chủ: `https://your-app.onrender.com`
✅ Admin: `https://your-app.onrender.com/admin` (password: `yenha2026`)
✅ API: `https://your-app.onrender.com/api/posts`

---

## Chú ý

- **Database:** SQLite lưu trên Render (persistent)
- **Free tier:** Sleep sau 15 phút inactivity, wake up khi request
- **Để tránh sleep:** Upgrade lên Starter plan ($7/tháng)

---

**Render Documentation:** https://render.com/docs
