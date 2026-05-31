// 💜 REGLA DEL ASPA — BTS EDITION PARA JESSY 💜

const BTS_COLORS = {
  purple: "#A020F0",
  purpleLight: "#D4A5FF",
  purpleDark: "#6A0DAD",
  gold: "#FFD700",
};

const BTS_MEMBERS = ["RM", "JIN", "SUGA", "J-HOPE", "JIMIN", "V", "JUNGKOOK"];
const MUSIC_NOTES = ["♪", "♫", "♬", "♩", "♭", "♮"];

const PRESETS = {
  "Salina": {
    concentrada: { label: "Soletrol Na 20%", value: 20, ampolla: { volMl: 10, label: "amp 10 mL" } },
    diluida: { label: "Sol. Salina 0.9%", value: 0.9 },
    opciones_conc: [
      { label: "Soletrol Na 20%", value: 20, ampolla: { volMl: 10, label: "amp 10 mL" } },
      { label: "NaCl 17.7%", value: 17.7, ampolla: { volMl: 10, label: "amp 10 mL" } },
    ],
    opciones_dil: [
      { label: "Sol. Salina 0.9%", value: 0.9 },
      { label: "Agua destilada 0%", value: 0 },
    ],
    deseada: 3,
    volumenes: [100, 250, 500, 1000],
    acento: BTS_COLORS.purple,
    icon: "💧",
  },
  "Dextrosa": {
    concentrada: { label: "Dextrosa 50%", value: 50 },
    diluida: { label: "Dextrosa 5%", value: 5 },
    opciones_conc: [{ label: "Dextrosa 50%", value: 50 }],
    opciones_dil: [
      { label: "Dextrosa 5%", value: 5 },
      { label: "Agua destilada 0%", value: 0 },
    ],
    deseada: 20,
    volumenes: [100, 250, 500, 1000],
    acento: BTS_COLORS.purpleLight,
    icon: "🍬",
  },
  "Genérica": {
    concentrada: { label: "Solución concentrada", value: 50 },
    diluida: { label: "Solución diluida", value: 0 },
    opciones_conc: [],
    opciones_dil: [],
    deseada: 10,
    volumenes: [100, 250, 500, 1000],
    acento: BTS_COLORS.gold,
    icon: "⚗️",
  },
};

let state = {
  tipo: "Salina",
  selConc: PRESETS["Salina"].concentrada,
  selDil: PRESETS["Salina"].diluida,
  cConc: 20,
  cDil: 0.9,
  cDeseada: 3,
  vFinal: 500,
  labelConc: "Soletrol Na 20%",
  labelDil: "Sol. Salina 0.9%",
};

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initMemberNames();
  renderTabs();
  renderOpciones();
  renderVolumes();
  setupEventListeners();
  calcular();
});

function initParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.fontSize = (12 + Math.random() * 20) + "px";
    p.style.opacity = 0.1 + Math.random() * 0.3;
    p.style.animationDelay = Math.random() * 5 + "s";
    p.style.animationDuration = (3 + Math.random() * 4) + "s";
    p.textContent = i % 3 === 0 ? "💜" : i % 3 === 1 ? "✨" : MUSIC_NOTES[i % MUSIC_NOTES.length];
    container.appendChild(p);
  }
}

function initMemberNames() {
  const container = document.getElementById("member-names");
  const positions = [
    { top: "5%", left: "5%", transform: "rotate(-15deg)" },
    { top: "8%", right: "8%", transform: "rotate(12deg)" },
    { top: "25%", left: "2%", transform: "rotate(-8deg)" },
    { top: "30%", right: "3%", transform: "rotate(20deg)" },
    { bottom: "25%", left: "4%", transform: "rotate(15deg)" },
    { bottom: "20%", right: "5%", transform: "rotate(-12deg)" },
    { bottom: "8%", left: "50%", transform: "translateX(-50%) rotate(5deg)" },
  ];
  
  BTS_MEMBERS.forEach((name, i) => {
    const el = document.createElement("div");
    el.className = "member-name";
    el.textContent = name;
    Object.assign(el.style, positions[i]);
    container.appendChild(el);
  });
}

