// Todo el contenido editable vive aquí: cambia nombres, objetos y mensajes a tu gusto.
const CONFIG = { name: "Ashley", cat: "Mimi" };

// Gerbera rosada dibujada en SVG (dos capas de pétalos y centro).
const GERBERA = (() => {
  const petals = (n, off, fill, ry) => Array.from({ length: n }, (_, i) =>
    `<ellipse cx="50" cy="${50 - ry - 6}" rx="5.5" ry="${ry}" fill="${fill}" transform="rotate(${i * 360 / n + off} 50 50)"/>`).join("");
  return `<svg viewBox="0 0 100 100" width="1em" height="1em" aria-hidden="true">${petals(16, 0, "#f06a9f", 20)}${petals(16, 11.25, "#ff9cc3", 15)}<circle cx="50" cy="50" r="12" fill="#ffd166"/><circle cx="50" cy="50" r="6.500" fill="#7a3b5c"/></svg>`;
})();

// x e y son porcentajes dentro de la escena.
const OBJECTS = [
  { id: "flor", icon: GERBERA, title: "Una gerbera para ti", x: 12, y: 26,
    text: "Si pudiera, te regalaría todas las gerberas del mundo. Por ahora te dejo esta, porque contigo todo florece un poquito más." },
  { id: "carta", icon: "💌", title: "Una cartita", x: 80, y: 10,
    text: "Quiero decirte que me hace inmensamente feliz tenerte en mi vida. Haces que hasta los días más comunes se sientan especiales." },
  { id: "estrella", icon: "⭐", title: "Tu estrella", x: 46, y: 4,
    text: "Admiro tu ternura, tu fuerza y esa forma tuya de brillar sin darte cuenta. Para mí, tú eres la estrella más bonita del cielo." },
  { id: "mariposa", icon: "🦋", title: "Mariposas", x: 88, y: 46,
    text: "Cada vez que sonríes siento mariposas en el estómago. Gracias por ser mi calma y mi alegría al mismo tiempo." },
  { id: "lazo", icon: "🎀", title: "Un lazo con deseo", x: 86, y: 76,
    text: "Este lazo es para atar un deseo: que este proximo año te abrace con cosas buenas, risas largas y todo lo que sueñas. Te lo mereces completito." },
  { id: "osito", icon: "🧸", title: "Un abrazo", x: 10, y: 66,
    text: "Quiero ser tu lugar seguro, tu abrazo cuando todo pese y tu compañía cuando todo salga bien. Te quiero muchísimo, Ashley." }
];

// Secreto aparte (no cuenta en el progreso). Abre el HTML que ya le enviaste.
const SECRET = {
  icon: "🌙", title: "Un secreto",
  text: "Encontraste algo que ya conocias, solo para ti: cien cosas que me gustan de ti. Y aun así me faltan muchas más.",
  url: "100-cosas.html", button: "Abrir mi secreto"
};

const CAT_LINES = [
  "Shhh… dicen que hay un secreto escondido en el cielo. Mira bien.",
  "¡Miau! Ashley, hoy eres la persona más importante del mundo.",
  "Dicen que los gatos sabemos cuándo alguien es especial. Tú lo eres.",
  "Hay tesoros escondidos por aquí. ¿Los ves?",
  "Alguien te quiere muchísimo. Y no soy yo, bueno, también.",
  "Hoy toca mimos, pastel y sonrisas."
];
const DRAG_LINES = ["¡Wiii! Qué paseo tan lindo.", "Aquí me quedo, contigo cerquita.", "¡Otra vez, otra vez!", "Desde aquí se ven mejor los tesoros."];
const PURR_LINES = ["Prrr… prrr…", "Qué rico se siente… prrr.", "Sigue así, no pares… prrr."];

const FINAL_MESSAGE =
  "Te quiero muchísimo y te amo con todo mi corazón. Eres mi Persona Favorita: " +
  "la persona que me hace sonreír sin esfuerzo y que vuelve bonito todo lo que toca. " +
  "Gracias por existir, por ser tal como eres y por dejarme quererte. " +
  "Que hoy tengas un día lleno de felicidad, y que yo pueda acompañarte en todos los que vienen. Te amo.";
