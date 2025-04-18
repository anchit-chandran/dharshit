// Glitter animation for the final slide
function initGlitter() {
    const glitterContainer = document.getElementById('glitter-container');
    if (!glitterContainer) return;
    
    // Clear any existing glitter
    glitterContainer.innerHTML = '';
    
    // Create glitter particles
    for (let i = 0; i < 100; i++) {
        createGlitterParticle(glitterContainer);
    }
}

function createGlitterParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('glitter-particle');
    
    // Randomize size (3-6px)
    const size = 3 + Math.random() * 3;
    
    // Apply styles
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = getRandomColor();
    particle.style.boxShadow = `0 0 ${size}px ${size / 2}px ${getRandomColor()}`;
    
    // Set initial position (above the view)
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = '-20px';
    
    // Add to container
    container.appendChild(particle);
    
    // Animate falling
    animateGlitter(particle);
}

function getRandomColor() {
    const colors = [
        '#FFD700', // Gold
        '#FFFFFF', // White
        '#FF1493', // Pink
        '#800000', // Maroon
        '#FF4500', // Red-orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateGlitter(particle) {
    // Get container height
    const containerHeight = document.querySelector('.final-slide').offsetHeight;
    
    // Random animation duration (3-8 seconds)
    const duration = 3 + Math.random() * 5;
    
    // Random horizontal sway (-100px to 100px)
    const xSway = -100 + Math.random() * 200;
    
    // Create timeline
    const tl = gsap.timeline();
    
    tl.to(particle, {
        y: containerHeight + 50, // Move beyond container
        x: xSway,
        rotation: Math.random() * 360,
        duration: duration,
        ease: "power1.in",
        onComplete: () => {
            // Remove and recreate the particle
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createGlitterParticle(document.getElementById('glitter-container'));
            }
        }
    });
}

// Celebration animation for when "Yes" is clicked
function startCelebration() {
    // Create confetti explosion
    createConfetti();
    
    // Heart animation
    animateHearts();
}

function createConfetti() {
    const confettiCount = 200;
    const colors = ['#ff0000', '#ff4d00', '#ff0066', '#ff00bf', '#cc00ff', '#4d00ff', '#0000ff', '#0066ff', '#00ccff', '#00ffcc'];
    
    // Create confetti elements
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Randomize confetti shape (square, rectangle, or circle)
    const shapeType = Math.floor(Math.random() * 3);
    
    // Apply styles
    confetti.style.position = 'absolute';
    confetti.style.backgroundColor = color;
    confetti.style.opacity = Math.random() * 0.5 + 0.5;
    
    // Position at the center bottom of the screen
    confetti.style.left = '50%';
    confetti.style.bottom = '40%';
    
    // Set shape
    if (shapeType === 0) {
        // Square
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
    } else if (shapeType === 1) {
        // Rectangle
        const width = 5 + Math.random() * 10;
        const height = 5 + Math.random() * 10;
        confetti.style.width = `${width}px`;
        confetti.style.height = `${height}px`;
    } else {
        // Circle
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.borderRadius = '50%';
    }
    
    // Add to the document
    document.body.appendChild(confetti);
    
    // Animate
    animateConfetti(confetti);
}

function animateConfetti(confetti) {
    // Random horizontal direction (-300px to 300px)
    const xDirection = -300 + Math.random() * 600;
    
    // Random vertical direction (-100px to -500px)
    const yDirection = -100 - Math.random() * 400;
    
    // Animation duration (1-3 seconds)
    const duration = 1 + Math.random() * 2;
    
    // Random rotation
    const rotation = Math.random() * 720 - 360;
    
    // Create timeline
    const tl = gsap.timeline();
    
    tl.to(confetti, {
        x: xDirection,
        y: yDirection,
        rotation: rotation,
        opacity: 0,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
            // Remove the confetti from the DOM
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }
    });
}

function animateHearts() {
    // Number of hearts
    const heartCount = 30;
    
    // Create hearts
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100); // Stagger the creation
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Apply styles
    heart.style.position = 'absolute';
    heart.style.fontSize = `${20 + Math.random() * 30}px`;
    heart.style.opacity = '0';
    
    // Position at random spots around the bottom of the screen
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.bottom = '0';
    
    // Add to the document
    document.body.appendChild(heart);
    
    // Animate
    animateHeart(heart);
}

function animateHeart(heart) {
    // Random horizontal sway (-50px to 50px)
    const xSway = -50 + Math.random() * 100;
    
    // Random vertical distance (200px to 500px)
    const yDistance = -200 - Math.random() * 300;
    
    // Animation duration (2-5 seconds)
    const duration = 2 + Math.random() * 3;
    
    // Create timeline
    const tl = gsap.timeline();
    
    tl.to(heart, {
        opacity: 1,
        duration: 0.3
    }).to(heart, {
        x: xSway,
        y: yDistance,
        rotation: Math.random() * 40 - 20,
        opacity: 0,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
            // Remove the heart from the DOM
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }
    });
} 