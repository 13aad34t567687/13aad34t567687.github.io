import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/aurora.inline"

const AuroraBackground: QuartzComponent = () => {
    return null
}

AuroraBackground.afterDOMLoaded = script

export default (() => AuroraBackground) satisfies QuartzComponentConstructor
