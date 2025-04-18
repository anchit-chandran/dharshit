// Debug helper script to identify issues
document.addEventListener('DOMContentLoaded', function() {
    // Create a simple debug panel
    const debugPanel = document.createElement('div');
    debugPanel.style.position = 'fixed';
    debugPanel.style.top = '10px';
    debugPanel.style.right = '10px';
    debugPanel.style.padding = '10px';
    debugPanel.style.background = 'rgba(0, 0, 0, 0.7)';
    debugPanel.style.color = 'white';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.zIndex = '9999';
    debugPanel.style.maxWidth = '300px';
    debugPanel.style.maxHeight = '200px';
    debugPanel.style.overflow = 'auto';
    debugPanel.style.borderRadius = '5px';
    debugPanel.style.border = '1px solid #444';
    debugPanel.style.display = 'none'; // Hidden by default
    debugPanel.innerHTML = '<h3 style="margin: 0 0 5px 0; font-size: 14px;">Debug Panel</h3><div id="debug-content"></div>';
    
    // Add a toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Debug';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '10px';
    toggleButton.style.right = '10px';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.padding = '3px 8px';
    toggleButton.style.fontSize = '10px';
    toggleButton.style.background = '#333';
    toggleButton.style.color = 'white';
    toggleButton.style.border = '1px solid #555';
    toggleButton.style.borderRadius = '3px';
    toggleButton.style.cursor = 'pointer';
    
    // Toggle debug panel
    toggleButton.addEventListener('click', function() {
        if (debugPanel.style.display === 'none') {
            debugPanel.style.display = 'block';
            updateDebugInfo();
        } else {
            debugPanel.style.display = 'none';
        }
    });
    
    document.body.appendChild(debugPanel);
    document.body.appendChild(toggleButton);
    
    // Function to update debug info
    function updateDebugInfo() {
        if (debugPanel.style.display === 'none') return;
        
        const debugContent = document.getElementById('debug-content');
        
        // Gather relevant debug information
        let infoHTML = '';
        
        // Check RevealJS status
        infoHTML += '<p><strong>RevealJS:</strong> ';
        try {
            if (typeof Reveal === 'undefined') {
                infoHTML += '<span style="color: red;">Not loaded</span>';
            } else if (typeof Reveal.next !== 'function') {
                infoHTML += '<span style="color: orange;">Loaded but not properly initialized</span>';
            } else {
                infoHTML += '<span style="color: green;">Initialized</span>';
                try {
                    const indices = Reveal.getIndices();
                    infoHTML += ` (Current slide: ${indices.h})`;
                } catch (e) {
                    infoHTML += ' (Cannot get current slide)';
                }
            }
        } catch (e) {
            infoHTML += '<span style="color: red;">Error: ' + e.message + '</span>';
        }
        infoHTML += '</p>';
        
        // Check visible slides
        infoHTML += '<p><strong>Visible slides:</strong> ';
        const allSlides = document.querySelectorAll('.reveal .slides > section');
        let visibleCount = 0;
        let visibleIndices = [];
        allSlides.forEach((slide, index) => {
            if (slide.style.display !== 'none') {
                visibleCount++;
                visibleIndices.push(index);
            }
        });
        infoHTML += `${visibleCount} (Indices: ${visibleIndices.join(', ')})</p>`;
        
        // Add event handlers status
        infoHTML += '<p><strong>Start button:</strong> ';
        const startButton = document.getElementById('start-button');
        if (startButton) {
            infoHTML += 'Found';
            // Test if it has event listeners
            const clonedButton = startButton.cloneNode(true);
            infoHTML += (startButton.onclick || startButton !== clonedButton) ? 
                '<span style="color: green;"> (Has event handler)</span>' : 
                '<span style="color: red;"> (No event handler)</span>';
        } else {
            infoHTML += '<span style="color: red;">Not found</span>';
        }
        infoHTML += '</p>';
        
        // Display manual navigation controls
        infoHTML += '<p><button id="debug-prev" style="margin-right: 10px;">Prev</button><button id="debug-next">Next</button></p>';
        
        debugContent.innerHTML = infoHTML;
        
        // Add handlers to debug navigation buttons
        document.getElementById('debug-prev').addEventListener('click', function() {
            try {
                if (typeof Reveal.prev === 'function') {
                    Reveal.prev();
                } else {
                    manualNavigate('prev');
                }
                setTimeout(updateDebugInfo, 100);
            } catch (e) {
                manualNavigate('prev');
                setTimeout(updateDebugInfo, 100);
            }
        });
        
        document.getElementById('debug-next').addEventListener('click', function() {
            try {
                if (typeof Reveal.next === 'function') {
                    Reveal.next();
                } else {
                    manualNavigate('next');
                }
                setTimeout(updateDebugInfo, 100);
            } catch (e) {
                manualNavigate('next');
                setTimeout(updateDebugInfo, 100);
            }
        });
    }
    
    // Manual navigation function
    function manualNavigate(direction) {
        const allSlides = document.querySelectorAll('.reveal .slides > section');
        let currentIndex = -1;
        
        for (let i = 0; i < allSlides.length; i++) {
            if (allSlides[i].style.display !== 'none') {
                currentIndex = i;
                break;
            }
        }
        
        if (currentIndex >= 0) {
            if (direction === 'next' && currentIndex < allSlides.length - 1) {
                allSlides[currentIndex].style.display = 'none';
                allSlides[currentIndex + 1].style.display = 'block';
            } else if (direction === 'prev' && currentIndex > 0) {
                allSlides[currentIndex].style.display = 'none';
                allSlides[currentIndex - 1].style.display = 'block';
            }
        }
    }
    
    // Update debug info periodically
    setInterval(updateDebugInfo, 2000);
}); 