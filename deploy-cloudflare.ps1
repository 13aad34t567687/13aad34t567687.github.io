# Cloudflare Pages Deployment Script

Write-Host "🚀 Starting deployment to Cloudflare Pages..." -ForegroundColor Cyan

# Check for Wrangler
if (-not (Get-Command "wrangler" -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Wrangler not found. Installing..." -ForegroundColor Yellow
    npm install -g wrangler
}

# Build the project
Write-Host "🔨 Building Quartz..." -ForegroundColor Yellow
npx quartz build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy
Write-Host "☁️ Deploying to Cloudflare..." -ForegroundColor Yellow
npx wrangler pages deploy public --project-name quartz-blog

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
}
else {
    Write-Host "`n❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
