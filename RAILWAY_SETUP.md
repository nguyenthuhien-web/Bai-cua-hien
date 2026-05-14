# 🚀 Railway Auto-Deploy Setup

## **3 bước để Deploy Tự Động**

### **BƯỚC 1: Lấy Railway Token**

1. Vào: https://railway.app/dashboard
2. Click góc phải trên → **"Account"** → **"Tokens"**
3. Click **"Create Token"**
4. Copy token (dạng: `rw_xxx...`)
5. Giữ nó (cần ngay)

---

### **BƯỚC 2: Lấy Project ID**

1. Ở Railway Dashboard
2. Vào project `Bai-cua-hien` (nếu có)
3. Hoặc tạo project mới:
   - Click **"+ New Project"**
   - Chọn **"Deploy from GitHub repo"**
   - Select: `nguyenthuhien-web/Bai-cua-hien`
4. Copy **Project ID** từ URL hoặc Settings

---

### **BƯỚC 3: Setup GitHub Secrets**

1. Vào: https://github.com/nguyenthuhien-web/Bai-cua-hien
2. Click **"Settings"** tab
3. Sidebar: **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**

**Thêm 2 secrets:**

#### Secret 1:
```
Name: RAILWAY_TOKEN
Value: (paste token từ bước 1)
```
Click "Add secret"

#### Secret 2:
```
Name: RAILWAY_PROJECT_ID
Value: (paste project ID từ bước 2)
```
Click "Add secret"

---

## **XONG! Auto-Deploy Sẽ Hoạt Động**

Bây giờ, mỗi khi bạn push code lên GitHub:

```bash
git push origin main
```

GitHub Actions sẽ **tự động deploy** lên Railway! ✅

---

## **Verify Deploy**

Cách 1: Check GitHub
- Vào repo → **"Actions"** tab
- Xem status deploy

Cách 2: Check Railway
- Vào https://railway.app/dashboard
- Xem deployments

---

## **Troubleshooting**

### **Deploy failed?**
1. Check GitHub Actions logs (Actions tab)
2. Verify Railway token có effect không
3. Re-run workflow

### **Railway project không create?**
- Tạo manual ở https://railway.app
- Get project ID
- Add vào GitHub secrets

---

## **Manual Deploy (Nếu GitHub Actions fail)**

```bash
# Cài Railway CLI
npm install -g @railway/cli

# Login Railway
railway login

# Link project
railway link

# Deploy
railway up
```

---

**Sau khi setup xong, chỉ cần `git push` → tự động deploy! 🚀**
