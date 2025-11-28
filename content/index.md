---
title: Welcome
---

<div class="profile-hero-glass">
  <div class="profile-glow-bg"></div>
  <img src="./assets/avatar.png" alt="attention" class="profile-avatar-glass" />
  <h1 class="profile-name-glass">attention</h1>
  <p class="profile-bio-glass">Life is short, live it.</p>
  
  <div class="profile-socials-glass">
    <a href="https://github.com" target="_blank" rel="noopener" title="GitHub">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener" title="Twitter">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    </a>
  </div>
</div>

<div class="quick-nav-glass">
  <h3 class="quick-nav-title">🚀 快速导航</h3>
  <div class="nav-grid">
    <a href="/tags" class="nav-card">
      <span class="nav-icon">🏷️</span>
      <span class="nav-text">标签</span>
    </a>
    <a href="/" class="nav-card">
      <span class="nav-icon">📚</span>
      <span class="nav-text">文章</span>
    </a>
    <a href="/" class="nav-card">
      <span class="nav-icon">⚡</span>
      <span class="nav-text">归档</span>
    </a>
  </div>
</div>

<div class="divider-gradient"></div>

<style>
/* Profile Hero - Glassmorphism */
.profile-hero-glass {
  position: relative;
  text-align: center;
  margin: 2rem auto 3rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.profile-hero-glass:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.profile-glow-bg {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
  pointer-events: none;
  animation: pulse-glow 4s infinite alternate;
}

@keyframes pulse-glow {
  0% { opacity: 0.3; transform: translateX(-50%) scale(0.9); }
  100% { opacity: 0.6; transform: translateX(-50%) scale(1.1); }
}

.profile-avatar-glass {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.profile-hero-glass:hover .profile-avatar-glass {
  transform: scale(1.05);
}

.profile-name-glass {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.profile-bio-glass {
  color: var(--gray);
  font-size: 1.1rem;
  margin: 0 0 2rem;
  opacity: 0.9;
}

/* Social Links with Icons */
.profile-socials-glass {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.profile-socials-glass a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: var(--lightgray);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-socials-glass a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Quick Navigation */
.quick-nav-glass {
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  transition: border-color 0.3s ease;
}

.quick-nav-glass:hover {
  border-color: rgba(255, 255, 255, 0.1);
}

.quick-nav-title {
  margin: 0 0 1.5rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--darkgray);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: var(--gray);
  transition: all 0.3s ease;
}

.nav-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(139, 92, 246, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  font-size: 2rem;
}

.nav-text {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Gradient Divider */
.divider-gradient {
  height: 2px;
  margin: 3rem auto;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
  border-radius: 2px;
}
</style>

## 最近更新

> [!INFO]
> 下方列表由 Quartz 自动生成
