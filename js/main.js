// Initialize RevealJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize RevealJS
    Reveal.initialize({
        controls: false,
        progress: true,
        center: true,
        hash: false,
        transition: 'zoom',
        backgroundTransition: 'fade',
        mouseWheel: false,
        keyboard: true,
        // Disable navigation with arrow keys and space
        keyboard: {
            37: null, // left
            38: null, // up
            39: null, // right
            40: null, // down
            32: null, // space
        },
        // Prevent auto-sliding
        autoSlide: 0
    });

    // Audio elements
    const introMusic = new Audio('assets/audio/thinking-out-loud.mp3');
    const finalMusic = new Audio('assets/audio/youre-all-i-want.mp3');
    introMusic.volume = 0.5;
    finalMusic.volume = 0.5;
    
    // Keep track of music state
    let musicPlaying = false;
    
    // Start button click handler
    document.getElementById('start-button').addEventListener('click', function() {
        // Start music
        introMusic.play();
        musicPlaying = true;
        
        // Move to the first question
        Reveal.nextSlide();
    });
    
    // Track the current question
    let currentQuestion = 1;
    
    // Add click handlers to all option buttons
    document.querySelectorAll('.option').forEach(function(button) {
        button.addEventListener('click', function() {
            const isCorrect = button.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                // Highlight the correct answer
                button.classList.add('correct');
                
                // Wait a moment before moving to the next slide
                setTimeout(function() {
                    currentQuestion++;
                    
                    // If this was the last question, switch the music
                    if (currentQuestion > 4) {
                        if (musicPlaying) {
                            introMusic.pause();
                            finalMusic.play();
                        }
                    }
                    
                    Reveal.next();
                }, 1000);
            } else {
                // Show "Are you sure?" prompt
                button.classList.add('incorrect');
                
                // Create a popup for "Are you sure"
                const popup = document.createElement('div');
                popup.classList.add('are-you-sure-popup');
                popup.innerHTML = `
                    <div class="popup-content">
                        <h3>Are you sure?</h3>
                        <p>Think again! ❤️</p>
                        <button class="try-again-btn">Try Again</button>
                    </div>
                `;
                document.body.appendChild(popup);
                
                // Add event listener to the try again button
                popup.querySelector('.try-again-btn').addEventListener('click', function() {
                    // Remove the popup
                    document.body.removeChild(popup);
                    
                    // Reset the button state
                    button.classList.remove('incorrect');
                });
            }
        });
    });
    
    // Handle the final slide buttons
    const noButton = document.getElementById('no-button');
    const yesButton = document.getElementById('yes-button');
    const celebrationDiv = document.getElementById('celebration');
    
    // Make the No button run away from the cursor
    noButton.addEventListener('mouseover', function(e) {
        // Calculate new position
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        
        // Set new position
        noButton.style.position = 'absolute';
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    });
    
    // Handle Yes button click
    yesButton.addEventListener('click', function() {
        // Show celebration
        celebrationDiv.style.display = 'block';
        
        // Trigger confetti animation from animations.js
        startCelebration();
        
        // Hide the no button
        noButton.style.display = 'none';
        
        // Transform the yes button
        yesButton.textContent = "❤️";
        yesButton.style.transform = "scale(1.5)";
        setTimeout(() => {
            yesButton.style.transform = "scale(1.0)";
        }, 500);
    });
    
    // Adjust layout on slide change
    Reveal.addEventListener('slidechanged', function(event) {
        // If we're on the final slide, initialize glitter
        if (event.indexh === 4) { // Final slide index (0-based)
            initGlitter();
        }
    });
});

// Handle page visibility changes to pause/resume music
document.addEventListener('visibilitychange', function() {
    const introMusic = document.querySelector('audio[src*="thinking-out-loud"]');
    const finalMusic = document.querySelector('audio[src*="youre-all-i-want"]');
    
    if (document.hidden) {
        // Pause both audio tracks
        if (introMusic) introMusic.pause();
        if (finalMusic) finalMusic.pause();
    } else {
        // Resume only the one that was playing
        const currentSlideIndex = Reveal.getIndices().h;
        if (currentSlideIndex < 4) {
            if (introMusic && !introMusic.paused) introMusic.play();
        } else {
            if (finalMusic && !finalMusic.paused) finalMusic.play();
        }
    }
}); 