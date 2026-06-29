document.addEventListener('DOMContentLoaded', () => {
    const REDIRECT_URL = 'https://www.btaqa.io/join/c45789c8-97d3-4387-89f7-c25d1e2f1238';
    const REDIRECT_DELAY_MS = 10000; // 10 seconds
    let timeLeft = REDIRECT_DELAY_MS;
    let timer = null;
    
    const ctaBtn = document.getElementById('cta-btn');
    const countdownBar = document.getElementById('countdown-bar');
    const countdownText = document.getElementById('countdown-text');
    const video = document.getElementById('promo-video');
    const overlay = document.getElementById('interaction-overlay');
    const overlayStartBtn = document.getElementById('overlay-start-btn');

    // Force cache-busting for the video to ensure the new video reflects immediately
    if (video) {
        video.src = "video.mp4?v=" + new Date().getTime();
        video.load();
        video.muted = true; // Start muted for autoplay compliance
        
        // Autoplay muted immediately in the background
        const startAutoplay = () => {
            video.play().catch(error => {
                console.log("Muted autoplay failed:", error);
            });
        };
        startAutoplay();
        video.addEventListener('loadedmetadata', startAutoplay);
        video.addEventListener('canplay', startAutoplay);
    }

    // Function to start the 10-second countdown
    function startCountdown() {
        if (timer) return; // Prevent double initialization
        
        const intervalTime = 100;
        timer = setInterval(() => {
            timeLeft -= intervalTime;
            
            const progress = Math.max(0, timeLeft / REDIRECT_DELAY_MS);
            countdownBar.style.transform = `scaleX(${progress})`;
            
            const secondsRemaining = Math.ceil(timeLeft / 1000);
            countdownText.innerHTML = `سيتم توجيهك تلقائياً خلال <span class="countdown-seconds">${secondsRemaining}</span> ثوانٍ...`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                window.location.href = REDIRECT_URL;
            }
        }, intervalTime);
    }

    // Handle user interaction on the overlay to activate sound
    function handleStart() {
        if (overlay.classList.contains('hidden')) return;
        overlay.classList.add('hidden');
        
        if (video) {
            // Unmute and restart from the beginning so they hear the greeting from the start!
            video.muted = false;
            video.currentTime = 0;
            video.play().catch(err => {
                console.log("Audio play failed on interaction:", err);
            });
        }
        
        // Start the redirection timer now that they started
        startCountdown();
    }

    if (overlayStartBtn) {
        overlayStartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleStart();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', handleStart);
    }

    // Create water particles background
    function createWaterDrops() {
        const container = document.querySelector('.water-particles');
        if (!container) return;
        const dropCount = 30;
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = `${Math.random() * 100}%`;
            const height = 40 + Math.random() * 60;
            drop.style.height = `${height}px`;
            drop.style.width = '1px';
            drop.style.animationDuration = `${1.2 + Math.random() * 1.5}s`;
            drop.style.animationDelay = `${Math.random() * 3}s`;
            drop.style.opacity = `${0.1 + Math.random() * 0.35}`;
            container.appendChild(drop);
        }
    }
    createWaterDrops();
    
    // Backup CTA button click navigates immediately
    ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = REDIRECT_URL;
    });
});
