const pick = arr => arr[Math.floor(Math.random() * arr.length)];

const Game = {
  found: [],
  init() { this.found = Validation.cleanIds(Store.load()); },
  has(id) { return this.found.includes(id); },
  collect(id) { if (!this.has(id)) { this.found.push(id); Store.save(this.found); } },
  done() { return this.found.length === OBJECTS.length; },
  reset() { this.found = []; Store.clear(); }
};

// Confeti y corazones en un canvas a pantalla completa.
const FX = {
  cv: null, cx: null, ps: [], run: false,
  reduce: matchMedia("(prefers-reduced-motion: reduce)").matches,
  colors: ["#f9b8d2", "#e86a9a", "#ffd6e8", "#bfe3f5", "#fff1a8", "#d9c2f0"],
  init() {
    this.cv = document.getElementById("fx");
    this.cx = this.cv.getContext("2d");
    const fit = () => { this.cv.width = innerWidth; this.cv.height = innerHeight; };
    fit(); addEventListener("resize", fit);
  },
  burst(x, y, n = 30, heart = false, down = false) {
    if (this.reduce) n = Math.min(n, 8);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 6;
      this.ps.push({
        x, y, life: 1, size: 8 + Math.random() * 10, c: this.colors[i % this.colors.length],
        vx: down ? (Math.random() - .5) * 2 : Math.cos(a) * s,
        vy: down ? 1 + Math.random() * 3 : Math.sin(a) * s - 3,
        h: heart || Math.random() < .3
      });
    }
    if (!this.run) { this.run = true; requestAnimationFrame(() => this.tick()); }
  },
  rain(ms = 4000) {
    const end = Date.now() + ms;
    const t = setInterval(() => {
      if (Date.now() > end) return clearInterval(t);
      this.burst(Math.random() * innerWidth, -10, 4, false, true);
    }, 120);
  },
  tick() {
    const c = this.cx;
    c.clearRect(0, 0, this.cv.width, this.cv.height);
    this.ps = this.ps.filter(p => p.life > 0 && p.y < this.cv.height + 20);
    for (const p of this.ps) {
      p.x += p.vx; p.y += p.vy; p.vy += .12; p.life -= .006;
      c.globalAlpha = Math.max(p.life, 0); c.fillStyle = p.c;
      if (p.h) { c.font = p.size * 1.6 + "px sans-serif"; c.fillText("♥", p.x, p.y); }
      else c.fillRect(p.x, p.y, p.size * .6, p.size);
    }
    c.globalAlpha = 1;
    if (this.ps.length) requestAnimationFrame(() => this.tick()); else this.run = false;
  }
};
