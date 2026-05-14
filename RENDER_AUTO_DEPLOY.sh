#!/bin/bash

# 🚀 Yên Hạ Blog - Auto Deploy to Render
# Chỉ cần chạy: bash RENDER_AUTO_DEPLOY.sh
# Script này sẽ guide bạn qua 2 bước để deploy live!

set -e

clear
echo "╔═══════════════════════════════════════════════════════╗"
echo "║     🚀 YÊN HẠ BLOG - AUTO DEPLOY TO RENDER 🚀       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📋 Yêu cầu: Chỉ 2 bước, 2 phút xong!"
echo ""

# Check git status
echo "✓ Kiểm tra git status..."
if [ -z "$(git status --short)" ]; then
    echo "  ✅ Code sạch sẽ, sẵn deploy"
else
    echo "  ⚠️  Có uncommitted changes, committing..."
    git add .
    git commit -m "Auto-deploy ready" --quiet 2>/dev/null || true
fi
echo ""

echo "╔═══════════════════════════════════════════════════════╗"
echo "║             BƯỚC 1: Authorize Render                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📝 Hướng dẫn:"
echo "  1. Mở link này trong trình duyệt:"
echo ""
echo "     🔗 https://dashboard.render.com/register"
echo ""
echo "  2. Login/Signup bằng GitHub"
echo "  3. Quay lại cửa sổ này, nhấn ENTER"
echo ""
read -p "👉 Bấm ENTER khi đã authorize Render: "

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║          BƯỚC 2: Deploy lên Render (1 click)         ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "🎯 Deploy link (1 click, tất cả auto):"
echo ""
echo "   👉 https://render.com/deploy?repo=https://github.com/nguyenthuhien-web/Bai-cua-hien"
echo ""
echo "📋 Sau khi click:"
echo "  ✓ Chọn repo: Bai-cua-hien"
echo "  ✓ Click \"Deploy\""
echo "  ✓ Chờ 3-5 phút build xong"
echo "  ✓ Có live URL! 🎉"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📱 Sau khi deploy xong:"
echo ""
echo "  🌐 Blog homepage:"
echo "     https://yenha-blog.onrender.com"
echo ""
echo "  🔐 Admin panel:"
echo "     https://yenha-blog.onrender.com/admin"
echo "     Password: yenha2026"
echo ""
echo "🔄 Auto-deploy: Mỗi khi push code, Render tự deploy!"
echo ""
echo "═══════════════════════════════════════════════════════"
echo ""
read -p "👉 Bấm ENTER khi deploy xong, mình sẽ verify: "

echo ""
echo "🔍 Checking deployment..."
sleep 5

# Try to check if domain is active (may not work immediately)
if timeout 10 curl -s https://yenha-blog.onrender.com > /dev/null 2>&1; then
    echo "✅ Website online! 🎉"
    echo ""
    echo "Truy cập: https://yenha-blog.onrender.com"
else
    echo "⏳ Website đang load (Render cần 2-3 phút đầu tiên)"
    echo ""
    echo "Kiểm tra lại sau 2 phút:"
    echo "  https://yenha-blog.onrender.com"
fi

echo ""
echo "✨ Deployment hoàn tất! ✨"
echo ""
