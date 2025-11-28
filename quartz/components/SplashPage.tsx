import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { h } from "preact"
// @ts-ignore
import script from "./scripts/galaxy.inline"

const SplashPage: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
  // Only render on the index page
  if (fileData.slug !== "index") {
    return null
  }

  return (
    <div class={classNames(displayClass, "splash-page")}>
      <div id="galaxy-container" class="galaxy-container"></div>
      <div class="splash-content">
        <h1 class="splash-title">
          <span class="char">Q</span>
          <span class="char">U</span>
          <span class="char">A</span>
          <span class="char">R</span>
          <span class="char">T</span>
          <span class="char">Z</span>
        </h1>
        <p class="splash-subtitle">LIFE IS SHORT, LIVE IT</p>
        <button id="enter-btn" class="enter-btn">
          <span class="btn-text">进入我的博客</span>
          <span class="btn-line"></span>
        </button>
      </div>
    </div>
  )
}

SplashPage.css = `
.splash-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  background: #000;
  color: #fff;
  transition: opacity 1s cubic-bezier(0.77, 0, 0.175, 1), visibility 1s;
}

.galaxy-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.splash-content {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.splash-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 400;
  letter-spacing: 0.5em;
  margin: 0;
  margin-left: 0.5em; /* Compensate for letter-spacing */
  color: #fff;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1);
  text-shadow: 0 0 20px rgba(255,255,255,0.3);
}

.splash-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.splash-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  text-transform: uppercase;
  letter-spacing: 0.8em;
  margin-top: 2rem;
  margin-left: 0.8em;
  color: rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: translateY(20px);
  transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.splash-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.enter-btn {
  margin-top: 4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s ease;
}

.enter-btn.visible {
  opacity: 1;
}

.btn-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #fff;
  transition: color 0.3s ease;
}

.btn-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.3);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), background 0.3s ease;
}

.enter-btn:hover .btn-line {
  transform: scaleX(1);
  background: #fff;
}

.enter-btn:hover .btn-text {
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

/* Exiting state */
.splash-page.exiting {
  opacity: 0;
  visibility: hidden;
}

.splash-page.exiting .splash-title {
  transform: scale(1.1);
  letter-spacing: 1em;
  opacity: 0;
}

/* Popover fix */
.popover .splash-page {
  display: none !important;
}
`

SplashPage.afterDOMLoaded = script

export default (() => SplashPage) satisfies QuartzComponentConstructor
