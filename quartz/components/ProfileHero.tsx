import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ProfileHero: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  // Only render on the index page
  if (fileData.slug !== "index") {
    return null
  }

  return (
    <div class={classNames(displayClass, "profile-hero")}>
      <div class="profile-avatar">
        <img src="./assets/avatar.png" alt="attention" />
        <div class="avatar-glow"></div>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">attention</h1>
        <p class="profile-bio">Life is short, live it.</p>
        <div class="profile-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span class="separator">•</span>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </div>
  )
}

ProfileHero.css = `
.profile-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem 0 3rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-hero:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 1.5rem;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
  z-index: 1;
  animation: pulse-glow 3s infinite alternate;
}

@keyframes pulse-glow {
  0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
  100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

.profile-name {
  font-family: var(--headerFont);
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.profile-bio {
  font-family: var(--bodyFont);
  font-size: 1.1rem;
  color: var(--gray);
  margin: 0 0 1.5rem 0;
  max-width: 600px;
  line-height: 1.6;
}

.profile-socials {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--lightgray);
}

.profile-socials a {
  color: var(--lightgray);
  text-decoration: none;
  transition: color 0.2s;
  border-bottom: 1px solid transparent;
}

.profile-socials a:hover {
  color: #fff;
  border-bottom-color: #fff;
}

.separator {
  opacity: 0.3;
}
`

export default (() => ProfileHero) satisfies QuartzComponentConstructor
