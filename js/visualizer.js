export function createVisualizer(audioElement, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  let raf = null;
  let audioCtx = null;
  let analyser = null;
  let source = null;
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildParticles();
  }

  function initAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function buildParticles() {
    particles.length = 0;
    const count = Math.floor(canvas.width / 25);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2,
        speed: 0.2 + Math.random() * 0.4,
        opacity: 0.1 + Math.random() * 0.3
      });
    }
  }

  function drawRing(bass) {
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.35;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.18;
    const radius = baseRadius + bass * 80;
    const glow = 10 + bass * 40;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201, 168, 108, 0.7)';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(201, 168, 108, 0.8)';
    ctx.shadowBlur = glow;
    ctx.stroke();
    ctx.restore();
  }

  function drawParticles(mid) {
    for (const p of particles) {
      p.y -= p.speed * (1 + mid);
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      const alpha = p.opacity * (0.6 + mid * 0.8);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgba(245, 240, 235, ${0.08 + mid * 0.25})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1 + mid * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!analyser) {
      raf = requestAnimationFrame(loop);
      return;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    const low = data.slice(0, 10);
    const mid = data.slice(10, 60);
    const bass = low.reduce((a, b) => a + b, 0) / low.length / 255;
    const midEnergy = mid.reduce((a, b) => a + b, 0) / mid.length / 255;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRing(bass);
    drawParticles(midEnergy);

    raf = requestAnimationFrame(loop);
  }

  function start() {
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    resize();
    if (!raf) loop();
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  window.addEventListener('resize', resize);

  return { start, stop, resize };
}
