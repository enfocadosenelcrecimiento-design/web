export const DEFAULT_LEVELS = {
  basico: {
    nombre: "Nivel Básico",
    color: [0.18, 0.8, 0.44, 1],
    dark: [0.07, 0.38, 0.2, 1],
    tiempo: 60,
    preguntas: [
      { p: "¿Cuánto es 8 + 5?", o: ["12", "13", "14", "15"], r: "13", exp: "8 + 5 se cuenta como 8, 9, 10, 11, 12, 13." },
      { p: "¿Cuánto es 7 × 6?", o: ["36", "40", "42", "48"], r: "42", exp: "7 grupos de 6 forman 42." },
      { p: "Vendes 3 gelatinas a $15. ¿Total?", o: ["30", "35", "40", "45"], r: "45", exp: "3 × 15 = 45." },
      { p: "¿Cuánto es 9 × 8?", o: ["63", "72", "81", "64"], r: "72", exp: "9 × 8 = 72." },
      { p: "Cobras $35 y pagan con $100. Cambio:", o: ["55", "65", "75", "85"], r: "65", exp: "100 - 35 = 65." },
      { p: "¿Cuánto es 5 × 12?", o: ["55", "60", "65", "70"], r: "60", exp: "5 × 12 = 60." }
    ]
  },
  intermedio: {
    nombre: "Nivel Intermedio",
    color: [1, 0.58, 0.08, 1],
    dark: [0.55, 0.27, 0.02, 1],
    tiempo: 90,
    preguntas: [
      { p: "1/2 + 1/4 = ?", o: ["2/6", "3/4", "1/4", "1/2"], r: "3/4", exp: "1/2 equivale a 2/4; 2/4 + 1/4 = 3/4." },
      { p: "3/5 en decimal:", o: ["0.3", "0.5", "0.6", "0.8"], r: "0.6", exp: "3 dividido entre 5 es 0.6." },
      { p: "25% de 80 = ?", o: ["15", "20", "25", "30"], r: "20", exp: "25% es la cuarta parte; 80 / 4 = 20." },
      { p: "2/3 + 1/6 = ?", o: ["3/9", "5/6", "1/2", "3/6"], r: "5/6", exp: "2/3 equivale a 4/6; 4/6 + 1/6 = 5/6." },
      { p: "7/10 como porcentaje:", o: ["17%", "57%", "70%", "77%"], r: "70%", exp: "7/10 equivale a 70/100, es decir 70%." },
      { p: "Simplifica: 8/12", o: ["1/2", "2/3", "3/4", "4/6"], r: "2/3", exp: "Divide 8 y 12 entre 4: 8/12 = 2/3." }
    ]
  },
  preavanzado: {
    nombre: "Nivel Avanzado",
    color: [0.9, 0.22, 0.32, 1],
    dark: [0.42, 0.07, 0.13, 1],
    tiempo: 120,
    preguntas: [
      { p: "¿Cuánto es 3^2?", o: ["6", "9", "12", "18"], r: "9", exp: "3^2 significa 3 × 3, que vale 9." },
      { p: "¿Cuál es la raíz de 49?", o: ["6", "7", "8", "9"], r: "7", exp: "7 × 7 = 49, por eso la raíz cuadrada es 7." },
      { p: "x + 4 = 10  ->  x = ?", o: ["4", "5", "6", "10"], r: "6", exp: "Resta 4 a ambos lados: x = 10 - 4 = 6." },
      { p: "2x = 14  ->  x = ?", o: ["5", "6", "7", "8"], r: "7", exp: "Divide entre 2: x = 14 / 2 = 7." },
      { p: "3x - 5 = 10  ->  x = ?", o: ["3", "4", "5", "6"], r: "5", exp: "Suma 5 y divide entre 3: 15 / 3 = 5." },
      { p: "Área cuadrado lado 6", o: ["12", "24", "36", "48"], r: "36", exp: "El área del cuadrado es lado × lado: 6 × 6 = 36." }
    ]
  }
};

