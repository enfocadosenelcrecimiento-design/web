const DEFAULT_LEVELS = {
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

const PHYSICAL_CHALLENGES = [
  "PAUSA: Estírate hacia arriba por 5 seg.",
  "PAUSA: Gira tu cuello suavemente 3 veces.",
  "PAUSA: Cierra los ojos y respira hondo 3 veces.",
  "PAUSA: Levántate y da 5 saltos pequeños."
];

const STORY_ZONES = {
  basico: { name: "Bosque de Sumas", crystal: "Cristal Verde", unlocks: "intermedio" },
  intermedio: { name: "Mercado de Fracciones", crystal: "Cristal Dorado", unlocks: "preavanzado" },
  preavanzado: { name: "Torre del Álgebra", crystal: "Cristal Rojo", unlocks: null }
};

const BOSSES = {
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

const AVATARS = {
  maga: { name: "Mago Numérica", img: "assets/avatar-maga.png", icon: "✦", color: "#7c6cff" },
  explorador: { name: "Explorador", img: "assets/avatar-explorador.png", icon: "◆", color: "#2ecc71" },
  robot: { name: "Robot Lógico", img: "assets/avatar-robot.png", icon: "▣", color: "#38bdf8" },
  caballera: { name: "Guardian", img: "assets/avatar-guardiana.png", icon: "▲", color: "#f59e0b" }
};

const ACHIEVEMENTS = {
  streak5: { title: "Racha brillante", desc: "Responde 5 preguntas correctas seguidas." },
  noLivesLost: { title: "Intocable", desc: "Termina una práctica sin perder vidas." },
  fastExam: { title: "Velocidad mental", desc: "Termina un examen usando menos de la mitad del tiempo." },
  daily3: { title: "Constancia", desc: "Completa retos diarios durante 3 días seguidos." },
  forestBoss: { title: "Héroe del bosque", desc: "Vence al jefe del Bosque de Sumas." },
  rich100: { title: "Bolsa de cristales", desc: "Consigue 100 monedas acumuladas." }
};

const POWER_SHOP = {
  congelar: { name: "Congelar tiempo", cost: 50, desc: "Detiene el reloj durante 5 segundos." },
  eliminar: { name: "Eliminar opción", cost: 40, desc: "Quita una respuesta incorrecta." },
  doble: { name: "Doble puntos", cost: 60, desc: "La siguiente respuesta correcta vale doble." },
  pista: { name: "Pista", cost: 35, desc: "Muestra una ayuda corta para la pregunta actual." },
  extraTiempo: { name: "Tiempo extra", cost: 70, desc: "Agrega 15 segundos en examen." }
};

const THEME_SHOP = {
  bosque: { name: "Tema bosque", cost: 90, desc: "Verdes, madera y energía de aventura.", className: "theme-bosque" },
  galaxia: { name: "Tema galaxia", cost: 110, desc: "Azules profundos con brillo espacial.", className: "theme-galaxia" },
  lava: { name: "Tema lava", cost: 100, desc: "Contrastes calientes para jefes intensos.", className: "theme-lava" },
  hielo: { name: "Tema hielo", cost: 100, desc: "Tonos claros y fríos para practicar con calma.", className: "theme-hielo" }
};

const MISSIONS = {
  tenSums: { title: "Responde 10 sumas correctamente", target: 10, metric: "sumasCorrectas" },
  noPowerWin: { title: "Gana una partida sin usar poderes", target: 1, metric: "victoriasSinPoderes" },
  forestBoss: { title: "Vence al jefe del bosque", target: 1, metric: "jefeBosque" },
  coins100: { title: "Consigue 100 monedas", target: 100, metric: "monedasGanadas" }
};

const OPTION_COLORS = ["#f24355", "#258ee8", "#edae1e", "#8b55dd"];
const DATA_KEY = "mathquest_web_data";
const app = document.querySelector("#app");
const okSound = document.querySelector("#sound-ok");
const errorSound = document.querySelector("#sound-error");

let levels = normalizeLevels(DEFAULT_LEVELS);
let timerId = null;
let quiz = null;

const state = {
  data: loadData()
};

function createProfile(id, name, seed = {}) {
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

function normalizeData(raw) {
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

function loadData() {
  try {
    return normalizeData(JSON.parse(localStorage.getItem(DATA_KEY) || "{}"));
  } catch {
    return normalizeData({});
  }
}

function saveData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(state.data));
}

function activeProfile() {
  return state.data.profiles.find((profile) => profile.id === state.data.activeProfileId)
    || state.data.profiles[0];
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function applyTheme(profile = activeProfile()) {
  const theme = profile?.inventario?.tema || "oscuro";
  document.body.className = "";
  if (THEME_SHOP[theme]) document.body.classList.add(THEME_SHOP[theme].className);
}

function missionProgress(profile, mission) {
  return Math.min(profile.stats?.[mission.metric] || 0, mission.target);
}

function missionPercent(profile, mission) {
  return Math.round((missionProgress(profile, mission) / mission.target) * 100);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function avatarImage(avatar, className = "avatar-img") {
  const data = avatar || AVATARS.maga;
  return `
    <img class="${className}" src="${esc(data.img)}" alt="${esc(data.name)}" onerror="this.remove();">
    <span class="avatar-fallback">${esc(data.icon)}</span>
  `;
}

function rgba(parts, alpha = parts[3] ?? 1) {
  const [r, g, b] = parts;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(items, count) {
  return shuffle(items).slice(0, count);
}

function play(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function goMenu() {
  quiz = null;
  clearTimer();
  renderMenu();
}

function getBestScore(...scores) {
  return scores
    .filter(Boolean)
    .reduce((best, current) => (!best || current.pts > best.pts ? current : best), null);
}

function getLevelProgress(profile, levelKey) {
  const practica = profile.scores[`${levelKey}_practica`];
  const examen = profile.scores[`${levelKey}_examen`];
  const best = getBestScore(practica, examen);
  const total = best?.total || ((levels[levelKey]?.preguntas?.length || 6) + (BOSSES[levelKey]?.needed || 3));
  const scorePct = best ? best.pts / Math.max(best.total, 1) : 0;
  const crystalBoost = profile.story.crystals[levelKey] ? 1 : scorePct;
  const unlocked = profile.story.unlocked.includes(levelKey);

  return {
    best,
    total,
    unlocked,
    complete: !!profile.story.crystals[levelKey],
    percent: unlocked ? Math.round(Math.min(crystalBoost, 1) * 100) : 0
  };
}

function getProfileProgress(profile) {
  const keys = Object.keys(STORY_ZONES);
  const crystals = keys.filter((key) => profile.story.crystals[key]).length;
  const unlocked = keys.filter((key) => profile.story.unlocked.includes(key)).length;
  const bestScores = Object.values(profile.scores || {});
  const bestPoints = bestScores.reduce((sum, score) => sum + (score?.pts || 0), 0);
  const questions = profile.stats?.preguntas || 0;
  const correct = profile.stats?.correctas || 0;
  const percent = Math.round((crystals / Math.max(keys.length, 1)) * 100);

  return {
    crystals,
    unlocked,
    totalZones: keys.length,
    bestPoints,
    questions,
    correct,
    accuracy: questions ? Math.round((correct / questions) * 100) : 0,
    percent,
    achievements: Object.keys(profile.achievements || {}).length
  };
}

function normalizeLevels(source) {
  return Object.fromEntries(Object.entries(source).map(([key, level]) => {
    const defaults = DEFAULT_LEVELS[key]?.preguntas || [];
    const preguntas = (level.preguntas || []).map((question, index) => ({
      ...question,
      exp: question.exp || defaults[index]?.exp || "Revisa la operación paso a paso."
    }));
    return [key, { ...level, preguntas }];
  }));
}

function makeQuestion(p, options, answer, exp, tipo = "math", extra = {}) {
  return { p, o: shuffle([...new Set(options.map(String))]).slice(0, 4), r: String(answer), exp, tipo, ...extra };
}

function numberOptions(answer, spread = 12) {
  const values = new Set([answer]);
  while (values.size < 4) {
    const wrong = answer + randomInt(-spread, spread);
    if (wrong >= 0 && wrong !== answer) values.add(wrong);
  }
  return [...values].map(String);
}

function generateBasicQuestion() {
  const kind = sample(["sum", "sub", "mul", "money", "input", "order", "visualCoins", "truefalse"], 1)[0];
  if (kind === "sum") {
    const a = randomInt(6, 35);
    const b = randomInt(4, 28);
    return makeQuestion(`¿Cuánto es ${a} + ${b}?`, numberOptions(a + b), a + b, `${a} + ${b} = ${a + b}.`, "math", { skill: "sum" });
  }
  if (kind === "sub") {
    const a = randomInt(25, 90);
    const b = randomInt(5, a - 5);
    return makeQuestion(`¿Cuánto es ${a} - ${b}?`, numberOptions(a - b), a - b, `${a} - ${b} = ${a - b}.`);
  }
  if (kind === "input") {
    const a = randomInt(10, 40);
    const b = randomInt(5, 30);
    return makeQuestion(`Escribe la respuesta: ${a} + ${b}`, [], a + b, `${a} + ${b} = ${a + b}.`, "input", { skill: "sum" });
  }
  if (kind === "order") {
    const a = randomInt(12, 30);
    const b = randomInt(6, 18);
    const steps = [`Escribe ${a} + ${b}`, `Suma unidades`, `Obtén ${a + b}`];
    return makeQuestion(`Ordena los pasos para resolver ${a} + ${b}`, [], steps.join("|"), `${a} + ${b} = ${a + b}.`, "order", { steps, skill: "sum" });
  }
  if (kind === "visualCoins") {
    const coins = sample([2, 3, 4, 5, 6], 1)[0];
    const value = sample([5, 10], 1)[0];
    return makeQuestion(`Cada moneda vale $${value}. ¿Cuánto hay en total?`, numberOptions(coins * value, 15), coins * value, `${coins} monedas de ${value} valen ${coins * value}.`, "visual", { visual: { type: "coins", count: coins, label: `$${value}` } });
  }
  if (kind === "truefalse") {
    const a = randomInt(3, 10);
    const b = randomInt(3, 10);
    const shown = Math.random() > 0.5 ? a * b : a * b + sample([-2, -1, 1, 2], 1)[0];
    const answer = shown === a * b ? "Verdadero" : "Falso";
    return makeQuestion(`${a} × ${b} = ${shown}`, ["Verdadero", "Falso"], answer, `${a} × ${b} = ${a * b}.`, "truefalse");
  }
  if (kind === "money") {
    const units = randomInt(2, 7);
    const price = sample([8, 10, 12, 15, 20], 1)[0];
    return makeQuestion(`Compras ${units} productos de $${price}. ¿Total?`, numberOptions(units * price), units * price, `${units} × ${price} = ${units * price}.`);
  }
  const a = randomInt(3, 12);
  const b = randomInt(3, 12);
  return makeQuestion(`¿Cuánto es ${a} × ${b}?`, numberOptions(a * b), a * b, `${a} × ${b} = ${a * b}.`);
}

function generateIntermediateQuestion() {
  const kind = sample(["percent", "decimal", "fraction", "fill", "visualFraction", "visualPercent", "truefalse"], 1)[0];
  if (kind === "percent") {
    const pct = sample([10, 20, 25, 50, 75], 1)[0];
    const base = randomInt(4, 16) * 10;
    const answer = base * pct / 100;
    return makeQuestion(`${pct}% de ${base} = ?`, numberOptions(answer, 20), answer, `${pct}% de ${base} se calcula como ${base} × ${pct / 100} = ${answer}.`);
  }
  if (kind === "decimal") {
    const n = randomInt(1, 9);
    return makeQuestion(`${n}/10 como decimal:`, [`0.${n}`, `${n}.0`, `0.${Math.max(n - 1, 0)}`, `0.${Math.min(n + 1, 9)}`], `0.${n}`, `${n}/10 equivale a 0.${n}.`);
  }
  if (kind === "fill") {
    const n = randomInt(2, 8);
    return makeQuestion(`Completa: ${n}/10 = ____%`, [], n * 10, `${n}/10 equivale a ${n * 10}/100, es decir ${n * 10}%.`, "fill", { suffix: "%" });
  }
  if (kind === "visualFraction") {
    const numerator = randomInt(1, 5);
    return makeQuestion(`La barra muestra ${numerator}/6. ¿Qué fracción representa?`, [`${numerator}/6`, `${numerator}/5`, `${numerator + 1}/6`, `1/${numerator}`], `${numerator}/6`, `${numerator} de 6 partes están iluminadas.`, "visual", { visual: { type: "fraction", numerator, denominator: 6 } });
  }
  if (kind === "visualPercent") {
    const pct = sample([20, 30, 40, 50, 75], 1)[0];
    return makeQuestion(`Observa la barra de 100%. ¿Qué porcentaje está marcado?`, [`${pct}%`, `${pct + 10}%`, `${Math.max(10, pct - 10)}%`, `${pct / 10}%`], `${pct}%`, `La barra marca ${pct} de cada 100 partes.`, "visual", { visual: { type: "percent", percent: pct } });
  }
  if (kind === "truefalse") {
    const answer = Math.random() > 0.5;
    return makeQuestion(`1/2 equivale a ${answer ? "50%" : "25%"}`, ["Verdadero", "Falso"], answer ? "Verdadero" : "Falso", "1/2 es la mitad de 100%, por eso equivale a 50%.", "truefalse");
  }
  const numerator = randomInt(1, 4);
  const answer = `${numerator + 1}/6`;
  return makeQuestion(`${numerator}/6 + 1/6 = ?`, [answer, `${numerator}/12`, `${numerator + 2}/6`, "1/6"], answer, `Tienen el mismo denominador: ${numerator}/6 + 1/6 = ${answer}.`);
}

function generateAdvancedQuestion() {
  const kind = sample(["algebra", "square", "area", "input", "order", "geometry", "truefalse"], 1)[0];
  if (kind === "square") {
    const n = randomInt(4, 12);
    return makeQuestion(`¿Cuánto es ${n}^2?`, numberOptions(n * n, 25), n * n, `${n}^2 significa ${n} × ${n} = ${n * n}.`);
  }
  if (kind === "area") {
    const side = randomInt(5, 14);
    return makeQuestion(`Área de un cuadrado de lado ${side}:`, numberOptions(side * side, 30), side * side, `Área = lado × lado = ${side} × ${side} = ${side * side}.`);
  }
  if (kind === "input") {
    const x = randomInt(4, 14);
    const factor = randomInt(2, 5);
    return makeQuestion(`Escribe x: ${factor}x = ${factor * x}`, [], x, `Divide ${factor * x} entre ${factor}: x = ${x}.`, "input");
  }
  if (kind === "order") {
    const x = randomInt(3, 10);
    const add = randomInt(3, 9);
    const steps = [`x + ${add} = ${x + add}`, `Resta ${add} a ambos lados`, `x = ${x}`];
    return makeQuestion(`Ordena los pasos para despejar x`, [], steps.join("|"), `Al restar ${add}, queda x = ${x}.`, "order", { steps });
  }
  if (kind === "geometry") {
    const side = randomInt(3, 8);
    return makeQuestion(`El cuadrado tiene lado ${side}. ¿Cuál es su área?`, numberOptions(side * side, 18), side * side, `Área = lado × lado = ${side * side}.`, "visual", { visual: { type: "square", side } });
  }
  if (kind === "truefalse") {
    const x = randomInt(2, 9);
    const shown = Math.random() > 0.5 ? x : x + 1;
    return makeQuestion(`Si x + 3 = ${x + 3}, entonces x = ${shown}`, ["Verdadero", "Falso"], shown === x ? "Verdadero" : "Falso", `x = ${x + 3} - 3 = ${x}.`, "truefalse");
  }
  const x = randomInt(3, 12);
  const add = randomInt(2, 12);
  return makeQuestion(`x + ${add} = ${x + add}. ¿x = ?`, numberOptions(x, 8), x, `Resta ${add}: x = ${x + add} - ${add} = ${x}.`);
}

function generateQuestion(levelKey, boss = false) {
  const generators = {
    basico: generateBasicQuestion,
    intermedio: generateIntermediateQuestion,
    preavanzado: generateAdvancedQuestion
  };
  let question = (generators[levelKey] || generateBasicQuestion)();
  if (boss) {
    let guard = 0;
    while ((!question.o || question.o.length < 2) && guard < 8) {
      question = (generators[levelKey] || generateBasicQuestion)();
      guard += 1;
    }
    if (!question.o || question.o.length < 2) {
      question = makeQuestion("Golpe final: 6 × 7 = ?", ["36", "40", "42", "48"], "42", "6 × 7 = 42.");
    }
  }
  question.generated = true;
  if (boss) question.tipo = "boss";
  return question;
}

function enrichQuestions(levelKey, baseQuestions) {
  const fixed = sample(baseQuestions || [], Math.min(3, (baseQuestions || []).length));
  const generated = Array.from({ length: 5 }, () => generateQuestion(levelKey));
  return shuffle([...fixed, ...generated]).slice(0, 6);
}

function unlockAchievement(profile, key) {
  if (profile.achievements[key]) return false;
  profile.achievements[key] = new Date().toISOString();
  return true;
}

function unlockStory(profile, levelKey) {
  const zone = STORY_ZONES[levelKey];
  if (!zone) return false;
  profile.story.crystals[levelKey] = true;
  if (zone.unlocks && !profile.story.unlocked.includes(zone.unlocks)) {
    profile.story.unlocked.push(zone.unlocks);
  }
  return true;
}

async function boot() {
  renderSplash();
  if (window.location.protocol !== "file:") {
    try {
      const res = await fetch("data/niveles.json", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === "object") levels = normalizeLevels(json);
      }
    } catch {
      levels = normalizeLevels(DEFAULT_LEVELS);
    }
  }
  setTimeout(renderMenu, 850);
}

function renderSplash() {
  app.innerHTML = `
    <section class="screen splash">
      <h1>MathQuest</h1>
      <p>Aprende matemáticas de manera dinámica</p>
    </section>
  `;
}

function renderMenu() {
  clearTimer();
  const profile = activeProfile();
  applyTheme(profile);
  const avatar = AVATARS[profile.avatar] || AVATARS.maga;
  const progress = getProfileProgress(profile);
  const cards = Object.entries(levels).map(([key, level]) => {
    const color = rgba(level.color || [1, 1, 1, 1]);
    const practica = profile.scores[`${key}_practica`];
    const examen = profile.scores[`${key}_examen`];
    const best = getBestScore(practica, examen);
    const locked = !profile.story.unlocked.includes(key);
    const record = best ? `Récord: ${best.pts}/${best.total}` : "Sin récord";
    const zone = STORY_ZONES[key];
    const progress = getLevelProgress(profile, key);

    return `
      <article class="card level-card ${locked ? "locked-card" : ""}" style="--accent:${color}">
        <div class="level-head">
          <h2 class="level-name" style="color:${color}">${esc(level.nombre || key)}</h2>
          <span class="record">${locked ? "Bloqueado" : record}</span>
        </div>
        <div class="meta">${esc(zone?.name || "Zona libre")} · ${profile.story.crystals[key] ? esc(zone.crystal) : "Cristal pendiente"}</div>
        <div class="zone-progress"><span style="width:${progress.percent}%"></span></div>
        <div class="actions">
          <button class="btn" style="background:${color}" data-start="${key}" data-mode="practica" ${locked ? "disabled" : ""}>Práctica</button>
          <button class="btn secondary" data-start="${key}" data-mode="examen" ${locked ? "disabled" : ""}>Examen</button>
        </div>
        <div class="meta">Jefe final: ${esc(BOSSES[key]?.name || "Jefe")} · ${level.tiempo || 0}s examen</div>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">MathQuest</h1>
          <p class="subtitle">Perfil: ${esc(profile.name)} · Recupera cristales matemáticos</p>
        </div>
        <div class="wallet">$ ${profile.monedas} pts</div>
      </header>
      <section class="adventure-status">
        <div class="avatar-badge" style="--avatar:${avatar.color}">
          ${avatarImage(avatar)}
        </div>
        <div class="adventure-copy">
          <strong>${esc(avatar.name)}</strong>
          <span>${progress.crystals}/${progress.totalZones} cristales · ${progress.unlocked} zonas abiertas · ${progress.achievements} logros</span>
          <div class="mini-progress"><span style="width:${progress.percent}%"></span></div>
        </div>
        <button class="btn map-btn" data-story>Ver mapa</button>
      </section>
      <div class="toolbar">
        <button class="btn secondary" data-profiles>Perfiles</button>
        <button class="btn" data-daily>Reto del día</button>
        <button class="btn shop" data-shop>Tienda</button>
        <button class="btn secondary" data-story>Mapa</button>
        <button class="btn secondary" data-progress-view>Mi avance</button>
        <button class="btn secondary" data-teacher>Maestro</button>
        <button class="btn secondary" data-achievements>Logros</button>
        <button class="btn secondary" data-ranking>Ranking</button>
      </div>
      <section class="levels">${cards}</section>
    </section>
  `;

  app.querySelector("[data-profiles]").addEventListener("click", renderProfiles);
  app.querySelector("[data-daily]").addEventListener("click", renderDaily);
  app.querySelector("[data-shop]").addEventListener("click", renderShop);
  app.querySelector("[data-progress-view]").addEventListener("click", renderProgress);
  app.querySelector("[data-teacher]").addEventListener("click", renderTeacher);
  app.querySelectorAll("[data-story]").forEach((btn) => {
    btn.addEventListener("click", renderStory);
  });
  app.querySelector("[data-achievements]").addEventListener("click", renderAchievements);
  app.querySelector("[data-ranking]").addEventListener("click", renderRanking);
  app.querySelectorAll("[data-start]").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.start, btn.dataset.mode));
  });
}

function renderProfiles() {
  const avatarOptions = Object.entries(AVATARS).map(([key, avatar]) => `
    <label class="avatar-option">
      <input type="radio" name="avatar" value="${key}" ${key === activeProfile().avatar ? "checked" : ""}>
      <span style="--avatar:${avatar.color}">${avatarImage(avatar, "avatar-thumb")}</span>
      ${esc(avatar.name)}
    </label>
  `).join("");

  const profileCards = state.data.profiles.map((profile) => `
    <article class="card profile-card ${profile.id === state.data.activeProfileId ? "active-profile" : ""}">
      <div class="avatar-mini" style="--avatar:${(AVATARS[profile.avatar] || AVATARS.maga).color}">
        ${avatarImage(AVATARS[profile.avatar] || AVATARS.maga, "avatar-thumb")}
      </div>
      <div>
        <h3>${esc(profile.name)}</h3>
        <p>${profile.monedas} pts · ${Object.keys(profile.achievements).length} logros · ${Object.keys(profile.story.crystals).length} cristales</p>
        <div class="avatar-switch">
          ${Object.entries(AVATARS).map(([key, avatar]) => `
            <button class="avatar-dot ${profile.avatar === key ? "selected" : ""}" style="--avatar:${avatar.color}" data-avatar="${key}" data-profile-avatar="${profile.id}" title="${esc(avatar.name)}">${avatarImage(avatar, "avatar-thumb")}</button>
          `).join("")}
        </div>
      </div>
      <button class="btn secondary" data-select-profile="${profile.id}">Usar</button>
    </article>
  `).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Perfiles</h1>
          <p class="subtitle">Guarda el progreso por alumno</p>
        </div>
      </header>
      <div class="toolbar">
        <input class="text-input" data-profile-name maxlength="24" placeholder="Nombre del alumno">
        <button class="btn" data-add-profile>Crear perfil</button>
        <button class="btn secondary" data-menu>Volver</button>
      </div>
      <div class="avatar-picker">${avatarOptions}</div>
      <section class="shop-list">${profileCards}</section>
    </section>
  `;

  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
  app.querySelector("[data-add-profile]").addEventListener("click", addProfile);
  app.querySelectorAll("[data-select-profile]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.data.activeProfileId = btn.dataset.selectProfile;
      saveData();
      renderMenu();
    });
  });
  app.querySelectorAll("[data-profile-avatar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const profile = state.data.profiles.find((item) => item.id === btn.dataset.profileAvatar);
      if (!profile) return;
      profile.avatar = btn.dataset.avatar;
      saveData();
      renderProfiles();
    });
  });
}

function addProfile() {
  const input = app.querySelector("[data-profile-name]");
  const avatarInput = app.querySelector("input[name='avatar']:checked");
  const name = input.value.trim() || `Alumno ${state.data.profiles.length + 1}`;
  const id = `p${Date.now()}`;
  state.data.profiles.push(createProfile(id, name, { avatar: avatarInput?.value || "maga" }));
  state.data.activeProfileId = id;
  saveData();
  renderProfiles();
}

function renderShop() {
  clearTimer();
  const profile = activeProfile();
  const items = Object.entries(POWER_SHOP).map(([key, item]) => `
    <article class="card shop-item">
      <div>
        <h3>${esc(item.name)}</h3>
        <p>${esc(item.desc)} Tienes: ${profile.inventario[key] || 0}</p>
      </div>
      <button type="button" class="btn" data-buy="${key}">${item.cost} $</button>
    </article>
  `).join("");
  const themes = Object.entries(THEME_SHOP).map(([key, item]) => {
    const owned = profile.inventario.temas.includes(key);
    const active = profile.inventario.tema === key;
    return `
      <article class="card shop-item theme-item ${item.className}">
        <div>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.desc)} ${owned ? "Comprado" : "Nuevo tema visual"}</p>
        </div>
        <button type="button" class="btn ${active ? "secondary" : ""}" data-theme="${key}">
          ${active ? "Activo" : owned ? "Usar" : `${item.cost} $`}
        </button>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Tienda</h1>
          <p class="subtitle">Compra poderes para las partidas de ${esc(profile.name)}</p>
        </div>
        <div class="wallet">$ ${profile.monedas} pts</div>
      </header>
      <div class="toolbar">
        <button class="btn secondary" data-menu>Volver</button>
      </div>
      <h2 class="section-title">Poderes</h2>
      <section class="shop-list">${items}</section>
      <h2 class="section-title">Temas visuales</h2>
      <section class="shop-list">${themes}</section>
    </section>
  `;

  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
  app.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", () => buyPower(btn.dataset.buy));
  });
  app.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => buyTheme(btn.dataset.theme));
  });
}

function buyPower(key) {
  const profile = activeProfile();
  const item = POWER_SHOP[key];
  if (!item || profile.monedas < item.cost) return;
  profile.monedas -= item.cost;
  profile.inventario[key] = (profile.inventario[key] || 0) + 1;
  saveData();
  renderShop();
}

function buyTheme(key) {
  const profile = activeProfile();
  const item = THEME_SHOP[key];
  if (!item) return;
  if (!profile.inventario.temas.includes(key)) {
    if (profile.monedas < item.cost) return;
    profile.monedas -= item.cost;
    profile.inventario.temas.push(key);
  }
  profile.inventario.tema = key;
  saveData();
  applyTheme(profile);
  renderShop();
}

function renderStory() {
  const profile = activeProfile();
  const avatar = AVATARS[profile.avatar] || AVATARS.maga;
  const summary = getProfileProgress(profile);
  const zones = Object.entries(STORY_ZONES).map(([key, zone], index) => {
    const level = levels[key] || {};
    const color = rgba(level.color || [1, 1, 1, 1]);
    const progress = getLevelProgress(profile, key);
    const unlocked = profile.story.unlocked.includes(key);
    const won = profile.story.crystals[key];
    const status = won ? `${zone.crystal} recuperado` : unlocked ? "Zona disponible" : "Bloqueada";
    const best = progress.best ? `${progress.best.pts}/${progress.best.total}` : "Sin récord";

    return `
      <article class="map-zone ${unlocked ? "" : "locked-card"} ${won ? "complete-zone" : ""}" style="--accent:${color}">
        <div class="map-marker">
          <span>${won ? "1" : unlocked ? index + 1 : "×"}</span>
        </div>
        <div class="map-zone-body">
          <p class="map-kicker">Zona ${index + 1}</p>
          <h3>${esc(zone.name)}</h3>
          <p>${esc(status)} · Jefe: ${esc(BOSSES[key]?.name || "Jefe final")}</p>
          <div class="zone-progress"><span style="width:${progress.percent}%"></span></div>
          <div class="map-stats">
            <span>Avance ${progress.percent}%</span>
            <span>Mejor ${best}</span>
          </div>
        </div>
        <div class="map-actions">
          <button class="btn" style="background:${color}" data-map-start="${key}" data-mode="practica" ${unlocked ? "" : "disabled"}>Práctica</button>
          <button class="btn secondary" data-map-start="${key}" data-mode="examen" ${unlocked ? "" : "disabled"}>Examen</button>
        </div>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Mapa de aventura</h1>
          <p class="subtitle">Derrota jefes para recuperar cristales y abrir nuevas zonas</p>
        </div>
        <div class="wallet">${summary.crystals}/${summary.totalZones} cristales</div>
      </header>
      <section class="map-hero">
        <div class="avatar-badge" style="--avatar:${avatar.color}">
          ${avatarImage(avatar)}
        </div>
        <div>
          <strong>${esc(profile.name)} · ${esc(avatar.name)}</strong>
          <p>${summary.percent}% de la aventura completada · ${summary.bestPoints} puntos históricos</p>
          <div class="mini-progress"><span style="width:${summary.percent}%"></span></div>
        </div>
      </section>
      <div class="toolbar"><button class="btn secondary" data-menu>Volver</button></div>
      <section class="adventure-map">${zones}</section>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
  app.querySelectorAll("[data-map-start]").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.mapStart, btn.dataset.mode));
  });
}

