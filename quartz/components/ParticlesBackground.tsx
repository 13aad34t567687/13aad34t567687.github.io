import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/particles.inline"

const ParticlesBackground: QuartzComponent = () => {
    return null
}

ParticlesBackground.afterDOMLoaded = script

export default (() => ParticlesBackground) satisfies QuartzComponentConstructor
