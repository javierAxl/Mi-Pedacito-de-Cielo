const UI = {
  el: id => document.getElementById(id),
  timer: null,

  init() {
    this.renderItems();
    this.renderProgress();
    this.bindCat();
    this.el("close").onclick = () => this.closeModal();
    this.el("secret").onclick = () => this.openSecret();
    this.el("blow").onclick = () => this.blow();
    this.el("again").onclick = () => { Game.reset(); location.reload(); };
    if (Game.done()) this.finale();
    else this.say(`¡Hola, ${CONFIG.name}! Soy ${CONFIG.cat}. Acaríciame y busca los tesoros escondidos.`, 6000);
  },

  say(text, ms = 3500) {
    const b = this.el("bubble");
    b.textContent = text;
    b.classList.add("on");
    clearTimeout(this.timer);
    this.timer = setTimeout(() => b.classList.remove("on"), ms);
  },

  renderItems() {
    const field = this.el("field");
    OBJECTS.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "item";
      b.style.cssText = `left:${o.x}%;top:${o.y}%;animation-delay:${i * .7}s`;
      b.setAttribute("aria-label", "Objeto escondido: tócalo para descubrirlo");
      b.innerHTML = o.icon;
      b.hidden = Game.has(o.id);
      b.onclick = () => this.open(o, b);
      field.appendChild(b);
    });
  },

  renderProgress() {
    const n = Game.found.length, t = OBJECTS.length;
    this.el("fill").style.width = (n / t * 100) + "%";
    this.el("count").textContent = `${n} de ${t} tesoros encontrados`;
    this.el("tray").innerHTML = OBJECTS.map(o =>
      Game.has(o.id) ? `<span class="on" title="${o.title}">${o.icon}</span>` : `<span>♡</span>`).join("");
  },

  open(o, btn) {
    const r = btn.getBoundingClientRect();
    Game.collect(o.id);
    btn.hidden = true;
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 26);
    this.el("mIcon").innerHTML = o.icon;
    this.el("mTitle").textContent = o.title;
    this.el("mText").textContent = o.text;
    this.secretOpen = false;
    this.el("mLink").hidden = true;
    this.el("close").className = "btn";
    this.el("close").textContent = Game.done() ? "Ver mi sorpresa" : "Guardar en mi colección";
    this.el("modal").hidden = false;
    this.el("close").focus();
    this.renderProgress();
  },

  openSecret() {
    FX.burst(innerWidth - 30, 30, 30, true);
    this.secretOpen = true;
    this.el("mIcon").textContent = SECRET.icon;
    this.el("mTitle").textContent = SECRET.title;
    this.el("mText").textContent = SECRET.text;
    this.el("mLink").href = SECRET.url;
    this.el("mLink").textContent = SECRET.button;
    this.el("mLink").hidden = false;
    this.el("close").className = "link";
    this.el("close").textContent = "Ahora no";
    this.el("modal").hidden = false;
    this.el("mLink").focus();
  },

  closeModal() {
    this.el("modal").hidden = true;
    if (this.secretOpen) { this.secretOpen = false; return; }
    if (Game.done()) {
      this.say("¡Los encontraste todos! Mira lo que preparé para ti…", 3000);
      setTimeout(() => this.finale(), 1200);
    } else {
      const left = OBJECTS.length - Game.found.length;
      this.say(`¡Bien! Faltan ${left}.`);
    }
  },

  bindCat() {
    const c = this.el("cat"), wrap = this.el("catWrap"), field = this.el("field");
    let drag = null, moved = false, hover = 0;
    const heartsAtCat = n => {
      const r = c.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height * .3, n, true);
    };
    c.onpointerdown = e => {
      const f = field.getBoundingClientRect(), w = wrap.getBoundingClientRect();
      drag = { x: e.clientX, y: e.clientY, cx: w.left + w.width / 2 - f.left, bottom: f.bottom - w.bottom };
      moved = false;
      c.setPointerCapture(e.pointerId);
    };
    c.onpointermove = e => {
      if (!drag) {
        if (++hover % 25 === 0) { this.say(pick(PURR_LINES), 2500); heartsAtCat(6); }
        return;
      }
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      if (!moved) { moved = true; wrap.classList.add("dragging"); }
      const f = field.getBoundingClientRect(), w = wrap.getBoundingClientRect(), half = w.width / 2;
      const cx = Math.min(Math.max(drag.cx + dx, half), f.width - half);
      const bottom = Math.min(Math.max(drag.bottom - dy, 0), f.height - w.height);
      wrap.style.left = (cx / f.width * 100) + "%";
      wrap.style.bottom = bottom + "px";
    };
    const end = () => {
      if (!drag) return;
      drag = null;
      wrap.classList.remove("dragging");
      if (moved) { this.say(pick(DRAG_LINES)); heartsAtCat(5); }
    };
    c.onpointerup = end;
    c.onpointercancel = end;
    c.onclick = () => {
      if (moved) { moved = false; return; }
      this.say(pick(CAT_LINES));
      c.classList.remove("hop"); void c.offsetWidth; c.classList.add("hop");
      heartsAtCat(8);
    };
  },

  finale() {
    this.el("fTitle").textContent = `¡Feliz cumpleaños, ${CONFIG.name}!`;
    this.el("fText").textContent = FINAL_MESSAGE;
    this.el("finale").hidden = false;
    this.el("blow").focus();
    [.2, .5, .8].forEach((p, i) =>
      setTimeout(() => FX.burst(innerWidth * p, innerHeight * .4, 40, i === 1), 500 + i * 350));
    FX.rain(6000);
  },

  blow() {
    this.el("cake").classList.add("out");
    this.el("blow").hidden = true;
    this.el("wish").hidden = false;
    FX.burst(innerWidth / 2, innerHeight / 2, 70);
    FX.rain(3000);
  }
};
