// Intersection Observer for detecting visible sections
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElements = document.querySelectorAll(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElements.length > 0) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.add("in-view"))
      } else {
        tocEntryElements.forEach((tocEntryElement) => tocEntryElement.classList.remove("in-view"))
      }
    }
  }
})

// Active section tracker with debounce
let activeSection: string | null = null
let ticking = false

function updateActiveTocItem() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const headers = Array.from(
        document.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
      )

      // Find the currently visible header (first one above the viewport center)
      const scrollPosition = window.scrollY + 100 // offset for better UX
      let currentId: string | null = null

      for (const header of headers) {
        if (header.offsetTop <= scrollPosition) {
          currentId = header.id
        } else {
          break
        }
      }

      if (currentId !== activeSection) {
        // Remove active class from all
        document.querySelectorAll('.toc-content a').forEach(link => {
          link.classList.remove('active')
        })

        // Add active class to current
        if (currentId) {
          const activeLinks = document.querySelectorAll(`a[data-for="${currentId}"]`)
          activeLinks.forEach(link => link.classList.add('active'))
        }

        activeSection = currentId
      }

      ticking = false
    })
    ticking = true
  }
}

// Smooth scroll to anchor
function smoothScrollToAnchor(event: MouseEvent) {
  const target = event.currentTarget as HTMLAnchorElement
  const href = target.getAttribute('href')

  if (href && href.startsWith('#')) {
    event.preventDefault()
    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Update URL without jumping
      history.pushState(null, '', href)
    }
  }
}

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupToc() {
  for (const toc of document.getElementsByClassName("toc")) {
    const button = toc.querySelector(".toc-header")
    const content = toc.querySelector(".toc-content")
    if (!button || !content) return

    // Header toggle
    button.addEventListener("click", toggleToc)
    window.addCleanup(() => button.removeEventListener("click", toggleToc))

    // Smooth scroll for all TOC links
    const links = content.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', smoothScrollToAnchor)
      window.addCleanup(() => link.removeEventListener('click', smoothScrollToAnchor))
    })
  }

  // Add scroll listener for active section tracking
  window.addEventListener('scroll', updateActiveTocItem, { passive: true })
  window.addCleanup(() => window.removeEventListener('scroll', updateActiveTocItem))

  // Initial update
  updateActiveTocItem()
}

document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach((header) => observer.observe(header))
})