function renderDaily() {
  const profile = activeProfile();
  const today = todayKey();
  const doneToday = !!profile.daily.completed[today];
  const reward = doneToday ? profile.daily.completed[today] : 25 + Math.min(profile.daily.streak, 5) * 5;

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Reto del día</h1>
          <p class="subtitle">Cinco preguntas mezcladas para mantener la racha</p>
        </div>
        <div class="wallet">Racha ${profile.daily.streak} días</div>
      </header>
      <article class="card daily-card">
        <h2>${doneToday ? "Reto completado" : "Reto disponible"}</h2>
        <p>${doneToday ? `Ya ganaste ${reward} pts hoy.` : `Completa el reto para ganar ${reward} pts y subir tu racha.`}</p>
        <div class="daily-strip">
          ${Array.from({ length: 5 }, (_, index) => `<span class="${index < Math.min(profile.daily.streak, 5) ? "filled" : ""}"></span>`).join("")}
        </div>
        <div class="actions">
          <button type="button" class="btn" data-start-daily="true" ${doneToday ? "disabled" : ""}>Jugar reto</button>
          <button type="button" class="btn secondary" data-menu>Volver</button>
        </div>
      </article>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
  app.querySelector("[data-start-daily]")?.addEventListener("click", startDailyQuiz);
}

