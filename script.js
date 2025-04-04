document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.positioning-container');
    const items = document.querySelectorAll('.item-card');

    // Basic check to ensure container exists and has dimensions
    if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) {
        console.warn('Container not found or has no dimensions. Cannot position items.');
        return;
    }

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    items.forEach(item => {
        // Get item dimensions - needed for placing completely outside
        const itemWidth = item.offsetWidth;
        const itemHeight = item.offsetHeight;

        // Check if the item itself has dimensions (might be hidden initially)
        if (itemWidth === 0 || itemHeight === 0) {
             console.warn('Item has zero dimensions, skipping positioning:', item);
             // Optionally set a default position or just skip
             return;
        }

        let randomLeft;
        let randomTop;

        // Decide: 50% chance to be OUTSIDE, 50% chance to be INSIDE (original logic)
        if (Math.random() < 0.5) {
            // --- Place OUTSIDE the container ---

            // Choose a random side to place the item next to
            // 0: Top, 1: Right, 2: Bottom, 3: Left
            const side = Math.floor(Math.random() * 4);
            const margin = 10 + Math.random() * 40; // Add a small random gap (10px to 50px)

            switch (side) {
                case 0: // Place above the container
                    randomTop = -itemHeight - margin;
                    // Random horizontal position slightly wider than the container
                    randomLeft = Math.random() * (containerWidth + itemWidth) - (itemWidth / 2);
                    break;
                case 1: // Place to the right of the container
                    randomLeft = containerWidth + margin;
                     // Random vertical position slightly taller than the container
                    randomTop = Math.random() * (containerHeight + itemHeight) - (itemHeight / 2);
                    break;
                case 2: // Place below the container
                    randomTop = containerHeight + margin;
                    // Random horizontal position slightly wider than the container
                    randomLeft = Math.random() * (containerWidth + itemWidth) - (itemWidth / 2);
                    break;
                case 3: // Place to the left of the container
                    randomLeft = -itemWidth - margin;
                    // Random vertical position slightly taller than the container
                    randomTop = Math.random() * (containerHeight + itemHeight) - (itemHeight / 2);
                    break;
            }

        } else {
            // --- Place INSIDE (or partially overlapping) the container ---
            // Use the original logic: position the top-left corner anywhere within the container bounds

            const maxLeft = containerWidth;
            const maxTop = containerHeight;

            // Generate random positions based on the container dimensions
            randomLeft = Math.max(0, Math.floor(Math.random() * maxLeft));
            randomTop = Math.max(0, Math.floor(Math.random() * maxTop));
        }

        // Apply the calculated positions
        item.style.position = 'absolute'; // Ensure items are absolutely positioned
        item.style.left = `${randomLeft}px`;
        item.style.top = `${randomTop}px`;

        // Optional rotation can still be applied
        // const randomRotate = Math.floor(Math.random() * 10) - 5; // -5 to +5 degrees
        // item.style.transform = `rotate(${randomRotate}deg)`;
    });
});