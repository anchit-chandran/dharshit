// Placeholder script to create carnation images in the DOM
document.addEventListener('DOMContentLoaded', function() {
    // Check if carnation images exist, if not, create placeholders
    function checkAndCreatePlaceholders() {
        const carnationBorder = document.querySelector('.carnation-border');
        const carnationDecoration = document.querySelector('.carnation-decoration');
        
        // Create placeholder for carnation border
        if (carnationBorder) {
            // Try to load the image
            const testImage = new Image();
            testImage.onload = function() {
                // Image exists, do nothing
            };
            testImage.onerror = function() {
                // Image doesn't exist, create a simple fallback
                carnationBorder.style.backgroundImage = 'none';
                carnationBorder.style.border = '2px dashed #FFFFFF';
                carnationBorder.style.height = '5px';
                carnationBorder.innerHTML = '<div style="text-align: center; color: white; font-size: 10px; margin-top: -15px;">White Carnation Border (Placeholder)</div>';
            };
            testImage.src = 'assets/images/carnation-border.png';
        }
        
        // Create placeholder for carnation decoration
        if (carnationDecoration) {
            // Try to load the image
            const testImage = new Image();
            testImage.onload = function() {
                // Image exists, do nothing
            };
            testImage.onerror = function() {
                // Image doesn't exist, create a simple fallback
                carnationDecoration.style.backgroundImage = 'none';
                carnationDecoration.style.border = '2px dashed #FFFFFF';
                carnationDecoration.style.height = '40px';
                carnationDecoration.innerHTML = '<div style="text-align: center; color: white; padding-top: 10px;">White Carnation Decoration (Placeholder)</div>';
            };
            testImage.src = 'assets/images/carnation-decoration.png';
        }
    }
    
    // Check after a small delay to ensure the DOM is fully loaded
    setTimeout(checkAndCreatePlaceholders, 500);
}); 