import { DEFAULT_LEVELS, AVATARS, STORY_ZONES } from "./data.js";

export function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

export function avatarImage(avatar, className = "avatar-img") {
  const data = avatar || AVATARS.maga;
  return `
    <img class="${className}" src="${esc(data.img)}" alt="${esc(data.name)}" onerror="this.remove();">
    <span class="avatar-fallback">${esc(data.icon)}</span>
  `;
}

export function rgba(parts, alpha = parts[3] ?? 1) {
  const [r, g, b] = parts;
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

export function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sample(items, count) {
  return shuffle(items).slice(0, count);
}

export function play(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

export function normalizeLevels(source) {
  return Object.fromEntries(Object.entries(source).map(([key, level]) => {
    const defaults = DEFAULT_LEVELS[key]?.preguntas || [];
    const preguntas = (level.preguntas || []).map((question, index) => ({
      ...question,
      exp: question.exp || defaults[index]?.exp || "Revisa la operación paso a paso."
    }));
    return [key, { ...level, preguntas }];
  }));
}

export function makeQuestion(p, options, answer, exp, tipo = "math", extra = {}) {
  return { p, o: shuffle([...new Set(options.map(String))]).slice(0, 4), r: String(answer), exp, tipo, ...extra };
}

export function numberOptions(answer, spread = 12) {
  const values = new Set([answer]);
  while (values.size < 4) {
    const wrong = answer + randomInt(-spread, spread);
    if (wrong >= 0 && wrong !== answer) values.add(wrong);
  }
  return [...values].map(String);
}

export function generateBasicQuestion() {
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

export function generateIntermediateQuestion() {
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

export function generateAdvancedQuestion() {
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

export function generateQuestion(levelKey, boss = false) {
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

export function enrichQuestions(levelKey, baseQuestions) {
  const fixed = sample(baseQuestions || [], Math.min(3, (baseQuestions || []).length));
  const generated = Array.from({ length: 5 }, () => generateQuestion(levelKey));
  return shuffle([...fixed, ...generated]).slice(0, 6);
}

export function getBestScore(...scores) {
  return scores
    .filter(Boolean)
    .reduce((best, current) => (!best || current.pts > best.pts ? current : best), null);
}

export function unlockAchievement(profile, key) {
  if (profile.achievements[key]) return false;
  profile.achievements[key] = new Date().toISOString();
  return true;
}

export function unlockStory(profile, levelKey) {
  const zone = STORY_ZONES[levelKey];
  if (!zone) return false;
  profile.story.crystals[levelKey] = true;
  if (zone.unlocks && !profile.story.unlocked.includes(zone.unlocks)) {
    profile.story.unlocked.push(zone.unlocks);
  }
  return true;
}
