const progressBar = document.getElementById("reading-progress-bar")

if (progressBar) {
    function updateProgress() {
        // Get the total scrollable height
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        // Calculate progress percentage
        const scrollableHeight = documentHeight - windowHeight
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0

        // Update the progress bar width
        progressBar.style.width = `${progress}%`
    }

    // Update on scroll
    window.addEventListener("scroll", updateProgress, { passive: true })

    // Update on page load and resize
    window.addEventListener("load", updateProgress)
    window.addEventListener("resize", updateProgress)

    // Initial update
    updateProgress()

    // Update on navigation (for SPA)
    document.addEventListener("nav", () => {
        setTimeout(updateProgress, 100)
    })
}