function renderProgress() {
  const profile = activeProfile();
  const summary = getProfileProgress(profile);
  const levelRows = Object.entries(STORY_ZONES).map(([key, zone]) => {
    const progress = getLevelProgress(profile, key);
    return `
      <article class="card progress-card">
        <div>
          <h3>${esc(zone.name)}</h3>
          <p>${progress.complete ? "Cristal obtenido" : progress.unlocked ? "En progreso" : "Bloqueado"}</p>
        </div>
        <strong>${progress.percent}%</strong>
        <div class="zone-progress"><span style="width:${progress.percent}%"></span></div>
      </article>
    `;
  }).join("");
  const missions = Object.entries(MISSIONS).map(([key, mission]) => {
    const value = missionProgress(profile, mission);
    const pct = missionPercent(profile, mission);
    return `
      <article class="card mission-card ${pct >= 100 ? "complete-zone" : ""}">
        <h3>${esc(mission.title)}</h3>
        <p>${value}/${mission.target}</p>
        <div class="zone-progress"><span style="width:${pct}%"></span></div>
      </article>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Mi avance</h1>
          <p class="subtitle">${esc(profile.name)} · ${summary.accuracy}% de aciertos</p>
        </div>
        <div class="wallet">${summary.crystals}/${summary.totalZones} cristales</div>
      </header>
      <div class="toolbar"><button class="btn secondary" data-menu>Volver</button></div>
      <section class="stats-grid">
        <article class="card stat-tile"><strong>${summary.percent}%</strong><span>Aventura</span></article>
        <article class="card stat-tile"><strong>${profile.stats.mejorRacha}</strong><span>Mejor racha</span></article>
        <article class="card stat-tile"><strong>${profile.stats.correctas}</strong><span>Acertadas</span></article>
        <article class="card stat-tile"><strong>${summary.crystals}</strong><span>Cristales</span></article>
      </section>
      <h2 class="section-title">Progreso por zona</h2>
      <section class="shop-list">${levelRows}</section>
      <h2 class="section-title">Misiones</h2>
      <section class="levels">${missions}</section>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
}

function renderTeacher() {
  const rows = state.data.profiles.map((profile) => {
    const summary = getProfileProgress(profile);
    return `
      <tr>
        <td>${esc(profile.name)}</td>
        <td>${summary.percent}%</td>
        <td>${summary.correct}/${summary.questions}</td>
        <td>${profile.stats.mejorRacha}</td>
        <td>${profile.monedas}</td>
        <td><button class="btn danger small-btn" data-reset-profile="${profile.id}">Reiniciar</button></td>
      </tr>
    `;
  }).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Modo maestro</h1>
          <p class="subtitle">Vista local de alumnos, puntajes y progreso</p>
        </div>
      </header>
      <div class="toolbar"><button class="btn secondary" data-menu>Volver</button></div>
      <div class="card table-card">
        <table>
          <thead><tr><th>Alumno</th><th>Aventura</th><th>Aciertos</th><th>Racha</th><th>Pts</th><th>Acción</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
  app.querySelectorAll("[data-reset-profile]").forEach((btn) => {
    btn.addEventListener("click", () => resetProfile(btn.dataset.resetProfile));
  });
}

function resetProfile(id) {
  const index = state.data.profiles.findIndex((profile) => profile.id === id);
  if (index < 0) return;
  const old = state.data.profiles[index];
  state.data.profiles[index] = createProfile(old.id, old.name, { avatar: old.avatar });
  saveData();
  renderTeacher();
}

function renderAchievements() {
  const profile = activeProfile();
  const items = Object.entries(ACHIEVEMENTS).map(([key, achievement]) => `
    <article class="card achievement ${profile.achievements[key] ? "unlocked" : ""}">
      <h3>${esc(achievement.title)}</h3>
      <p>${esc(achievement.desc)}</p>
      <strong>${profile.achievements[key] ? "Desbloqueado" : "Pendiente"}</strong>
    </article>
  `).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Logros</h1>
          <p class="subtitle">Retos especiales de ${esc(profile.name)}</p>
        </div>
      </header>
      <div class="toolbar"><button class="btn secondary" data-menu>Volver</button></div>
      <section class="levels">${items}</section>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
}

function renderRanking() {
  const rows = state.data.ranking
    .slice()
    .sort((a, b) => b.pts - a.pts || a.seg - b.seg)
    .slice(0, 12)
    .map((entry, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${esc(entry.profile)}</td>
        <td>${esc(entry.level)}</td>
        <td>${esc(entry.mode)}</td>
        <td>${entry.pts}/${entry.total}</td>
        <td>${entry.seg}s</td>
      </tr>
    `).join("");

  app.innerHTML = `
    <section class="screen">
      <header class="topbar">
        <div>
          <h1 class="title">Ranking local</h1>
          <p class="subtitle">Mejores puntajes guardados en este navegador</p>
        </div>
      </header>
      <div class="toolbar"><button class="btn secondary" data-menu>Volver</button></div>
      <div class="card table-card">
        <table>
          <thead><tr><th>#</th><th>Alumno</th><th>Nivel</th><th>Modo</th><th>Puntos</th><th>Tiempo</th></tr></thead>
          <tbody>${rows || `<tr><td colspan="6">Aún no hay partidas registradas.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
}

function startQuiz(levelKey, mode) {
  clearTimer();
  const profile = activeProfile();
  const level = levels[levelKey];
  if (!level || !profile.story.unlocked.includes(levelKey)) return;

  const mathQuestions = enrichQuestions(levelKey, level.preguntas || []);
  const challenge = {
    p: PHYSICAL_CHALLENGES[Math.floor(Math.random() * PHYSICAL_CHALLENGES.length)],
    o: ["¡HECHO!"],
    r: "¡HECHO!",
    exp: "Las pausas activas ayudan a volver con más atención.",
    tipo: "fisico"
  };
  const challengeAt = mathQuestions.length > 1 ? 1 + Math.floor(Math.random() * (mathQuestions.length - 1)) : 0;
  mathQuestions.splice(challengeAt, 0, challenge);

  quiz = {
    levelKey,
    level,
    mode,
    questions: mathQuestions,
    index: 0,
    points: 0,
    streak: 0,
    maxStreak: 0,
    lives: 3,
    startLives: 3,
    timeLeft: level.tiempo || 60,
    frozen: false,
    locked: false,
    phase: "questions",
    bossNeeded: BOSSES[levelKey]?.needed || 3,
    bossStreak: 0,
    bossAttempts: 0,
    currentQuestion: null,
    feedback: "",
    hint: "",
    doubleNext: false,
    usedPowers: 0,
    correctCount: 0,
    sumCorrectCount: 0,
    noBoss: false
  };

  renderQuiz();
  if (mode === "examen") {
    timerId = setInterval(tick, 1000);
  }
}

function startDailyQuiz() {
  clearTimer();
  const profile = activeProfile();
  if (profile.daily.completed[todayKey()]) return renderDaily();
  const keys = Object.keys(levels).filter((key) => profile.story.unlocked.includes(key));
  const questions = Array.from({ length: 5 }, (_, index) => {
    const key = keys[index % keys.length] || "basico";
    return { ...generateQuestion(key), levelKey: key };
  });

  quiz = {
    levelKey: "diario",
    level: { nombre: "Reto del día", color: [0.2, 0.55, 1, 1], tiempo: 0 },
    mode: "diario",
    questions,
    index: 0,
    points: 0,
    streak: 0,
    maxStreak: 0,
    lives: 3,
    startLives: 3,
    timeLeft: 0,
    frozen: false,
    locked: false,
    phase: "questions",
    bossNeeded: 0,
    bossStreak: 0,
    bossAttempts: 0,
    currentQuestion: null,
    feedback: "",
    hint: "",
    doubleNext: false,
    usedPowers: 0,
    correctCount: 0,
    sumCorrectCount: 0,
    noBoss: true,
    dailyReward: 25 + Math.min(profile.daily.streak, 5) * 5
  };

  renderQuiz();
}

function tick() {
  if (!quiz || quiz.frozen) return;
  quiz.timeLeft -= 1;
  updateQuizStatus();
  if (quiz.timeLeft <= 0) finishQuiz();
}

function renderQuiz() {
  const color = rgba(quiz.level.color || [0.2, 0.8, 0.4, 1]);
  app.innerHTML = `
    <section class="screen" style="--accent:${color}">
      <header class="quiz-head">
        <button class="btn secondary" data-menu>Volver</button>
        <h1 class="level-name" style="color:${color}">${esc(quiz.level.nombre || quiz.levelKey)}</h1>
        <div class="streak" data-streak></div>
        <div class="status" data-status></div>
      </header>
      <div class="progress"><span data-progress></span></div>
      <div class="power-bar" data-power-holder></div>
      <section class="card boss-panel hidden" data-boss-panel></section>
      <section class="card question">
        <div class="counter" data-counter></div>
        <h2 data-question></h2>
        <div data-visual></div>
        <p class="hint-line hidden" data-hint></p>
      </section>
      <section class="options" data-options></section>
      <div class="feedback hidden" data-feedback></div>
      <div class="score-line" data-score></div>
    </section>
  `;

  app.querySelector("[data-menu]").addEventListener("click", goMenu);
  renderQuestion();
}

function nextQuestion() {
  if (!quiz) return null;
  if (quiz.phase === "boss") {
    quiz.currentQuestion = generateQuestion(quiz.levelKey, true);
    return quiz.currentQuestion;
  }
  if (quiz.index >= quiz.questions.length) {
    if (quiz.noBoss) {
      finishQuiz();
      return null;
    }
    quiz.phase = "boss";
    quiz.currentQuestion = generateQuestion(quiz.levelKey, true);
    return quiz.currentQuestion;
  }
  quiz.currentQuestion = quiz.questions[quiz.index];
  return quiz.currentQuestion;
}

function renderVisual(q) {
  if (!q.visual) return "";
  if (q.visual.type === "coins") {
    return `<div class="visual coins">${Array.from({ length: q.visual.count }, () => `<span>${esc(q.visual.label)}</span>`).join("")}</div>`;
  }
  if (q.visual.type === "fraction") {
    return `<div class="visual fraction-bar">${Array.from({ length: q.visual.denominator }, (_, index) => `<span class="${index < q.visual.numerator ? "filled" : ""}"></span>`).join("")}</div>`;
  }
  if (q.visual.type === "percent") {
    return `<div class="visual percent-bar"><span style="width:${q.visual.percent}%"></span><b>${q.visual.percent}%</b></div>`;
  }
  if (q.visual.type === "square") {
    return `<div class="visual square-figure" style="--cells:${q.visual.side}"><span>${q.visual.side} × ${q.visual.side}</span></div>`;
  }
  return "";
}

function renderAnswerArea(q, options) {
  if (q.tipo === "input" || q.tipo === "fill") {
    return `
      <div class="manual-answer">
        <input class="text-input answer-input" data-manual-answer inputmode="decimal" placeholder="Escribe tu respuesta">
        ${q.suffix ? `<span class="answer-suffix">${esc(q.suffix)}</span>` : ""}
        <button class="btn" data-submit-answer>Responder</button>
      </div>
    `;
  }
  if (q.tipo === "order") {
    return `
      <div class="order-area">
        <div class="order-bank">
          ${shuffle(q.steps || []).map((step) => `<button class="btn option order-step" data-step="${esc(step)}">${esc(step)}</button>`).join("")}
        </div>
        <div class="order-picked" data-order-picked></div>
        <div class="actions">
          <button class="btn" data-submit-order>Responder</button>
          <button class="btn secondary" data-reset-order>Reiniciar</button>
        </div>
      </div>
    `;
  }
  return options.map((option, index) => `
    <button class="btn option" style="background:${OPTION_COLORS[index] || "#4d638d"}" data-answer="${esc(option)}">
      ${esc(option)}
    </button>
  `).join("");
}

function renderQuestion() {
  const q = nextQuestion();
  if (!quiz || !q) return;

  quiz.locked = false;
  quiz.feedback = "";
  quiz.hint = "";
  const isPhysical = q.tipo === "fisico";
  const isBoss = q.tipo === "boss";
  const color = isPhysical ? "#34d983" : rgba(quiz.level.color || [0.2, 0.8, 0.4, 1]);
  const options = isPhysical ? q.o : shuffle(q.o || []);
  const bossPanel = app.querySelector("[data-boss-panel]");

  bossPanel.classList.toggle("hidden", !isBoss);
  const boss = BOSSES[quiz.levelKey] || {};
  const bossHp = Math.max((boss.maxHp || quiz.bossNeeded) - quiz.bossStreak, 0);
  const bossHpPct = Math.round((bossHp / Math.max(boss.maxHp || quiz.bossNeeded, 1)) * 100);
  bossPanel.innerHTML = isBoss
    ? `
      <div class="boss-avatar">♛</div>
      <div class="boss-info">
        <strong>${esc(boss.name || "Jefe final")}</strong>
        <span>${esc(sample(boss.taunts || ["Resuelve para vencerme."], 1)[0])}</span>
        <div class="boss-life"><span style="width:${bossHpPct}%"></span></div>
      </div>
      <div class="boss-hp">${bossHp}/${boss.maxHp || quiz.bossNeeded}</div>
    `
    : "";

  app.querySelector("[data-counter]").textContent = isPhysical
    ? "¡MOMENTO DE MOVERSE!"
    : isBoss
      ? "JEFE FINAL"
      : `Pregunta ${quiz.index + 1} de ${quiz.questions.length}`;
  app.querySelector("[data-question]").textContent = q.p;
  app.querySelector("[data-question]").style.color = color;
  app.querySelector("[data-hint]").classList.add("hidden");
  app.querySelector("[data-feedback]").classList.add("hidden");
  app.querySelector("[data-visual]").innerHTML = renderVisual(q);

  app.querySelector("[data-options]").innerHTML = renderAnswerArea(q, options);
  app.querySelectorAll("[data-answer]").forEach((btn) => {
    btn.addEventListener("click", () => answerValue(btn.textContent.trim(), btn));
  });
  app.querySelector("[data-submit-answer]")?.addEventListener("click", () => {
    const input = app.querySelector("[data-manual-answer]");
    answerValue(input.value.trim(), input);
  });
  app.querySelector("[data-manual-answer]")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") answerValue(event.currentTarget.value.trim(), event.currentTarget);
  });
  const picked = [];
  app.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      picked.push(btn.dataset.step);
      btn.disabled = true;
      app.querySelector("[data-order-picked]").innerHTML = picked.map((step, index) => `<span>${index + 1}. ${esc(step)}</span>`).join("");
    });
  });
  app.querySelector("[data-submit-order]")?.addEventListener("click", () => answerValue(picked.join("|"), app.querySelector("[data-submit-order]")));
  app.querySelector("[data-reset-order]")?.addEventListener("click", () => renderQuestion());

  renderPowerControls();
  updateQuizStatus();
}