function renderTabs() {
  const container = document.getElementById("tabs");
  container.innerHTML = "";
  Object.entries(PRESETS).forEach(([key, preset]) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (key === state.tipo ? " active" : "");
    btn.textContent = preset.icon + " " + key;
    btn.onclick = () => cambiarTipo(key);
    container.appendChild(btn);
  });
}

function renderOpciones() {
  const preset = PRESETS[state.tipo];
  const concContainer = document.getElementById("opciones-conc");
  const dilContainer = document.getElementById("opciones-dil");
  const genericNames = document.getElementById("generic-names");
  
  concContainer.innerHTML = "";
  dilContainer.innerHTML = "";
  
  if (preset.opciones_conc.length > 0) {
    const label = document.createElement("div");
    label.className = "toggle-label";
    label.textContent = "Concentrada:";
    concContainer.appendChild(label);
    
    const group = document.createElement("div");
    group.className = "toggle-group";
    preset.opciones_conc.forEach(op => {
      const btn = document.createElement("button");
      btn.className = "toggle-btn" + (op.value === state.cConc ? " active" : "");
      btn.textContent = op.label;
      btn.onclick = () => seleccionarConc(op);
      group.appendChild(btn);
    });
    concContainer.appendChild(group);
  }
  
  if (preset.opciones_dil.length > 0) {
    const label = document.createElement("div");
    label.className = "toggle-label";
    label.textContent = "Diluida:";
    dilContainer.appendChild(label);
    
    const group = document.createElement("div");
    group.className = "toggle-group";
    preset.opciones_dil.forEach(op => {
      const btn = document.createElement("button");
      btn.className = "toggle-btn" + (op.value === state.cDil ? " active" : "");
      btn.textContent = op.label;
      btn.onclick = () => seleccionarDil(op);
      group.appendChild(btn);
    });
    dilContainer.appendChild(group);
  }
  
  if (state.tipo === "Genérica") {
    genericNames.classList.remove("hidden");
  } else {
    genericNames.classList.add("hidden");
  }
}

function renderVolumes() {
  const container = document.getElementById("volumes");
  const preset = PRESETS[state.tipo];
  container.innerHTML = "";
  
  preset.volumenes.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "vol-btn" + (v === state.vFinal ? " active" : "");
    btn.textContent = v;
    btn.onclick = () => {
      state.vFinal = v;
      document.getElementById("v-final").value = v;
      renderVolumes();
      calcular();
    };
    container.appendChild(btn);
  });
}

function setupEventListeners() {
  document.getElementById("c-conc").addEventListener("input", (e) => {
    state.cConc = parseFloat(e.target.value) || 0;
    calcular();
  });
  
  document.getElementById("c-dil").addEventListener("input", (e) => {
    state.cDil = parseFloat(e.target.value) || 0;
    calcular();
  });
  
  document.getElementById("c-deseada").addEventListener("input", (e) => {
    state.cDeseada = parseFloat(e.target.value) || 0;
    calcular();
  });
  
  document.getElementById("v-final").addEventListener("input", (e) => {
    state.vFinal = parseFloat(e.target.value) || 0;
    renderVolumes();
    calcular();
  });
  
  document.getElementById("label-conc-input").addEventListener("input", (e) => {
    state.labelConc = e.target.value;
    document.getElementById("label-conc").textContent = e.target.value;
    calcular();
  });
  
  document.getElementById("label-dil-input").addEventListener("input", (e) => {
    state.labelDil = e.target.value;
    document.getElementById("label-dil").textContent = e.target.value;
    calcular();
  });
}

