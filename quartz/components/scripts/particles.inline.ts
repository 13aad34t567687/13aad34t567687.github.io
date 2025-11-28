import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uParticleSize;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.1;

    // Create grid
    uv *= 20.0;
    vec2 grid = fract(uv);
    vec2 id = floor(uv);

    // Random offset for each particle
    float n = random(id);
    vec2 offset = vec2(n * 0.5 - 0.25, n * 0.5 - 0.25);
    grid += offset;

    // Mouse interaction
    float dist = distance(grid, uMouse * 20.0 + offset);
    float force = smoothstep(uRadius, 0.0, dist) * uStrength;
    vec2 displacement = normalize(grid - (uMouse * 20.0 + offset)) * force * 0.5;
    grid -= displacement;

    // Particle shape
    float d = distance(grid, vec2(0.5));
    float particle = smoothstep(uParticleSize, 0.0, d);

    // Color
    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 1.0, (sin(time + n * 10.0) + 1.0) * 0.5));

    gl_FragColor = vec4(color * particle, particle);
  }
`

function initParticles() {
    if (document.getElementById("particles-canvas")) return

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.domElement.id = "particles-canvas"
    renderer.domElement.style.position = "fixed"
    renderer.domElement.style.top = "0"
    renderer.domElement.style.left = "0"
    renderer.domElement.style.pointerEvents = "none"
    renderer.domElement.style.zIndex = "-1"
    document.body.appendChild(renderer.domElement)

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2)

    // Mouse
    const mouse = new THREE.Vector2(0.5, 0.5)

    // Theme colors - warm orange
    const color1 = new THREE.Color("#D97757") // Primary orange
    const color2 = new THREE.Color("#E08E79") // Tertiary orange

    // Material
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uMouse: { value: mouse },
            uRadius: { value: 2.5 }, // Larger interaction radius
            uStrength: { value: 0.8 }, // Stronger interaction
            uParticleSize: { value: 0.12 }, // Slightly bigger particles
            uColor1: { value: color1 },
            uColor2: { value: color2 },
        },
        transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Event Listeners
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX / window.innerWidth
        mouse.y = 1 - e.clientY / window.innerHeight
    })

    window.addEventListener("resize", () => {
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
    })

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
        requestAnimationFrame(animate)

        const time = clock.getElapsedTime()
        material.uniforms.uTime.value = time

        renderer.render(scene, camera)
    }

    animate()
}

document.addEventListener("nav", initParticles)
if (document.readyState === "complete") {
    initParticles()
} else {
    window.addEventListener("load", initParticles)
}
