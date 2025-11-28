const cursor = document.createElement('div')
cursor.className = 'custom-cursor'
document.body.appendChild(cursor)

const cursorGlow = document.createElement('div')
cursorGlow.className = 'cursor-glow'
document.body.appendChild(cursorGlow)

// Particle trail
const particles: HTMLDivElement[] = []
let mouseX = 0
let mouseY = 0
let isMoving = false
let moveTimeout: NodeJS.Timeout

// Colors
const colors = [
    'rgba(139, 92, 246, 0.8)',  // Purple
    'rgba(59, 130, 246, 0.8)',  // Blue
    'rgba(236, 72, 153, 0.8)',  // Pink
    'rgba(34, 197, 94, 0.8)',   // Green
    'rgba(251, 146, 60, 0.8)',  // Orange
]

function createParticle(x: number, y: number) {
    const particle = document.createElement('div')
    particle.className = 'cursor-particle'
    particle.style.left = x + 'px'
    particle.style.top = y + 'px'
    particle.style.background = colors[Math.floor(Math.random() * colors.length)]

    document.body.appendChild(particle)
    particles.push(particle)

    setTimeout(() => {
        particle.remove()
        const index = particles.indexOf(particle)
        if (index > -1) particles.splice(index, 1)
    }, 1000)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'

    cursorGlow.style.left = mouseX + 'px'
    cursorGlow.style.top = mouseY + 'px'

    isMoving = true
    cursor.classList.add('moving')
    cursorGlow.classList.add('moving')

    clearTimeout(moveTimeout)
    moveTimeout = setTimeout(() => {
        isMoving = false
        cursor.classList.remove('moving')
        cursorGlow.classList.remove('moving')
    }, 100)

    // Create particles when moving fast
    if (Math.random() > 0.7) {
        createParticle(mouseX, mouseY)
    }
})

document.addEventListener('mousedown', () => {
    cursor.classList.add('click')
    cursorGlow.classList.add('click')
})

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click')
    cursorGlow.classList.remove('click')
})

// Hide default cursor
document.documentElement.style.cursor = 'none'
document.body.style.cursor = 'none'

// Add styles
const style = document.createElement('style')
style.textContent = `
  * {
    cursor: none !important;
  }
  
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    mix-blend-mode: difference;
  }
  
  .custom-cursor.moving {
    width: 30px;
    height: 30px;
  }
  
  .custom-cursor.click {
    width: 15px;
    height: 15px;
    border-color: #8b5cf6;
  }
  
  .cursor-glow {
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    opacity: 0;
  }
  
  .cursor-glow.moving {
    opacity: 1;
  }
  
  .cursor-particle {
    position: fixed;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
    transform: translate(-50%, -50%);
    animation: particleFade 1s ease-out forwards;
  }
  
  @keyframes particleFade {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0) translateY(-30px);
    }
  }
  
  /* Hover effects */
  a:hover ~ .custom-cursor,
  button:hover ~ .custom-cursor {
    width: 40px;
    height: 40px;
    border-color: #8b5cf6;
  }
`
document.head.appendChild(style)
