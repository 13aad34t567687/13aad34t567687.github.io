import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { h } from "preact"
// @ts-ignore
import script from "./scripts/readingprogress.inline"

const ReadingProgress: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
        <div class={classNames(displayClass, "reading-progress")}>
            <div id="reading-progress-bar" class="reading-progress-bar"></div>
        </div>
    )
}

ReadingProgress.css = `
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1000;
  pointer-events: none;
  background-color: transparent;
}

.reading-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--secondary), var(--tertiary));
  transition: width 0.1s ease-out;
  box-shadow: 0 0 8px var(--secondary);
}
`

ReadingProgress.afterDOMLoaded = script

export default (() => ReadingProgress) satisfies QuartzComponentConstructor
