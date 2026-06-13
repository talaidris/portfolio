/* Name: Kanza Alam
* Student Number: 400528885
* Date created: April 12 2025
* Description: JavaScript for animating the MISA logo (bird and text) on the main pages.
*              This animation is not included on form pages.
*/

// creating image objects for the text and bird images in the logo
let logoText = new Image();
logoText.src = "images/logoAnimation/text.png";

let logoBird = new Image();
logoBird.src = "images/logoAnimation/bird.png";

// event listener that runs once the window has finished loading
window.addEventListener("load", function () {
    // get the canvas element and its 2D context for drawing
    let c = document.getElementById("animationCanvas");
    let ctx = c.getContext("2d");

    // variable declaration
    let timerId;
    let centerX, centerY;
    let textSize, birdWidth, birdHeight, birdX, birdY;
    let angle = 0;

    /**
    * Function to resize the canvas based on the window size. It also calculates the
    * position and size of the text and bird images in order to fit the new canvas size.
    *
    * @param {void}
    * @returns void
    */
    function resizeCanvas() {
        let displayWidth = c.clientWidth;
        let displayHeight = displayWidth * (130 / 190);

        let scale = window.devicePixelRatio || 1;
        c.width = displayWidth * scale;
        c.height = displayHeight * scale;
        ctx.setTransform(scale, 0, 0, scale, 0, 0);

        // calculate positions and sizes based on the canvas size
        centerX = displayWidth / 2;
        centerY = displayHeight / 2;
        textSize = displayWidth * 0.65;
        birdWidth = displayWidth * 0.65;
        birdHeight = birdWidth;
        birdX = centerX - birdWidth / 2;
        birdY = displayHeight + 40;
    }

    /**
    * Function to update the animation. It controls the movement of the bird image and rotates
    * the text part of the logo.
    *
    * @param {void}
    * @returns void
    */
    function updateAnimation() {
        let canvasHeight = c.height / (window.devicePixelRatio || 1);
        let targetY = canvasHeight * 0.05;

        if (birdY > targetY) {
            birdY -= 2.5;
        }

        // enable image smoothing for better visual quality
        ctx.imageSmoothingEnabled = true;

        ctx.clearRect(0, 0, c.width, c.height);

        if (angle < 2 * Math.PI) {
            angle += 0.1;
        }

        // save the current canvas state before drawing the rotating text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.drawImage(logoText, -textSize / 2, -textSize / 2, textSize, textSize);
        ctx.restore();

        // draw the bird image at its current position
        ctx.drawImage(logoBird, birdX, birdY, birdWidth, birdHeight);
    }

    /**
    * Function to start the animation. It initializes the canvas size and starts the animation loop.
    *
    * @param {void}
    * @returns void
    */
    function startAnimation() {
        resizeCanvas();
        timerId = setInterval(updateAnimation, 16);
    }

    // event listener to resize the canvas when the window size changes
    window.addEventListener("resize", resizeCanvas);

    // start the animation when the window finishes loading
    startAnimation();
});
