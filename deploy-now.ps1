# Quick Deploy Script for User: 13aad34t567687
# Generated automatically

Write-Host "Deploying to GitHub..." -ForegroundColor Cyan

# Add remote repository
git remote add origin https://github.com/13aad34t567687/13aad34t567687.github.io.git

# Ensure on main branch
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub (you may need to enter credentials)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n==================================" -ForegroundColor Green
    Write-Host "SUCCESS! Deployment Complete!" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    
    Write-Host "`nNext Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/13aad34t567687/13aad34t567687.github.io" -ForegroundColor White
    Write-Host "2. Click Settings -> Pages" -ForegroundColor White
    Write-Host "3. Source: Select 'GitHub Actions'" -ForegroundColor White
    Write-Host "4. Wait 2-3 minutes for deployment" -ForegroundColor White
    Write-Host "`nYour website will be live at:" -ForegroundColor Cyan
    Write-Host "https://13aad34t567687.github.io/`n" -ForegroundColor Green
} else {
    Write-Host "`nPush failed. Make sure repository is created on GitHub." -ForegroundColor Red
}
