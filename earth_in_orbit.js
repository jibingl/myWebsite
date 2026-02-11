// Earth In Orbit

window.onload = function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    let centerX, centerY;
    let orbitRadiusX, orbitRadiusY;

    let earthBaseRadius = 30,
        offsetSize = 20,
        orbitSpeed = 0.01,
        orbitAngle = 0;

    // Load earth texture
    const earthImg = new Image();
    earthImg.src = "imgs/apollo_17_blue_marble_photo_300x300.png";

    // Make canvas responsive
    function resizeCanvas() {
        // Match the canvas internal resolution to its rendered size
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width;        // redraw resolution
        canvas.height = rect.height;      // maintain crisp drawing

        // Update center based on new canvas size
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;

        // Scale orbits relative to canvas size
        orbitRadiusX = canvas.width * 0.25;   // 25% of width
        orbitRadiusY = canvas.height * 0.15;  // 15% of height
    }

    // Draw a circular clipped Earth image
    function drawEarth(x, y, radius) {
        if (!earthImg.complete) return; // wait for image to load

        context.save();
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.clip();

        // Draw the image centered inside circle
        context.drawImage(earthImg, x - radius, y - radius, radius * 2, radius * 2);

        context.restore();
    }

    // Animation
    function render() {
        const earthRadius = earthBaseRadius + Math.sin(orbitAngle) * offsetSize;

        // Remove any previouly drawn content
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Position Earth on its elliptical orbit.
        const x = centerX + Math.cos(orbitAngle) * orbitRadiusX;
        const y = centerY + Math.sin(orbitAngle) * orbitRadiusY;

        drawEarth(x, y, earthRadius);

        orbitAngle += orbitSpeed;

        requestAnimationFrame(render);
    }

    // Resize before starting animation
    resizeCanvas();
    requestAnimationFrame(render);

    // Handle dynamic resizing
    window.addEventListener("resize", resizeCanvas);
}