function cambiarTipo(tipo) {
  const p = PRESETS[tipo];
  state.tipo = tipo;
  state.selConc = p.concentrada;
  state.selDil = p.diluida;
  state.cConc = p.concentrada.value;
  state.cDil = p.diluida.value;
  state.cDeseada = p.deseada;
  state.vFinal = 500;
  state.labelConc = p.concentrada.label;
  state.labelDil = p.diluida.label;
  
  document.getElementById("c-conc").value = state.cConc;
  document.getElementById("c-dil").value = state.cDil;
  document.getElementById("c-deseada").value = state.cDeseada;
  document.getElementById("v-final").value = state.vFinal;
  document.getElementById("label-conc").textContent = state.labelConc;
  document.getElementById("label-dil").textContent = state.labelDil;
  document.getElementById("label-conc-input").value = state.labelConc;
  document.getElementById("label-dil-input").value = state.labelDil;
  
  renderTabs();
  renderOpciones();
  renderVolumes();
  calcular();
}

function seleccionarConc(op) {
  state.selConc = op;
  state.cConc = op.value;
  state.labelConc = op.label;
  document.getElementById("c-conc").value = op.value;
  document.getElementById("label-conc").textContent = op.label;
  renderOpciones();
  calcular();
}

function seleccionarDil(op) {
  state.selDil = op;
  state.cDil = op.value;
  state.labelDil = op.label;
  document.getElementById("c-dil").value = op.value;
  document.getElementById("label-dil").textContent = op.label;
  renderOpciones();
  calcular();
}

function toggleJungkook() {
  const card = document.getElementById("jungkook-card");
  const btn = document.querySelector(".btn-jungkook");
  
  if (card.classList.contains("hidden")) {
    card.classList.remove("hidden");
    btn.innerHTML = "🐰 Ocultar a Jungkook 🐰";
  } else {
    card.classList.add("hidden");
    btn.innerHTML = "🐰 Ver a Jungkook 🐰";
  }
}