function renderPowerControls() {
  const profile = activeProfile();
  const holder = app.querySelector("[data-power-holder]");
  if (!holder) return;

  const powers = Object.entries(POWER_SHOP).map(([key, item]) => {
    const count = profile.inventario[key] || 0;
    const disabled = count <= 0 || quiz.locked || (key === "congelar" && quiz.mode !== "examen");
    return `<button class="btn power-btn" data-power="${key}" ${disabled ? "disabled" : ""}>${esc(item.name)} (${count})</button>`;
  }).join("");
  holder.innerHTML = powers;
  holder.querySelectorAll("[data-power]").forEach((btn) => {
    btn.addEventListener("click", () => usePower(btn.dataset.power));
  });
}

function spendPower(key) {
  const profile = activeProfile();
  if ((profile.inventario[key] || 0) <= 0) return false;
  profile.inventario[key] -= 1;
  saveData();
  return true;
}

function usePower(key) {
  if (!quiz || quiz.locked) return;
  if (key === "congelar") return freezeTime();
  if (!spendPower(key)) return;
  quiz.usedPowers += 1;

  if (key === "eliminar") {
    const wrongButtons = [...app.querySelectorAll("[data-answer]")]
      .filter((btn) => btn.textContent.trim() !== quiz.currentQuestion.r);
    sample(wrongButtons, 1).forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("removed");
    });
  }
  if (key === "doble") {
    quiz.doubleNext = true;
    showHint("La siguiente respuesta correcta vale doble.");
  }
  if (key === "pista") {
    const hint = quiz.currentQuestion.exp || "Busca la operación clave y resuelve paso a paso.";
    showHint(`Pista: ${hint}`);
  }
  if (key === "extraTiempo") {
    quiz.timeLeft += 15;
    showHint("Ganaste 15 segundos extra.");
  }
  renderPowerControls();
  updateQuizStatus();
}

