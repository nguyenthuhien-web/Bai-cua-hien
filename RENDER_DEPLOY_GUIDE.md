# 🚀 Deploy Yên Hạ Blog lên Render - Chi tiết từng bước

## **Video hướng dẫn:** 
Xem video này nếu muốn hiểu rõ hơn:
👉 https://www.youtube.com/watch?v=ZMr_eMWwArE (Render deployment với Node.js)

---

## **CÁCH 1: Deploy nhanh (Khuyên dùng) - 5 phút**

### **Bước 1️⃣: Vào Render**
1. Mở: https://dashboard.render.com
2. Nếu chưa login:
   - Click **"Sign up"**
   - Chọn **"Continue with GitHub"**
   - Authorize (cho phép Render access GitHub)

### **Bước 2️⃣: Tạo Web Service**
1. Click **"+ New"** (nút màu xanh)
2. Chọn **"Web Service"**

![Step 1]
```
┌─────────────────────────────────┐
│  + New      ▼                   │
├─────────────────────────────────┤
│ • Web Service                   │
│ • Static Site                   │
│ • PostgreSQL                    │
│ • Redis                         │
└─────────────────────────────────┘
```

### **Bước 3️⃣: Kết nối GitHub Repo**

Một list repo sẽ hiện ra. Tìm & chọn:
- **`nguyenthuhien-web/Bai-cua-hien`**

Nếu không thấy:
- Click **"Connect account"** → Re-authorize GitHub

### **Bước 4️⃣: Điền Form**

```
┌─────────────────────────────────────────┐
│ Name                                    │
│ [yenha-blog________________________]    │
│                                         │
│ Environment                             │
│ [Node ▼]                                │
│                                         │
│ Build Command                           │
│ [npm install_____________________]     │
│                                         │
│ Start Command                           │
│ [npm start_______________________]     │
│                                         │
│ Plan                                    │
│ [Free ▼] (recommended)                  │
│                                         │
│ Instances: 1                            │
│ Memory: 512 MB                          │
│                                         │
│ [Create Web Service] (nút xanh)        │
└─────────────────────────────────────────┘
```

**Đảm bảo:**
- ✅ Name: `yenha-blog`
- ✅ Environment: `Node`
- ✅ Build: `npm install`
- ✅ Start: `npm start`
- ✅ Plan: `Free`

### **Bước 5️⃣: Click "Create Web Service"**

Render sẽ:
1. Clone repo từ GitHub
2. Run `npm install` (1-2 phút)
3. Start server
4. Gán URL: `https://yenha-blog.onrender.com`

**Chờ khoảng 2-3 phút...**

```
Status: Building...
Status: Deploying...
Status: Live ✅
```

### **Bước 6️⃣: Verify Website Live**

Khi status = **"Live"**, truy cập:

1. **Trang chủ:** 
   ```
   https://yenha-blog.onrender.com
   ```
   Nên thấy blog với 6 bài viết

2. **Admin Panel:**
   ```
   https://yenha-blog.onrender.com/admin
   ```
   - Username: (không cần)
   - Password: `yenha2026`
   - Click "Đăng nhập"

3. **API:**
   ```
   https://yenha-blog.onrender.com/api/posts
   ```
   Nên thấy JSON với danh sách posts

---

## **CÁCH 2: Deploy từ render.yaml (Auto Config)**

Nếu muốn auto-detect config:

1. Vào: https://dashboard.render.com
2. Click **"+ New"** → **"Web Service"**
3. Chọn repo
4. Render sẽ tự detect `render.yaml` file
5. Click **"Create"**

---

## **🔧 Troubleshooting**

### **❌ "Build failed"**
- Check Build Logs tab
- Đảm bảo `package.json` tồn tại
- Thử re-deploy (redeploy từ Deployments tab)

### **❌ "Cannot GET /"**
- Server running nhưng static files không serve
- Fix: Đảm bảo `public/` folder có `index.html`

### **❌ Admin login không được**
- Database chưa khởi tạo
- Thử reload page
- Check browser console (F12) xem có lỗi không

### **❌ Free tier quá chậm**
- Free Render auto-sleep sau 15 phút inactivity
- Upgrade lên **Starter** ($7/tháng) để không sleep

---

## **📊 Sau khi Deploy**

### ✅ **Sản phẩm Live:**
- **URL:** `https://yenha-blog.onrender.com`
- **Admin:** `/admin` (password: `yenha2026`)
- **Database:** SQLite (tự động tạo)

### 📝 **Quản lý Blog:**
1. Vào `/admin` → Login
2. Dashboard: Xem thống kê
3. **Quản lý bài viết:**
   - Tạo bài mới (Markdown editor)
   - Sửa bài
   - Xóa bài
   - Publish/Draft

4. **Comments & Orders:** Lưu vào database

### 🌐 **Chia sẻ:**
- Gửi link: `https://yenha-blog.onrender.com`
- Bất kỳ ai cũng truy cập được
- Data chia sẻ trên server (không phải localStorage)

---

## **⏱️ Thời gian Deploy**

| Bước | Thời gian |
|------|-----------|
| Authorize GitHub | 30s |
| Select repo | 30s |
| Fill form | 2 phút |
| Build (`npm install`) | 1-2 phút |
| Start server | 30s |
| **Total** | **~5 phút** |

---

## **🎯 Success Checklist**

- ✅ GitHub repo: `nguyenthuhien-web/Bai-cua-hien`
- ✅ Render status: **Live** (xanh)
- ✅ Trang chủ load thành công
- ✅ Admin `/admin` đăng nhập được
- ✅ API `/api/posts` trả về JSON
- ✅ Database tạo thành công
- ✅ Comments/Orders lưu vào database

---

**Khi hoàn tất, gửi link live: `https://yenha-blog.onrender.com` cho bạn bè! 🎉**
