# Quartz 博客快速部署脚本（PowerShell 版本）

Write-Host "🚀 开始部署 Quartz 博客到 GitHub..." -ForegroundColor Cyan

# 检查是否已配置远程仓库
$remotes = git remote
if ($remotes -contains 'origin') {
    Write-Host "✓ 检测到已配置的远程仓库" -ForegroundColor Green
} else {
    $repoUrl = Read-Host "请输入您的 GitHub 仓库地址（例如: https://github.com/username/repo.git）"
    git remote add origin $repoUrl
    Write-Host "✓ 已添加远程仓库" -ForegroundColor Green
}

# 确保在 main 分支
Write-Host "→ 切换到 main 分支..." -ForegroundColor Yellow
git branch -M main

# 推送到 GitHub
Write-Host "→ 推送代码到 GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 部署成功！" -ForegroundColor Green
    Write-Host "`n📋 后续步骤：" -ForegroundColor Cyan
    Write-Host "1. 访问 GitHub 仓库的 Settings → Pages"
    Write-Host "2. Source 选择: GitHub Actions"
    Write-Host "3. 等待 Actions 构建完成（2-3 分钟）"
    Write-Host "4. 访问您的网站！`n"
} else {
    Write-Host "`n✗ 推送失败，请检查网络连接和仓库权限" -ForegroundColor Red
    exit 1
}
