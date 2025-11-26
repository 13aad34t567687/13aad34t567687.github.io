import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { classNames } from "../util/lang"

const style = `
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card { border: 1px solid var(--lightgray); border-radius: 10px; overflow: hidden; background: var(--light); transition: transform .15s ease, box-shadow .15s ease; }
.card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
.card .thumb { aspect-ratio: 16/9; background: var(--lightgray) center/cover no-repeat; }
.card .body { padding: 12px; }
.card .title { font-size: 1rem; margin: 0 0 6px; }
.card .meta { font-size: .85rem; color: var(--darkgray); }
`

export default (({ limit = 6 }: { limit?: number } = {}) => {
  const CardList: QuartzComponent = ({ allFiles, fileData, cfg, displayClass }: QuartzComponentProps) => {
    const pages = allFiles.sort(byDateAndAlphabetical(cfg)).slice(0, limit)
    return (
      <div class={classNames(displayClass, 'card-grid')}>
        {pages.map((page) => {
          const title = page.frontmatter?.title ?? 'Untitled'
          const cover = (page.frontmatter as any)?.cover as string | undefined
          const url = resolveRelative(fileData.slug!, page.slug!)
          const styleBg = cover ? `background-image:url(${resolveRelative(fileData.slug!, String(cover))})` : ''
          return (
            <a class="card" href={url}>
              <div class="thumb" style={styleBg}></div>
              <div class="body">
                <h3 class="title">{title}</h3>
                {page.description && <p class="meta">{page.description}</p>}
              </div>
            </a>
          )
        })}
      </div>
    )
  }
  CardList.css = style
  return CardList
}) satisfies QuartzComponentConstructor
