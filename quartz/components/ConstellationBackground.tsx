import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { h } from "preact"
// @ts-ignore
import script from "./scripts/constellation.inline"

const ConstellationBackground: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
        <div class={classNames(displayClass, "constellation-background")}>
            <div id="prism-container" class="constellation-container"></div>
        </div>
    )
}

ConstellationBackground.css = `
.constellation-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Ensure it stays behind everything */
  pointer-events: none; /* Allow clicks to pass through */
  overflow: hidden;
}

.constellation-container {
  width: 100%;
  height: 100%;
}
`

ConstellationBackground.afterDOMLoaded = script

export default (() => ConstellationBackground) satisfies QuartzComponentConstructor
