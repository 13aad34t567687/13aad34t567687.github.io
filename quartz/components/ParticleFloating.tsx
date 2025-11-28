import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { h } from "preact"
// @ts-ignore
import script from "./scripts/particlefloat.inline"

const ParticleFloating: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
        <div class={classNames(displayClass, "particle-floating")}>
            <div id="particle-container" class="particle-container"></div>
        </div>
    )
}

ParticleFloating.css = `
.particle-floating {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  pointer-events: none;
  overflow: hidden;
}

.particle-container {
  width: 100%;
  height: 100%;
}
`

ParticleFloating.afterDOMLoaded = script

export default (() => ParticleFloating) satisfies QuartzComponentConstructor
