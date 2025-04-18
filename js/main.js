// Initialize RevealJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize RevealJS with all required options and plugins
    try {
        Reveal.initialize({
            controls: true, // Show control arrows
            progress: true,
            center: true,
            hash: false,
            transition: 'zoom', // Use zoom transition
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
            plugins: [],
            // Add focus management to fix aria-hidden accessibility issues
            disableLayout: false,
            navigationMode: 'default',
            embedded: false,
            // Configure accessibility options
            a11y: {
                help: {
                    title: 'Help',
                    contents: 'Press arrow keys to navigate slides'
                }
            }
        });
        
        // Add event listener to manage focus on slide change
        Reveal.on('slidechanged', function(event) {
            // Remove focus from any elements in the hidden slide
            document.activeElement.blur();
            
            // Delay focus management to ensure DOM updates are complete
            setTimeout(function() {
                // Focus on the first focusable element in new slide if needed
                const newSlide = event.currentSlide;
                if (newSlide) {
                    // Start by focusing on the slide container itself for accessibility
                    newSlide.setAttribute('tabindex', '-1');
                    newSlide.focus();
                }
            }, 100);

            // Update progress bar
            updateProgressBar();
        });
        
        console.log('RevealJS initialized successfully');
    } catch (error) {
        console.error('Failed to initialize RevealJS:', error);
    }

    // Progress Bar Management
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const totalSlides = document.querySelectorAll('.reveal .slides > section').length;
    
    // Initial progress update
    updateProgressBar();
    
    function updateProgressBar() {
        let currentIndex = 0;
        
        try {
            currentIndex = Reveal.getIndices().h;
        } catch (error) {
            // If RevealJS isn't available, find the visible slide
            const slides = document.querySelectorAll('.reveal .slides > section');
            slides.forEach((slide, index) => {
                if (slide.style.display !== 'none') {
                    currentIndex = index;
                }
            });
        }
        
        // Calculate percentage
        const percentage = (currentIndex / (totalSlides - 1)) * 100;
        
        // Update the progress bar fill
        progressFill.style.width = `${percentage}%`;
        
        // Update the progress text with custom money values
        const moneyValues = [
            "Ready to become a Dharshillionaire?", 
            "£100", 
            "£69696969", 
            "£800000000854", 
            "£90843824783294708017489743918",
            "Dharshillionaire!"
        ];
        
        progressText.textContent = moneyValues[currentIndex];
    }

    // Audio elements with error handling
    const introMusic = new Audio('assets/audio/youre-all-i-want.mp3');
    const finalMusic = new Audio('assets/audio/thinking-out-loud.mp3');
    
    
    
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
        // Remove focus from the start button before navigating to avoid aria-hidden issues
        this.blur();
        
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
        
        // Update progress bar after navigation
        setTimeout(updateProgressBar, 100);
    });
    
    // Track the current question
    let currentQuestion = 1;
    
    // For Question 3, track which options have been selected
    const question3SelectedOptions = {
        'A': false,
        'B': false,
        'C': false,
        'D': false
    };
    
    // Define a function for safe navigation
    function safeNavigateNext() {
        // First remove focus from any active element to prevent aria-hidden issues
        if (document.activeElement) {
            document.activeElement.blur();
        }
        
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
                    // Before hiding current slide, ensure focus is removed
                    currentSlide.style.display = 'none';
                    allSlides[currentIndex + 1].style.display = 'block';
                    
                    // Make the next slide focusable for accessibility
                    allSlides[currentIndex + 1].setAttribute('tabindex', '-1');
                    // If needed, focus on the slide after a brief delay
                    setTimeout(() => {
                        allSlides[currentIndex + 1].focus();
                    }, 100);
                }
            }
            
            // Update progress bar after navigation
            setTimeout(updateProgressBar, 100);
        } catch (error) {
            console.error('Navigation error:', error);
            // Manual fallback
            const currentSlide = document.querySelector('.reveal .slides > section:not([style*="display: none"])');
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                currentSlide.style.display = 'none';
                nextSlide.style.display = 'block';
                
                // Add focus management to fallback too
                nextSlide.setAttribute('tabindex', '-1');
                setTimeout(() => {
                    nextSlide.focus();
                }, 100);
                
                // Update progress bar after fallback navigation
                setTimeout(updateProgressBar, 100);
            }
        }
    }
    
    // Add click handlers to all option buttons
    document.querySelectorAll('.option').forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove focus from button immediately to prevent aria-hidden issues
            this.blur();
            
            const isCorrect = button.getAttribute('data-correct') === 'true';
            
            // Check if we're on Question 3 (index starts at 0, so question3 is at index 2)
            let isQuestion3 = false;
            try {
                const currentSlideIndex = Reveal.getIndices().h;
                isQuestion3 = currentSlideIndex === 3; // Third slide (index 2) is Question 3
            } catch (error) {
                // Fallback if Reveal isn't available
                // Check if this button is inside question3 section
                isQuestion3 = button.closest('#question3') !== null;
            }
            
            if (isCorrect) {
                // Highlight the correct answer
                button.classList.add('correct');
                
                // If we're on Question 3, track the selected option and check if all options are selected
                if (isQuestion3) {
                    // Get the option letter from the button text (assumes format "A. Option text")
                    const optionLetter = button.textContent.trim()[0];
                    question3SelectedOptions[optionLetter] = true;
                    
                    // Disable the button so it can't be clicked again
                    button.disabled = true;
                    
                    // Check if all options have been selected for Question 3
                    const allSelected = Object.values(question3SelectedOptions).every(val => val === true);
                    
                    if (allSelected) {
                        // If all options are selected, proceed to next question after delay
                        setTimeout(function() {
                            currentQuestion++;
                            safeNavigateNext();
                        }, 1000);
                    }
                    
                    // If not all options are selected yet, don't proceed
                    return;
                }
                
                // For all other questions, proceed normally
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
                
                // Make sure the progress bar stays visible
                const progressContainer = document.querySelector('.progress-container');
                if (progressContainer) {
                    // Temporarily increase the z-index of the progress bar to keep it above the popup
                    const originalZIndex = progressContainer.style.zIndex;
                    progressContainer.style.zIndex = "10000";
                }
                
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
                    // Remove focus from this button too
                    this.blur();
                    
                    // Remove the popup
                    document.body.removeChild(popup);
                    
                    // Reset the button state
                    button.classList.remove('incorrect');
                    
                    // Restore the original z-index of the progress bar
                    if (progressContainer) {
                        progressContainer.style.zIndex = originalZIndex || "1000";
                    }
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
            const x = Math.random() * (window.innerWidth - 500);
            const y = Math.random() * (window.innerHeight - 500);
            
            // Set new position
            noButton.style.position = 'absolute';
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
        });
        
        noButton.addEventListener('blur', function() {
            // If the no button is moving, ensure focus is properly managed
            if (this.style.position === 'absolute') {
                this.blur();
            }
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
            
            // Set progress bar to 100% complete
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            if (progressFill && progressText) {
                progressFill.style.width = "100%";
                progressText.textContent = "Dharshillionaire!";
            }
            
            // Remove focus after click
            setTimeout(() => this.blur(), 10);
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