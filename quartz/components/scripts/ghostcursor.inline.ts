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
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uRadius;
  uniform float uForce;
  uniform float uDissipation;

  void main() {
    vec2 uv = vUv;
    vec4 tex = texture2D(uTexture, uv);

    vec2 mouse = uMouse;
    float dist = distance(uv, mouse);

    float force = smoothstep(uRadius, 0.0, dist) * uForce;

    vec4 newTex = tex;
    newTex.xy += force * normalize(uv - mouse) * 0.2;

    // Dissipation
    newTex.xy *= uDissipation;

    gl_FragColor = newTex;
 }
`

const finalFragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uGrainAmount;
  uniform float uGrainSize;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec4 tex = texture2D(uTexture, uv);

    // Enhanced Bloom effect with orange tint
    vec4 bloom = vec4(0.0);
    float bloomStrength = 0.4;
    float bloomRadius = 0.01;
    for (int i = -6; i <= 6; i++) {
      for (int j = -6; j <= 6; j++) {
        vec2 offset = vec2(float(i), float(j)) * bloomRadius;
        bloom += texture2D(uTexture, uv + offset) * bloomStrength;
      }
    }
    
    // Add orange tint
    bloom.r += bloom.a * 0.4;
    bloom.g += bloom.a * 0.2;

    // Grain effect
    float grain = random(uv * uGrainSize + uTime) * uGrainAmount;

    gl_FragColor = tex + bloom + grain;
  }
`

function initGhostCursor() {
  if (document.getElementById("ghost-cursor-canvas")) return

  const width = window.innerWidth
  const height = window.innerHeight

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.domElement.id = "ghost-cursor-canvas"
  renderer.domElement.style.position = "fixed"
  renderer.domElement.style.top = "0"
  renderer.domElement.style.left = "0"
  renderer.domElement.style.pointerEvents = "none"
  renderer.domElement.style.zIndex = "9999"
  document.body.appendChild(renderer.domElement)

  // FBOs
  let fbo = new THREE.WebGLRenderTarget(width, height)
  let fbo2 = new THREE.WebGLRenderTarget(width, height)

  // Geometry
  const geometry = new THREE.PlaneGeometry(2, 2)

  // Mouse
  const mouse = new THREE.Vector2(0.5, 0.5)
  const targetMouse = new THREE.Vector2(0.5, 0.5)

  // Materials
  const simMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uRadius: { value: 0.1 },
      uForce: { value: 0.8 },
      uDissipation: { value: 0.98 },
    },
  })

  const renderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: finalFragmentShader,
    uniforms: {
      uTexture: { value: null },
      uTime: { value: 0 },
      uGrainAmount: { value: 0.1 },
      uGrainSize: { value: 2.5 },
    },
    transparent: true,
  })

  const quad = new THREE.Mesh(geometry, simMaterial)
  scene.add(quad)

  // Event Listeners
  window.addEventListener("mousemove", (e) => {
    targetMouse.x = e.clientX / window.innerWidth
    targetMouse.y = 1 - e.clientY / window.innerHeight
  })

  window.addEventListener("resize", () => {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h)
    fbo.setSize(w, h)
    fbo2.setSize(w, h)
  })

  // Animation Loop
  const clock = new THREE.Clock()

  const animate = () => {
    requestAnimationFrame(animate)

    const time = clock.getElapsedTime()

    // Faster mouse smoothing
    mouse.lerp(targetMouse, 0.2)

    // Sim pass
    quad.material = simMaterial
    simMaterial.uniforms.uTexture.value = fbo.texture
    simMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y)
    simMaterial.uniforms.uTime.value = time

    renderer.setRenderTarget(fbo2)
    renderer.render(scene, camera)

    // Swap
    const temp = fbo
    fbo = fbo2
    fbo2 = temp

    // Render pass
    quad.material = renderMaterial
    renderMaterial.uniforms.uTexture.value = fbo.texture
    renderMaterial.uniforms.uTime.value = time

    renderer.setRenderTarget(null)
    renderer.render(scene, camera)
  }

  animate()
}

document.addEventListener("nav", initGhostCursor)
if (document.readyState === "complete") {
  initGhostCursor()
} else {
  window.addEventListener("load", initGhostCursor)
}
