const Validation = {
  // Descarta ids guardados que ya no existan en OBJECTS.
  cleanIds(ids) {
    if (!Array.isArray(ids)) return [];
    const valid = new Set(OBJECTS.map(o => o.id));
    return [...new Set(ids.filter(id => valid.has(id)))];
  },
  // Avisa en la consola si falta algún dato al editar data.js.
  checkData() {
    OBJECTS.forEach(o => {
      const ok = o.id && o.icon && o.title && o.text && o.x >= 0 && o.x <= 100 && o.y >= 0 && o.y <= 100;
      if (!ok) console.warn("Objeto con datos incompletos:", o.id || o);
    });
  }
};
