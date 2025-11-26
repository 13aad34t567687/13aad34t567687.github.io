# Quartz 博客一键部署脚本（交互式版本）
# 自动配置并部署到 GitHub Pages

Write-Host "🚀 Quartz 博客部署向导" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# 检查 Git 仓库状态
if (!(Test-Path .git)) {
    Write-Host "❌ 错误：当前目录不是 Git 仓库" -ForegroundColor Red
    exit 1
}

# 检查是否已有远程仓库
$hasRemote = git remote | Select-String "origin"

if ($hasRemote) {
    Write-Host "✓ 检测到已配置的远程仓库" -ForegroundColor Green
    $remoteUrl = git remote get-url origin
    Write-Host "  仓库地址：$remoteUrl`n" -ForegroundColor Gray
    
    $continue = Read-Host "是否使用现有配置继续部署？(Y/n)"
    if ($continue -eq "n") {
        Write-Host "`n请手动配置远程仓库：" -ForegroundColor Yellow
        Write-Host "  git remote remove origin" -ForegroundColor Gray
        Write-Host "  git remote add origin YOUR_REPO_URL`n" -ForegroundColor Gray
        exit 0
    }
} else {
    Write-Host "📝 配置 GitHub 仓库信息`n" -ForegroundColor Yellow
    
    # 获取用户名
    $username = Read-Host "请输入您的 GitHub 用户名"
    if ([string]::IsNullOrWhiteSpace($username)) {
        Write-Host "❌ 用户名不能为空" -ForegroundColor Red
        exit 1
    }
    
    # 获取仓库名
    Write-Host "`n💡 提示：推荐使用 '$username.github.io' 作为仓库名" -ForegroundColor Cyan
    Write-Host "   这样您的网站地址将是：https://$username.github.io/`n" -ForegroundColor Cyan
    
    $repoName = Read-Host "请输入仓库名称（直接回车使用推荐名称）"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "$username.github.io"
    }
    
    # 构建仓库 URL
    $repoUrl = "https://github.com/$username/$repoName.git"
    
    Write-Host "`n📋 确认信息：" -ForegroundColor Yellow
    Write-Host "  GitHub 用户名: $username" -ForegroundColor White
    Write-Host "  仓库名称: $repoName" -ForegroundColor White
    Write-Host "  仓库地址: $repoUrl" -ForegroundColor White
    Write-Host "  网站地址: https://$username.github.io/" -ForegroundColor Green
    
    $confirm = Read-Host "`n确认无误？(Y/n)"
    if ($confirm -eq "n") {
        Write-Host "`n❌ 已取消部署" -ForegroundColor Red
        exit 0
    }
    
    # 添加远程仓库
    Write-Host "`n→ 添加远程仓库..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ 远程仓库配置成功`n" -ForegroundColor Green
    } else {
        Write-Host "❌ 远程仓库配置失败" -ForegroundColor Red
        exit 1
    }
}

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host "→ 发现未提交的更改，正在提交..." -ForegroundColor Yellow
    git add .
    git commit -m "🚀 准备部署到 GitHub Pages"
    Write-Host "✓ 更改已提交`n" -ForegroundColor Green
}

# 切换到 main 分支
Write-Host "→ 确保在 main 分支..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ 已切换到 main 分支`n" -ForegroundColor Green

# 推送到 GitHub
Write-Host "→ 推送代码到 GitHub..." -ForegroundColor Yellow
Write-Host "  (首次推送可能需要您输入 GitHub 凭据)`n" -ForegroundColor Gray

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "🎉 部署成功！" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Green
    
    Write-Host "📋 后续步骤：" -ForegroundColor Cyan
    Write-Host "  1. 访问 GitHub 仓库：" -ForegroundColor White
    
    $remoteUrl = git remote get-url origin
    $webUrl = $remoteUrl -replace '\.git$', '' -replace 'git@github.com:', 'https://github.com/' -replace 'https://github.com/', 'https://github.com/'
    Write-Host "     $webUrl`n" -ForegroundColor Blue
    
    Write-Host "  2. 进入 Settings → Pages" -ForegroundColor White
    Write-Host "  3. Source 选择：GitHub Actions" -ForegroundColor White
    Write-Host "  4. 等待 Actions 构建完成（约 2-3 分钟）`n" -ForegroundColor White
    
    Write-Host "  5. 访问您的网站：" -ForegroundColor White
    
    # 提取用户名和仓库名
    if ($remoteUrl -match 'github\.com[:/]([^/]+)/([^/\.]+)') {
        $user = $matches[1]
        $repo = $matches[2]
        
        if ($repo -eq "$user.github.io") {
            Write-Host "     https://$user.github.io/`n" -ForegroundColor Green
        } else {
            Write-Host "     https://$user.github.io/$repo/`n" -ForegroundColor Green
        }
    }
    
    Write-Host "💡 提示：" -ForegroundColor Cyan
    Write-Host "   - 每次修改后运行 'git push' 即可自动更新" -ForegroundColor Gray
    Write-Host "   - 查看部署状态：仓库 → Actions 标签页" -ForegroundColor Gray
    Write-Host "   - 本地预览：npx quartz build --serve`n" -ForegroundColor Gray
    
} else {
    Write-Host "`n========================================" -ForegroundColor Red
    Write-Host "❌ 推送失败" -ForegroundColor Red
    Write-Host "========================================`n" -ForegroundColor Red
    
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "  1. 仓库不存在 - 请先在 GitHub 创建仓库" -ForegroundColor White
    Write-Host "  2. 网络连接问题" -ForegroundColor White
    Write-Host "  3. 缺少推送权限" -ForegroundColor White
    Write-Host "  4. 需要配置 GitHub 凭据`n" -ForegroundColor White
    
    Write-Host "解决方案：" -ForegroundColor Cyan
    Write-Host "  - 确保已在 GitHub 创建同名仓库" -ForegroundColor Gray
    Write-Host "  - 检查网络连接" -ForegroundColor Gray
    Write-Host "  - 配置 Git 凭据：git config --global credential.helper store`n" -ForegroundColor Gray
    
    exit 1
}