export const PHYSICAL_CHALLENGES = [
  "PAUSA: Estírate hacia arriba por 5 seg.",
  "PAUSA: Gira tu cuello suavemente 3 veces.",
  "PAUSA: Cierra los ojos y respira hondo 3 veces.",
  "PAUSA: Levántate y da 5 saltos pequeños."
];

export const STORY_ZONES = {
  basico: { name: "Bosque de Sumas", crystal: "Cristal Verde", unlocks: "intermedio" },
  intermedio: { name: "Mercado de Fracciones", crystal: "Cristal Dorado", unlocks: "preavanzado" },
  preavanzado: { name: "Torre del Álgebra", crystal: "Cristal Rojo", unlocks: null }
};

export const BOSSES = {
  basico: {
    name: "Guardián del Bosque",
    needed: 3,
    maxHp: 3,
    taunts: ["Mis raíces son profundas.", "El bosque cuenta contigo.", "Una suma más y cederé."],
    hit: "Las hojas brillan con tu respuesta.",
    miss: "El guardián lanza semillas espinosas."
  },
  intermedio: {
    name: "Mercader de Fracciones",
    needed: 3,
    maxHp: 3,
    taunts: ["Nada se vende sin equivalencias.", "Divide bien tus ideas.", "El mercado escucha."],
    hit: "La balanza de fracciones se inclina a tu favor.",
    miss: "El mercader mezcla los denominadores."
  },
  preavanzado: {
    name: "Señor de la Torre",
    needed: 4,
    maxHp: 4,
    taunts: ["La incógnita protege mi torre.", "Despeja con cuidado.", "El álgebra exige precisión."],
    hit: "Una grieta aparece en la torre.",
    miss: "La torre responde con un rayo algebraico."
  }
};

export const AVATARS = {
  maga: { name: "Mago Numérica", img: "assets/avatar-maga.png", icon: "✦", color: "#7c6cff" },
  explorador: { name: "Explorador", img: "assets/avatar-explorador.png", icon: "◆", color: "#2ecc71" },
  robot: { name: "Robot Lógico", img: "assets/avatar-robot.png", icon: "▣", color: "#38bdf8" },
  caballera: { name: "Guardian", img: "assets/avatar-guardiana.png", icon: "▲", color: "#f59e0b" }
};

export const ACHIEVEMENTS = {
  streak5: { title: "Racha brillante", desc: "Responde 5 preguntas correctas seguidas." },
  noLivesLost: { title: "Intocable", desc: "Termina una práctica sin perder vidas." },
  fastExam: { title: "Velocidad mental", desc: "Termina un examen usando menos de la mitad del tiempo." },
  daily3: { title: "Constancia", desc: "Completa retos diarios durante 3 días seguidos." },
  forestBoss: { title: "Héroe del bosque", desc: "Vence al jefe del Bosque de Sumas." },
  rich100: { title: "Bolsa de cristales", desc: "Consigue 100 monedas acumuladas." }
};

export const POWER_SHOP = {
  congelar: { name: "Congelar tiempo", cost: 50, desc: "Detiene el reloj durante 5 segundos." },
  eliminar: { name: "Eliminar opción", cost: 40, desc: "Quita una respuesta incorrecta." },
  doble: { name: "Doble puntos", cost: 60, desc: "La siguiente respuesta correcta vale doble." },
  pista: { name: "Pista", cost: 35, desc: "Muestra una ayuda corta para la pregunta actual." },
  extraTiempo: { name: "Tiempo extra", cost: 70, desc: "Agrega 15 segundos en examen." }
};

