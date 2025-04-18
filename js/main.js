// Initialize RevealJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize RevealJS with all required options and plugins
    try {
        Reveal.initialize({
            controls: true, // Show control arrows
            progress: true,
            center: true,
            hash: false,
            transition: 'zoom',
            backgroundTransition: 'fade',
            mouseWheel: false,
            // Keep keyboard navigation enabled but customize
            keyboard: {
                37: 'prev', // left
                39: 'next', // right
                // Disable some keys
                38: null, // up
                40: null, // down
                32: null, // space
            },
            // Prevent auto-sliding
            autoSlide: 0,
            // No plugins for now to avoid ES module issues
            plugins: []
        });
        
        console.log('RevealJS initialized successfully');
    } catch (error) {
        console.error('Failed to initialize RevealJS:', error);
    }

    // Audio elements with error handling
    const introMusic = new Audio('assets/audio/thinking-out-loud.mp3');
    const finalMusic = new Audio('assets/audio/youre-all-i-want.mp3');
    
    // Handle audio loading errors
    introMusic.onerror = function() {
        console.log('Warning: Intro music could not be loaded.');
    };
    finalMusic.onerror = function() {
        console.log('Warning: Final music could not be loaded.');
    };
    
    introMusic.volume = 0.5;
    finalMusic.volume = 0.5;
    
    // Keep track of music state
    let musicPlaying = false;
    
    // Helper function to safely play audio
    function safePlayAudio(audioElement) {
        if (audioElement) {
            // Use a Promise to handle autoplay restrictions
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    musicPlaying = true;
                }).catch(error => {
                    console.log('Audio playback prevented by browser:', error);
                    // We'll still proceed with the presentation even if audio fails
                });
            }
        }
    }
    
    // Start button click handler
    document.getElementById('start-button').addEventListener('click', function() {
        // Try to start music
        safePlayAudio(introMusic);
        
        // Move to the first question - use try/catch in case Reveal isn't initialized
        try {
            if (typeof Reveal.next === 'function') {
                Reveal.next();
                console.log('Using RevealJS navigation');
            } else {
                console.warn('RevealJS not properly initialized, using backup navigation');
                // Handled by the fallback script in index.html
            }
        } catch (error) {
            console.error('Error during navigation:', error);
            // Fallback handled in index.html
        }
    });
    
    // Track the current question
    let currentQuestion = 1;
    
    // Define a function for safe navigation
    function safeNavigateNext() {
        try {
            if (typeof Reveal.next === 'function') {
                Reveal.next();
            } else {
                // Manual navigation
                const currentSlide = document.querySelector('.reveal .slides > section:not([style*="display: none"])');
                const allSlides = document.querySelectorAll('.reveal .slides > section');
                
                // Find current slide index
                let currentIndex = -1;
                for (let i = 0; i < allSlides.length; i++) {
                    if (allSlides[i] === currentSlide) {
                        currentIndex = i;
                        break;
                    }
                }
                
                if (currentIndex >= 0 && currentIndex < allSlides.length - 1) {
                    currentSlide.style.display = 'none';
                    allSlides[currentIndex + 1].style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Navigation error:', error);
            // Manual fallback
            const currentSlide = document.querySelector('.reveal .slides > section:not([style*="display: none"])');
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                currentSlide.style.display = 'none';
                nextSlide.style.display = 'block';
            }
        }
    }
    
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
                            safePlayAudio(finalMusic);
                        }
                    }
                    
                    safeNavigateNext();
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
    if (noButton) {
        noButton.addEventListener('mouseover', function(e) {
            // Calculate new position
            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 50);
            
            // Set new position
            noButton.style.position = 'absolute';
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
        });
    }
    
    // Handle Yes button click
    if (yesButton) {
        yesButton.addEventListener('click', function() {
            // Show celebration
            if (celebrationDiv) {
                celebrationDiv.style.display = 'block';
            }
            
            // Trigger confetti animation from animations.js
            if (typeof startCelebration === 'function') {
                startCelebration();
            }
            
            // Hide the no button
            if (noButton) {
                noButton.style.display = 'none';
            }
            
            // Transform the yes button
            yesButton.textContent = "❤️";
            yesButton.style.transform = "scale(1.5)";
            setTimeout(() => {
                yesButton.style.transform = "scale(1.0)";
            }, 500);
        });
    }
    
    // Adjust layout on slide change
    try {
        Reveal.addEventListener('slidechanged', function(event) {
            // If we're on the final slide, initialize glitter
            if (event.indexh === 4) { // Final slide index (0-based)
                if (typeof initGlitter === 'function') {
                    initGlitter();
                }
            }
        });
    } catch (error) {
        console.warn('Could not add Reveal slidechanged event listener:', error);
        
        // Set up a manual observer for slide changes
        const slides = document.querySelectorAll('.reveal .slides > section');
        slides.forEach(function(slide, index) {
            // Create an observer for each slide
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        mutation.attributeName === 'style' && 
                        slide.style.display !== 'none' && 
                        index === 4) {
                        // We're on the final slide
                        if (typeof initGlitter === 'function') {
                            initGlitter();
                        }
                    }
                });
            });
            
            observer.observe(slide, { attributes: true });
        });
    }
});

// Handle page visibility changes to pause/resume music
document.addEventListener('visibilitychange', function() {
    const introMusic = document.querySelector('audio[src*="thinking-out-loud"]');
    const finalMusic = document.querySelector('audio[src*="youre-all-i-want"]');
    
    if (document.hidden) {
        // Pause both audio tracks
        if (introMusic && !introMusic.paused) introMusic.pause();
        if (finalMusic && !finalMusic.paused) finalMusic.pause();
    } else {
        // Resume only the one that was playing
        try {
            const currentSlideIndex = Reveal.getIndices().h;
            if (currentSlideIndex < 4) {
                if (introMusic && !introMusic.paused) introMusic.play();
            } else {
                if (finalMusic && !finalMusic.paused) finalMusic.play();
            }
        } catch (error) {
            console.warn('Could not get current slide index:', error);
            // Just try to play both
            if (introMusic && !introMusic.paused) introMusic.play();
            if (finalMusic && !finalMusic.paused) finalMusic.play();
        }
    }
}); 