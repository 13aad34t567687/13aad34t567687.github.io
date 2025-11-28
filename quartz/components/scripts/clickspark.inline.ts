// Click Spark effect
function initClickSpark() {
    const canvas = document.createElement("canvas")
    canvas.id = "click-spark-canvas"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9998"
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
        x: number
        y: number
        vx: number
        vy: number
        life: number
        maxLife: number
    }

    const particles: Particle[] = []
    const sparkColor = "#D97757" // Theme orange

    function createSpark(x: number, y: number) {
        const particleCount = 15 // More particles!
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
            const speed = 3 + Math.random() * 5 // Much faster
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1000, // Longer life
                maxLife: 1000,
            })
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.life -= 16
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.15 // Stronger gravity

            if (p.life <= 0) {
                particles.splice(i, 1)
                continue
            }

            const opacity = p.life / p.maxLife
            const size = 4 * opacity // Bigger particles

            ctx.fillStyle = sparkColor + Math.floor(opacity * 255).toString(16).padStart(2, "0")
            ctx.beginPath()
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
            ctx.fill()
        }

        if (particles.length > 0) {
            requestAnimationFrame(updateParticles)
        }
    }

    document.addEventListener("click", (e) => {
        createSpark(e.clientX, e.clientY)
        if (particles.length === 15) {
            updateParticles()
        }
    })

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })
}

document.addEventListener("nav", () => {
    if (!document.getElementById("click-spark-canvas")) {
        initClickSpark()
    }
})

if (document.readyState === "complete") {
    initClickSpark()
} else {
    window.addEventListener("load", initClickSpark)
}
