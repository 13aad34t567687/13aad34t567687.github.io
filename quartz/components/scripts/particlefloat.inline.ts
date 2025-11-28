const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const container = document.getElementById("particle-container")

if (container && ctx) {
    container.innerHTML = ""
    container.appendChild(canvas)

    let width = 0
    let height = 0
    let particles: Particle[] = []

    const particleCount = 80 // Number of particles

    class Particle {
        x: number
        y: number
        vx: number
        vy: number
        size: number
        opacity: number

        constructor() {
            this.x = Math.random() * width
            this.y = Math.random() * height
            this.vx = (Math.random() - 0.5) * 0.3 // Very slow movement
            this.vy = (Math.random() - 0.5) * 0.3
            this.size = Math.random() * 1.5 + 0.5 // Small particles
            this.opacity = Math.random() * 0.1 + 0.1 // Very subtle opacity (0.1-0.2)
        }

        update() {
            this.x += this.vx
            this.y += this.vy

            // Wrap around edges
            if (this.x < 0) this.x = width
            if (this.x > width) this.x = 0
            if (this.y < 0) this.y = height
            if (this.y > height) this.y = 0
        }

        draw() {
            if (!ctx) return

            // Determine color based on theme
            const isDark = document.documentElement.getAttribute("saved-theme") === "dark"

            // Only draw in dark mode
            if (!isDark) return

            const color = `rgba(255, 255, 255, ${this.opacity})`

            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()
        }
    }

    function init() {
        resize()
        particles = []
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }
        animate()
    }

    function resize() {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
    }

    function animate() {
        if (!ctx) return
        ctx.clearRect(0, 0, width, height)

        particles.forEach(p => {
            p.update()
            p.draw()
        })

        requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)

    // Start
    init()

    // Re-init on theme change
    const observer = new MutationObserver(() => {
        // Color will update automatically in draw()
    })

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["saved-theme"],
    })
}
