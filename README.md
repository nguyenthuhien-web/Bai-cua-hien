# Yên Hạ Blog — Web App

Đây là một blog cá nhân đã được nâng cấp thành web app với các tính năng tương tác.

## ✨ Tính năng mới

### 1. 🔍 Tìm kiếm bài viết
- Tìm kiếm theo tiêu đề hoặc nội dung bài viết
- Gõ vào ô tìm kiếm trên trang "Bài viết"
- Kết quả được cập nhật realtime

### 2. 💬 Bình luận
- Mỗi bài viết đều có phần bình luận ở cuối
- Để lại bình luận với tên, email và nội dung
- Bình luận được lưu trữ trong trình duyệt (localStorage)
- Chế độ moderator: Để lại bình luận sẽ chờ duyệt trước khi hiển thị

### 3. 💳 Mua sách trực tiếp
- Nút "💳 Mua ngay" trên trang chủ để mua sách
- Điền thông tin cơ bản (tên, email, số điện thoại)
- Thông tin đơn hàng được lưu lại
- Chuyển hướng đến Shopee để hoàn tất thanh toán

## 🚀 Cách chạy web app

### Cách 1: Sử dụng Python (đơn giản nhất)
```bash
cd /Users/nguyenthuhien/Claude/yenha-blog
python3 -m http.server 8000
```
Sau đó mở trình duyệt và truy cập: `http://localhost:8000`

### Cách 2: Sử dụng Node.js
```bash
npx http-server -p 8000
```

### Cách 3: Mở trực tiếp trong trình duyệt
Mở file `index.html` bằng trình duyệt (chỉ hoạt động tốt khi có server local)

## 📁 Cấu trúc file

```
yenha-blog/
├── index.html          # Trang chủ
├── style.css          # Stylesheet chính
├── app.js             # Xử lý tìm kiếm & modal mua sách
├── comments.js        # Xử lý bình luận
├── README.md          # File này
├── images/            # Ảnh (avatar, bìa sách)
└── posts/             # Các bài viết chi tiết
    ├── post-1.html
    ├── post-2.html
    └── ...
```

## 🎨 Tùy chỉnh

### Thêm bài viết mới
1. Tạo file `posts/post-n.html` (copy từ post-1.html)
2. Chỉnh sửa tiêu đề, nội dung
3. Cập nhật `app.js` - thêm post mới vào mảng `posts`
4. Thêm thẻ `<script src="../comments.js"></script>` ở cuối file

### Quản lý đơn hàng
Thông tin đơn hàng được lưu trong `localStorage` với key `yenha_orders`. Để xem:
1. Mở DevTools (F12 hoặc Cmd+Option+I)
2. Chuyển đến tab "Application" → "Local Storage"
3. Tìm `yenha_orders`

### Quản lý bình luận
Bình luận được lưu với key `yenha_comments`. Tương tự như trên, bạn có thể xem trong DevTools.

## 🔐 Bảo mật

- Bình luận được lưu client-side (localStorage)
- Không lưu trữ thông tin thanh toán nhạy cảm
- Nên sử dụng HTTPS khi deploy lên production

## 📱 Responsive Design

Website tự động điều chỉnh cho:
- Desktop
- Tablet
- Mobile phones

## 🌐 Deployment

Để deploy:
1. Upload toàn bộ folder lên hosting (Netlify, Vercel, GitHub Pages, etc.)
2. Đặt lại đường dẫn nếu cần
3. Đảm bảo server hỗ trợ file tĩnh (HTML, CSS, JS)

## 📝 Ghi chú

- Dữ liệu bình luận & đơn hàng được lưu client-side, sẽ mất nếu xóa localStorage
- Để lưu trữ lâu dài, nên kết nối với backend database
- Hiện tại chưa có tính năng admin panel, có thể thêm sau

---

Made with ♡ by Yên Hạ
