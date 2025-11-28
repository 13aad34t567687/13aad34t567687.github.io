
const splash = document.querySelector('.splash-page') as HTMLElement
const enterBtn = document.getElementById('enter-btn')
const title = document.querySelector('.splash-title')
const subtitle = document.querySelector('.splash-subtitle')

// Check if already visited in this session
if (sessionStorage.getItem('splash-visited')) {
    if (splash) splash.style.display = 'none'
} else {
    // Initial animation sequence
    setTimeout(() => {
        if (title) title.classList.add('visible')
    }, 300)

    setTimeout(() => {
        if (subtitle) subtitle.classList.add('visible')
    }, 1000)

    setTimeout(() => {
        if (enterBtn) enterBtn.classList.add('visible')
    }, 1800)
}

if (enterBtn && splash) {
    enterBtn.addEventListener('click', () => {
        // Exit animation
        splash.classList.add('exiting')

        // Wait for animation to finish
        setTimeout(() => {
            splash.style.display = 'none'
            sessionStorage.setItem('splash-visited', 'true')

            // Trigger content entry animation if needed
            document.body.classList.add('content-visible')
        }, 1000)
    })
}
