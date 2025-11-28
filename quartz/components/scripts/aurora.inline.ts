// Aurora background effect using Canvas
function initAurora() {
    if (document.getElementById("aurora-canvas")) return

    const canvas = document.createElement("canvas")
    canvas.id = "aurora-canvas"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "-1"
    canvas.style.opacity = "0.6" // Much more visible

    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")!
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // Get theme colors
    const isDark = document.documentElement.getAttribute("saved-theme") === "dark"

    // Aurora colors - VIBRANT orange gradient
    const colors = isDark
        ? ["rgba(217, 119, 87, 0.7)", "rgba(224, 142, 121, 0.6)", "rgba(240, 168, 150, 0.5)"]
        : ["rgba(217, 119, 87, 0.6)", "rgba(224, 142, 121, 0.5)", "rgba(240, 168, 150, 0.4)"]

    // Wave parameters - BIGGER and FASTER
    const waves: {
        amplitude: number
        frequency: number
        phase: number
        speed: number
        colorIndex: number
    }[] = [
            { amplitude: 150, frequency: 0.0025, phase: 0, speed: 0.0008, colorIndex: 0 },
            { amplitude: 120, frequency: 0.0035, phase: Math.PI, speed: 0.0006, colorIndex: 1 },
            { amplitude: 180, frequency: 0.0018, phase: Math.PI / 2, speed: 0.0005, colorIndex: 2 },
        ]

    let time = 0

    function drawWave(wave: typeof waves[0]) {
        ctx.beginPath()
        ctx.moveTo(0, height / 2)

        for (let x = 0; x < width; x++) {
            const y =
                height / 2 +
                Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude +
                Math.sin(x * wave.frequency * 2 + time * wave.speed * 0.5) * (wave.amplitude / 2)

            if (x === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, colors[wave.colorIndex])
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
    }

    function animate() {
        ctx.clearRect(0, 0, width, height)

        time += 1
        waves.forEach(drawWave)

        requestAnimationFrame(animate)
    }

    // Handle resize
    window.addEventListener("resize", () => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
    })

    animate()
}

document.addEventListener("nav", initAurora)
if (document.readyState === "complete") {
    initAurora()
} else {
    window.addEventListener("load", initAurora)
}