function calcular() {
  const { cConc, cDil, cDeseada, vFinal } = state;
  
  const valido = cConc > cDil && cDeseada > cDil && cDeseada < cConc;
  
  const errorEl = document.getElementById("error");
  const resultadoEl = document.getElementById("resultado");
  const pasosEl = document.getElementById("pasos");
  
  if (!valido) {
    errorEl.classList.remove("hidden");
    resultadoEl.classList.add("hidden");
    pasosEl.classList.add("hidden");
    errorEl.innerHTML = `⚠️ La concentración deseada debe estar <strong>entre</strong> la diluida (${cDil}%) y la concentrada (${cConc}%).`;
    return;
  }
  
  errorEl.classList.add("hidden");
  resultadoEl.classList.remove("hidden");
  pasosEl.classList.remove("hidden");
  
  const pConc = Math.abs(cDeseada - cDil);
  const pDil = Math.abs(cConc - cDeseada);
  const pTot = pConc + pDil;
  const vConc = (pConc / pTot) * vFinal;
  const vDil = (pDil / pTot) * vFinal;
  
  const ac = PRESETS[state.tipo].acento;
  
  document.getElementById("aspa-cconc").textContent = cConc + "%";
  document.getElementById("aspa-cdil").textContent = cDil + "%";
  document.getElementById("aspa-label-conc").textContent = state.labelConc;
  document.getElementById("aspa-label-dil").textContent = state.labelDil;
  document.getElementById("aspa-pconc").textContent = pConc.toFixed(2);
  document.getElementById("aspa-pdil").textContent = pDil.toFixed(2);
  document.getElementById("aspa-ptot").textContent = pTot.toFixed(2) + " partes";
  
  const svgText = document.querySelector(".aspa-x text");
  if (svgText) svgText.textContent = cDeseada + "%";
  
  document.getElementById("res-vfinal").textContent = vFinal;
  document.getElementById("vol-label-conc").textContent = `${state.labelConc} (${cConc}%)`;
  document.getElementById("vol-label-dil").textContent = `${state.labelDil} (${cDil}%)`;
  document.getElementById("vol-vconc").innerHTML = vConc.toFixed(1) + " <span>mL</span>";
  document.getElementById("vol-vdil").innerHTML = vDil.toFixed(1) + " <span>mL</span>";
  
  const pctConc = ((vConc / vFinal) * 100).toFixed(1);
  const pctDil = ((vDil / vFinal) * 100).toFixed(1);
  
  document.getElementById("pct-conc").textContent = pctConc + "% del total";
  document.getElementById("pct-dil").textContent = pctDil + "% del total";
  
  document.getElementById("bar-conc").style.width = pctConc + "%";
  document.getElementById("bar-dil").style.width = pctDil + "%";
  
  document.getElementById("card-conc").style.borderLeftColor = ac;
  document.getElementById("vol-vconc").style.color = ac;
  document.getElementById("bar-conc").style.background = ac;
  document.querySelector(".verify strong").style.color = ac;
  
  document.getElementById("verify-calc").innerHTML = 
    `${vConc.toFixed(1)} + ${vDil.toFixed(1)} = <strong>${(vConc + vDil).toFixed(1)} mL</strong>`;
  
  const ampolla = state.selConc && state.selConc.ampolla;
  const ampollaBadge = document.getElementById("ampolla-badge");
  
  if (ampolla) {
    const numAmpollas = vConc / ampolla.volMl;
    const ampollasCeil = Math.ceil(numAmpollas);
    const sobranteMl = (ampollasCeil * ampolla.volMl) - vConc;
    
    ampollaBadge.classList.remove("hidden");
    document.getElementById("ampolla-title").textContent = 
      `${ampollasCeil} ampolla${ampollasCeil !== 1 ? "s" : ""} de ${state.labelConc}`;
    
    let desc = `Necesitas ${vConc.toFixed(1)} mL exactos (${numAmpollas.toFixed(2)} amp).`;
    if (sobranteMl > 0.05) {
      desc += ` Usa ${ampollasCeil} amp → retirar y descartar ${sobranteMl.toFixed(1)} mL antes de agregar.`;
    } else {
      desc += " Usa exactamente esa cantidad.";
    }
    document.getElementById("ampolla-desc").textContent = desc;
  } else {
    ampollaBadge.classList.add("hidden");
  }
  
  const pasosList = document.getElementById("pasos-list");
  pasosList.innerHTML = "";
  const steps = [];
  
  if (ampolla) {
    const numAmpollas = vConc / ampolla.volMl;
    const ampollasCeil = Math.ceil(numAmpollas);
    const sobranteMl = (ampollasCeil * ampolla.volMl) - vConc;
    
    if (sobranteMl > 0.05) {
      steps.push(`Tome ${ampollasCeil} ampolla${ampollasCeil > 1 ? "s" : ""} de ${state.labelConc}.`);
      steps.push(`De esas ampollas, descarte ${sobranteMl.toFixed(1)} mL. Lo que queda son los ${vConc.toFixed(1)} mL que necesita.`);
    } else {
      steps.push(`Tome ${ampollasCeil} ampolla${ampollasCeil > 1 ? "s" : ""} de ${state.labelConc} completa${ampollasCeil > 1 ? "s" : ""} (${vConc.toFixed(1)} mL exactos).`);
    }
  } else {
    steps.push(`Tome ${vConc.toFixed(1)} mL de ${state.labelConc}.`);
  }
  
  steps.push(`Tome ${vDil.toFixed(1)} mL de ${state.labelDil}.`);
  steps.push(`Mezcle ambos en el frasco. Obtendrá ${vFinal} mL de solución al ${cDeseada}%.`);
  
  steps.forEach((paso, i) => {
    const div = document.createElement("div");
    div.className = "paso";
    div.innerHTML = `
      <div class="paso-num">${i + 1}</div>
      <p class="paso-text">${paso}</p>
    `;
    pasosList.appendChild(div);
  });
        }
    
