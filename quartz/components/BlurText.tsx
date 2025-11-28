import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface BlurTextOptions {
    text?: string
    className?: string
    delay?: number
}

export default ((opts?: BlurTextOptions) => {
    const BlurText: QuartzComponent = ({ children, displayClass }: QuartzComponentProps) => {
        const text = opts?.text
        const className = opts?.className || ""
        const delay = opts?.delay || 0

        return (
            <div
                class={classNames(displayClass, "blur-text", className)}
                data-blur-delay={delay}
            >
                {text ? <span>{text}</span> : children}
            </div>
        )
    }

    BlurText.css = `
.blur-text {
  filter: blur(10px);
  opacity: 0;
  transition: filter 0.8s ease-out, opacity 0.8s ease-out;
}

.blur-text.revealed {
  filter: blur(0);
  opacity: 1;
}
  `

    BlurText.afterDOMLoaded = `
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

    return BlurText
}) satisfies QuartzComponentConstructor<BlurTextOptions>