function freezeTime() {
  if (!quiz || quiz.mode !== "examen" || quiz.frozen || !spendPower("congelar")) return;
  quiz.usedPowers += 1;
  quiz.frozen = true;
  showHint("Tiempo congelado por 5 segundos.");
  setTimeout(() => {
    if (!quiz) return;
    quiz.frozen = false;
    renderPowerControls();
    updateQuizStatus();
  }, 5000);
  renderPowerControls();
  updateQuizStatus();
}

function showHint(text) {
  const hint = app.querySelector("[data-hint]");
  if (!hint) return;
  hint.textContent = text;
  hint.classList.remove("hidden");
}

function updateQuizStatus() {
  if (!quiz) return;
  app.querySelector("[data-streak]").textContent = `Racha: ${quiz.streak}${quiz.doubleNext ? " · x2 listo" : ""}`;
  app.querySelector("[data-status]").textContent = quiz.mode === "examen"
    ? `${quiz.frozen ? "[Pausa] " : "[T] "}${Math.max(quiz.timeLeft, 0)}s`
    : `Vidas: ${Math.max(quiz.lives, 0)}/3`;
  const totalSteps = quiz.questions.length + quiz.bossNeeded;
  const doneSteps = Math.min(quiz.index, quiz.questions.length) + quiz.bossStreak;
  app.querySelector("[data-progress]").style.width = `${(doneSteps / totalSteps) * 100}%`;
  app.querySelector("[data-score]").textContent = `[OK] ${quiz.points} pts`;
}

