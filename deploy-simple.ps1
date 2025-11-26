# Quartz Deploy Script
Write-Host "Quartz Blog Deployment" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Check for existing remote
$remotes = git remote

if ($remotes -contains 'origin') {
    Write-Host "[OK] Remote repository already configured" -ForegroundColor Green
    $url = git remote get-url origin
    Write-Host "Repository: $url`n" -ForegroundColor Gray
    
    $continue = Read-Host "Continue with deployment? (Y/n)"
    if ($continue -eq 'n') {
        exit 0
    }
} else {
    Write-Host "[INPUT] GitHub Repository Setup`n" -ForegroundColor Yellow
    
    $username = Read-Host "Enter your GitHub username"
    
    Write-Host "`nRecommended: Use '$username.github.io' as repository name" -ForegroundColor Cyan
    $repoName = Read-Host "Enter repository name (press Enter for recommended)"
    
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "$username.github.io"
    }
    
    $repoUrl = "https://github.com/$username/$repoName.git"
    
    Write-Host "`n[INFO] Configuration:" -ForegroundColor Yellow
    Write-Host "  Username: $username"
    Write-Host "  Repository: $repoName"
    Write-Host "  URL: $repoUrl"
    Write-Host "  Website: https://$username.github.io/`n" -ForegroundColor Green
    
    $confirm = Read-Host "Confirm? (Y/n)"
    if ($confirm -eq 'n') {
        Write-Host "[CANCEL] Deployment cancelled" -ForegroundColor Red
        exit 0
    }
    
    Write-Host "`n[ACTION] Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "[OK] Remote added`n" -ForegroundColor Green
}

# Commit changes
$status = git status --porcelain
if ($status) {
    Write-Host "[ACTION] Committing changes..." -ForegroundColor Yellow
    git add .
    git commit -m "Deploy to GitHub Pages"
    Write-Host "[OK] Changes committed`n" -ForegroundColor Green
}

# Switch to main branch
Write-Host "[ACTION] Switching to main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "[OK] On main branch`n" -ForegroundColor Green

# Push to GitHub
Write-Host "[ACTION] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "(You may need to enter GitHub credentials)`n" -ForegroundColor Gray

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n======================================" -ForegroundColor Green
    Write-Host "SUCCESS! Deployment Complete!" -ForegroundColor Green
    Write-Host "======================================`n" -ForegroundColor Green
    
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to your GitHub repository" -ForegroundColor White
    Write-Host "2. Settings -> Pages" -ForegroundColor White
    Write-Host "3. Source: Select 'GitHub Actions'" -ForegroundColor White
    Write-Host "4. Wait 2-3 minutes for build" -ForegroundColor White
    Write-Host "5. Visit your website!`n" -ForegroundColor White
    
    $remoteUrl = git remote get-url origin
    if ($remoteUrl -match 'github\.com[:/]([^/]+)/([^/\.]+)') {
        $user = $matches[1]
        $repo = $matches[2]
        Write-Host "Your website: https://$user.github.io/`n" -ForegroundColor Green
    }
} else {
    Write-Host "`n======================================" -ForegroundColor Red
    Write-Host "ERROR: Push Failed" -ForegroundColor Red
    Write-Host "======================================`n" -ForegroundColor Red
    
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "1. Repository doesn't exist on GitHub" -ForegroundColor White
    Write-Host "2. Network connection issue" -ForegroundColor White
    Write-Host "3. Missing permissions`n" -ForegroundColor White
    
    Write-Host "Solution: Create repository on GitHub first" -ForegroundColor Cyan
    Write-Host "Visit: https://github.com/new`n" -ForegroundColor Blue
    
    exit 1
}
