import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const style = `
.hero { position: relative; border-radius: 12px; padding: 48px 24px; color: var(--dark); background: linear-gradient(135deg, var(--secondary) 0%, var(--tertiary) 100%); margin: 0 0 1rem 0; }
.hero h1 { margin: 0; font-size: 2rem; color: #fff; }
.hero p { margin-top: .5rem; color: #f0f0f0; }
`

const Hero: QuartzComponent = ({ cfg, fileData, displayClass }: QuartzComponentProps) => {
  const title = cfg.pageTitle
  const desc = fileData.description ?? ''
  return (
    <div class={classNames(displayClass, 'hero')}>
      <h1>{title}</h1>
      {desc && <p>{desc}</p>}
    </div>
  )
}

Hero.css = style

export default (() => Hero) satisfies QuartzComponentConstructor