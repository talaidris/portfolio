(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'bgCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    var ctx = canvas.getContext('2d');
    var dots = [];
    var mouseX = -10000;
    var mouseY = -10000;
    var isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Configuration
    var bgColor = '#000000';
    var dotColor = 'rgba(45, 33, 75, 0.5)';
    var dotRadius = 2;
    var spacing = 20;
    var maxDisplacement = 20;
    var influenceRadius = 200;

    function resize() {
        var rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        generateDots();
    }

    function generateDots() {
        dots = [];
        var cols = Math.ceil(canvas.width / spacing) + 2;
        var rows = Math.ceil(canvas.height / spacing) + 2;
        for (var y = -spacing; y < canvas.height + spacing; y += spacing) {
            for (var x = -spacing; x < canvas.width + spacing; x += spacing) {
                dots.push({
                    ox: x,
                    oy: y,
                    x: x,
                    y: y
                });
            }
        }
    }

    function updateDots() {
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            var dx = mouseX - dot.ox;
            var dy = mouseY - dot.oy;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < influenceRadius && dist > 0) {
                var strength = 1 - dist / influenceRadius;
                var displace = strength * maxDisplacement;
                var angle = Math.atan2(dy, dx);
                dot.x = dot.ox + Math.cos(angle) * displace;
                dot.y = dot.oy + Math.sin(angle) * displace;
            } else {
                dot.x += (dot.ox - dot.x) * 0.1;
                dot.y += (dot.oy - dot.y) * 0.1;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = dotColor;
        for (var i = 0; i < dots.length; i++) {
            var dot = dots[i];
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        updateDots();
        draw();
        requestAnimationFrame(animate);
    }

    function onMouseMove(e) {
        var rect = canvas.getBoundingClientRect();
        var clientX = e.clientX || e.touches[0].clientX;
        var clientY = e.clientY || e.touches[0].clientY;
        mouseX = clientX - rect.left;
        mouseY = clientY - rect.top;
    }

    function onMouseLeave() {
        mouseX = -10000;
        mouseY = -10000;
    }

    if (isMobile) {
        document.addEventListener('touchmove', onMouseMove, { passive: true });
        document.addEventListener('touchstart', onMouseMove, { passive: true });
    } else {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
    }

    window.addEventListener('resize', resize);

    resize();
    animate();
})();