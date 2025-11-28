import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { h } from "preact"
// @ts-ignore
import script from "./scripts/fluidCursor.inline"

const FluidCursor: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "fluid-cursor")}>
      <canvas id="fluid-canvas"></canvas>
    </div>
  )
}

FluidCursor.css = `
.fluid-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  pointer-events: none;
  overflow: hidden;
}

#fluid-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`

FluidCursor.afterDOMLoaded = script

export default (() => FluidCursor) satisfies QuartzComponentConstructor
