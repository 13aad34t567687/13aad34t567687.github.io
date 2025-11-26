#!/bin/bash

# Quartz 博客快速部署脚本

echo "🚀 开始部署 Quartz 博客到 GitHub..."

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否已配置远程仓库
if git remote | grep -q 'origin'; then
    echo -e "${GREEN}✓${NC} 检测到已配置的远程仓库"
else
    echo -e "${BLUE}请输入您的 GitHub 仓库地址（例如: https://github.com/username/repo.git）:${NC}"
    read repo_url
    git remote add origin $repo_url
    echo -e "${GREEN}✓${NC} 已添加远程仓库"
fi

# 确保在 main 分支
echo -e "${BLUE}→${NC} 切换到 main 分支..."
git branch -M main

# 推送到 GitHub
echo -e "${BLUE}→${NC} 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} 部署成功！"
    echo ""
    echo "📋 后续步骤："
    echo "1. 访问 GitHub 仓库的 Settings → Pages"
    echo "2. Source 选择: GitHub Actions"
    echo "3. 等待 Actions 构建完成（2-3 分钟）"
    echo "4. 访问您的网站！"
    echo ""
else
    echo -e "${RED}✗${NC} 推送失败，请检查网络连接和仓库权限"
    exit 1
fi
