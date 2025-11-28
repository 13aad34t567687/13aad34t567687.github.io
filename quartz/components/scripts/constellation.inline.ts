const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
const container = document.getElementById("prism-container")

if (container && ctx) {
    container.innerHTML = ""
    container.appendChild(canvas)

    let width = 0
    let height = 0
    let particles: Particle[] = []

    // Configuration
    const particleCount = 100 // Number of nodes
    const connectionDistance = 150 // Max distance to draw line
    const mouseDistance = 200 // Mouse interaction radius

    // Mouse state
    const mouse = { x: -1000, y: -1000 }

    class Particle {
        x: number
        y: number
        vx: number
        vy: number
        size: number

        constructor() {
            this.x = Math.random() * width
            this.y = Math.random() * height
            this.vx = (Math.random() - 0.5) * 0.5 // Slow, elegant movement
            this.vy = (Math.random() - 0.5) * 0.5
            this.size = Math.random() * 2 + 1
        }

        update() {
            this.x += this.vx
            this.y += this.vy

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1
            if (this.y < 0 || this.y > height) this.vy *= -1

            // Mouse interaction
            const dx = mouse.x - this.x
            const dy = mouse.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouseDistance) {
                const forceDirectionX = dx / distance
                const forceDirectionY = dy / distance
                const force = (mouseDistance - distance) / mouseDistance
                const directionX = forceDirectionX * force * 0.5
                const directionY = forceDirectionY * force * 0.5
                this.vx += directionX * 0.05
                this.vy += directionY * 0.05
            }

            // Speed limit
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
            if (speed > 2) {
                this.vx = (this.vx / speed) * 2
                this.vy = (this.vy / speed) * 2
            }
        }

        draw(color: string) {
            if (!ctx) return
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

        // Determine color based on theme
        const isDark = document.documentElement.getAttribute("saved-theme") === "dark"

        // Only show in light mode
        if (isDark) {
            ctx.clearRect(0, 0, width, height)
            requestAnimationFrame(animate)
            return
        }

        const color = "rgba(40, 90, 40, " // Green for light mode

        // Update and draw particles
        particles.forEach(p => {
            p.update()
            p.draw(color + "0.15)") // Much lower opacity
        })

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < connectionDistance) {
                    const opacity = 1 - distance / connectionDistance
                    ctx.beginPath()
                    ctx.strokeStyle = color + opacity * 0.08 + ")" // Very subtle lines
                    ctx.lineWidth = 1
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.stroke()
                }
            }
        }

        requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    })

    // Start
    init()

    // Re-init on theme change to update colors immediately if needed
    // (Though the animate loop checks theme every frame, so this is just for safety)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "saved-theme") {
                // No need to re-init, loop handles color
            }
        })
    })

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["saved-theme"],
    })
}
