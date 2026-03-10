// Matrix rain
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|アイウエオカキクケコサシスセソタチツテト';
const fontSize = 14;
let drops = [];

function initDrops() {
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * -50);
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  ctx.fillStyle = 'rgba(3, 11, 3, 0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const brightness = Math.random();
    if (brightness > 0.95) {
      ctx.fillStyle = '#ffffff';
    } else if (brightness > 0.7) {
      ctx.fillStyle = '#00ff41';
    } else {
      ctx.fillStyle = '#005c1a';
    }
    ctx.font = `${fontSize}px "DM Mono", monospace`;
    ctx.fillText(char, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i] += 0.5;
  });
}

setInterval(drawMatrix, 50);

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.dataset.delay = i % 4;
  observer.observe(el);
});
