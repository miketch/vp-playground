document.addEventListener('DOMContentLoaded', () => {

    const positioningContainer = document.querySelector('.positioning-container');
    const itemCard = document.querySelector('.item-card');
    // We still need the apple image element to change its src
    const appleImage = document.getElementById('appleImage');
    const changingImage = document.getElementById('changingImage');

    // List of possible apple SVG versions
    const appleVersions = ['apple_v1.svg', 'apple_v2.svg', "apple_v3.svg"];

    // --- Helper Function to get random position (ONLY FOR ITEM CARD) ---
    function getRandomPosition(element) {
        const containerWidth = positioningContainer.offsetWidth;
        const containerHeight = positioningContainer.offsetHeight;
        const elementRect = element.getBoundingClientRect();
        const itemWidth = elementRect.width;
        const itemHeight = elementRect.height;
        const maxX = containerWidth > itemWidth ? containerWidth - itemWidth : 0;
        const maxY = containerHeight > itemHeight ? containerHeight - itemHeight : 0;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        return { x, y };
    }

    // --- Function to apply position (ONLY FOR ITEM CARD) ---
    function applyRandomPosition(element) {
        if (!element || !positioningContainer) return;
        const position = getRandomPosition(element);
        element.style.position = 'absolute';
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
    }

    // --- Function to set a random apple image source ---
    function setRandomAppleImage() {
        if (!appleImage) {
            console.error("Apple image element not found.");
            return;
        }
        // Decide which version to use (50% chance for each)
        const chosenVersion = appleVersions[Math.floor(Math.random() * 3)];
        appleImage.src = chosenVersion;
        // console.log("Apple version set to:", chosenVersion); // For debugging
    }


    // --- Function for subtle central image change ---
    function subtleImageChange() {
        if (!changingImage) {
             console.error("Central image element not found.");
             return;
        }
        changingImage.style.transform = 'scale(1)'; // Reset scale

        if (Math.random() < 0.5) { // 50% chance
            // 1. Cache Busting
            const currentSrc = changingImage.getAttribute('src');
            if (currentSrc) {
                try {
                    const url = new URL(currentSrc, window.location.origin);
                    const timestamp = Date.now() + Math.random().toString(36).substring(2);
                    url.searchParams.set('v', timestamp);
                    changingImage.src = url.toString();
                } catch (e) {
                    console.error("Error constructing URL for image:", e);
                     changingImage.src = `${currentSrc.split('?')[0]}?v=${Date.now()}`;
                }
            } else {
                 console.error("Central image src attribute is missing or empty.");
                 return;
            }

            // 2. Subtle Scale Change
            const scaleFactor = 1 + (Math.random() - 0.5) * 0.02; // +/- 0 to 1%
            changingImage.style.transform = `scale(${scaleFactor})`;
        }
    }

    // --- Initial Setup ---
    applyRandomPosition(itemCard);      // Position the item card randomly
    setRandomAppleImage();              // Set the apple image source randomly
    subtleImageChange();                // Apply subtle change to the central image

    // Optional: Re-randomize item card position on window resize (Apple stays put)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Only reposition the item card, not the apple
            applyRandomPosition(itemCard);
        }, 250);
    });

}); // End DOMContentLoaded
