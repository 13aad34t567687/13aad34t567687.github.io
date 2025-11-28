import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/cursoreffect.inline"

const CursorEffect: QuartzComponent = () => {
    return null
}

CursorEffect.afterDOMLoaded = script

export default (() => CursorEffect) satisfies QuartzComponentConstructor
