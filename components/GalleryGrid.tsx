import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

const style = `
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.gallery-item { border-radius: 10px; overflow: hidden; background: var(--lightgray); }
.gallery-item img { width: 100%; height: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
`

const GalleryGrid: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const gallery = (fileData.frontmatter as any)?.gallery as string[] | undefined
  if (!gallery || gallery.length === 0) return null
  return (
    <div class={classNames(displayClass, 'gallery-grid')}>
      {gallery.map((src) => (
        <a class="gallery-item" href={resolveRelative(fileData.slug!, src as any)}>
          <img src={resolveRelative(fileData.slug!, src as any)} alt="" loading="lazy" />
        </a>
      ))}
    </div>
  )
}

GalleryGrid.css = style

export default (() => GalleryGrid) satisfies QuartzComponentConstructor