function normalizeAnswer(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "").replace(/%$/, "");
}

function answer(button) {
  answerValue(button.textContent.trim(), button);
}

function answerValue(value, source) {
  if (!quiz || quiz.locked) return;
  if (!String(value).trim()) return;
  quiz.locked = true;

  const q = quiz.currentQuestion;
  const isPhysical = q.tipo === "fisico";
  const isBoss = q.tipo === "boss";
  const expected = q.tipo === "fill" && q.suffix ? String(q.r).replace(/%$/, "") : q.r;
  const isCorrect = q.tipo === "input" || q.tipo === "fill"
    ? normalizeAnswer(value) === normalizeAnswer(expected)
    : String(value).trim() === q.r;
  const buttons = [...app.querySelectorAll("[data-answer]")];
  buttons.forEach((btn) => { btn.disabled = true; });
  app.querySelectorAll("[data-step], [data-submit-answer], [data-submit-order], [data-reset-order]").forEach((btn) => { btn.disabled = true; });

  if (isCorrect) {
    if (!isPhysical) {
      const points = quiz.doubleNext ? 2 : 1;
      quiz.points += points;
      quiz.streak += 1;
      quiz.maxStreak = Math.max(quiz.maxStreak, quiz.streak);
      quiz.correctCount += 1;
      if (q.skill === "sum") quiz.sumCorrectCount += 1;
      if (isBoss) quiz.bossStreak += 1;
    }
    quiz.doubleNext = false;
    source?.classList?.add("correct");
    showFeedback("correct", isBoss ? (BOSSES[quiz.levelKey]?.hit || "Golpe al jefe. Mantén la racha.") : "Correcto.", q);
    play(okSound);
  } else {
    quiz.doubleNext = false;
    quiz.streak = 0;
    if (isBoss) {
      quiz.bossStreak = 0;
      quiz.bossAttempts += 1;
    }
    source?.classList?.add("wrong");
    buttons.find((btn) => btn.textContent.trim() === q.r)?.classList.add("correct");
    if (quiz.mode === "practica" && !isPhysical) quiz.lives -= 1;
    showFeedback("wrong", `Respuesta correcta: ${q.r}. ${q.exp || "Revisa la operación paso a paso."}`, q);
    play(errorSound);
  }

  if (!isBoss) quiz.index += 1;
  updateQuizStatus();

  setTimeout(() => {
    if (!quiz) return;
    const bossDone = quiz.phase === "boss" && quiz.bossStreak >= quiz.bossNeeded;
    const done = bossDone || (quiz.mode === "practica" && quiz.lives <= 0);
    if (done) finishQuiz();
    else renderQuestion();
  }, isCorrect ? 900 : 1800);
}

