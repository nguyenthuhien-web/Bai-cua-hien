# 🐳 Deploy Yên Hạ Blog với Docker

## **Cách 1: Deploy lên Render (Khuyên - Miễn phí)**

### **Bước 1: Vào Render Dashboard**
1. Mở: https://dashboard.render.com
2. Login GitHub (click "Sign up" → "Continue with GitHub")

### **Bước 2: Tạo Web Service từ Docker**
1. Click **"+ New"** → **"Web Service"**
2. Chọn repo: `nguyenthuhien-web/Bai-cua-hien`
3. Render sẽ detect có `Dockerfile` và tự config:
   ```
   Runtime: Docker
   Build Command: (auto)
   Start Command: (auto)
   ```
4. Click **"Create Web Service"**
5. Chờ 3-5 phút build & deploy

✅ **URL sẽ là:** `https://yenha-blog.onrender.com`

---

## **Cách 2: Deploy Local (Test)**

### **Cần cài Docker trước:**
- **Mac/Windows:** https://www.docker.com/products/docker-desktop
- **Linux:** `sudo apt-get install docker.io`

### **Build Docker Image**
```bash
cd /Users/nguyenthuhien/Claude/yenha-blog

docker build -t yenha-blog:latest .
```

### **Run Container**
```bash
docker run -p 8000:8000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=secret123 \
  yenha-blog:latest
```

✅ **Truy cập:** http://localhost:8000

---

## **Cách 3: Deploy lên Railway (Nhanh nhất)**

### **Bước 1: Vào Railway.app**
1. https://railway.app
2. Login GitHub

### **Bước 2: Deploy Project**
1. Click **"New Project"** → **"Deploy from GitHub"**
2. Chọn repo: `nguyenthuhien-web/Bai-cua-hien`
3. Railway tự detect `Dockerfile`
4. Click **"Deploy"**

✅ **URL sẽ là:** `https://your-project.railway.app`

---

## **Cách 4: Deploy lên AWS (Miễn phí 12 tháng)**

1. https://aws.amazon.com/free
2. Use **ECS (Elastic Container Service)**
3. Push Docker image
4. Deploy container

---

## **Docker Commands**

### **Build:**
```bash
docker build -t yenha-blog .
```

### **Run:**
```bash
docker run -p 8000:8000 yenha-blog
```

### **Stop:**
```bash
docker stop <container_id>
```

### **View logs:**
```bash
docker logs <container_id>
```

---

## **Environment Variables (Production)**

```env
PORT=8000
NODE_ENV=production
SESSION_SECRET=your-secret-key-here
```

Render/Railway sẽ auto-set nếu bạn không specify.

---

## **Health Check**

Dockerfile có health check built-in:
```
HEALTHCHECK: Checks /api/posts every 30s
```

---

## **Verify Deploy Thành Công**

```bash
# Test homepage
curl https://your-domain.onrender.com

# Test API
curl https://your-domain.onrender.com/api/posts

# Test admin login
curl -X POST https://your-domain.onrender.com/admin/login \
  -d "password=yenha2026"
```

---

**Khuyên:** Dùng **Render** hoặc **Railway** - vừa dễ vừa nhanh! 🚀
