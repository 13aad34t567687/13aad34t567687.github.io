import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/ghostcursor.inline"

const GhostCursor: QuartzComponent = () => {
    return null
}

GhostCursor.afterDOMLoaded = script

export default (() => GhostCursor) satisfies QuartzComponentConstructor
