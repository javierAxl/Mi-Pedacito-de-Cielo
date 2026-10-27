// Guarda el progreso para que no se pierda al recargar.
const Store = {
  key: "ashley-cumple-v1",
  load() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; } },
  save(ids) { try { localStorage.setItem(this.key, JSON.stringify(ids)); } catch (e) {} },
  clear() { try { localStorage.removeItem(this.key); } catch (e) {} }
};
