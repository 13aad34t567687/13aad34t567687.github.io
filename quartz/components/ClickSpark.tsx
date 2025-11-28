import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/clickspark.inline"

const ClickSpark: QuartzComponent = () => {
    return null
}

ClickSpark.afterDOMLoaded = script

export default (() => ClickSpark) satisfies QuartzComponentConstructor
