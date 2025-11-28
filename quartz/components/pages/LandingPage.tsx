import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"

const LandingPage: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
        <div class={classNames(displayClass, "landing-page")}>
            <div class="landing-hero">
                <div class="blur-text hero-title" data-blur-delay="0">
                    <h1>欢迎来到我的数字花园 🌱</h1>
                </div>

                <div class="blur-text hero-subtitle" data-blur-delay="200">
                    <p>一个充满动画与创意的知识空间</p>
                </div>

                <div class="blur-text hero-description" data-blur-delay="400">
                    <p>探索思想 · 记录成长 · 分享知识</p>
                </div>

                <div class="hero-actions blur-text" data-blur-delay="600">
                    <a href="/content" class="hero-button primary">
                        进入花园 →
                    </a>
                    <a href="/tags" class="hero-button secondary">
                        浏览标签
                    </a>
                </div>

                <div class="hero-features">
                    <div class="feature-card blur-text" data-blur-delay="800">
                        <div class="feature-icon">✨</div>
                        <h3>优雅动画</h3>
                        <p>流畅的视觉体验</p>
                    </div>

                    <div class="feature-card blur-text" data-blur-delay="900">
                        <div class="feature-icon">🎨</div>
                        <h3>精美设计</h3>
                        <p>现代化的界面风格</p>
                    </div>

                    <div class="feature-card blur-text" data-blur-delay="1000">
                        <div class="feature-icon">🚀</div>
                        <h3>极速加载</h3>
                        <p>静态生成，秒开体验</p>
                    </div>
                </div>

                <div class="hero-hint blur-text" data-blur-delay="1200">
                    <p>💡 提示：点击任意位置查看火花效果</p>
                </div>
            </div>
        </div>
    )
}

LandingPage.css = `
.landing-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.landing-hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--secondary), var(--tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle p {
  font-size: 1.5rem;
  color: var(--darkgray);
  margin-bottom: 1rem;
}

.hero-description p {
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.hero-button {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-button.primary {
  background: var(--secondary);
  color: white;
}

.hero-button.primary:hover {
  background: var(--tertiary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(217, 119, 87, 0.3);
}

.hero-button.secondary {
  background: transparent;
  color: var(--secondary);
  border: 2px solid var(--secondary);
}

.hero-button.secondary:hover {
  background: var(--secondary);
  color: white;
  transform: translateY(-2px);
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  padding: 1.5rem;
  background: var(--lightgray);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--darkgray);
}

.feature-card p {
  font-size: 0.95rem;
  color: var(--gray);
}

.hero-hint {
  margin-top: 2rem;
  color: var(--gray);
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .hero-title h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle p {
    font-size: 1.2rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .hero-features {
    grid-template-columns: 1fr;
  }
}
`

LandingPage.afterDOMLoaded = `
// Initialize blur text animations for landing page
const blurTexts = document.querySelectorAll('.blur-text');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-blur-delay') || '0');
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '50px'
});

blurTexts.forEach(text => observer.observe(text));
`

export default (() => LandingPage) satisfies QuartzComponentConstructor
