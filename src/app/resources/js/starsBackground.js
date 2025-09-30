class StarsBackground {
    constructor(container) {
        this.container = container;
        this.stars = [];
        this.numStars = 40; // Number of stars
        this.init();
    }

    init() {
        this.createStars();
        this.animateStars();
    }

    createStars() {
        // Clear any existing stars
        this.container.innerHTML = '';
        this.stars = [];

        for (let i = 0; i < this.numStars; i++) {
            const star = this.createStar();
            this.container.appendChild(star);
            this.stars.push({
                element: star,
                x: parseFloat(star.style.left),
                y: parseFloat(star.style.top),
                vx: (Math.random() - 0.5) * 0.5, // Horizontal velocity
                vy: (Math.random() - 0.5) * 0.5, // Vertical velocity
                opacity: parseFloat(star.style.opacity),
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (smaller stars)
        const size = Math.random() * 3 + 1; // 1-4px
        
        // Random opacity for varying brightness
        const opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0
        
        star.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
        `;
        
        return star;
    }

    animateStars() {
        this.stars.forEach(star => {
            // Update position
            star.x += star.vx;
            star.y += star.vy;
            
            // Wrap around edges
            if (star.x > 100) star.x = 0;
            if (star.x < 0) star.x = 100;
            if (star.y > 100) star.y = 0;
            if (star.y < 0) star.y = 100;
            
            // Update twinkling effect
            star.opacity += star.twinkleSpeed * star.twinkleDirection;
            if (star.opacity >= 1) {
                star.opacity = 1;
                star.twinkleDirection = -1;
            } else if (star.opacity <= 0.2) {
                star.opacity = 0.2;
                star.twinkleDirection = 1;
            }
            
            // Apply changes to DOM
            star.element.style.left = star.x + '%';
            star.element.style.top = star.y + '%';
            star.element.style.opacity = star.opacity;
        });
        
        requestAnimationFrame(() => this.animateStars());
    }

    resize() {
        // Recreate stars on resize to maintain proper distribution
        this.createStars();
    }

    // Export current stars configuration as PNG
    exportToPNG() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match container
        const rect = this.container.getBoundingClientRect();
        canvas.width = rect.width || 800;
        canvas.height = rect.height || 600;
        
        // Create black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        this.stars.forEach(star => {
            const x = (star.x / 100) * canvas.width;
            const y = (star.y / 100) * canvas.height;
            const size = parseFloat(star.element.style.width);
            
            ctx.globalAlpha = star.opacity;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Download the image
        const link = document.createElement('a');
        link.download = 'stars-background.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Initialize stars when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const starsContainers = document.querySelectorAll('.stars-container');
    const starsBackgrounds = [];
    
    starsContainers.forEach(container => {
        const starsBackground = new StarsBackground(container);
        starsBackgrounds.push(starsBackground);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        starsBackgrounds.forEach(starsBackground => {
            starsBackground.resize();
        });
    });
});