export const THEME_SHOP = {
  bosque: { name: "Tema bosque", cost: 90, desc: "Verdes, madera y energía de aventura.", className: "theme-bosque" },
  galaxia: { name: "Tema galaxia", cost: 110, desc: "Azules profundos con brillo espacial.", className: "theme-galaxia" },
  lava: { name: "Tema lava", cost: 100, desc: "Contrastes calientes para jefes intensos.", className: "theme-lava" },
  hielo: { name: "Tema hielo", cost: 100, desc: "Tonos claros y fríos para practicar con calma.", className: "theme-hielo" }
};

export const MISSIONS = {
  tenSums: { title: "Responde 10 sumas correctamente", target: 10, metric: "sumasCorrectas" },
  noPowerWin: { title: "Gana una partida sin usar poderes", target: 1, metric: "victoriasSinPoderes" },
  forestBoss: { title: "Vence al jefe del bosque", target: 1, metric: "jefeBosque" },
  coins100: { title: "Consigue 100 monedas", target: 100, metric: "monedasGanadas" }
};

export const OPTION_COLORS = ["#f24355", "#258ee8", "#edae1e", "#8b55dd"];
export const DATA_KEY = "mathquest_web_data";

export function createProfile(id, name, seed = {}) {
  const story = seed.story || {};
  const stats = seed.stats || {};
  const inventario = seed.inventario || {};

  return {
    id,
    name,
    avatar: seed.avatar && AVATARS[seed.avatar] ? seed.avatar : "maga",
    scores: seed.scores || {},
    monedas: seed.monedas || 0,
    inventario: {
      congelar: inventario.congelar || 0,
      eliminar: inventario.eliminar || 0,
      doble: inventario.doble || 0,
      pista: inventario.pista || 0,
      extraTiempo: inventario.extraTiempo || 0,
      tema: inventario.tema || "oscuro",
      temas: Array.isArray(inventario.temas) ? inventario.temas : ["oscuro"]
    },
    achievements: seed.achievements || {},
    stats: {
      correctas: stats.correctas || 0,
      preguntas: stats.preguntas || 0,
      sumasCorrectas: stats.sumasCorrectas || 0,
      mejorRacha: stats.mejorRacha || 0,
      monedasGanadas: stats.monedasGanadas || 0,
      victoriasSinPoderes: stats.victoriasSinPoderes || 0,
      jefeBosque: stats.jefeBosque || 0
    },
    daily: {
      lastDate: seed.daily?.lastDate || "",
      streak: seed.daily?.streak || 0,
      completed: seed.daily?.completed || {}
    },
    story: {
      unlocked: Array.isArray(story.unlocked) && story.unlocked.length ? story.unlocked : ["basico"],
      crystals: story.crystals || {}
    }
  };
}

export function normalizeData(raw) {
  const migrated = raw && typeof raw === "object" ? raw : {};

  if (!migrated.profiles) {
    const profile = createProfile("p1", "Alumno 1", {
      scores: migrated.scores || {},
      monedas: migrated.monedas || 0,
      inventario: migrated.inventario || {}
    });

    return { activeProfileId: "p1", profiles: [profile], ranking: migrated.ranking || [] };
  }

  const profiles = migrated.profiles.map((profile, index) => (
    createProfile(profile.id || `p${index + 1}`, profile.name || `Alumno ${index + 1}`, profile)
  ));

  return {
    activeProfileId: migrated.activeProfileId || profiles[0]?.id || "p1",
    profiles: profiles.length ? profiles : [createProfile("p1", "Alumno 1")],
    ranking: Array.isArray(migrated.ranking) ? migrated.ranking : []
  };
}

export function loadData() {
  try {
    return normalizeData(JSON.parse(localStorage.getItem(DATA_KEY) || "{}"));
  } catch {
    return normalizeData({});
  }
}

export function saveData(state) {
  localStorage.setItem(DATA_KEY, JSON.stringify(state.data));
}

export function activeProfile(state) {
  return state.data.profiles.find((profile) => profile.id === state.data.activeProfileId)
    || state.data.profiles[0];
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}