function visualExplanation(q) {
  if (!q.visual) return "";
  if (q.visual.type === "fraction") return `<div class="mini-lesson">${renderVisual(q)}<span>${q.visual.numerator} de ${q.visual.denominator} partes forman ${esc(q.r)}.</span></div>`;
  if (q.visual.type === "percent") return `<div class="mini-lesson">${renderVisual(q)}<span>La barra completa representa 100%.</span></div>`;
  if (q.visual.type === "coins") return `<div class="mini-lesson">${renderVisual(q)}<span>Suma el valor de cada moneda.</span></div>`;
  if (q.visual.type === "square") return `<div class="mini-lesson">${renderVisual(q)}<span>Cuenta filas por columnas para hallar el área.</span></div>`;
  return "";
}

function showFeedback(kind, text, q = null) {
  const feedback = app.querySelector("[data-feedback]");
  feedback.innerHTML = `${esc(text)}${q ? visualExplanation(q) : ""}`;
  feedback.className = `feedback ${kind}`;
}

function finishQuiz() {
  if (!quiz) return;
  clearTimer();

  const profile = activeProfile();
  const total = quiz.questions.filter((q) => q.tipo !== "fisico").length + quiz.bossNeeded;
  const timeUsed = (quiz.level.tiempo || 0) - quiz.timeLeft;
  const scoreKey = `${quiz.levelKey}_${quiz.mode}`;
  const old = profile.scores[scoreKey]?.pts ?? -1;
  const isNew = quiz.points > old;
  const bossDefeated = !quiz.noBoss && quiz.bossStreak >= quiz.bossNeeded;
  const dailyDone = quiz.mode === "diario" && quiz.index >= quiz.questions.length;
  const coins = quiz.points * 10 + (bossDefeated ? 30 : 0) + (dailyDone ? quiz.dailyReward : 0);
  const unlocked = [];

  profile.monedas += coins;
  profile.stats.correctas += quiz.correctCount;
  profile.stats.preguntas += Math.min(quiz.index, quiz.questions.filter((q) => q.tipo !== "fisico").length) + (quiz.noBoss ? 0 : quiz.bossAttempts + quiz.bossStreak);
  profile.stats.sumasCorrectas += quiz.sumCorrectCount;
  profile.stats.mejorRacha = Math.max(profile.stats.mejorRacha, quiz.maxStreak);
  profile.stats.monedasGanadas += coins;
  if ((bossDefeated || dailyDone) && quiz.usedPowers === 0) profile.stats.victoriasSinPoderes += 1;
  if (bossDefeated && quiz.levelKey === "basico") profile.stats.jefeBosque = 1;
  if (isNew) {
    profile.scores[scoreKey] = {
      pts: quiz.points,
      total,
      seg: Math.max(0, Math.round(timeUsed))
    };
  }
  if (quiz.maxStreak >= 5 && unlockAchievement(profile, "streak5")) unlocked.push(ACHIEVEMENTS.streak5.title);
  if (quiz.mode === "practica" && quiz.lives === quiz.startLives && unlockAchievement(profile, "noLivesLost")) unlocked.push(ACHIEVEMENTS.noLivesLost.title);
  if (quiz.mode === "examen" && timeUsed <= (quiz.level.tiempo || 0) / 2 && unlockAchievement(profile, "fastExam")) unlocked.push(ACHIEVEMENTS.fastExam.title);
  if (profile.stats.jefeBosque && unlockAchievement(profile, "forestBoss")) unlocked.push(ACHIEVEMENTS.forestBoss.title);
  if (profile.stats.monedasGanadas >= 100 && unlockAchievement(profile, "rich100")) unlocked.push(ACHIEVEMENTS.rich100.title);
  if (bossDefeated) unlockStory(profile, quiz.levelKey);
  if (dailyDone) {
    const today = todayKey();
    profile.daily.streak = profile.daily.lastDate === yesterdayKey() ? profile.daily.streak + 1 : 1;
    profile.daily.lastDate = today;
    profile.daily.completed[today] = quiz.dailyReward;
    if (profile.daily.streak >= 3 && unlockAchievement(profile, "daily3")) unlocked.push(ACHIEVEMENTS.daily3.title);
  }

  state.data.ranking.push({
    profile: profile.name,
    avatar: profile.avatar,
    level: quiz.level.nombre || quiz.levelKey,
    mode: quiz.mode,
    pts: quiz.points,
    total,
    seg: Math.max(0, Math.round(timeUsed)),
    date: new Date().toISOString()
  });
  state.data.ranking = state.data.ranking
    .sort((a, b) => b.pts - a.pts || a.seg - b.seg)
    .slice(0, 30);
  saveData();

  const result = { ...quiz, total, timeUsed, isNew, coins, bossDefeated, unlocked };
  quiz = null;
  renderResult(result);
}

