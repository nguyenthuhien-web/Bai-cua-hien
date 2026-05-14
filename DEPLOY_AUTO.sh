#!/bin/bash

# 🚀 Yên Hạ Blog - Automatic Deployment Script
# Bạn chỉ cần chạy: bash DEPLOY_AUTO.sh

set -e

echo "🚀 Yên Hạ Blog - Auto Deploy"
echo "=============================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${BLUE}Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Step 1: Authenticate with Vercel
echo -e "${BLUE}Step 1: Authenticating with Vercel...${NC}"
echo "⚠️  Bạn sẽ thấy link trong terminal, click link đó để authorize"
echo ""

vercel login --github || {
    echo -e "${RED}❌ Vercel authentication failed${NC}"
    echo "Thử cách khác: bash DEPLOY_AUTO.sh --render"
    exit 1
}

# Step 2: Deploy to Vercel
echo -e "${BLUE}Step 2: Deploying to Vercel...${NC}"
vercel --prod --confirm || {
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
}

# Step 3: Get deployment URL
echo ""
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo ""
echo -e "${GREEN}Ứng dụng của bạn đã lên web!${NC}"
echo "Truy cập: https://yenha-blog.vercel.app"
echo ""
echo "📝 Blog URL: https://yenha-blog.vercel.app"
echo "🔐 Admin: https://yenha-blog.vercel.app/admin"
echo ""
echo "Tự động deploy: Mỗi khi bạn 'git push' lên GitHub, Vercel sẽ tự động deploy!"