function renderResult(result) {
  const pct = result.points / Math.max(result.total, 1);
  const stars = pct >= 1 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
  const messages = ["Continúa practicando", "Buen progreso", "Excelente trabajo", "Dominio completo"];
  const color = rgba(result.level.color || [0.2, 0.8, 0.4, 1]);
  const crystal = STORY_ZONES[result.levelKey]?.crystal || "Cristal";

  app.innerHTML = `
    <section class="screen result">
      <article class="card result-box">
        ${result.isNew ? `<h2 style="color:var(--gold)">¡NUEVO RÉCORD!</h2>` : ""}
        <p style="color:${color}">${esc(result.level.nombre || result.levelKey)} · ${result.mode === "examen" ? "Examen" : "Práctica"}</p>
        <div class="stars">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="big-score">${result.points} / ${result.total}</div>
        <h2 style="color:${color}">${messages[stars]} · Ganaste ${result.coins} pts</h2>
        <div class="stats">
          Jefe final: ${result.bossDefeated ? `vencido · ${esc(crystal)} recuperado` : "pendiente"}<br>
          Racha máxima: ${result.maxStreak}<br>
          ${result.mode === "examen" ? `Tiempo: ${Math.max(result.timeUsed, 0)}s` : `Vidas restantes: ${Math.max(result.lives, 0)}`}<br>
          Porcentaje de aciertos: ${Math.round(pct * 100)}%
        </div>
        ${result.unlocked.length ? `<div class="unlock-list">Logros nuevos: ${result.unlocked.map(esc).join(", ")}</div>` : ""}
        <div class="actions">
          <button class="btn" style="background:${color}" data-retry>Reintentar</button>
          <button class="btn secondary" data-menu>Menú principal</button>
        </div>
      </article>
    </section>
  `;

  app.querySelector("[data-retry]").addEventListener("click", () => startQuiz(result.levelKey, result.mode));
  app.querySelector("[data-menu]").addEventListener("click", renderMenu);
}

boot();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Service worker registration is optional; continue silently
    });
  });
}
