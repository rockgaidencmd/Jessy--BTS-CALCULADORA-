import { useState, useEffect } from "react";
import JK_B64 from './jungkook.jpg';

const LOGO_B64 = "data:image/jpeg;base64,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";

const MEMBERS = ["RM","Jin","Suga","J-Hope","Jimin","V","Jungkook"];

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
    acento: "#be123c",
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
    acento: "#7c3aed",
    icon: "🍬",
  },
  "Genérica": {
    concentrada: { label: "Solución concentrada", value: 50 },
    diluida: { label: "Solución diluida", value: 0 },
    opciones_conc: [],
    opciones_dil: [],
    deseada: 10,
    volumenes: [100, 250, 500, 1000],
    acento: "#d97706",
    icon: "⚗️",
  },
};

function calcular({ cConc, cDil, cDeseada, vFinal }) {
  const pConc = Math.abs(cDeseada - cDil);
  const pDil  = Math.abs(cConc - cDeseada);
  const pTot  = pConc + pDil;
  return {
    pConc, pDil, pTot,
    vConc: pTot === 0 ? 0 : (pConc / pTot) * vFinal,
    vDil:  pTot === 0 ? 0 : (pDil  / pTot) * vFinal,
  };
}

function NumInput({ label, value, onChange, min, max, step = 0.1, ac }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <label style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#a78bfa" }}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", background:"#1a0a2e", borderRadius:8, border:`1px solid ${ac}55`, overflow:"hidden" }}>
        <input type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(parseFloat(e.target.value)||0)}
          style={{ background:"transparent", border:"none", color:"#f3e8ff", fontSize:18,
            fontFamily:"'DM Mono',monospace", padding:"10px 12px", width:"100%", outline:"none" }} />
        <span style={{ paddingRight:12, color:"#7c3aed", fontSize:13 }}>%</span>
      </div>
    </div>
  );
}

function ToggleGroup({ opciones, seleccionado, onSelect, color }) {
  if (!opciones || opciones.length === 0) return null;
  return (
    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
      {opciones.map(op => {
        const activo = seleccionado === op.value;
        return (
          <button key={op.value} onClick={() => onSelect(op)} style={{
            padding:"5px 12px", border:`1px solid ${activo ? color : "#3b1f6e"}`,
            borderRadius:20, background: activo ? color+"33" : "transparent",
            color: activo ? color : "#7c3aed", fontSize:11,
            cursor:"pointer", transition:"all .15s", fontWeight: activo ? 700 : 400,
          }}>{op.label}</button>
        );
      })}
    </div>
  );
}

function Stars() {
  const stars = Array.from({length:30}, (_,i) => ({
    id:i, x: (i*37+13)%100, y: (i*53+7)%100,
    size: (i%3)*0.8+0.6, delay: (i%5)*0.8, dur: (i%3)*1.5+2,
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size, borderRadius:"50%", background:"#a78bfa",
          animation:`twinkle ${s.dur}s ${s.delay}s infinite alternate`,
        }} />
      ))}
      <style>{`
        @keyframes twinkle { from{opacity:0.1} to{opacity:0.75} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{opacity:0.7;transform:scale(1)} 100%{opacity:0;transform:scale(1.35)} }
      `}</style>
    </div>
  );
}

export default function App() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };
  
  const [tipo, setTipo] = useState("Salina");
  const preset = PRESETS[tipo];
  const [selConc, setSelConc]   = useState(preset.concentrada);
  const [cConc, setCConc]       = useState(preset.concentrada.value);
  const [cDil,  setCDil]        = useState(preset.diluida.value);
  const [cDeseada, setCDeseada] = useState(preset.deseada);
  const [vFinal, setVFinal]     = useState(500);
  const [labelConc, setLabelConc] = useState(preset.concentrada.label);
  const [labelDil,  setLabelDil]  = useState(preset.diluida.label);
  const [showJK, setShowJK] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
const [installed, setInstalled] = useState(false);
useEffect(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setInstallPrompt(e);
  });
  window.addEventListener("appinstalled", () => {
    setInstalled(true);
    setInstallPrompt(null);
  });
}, []);

const handleInstall = async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  setInstallPrompt(null);
};



  const handleTipo = (t) => {
    const p = PRESETS[t];
    setTipo(t); setSelConc(p.concentrada);
    setCConc(p.concentrada.value); setCDil(p.diluida.value);
    setCDeseada(p.deseada); setVFinal(500);
    setLabelConc(p.concentrada.label); setLabelDil(p.diluida.label);
  };
  const handleSelConc = (op) => { setSelConc(op); setCConc(op.value); setLabelConc(op.label); };
  const handleSelDil  = (op) => { setCDil(op.value); setLabelDil(op.label); };

  const valido = cConc > cDil && cDeseada > cDil && cDeseada < cConc;
  const res    = valido ? calcular({ cConc, cDil, cDeseada, vFinal }) : null;
  const ac     = preset.acento;

  const ampolla      = selConc?.ampolla;
  const numAmpollas  = (ampolla && res) ? res.vConc / ampolla.volMl : null;
  const ampollasCeil = numAmpollas !== null ? Math.ceil(numAmpollas) : null;
  const sobranteMl   = ampollasCeil !== null ? (ampollasCeil * ampolla.volMl) - res.vConc : 0;

  const pasos = res ? (() => {
    const steps = [];
    if (ampolla && ampollasCeil !== null) {
      if (sobranteMl > 0.05) {
        steps.push(`Tome ${ampollasCeil} ampolla${ampollasCeil>1?"s":""} de ${labelConc}.`);
        steps.push(`De esas ampollas, descarte ${sobranteMl.toFixed(1)} mL. Lo que queda son los ${res.vConc.toFixed(1)} mL que necesita.`);
      } else {
        steps.push(`Tome ${ampollasCeil} ampolla${ampollasCeil>1?"s":""} de ${labelConc} completa${ampollasCeil>1?"s":""} (${res.vConc.toFixed(1)} mL exactos).`);
      }
    } else {
      steps.push(`Tome ${res.vConc.toFixed(1)} mL de ${labelConc}.`);
    }
    steps.push(`Tome ${res.vDil.toFixed(1)} mL de ${labelDil}.`);
    steps.push(`Mezcle ambos en el frasco. Obtendrá ${vFinal} mL de solución al ${cDeseada}%.`);
    return steps;
  })() : null;

  return (
    <div style={{ minHeight:"100vh", background:"#0d0015", position:"relative",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"24px 16px", fontFamily:"'Sora','Segoe UI',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <Stars/>
{installPrompt && !installed && (
  <button onClick={handleInstall} style={{
    position:"fixed", top:16, left:16, zIndex:100,
    background:"linear-gradient(135deg,#be123c,#7c3aed)",
    border:"none", borderRadius:24,
    padding:"10px 18px", cursor:"pointer",
    color:"#fff", fontWeight:700, fontSize:13,
    boxShadow:"0 0 20px #7c3aed99",
    animation:"pulse-ring 2s ease-out infinite",
  }}>
    💜 Instalar app
  </button>
)}
      {/* Botón Jungkook */}
      <button onClick={() => setShowJK(s => !s)} style={{
        position:"fixed", top:16, right:16, zIndex:100,
        background: showJK ? "#7c3aed" : "#1a0a2e",
        border:"1.5px solid #be123c", borderRadius:24,
        padding:"8px 14px", cursor:"pointer", fontSize:12,
        color:"#f3e8ff", fontWeight:700,
        boxShadow: showJK ? "0 0 18px #be123c99" : "none",
        transition:"all .3s", lineHeight:1.3, textAlign:"center",
      }}>
        {showJK ? "❌ Cerrar" : "¿Quieres ver\na Jungkook?"}
      </button>

      {showJK && (
        <div onClick={() => setShowJK(false)} style={{
          position:"fixed", inset:0, zIndex:200,
          background:"rgba(0,0,0,0.85)",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:16,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            position:"relative", maxWidth:360, width:"100%",
          }}>
            <img src={JK_B64} alt="Jungkook Calvin Klein" style={{
              width:"100%", borderRadius:16,
              border:"3px solid #be123c",
              boxShadow:"0 0 40px #be123c99",
              display:"block",
            }}/>
            <p style={{ color:"#f3e8ff", textAlign:"center", marginTop:10,
              fontWeight:700, fontSize:14, textShadow:"0 0 10px #7c3aed" }}>
              💜 Jeon Jungkook 💜
            </p>
          </div>
        </div>
      )}

      <div style={{ width:"100%", maxWidth:480, position:"relative", zIndex:1 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap", marginBottom:12 }}>
            {MEMBERS.map(m => (
              <span key={m} style={{
                fontSize:10, color:"#be123c", fontWeight:600,
                background:"#be123c18", border:"1px solid #be123c44",
                borderRadius:20, padding:"2px 8px", letterSpacing:0.5,
              }}>{m}</span>
            ))}
          </div>

          {/* Logo con anillo animado */}
          <div style={{ position:"relative", display:"inline-block", marginBottom:12 }}>
            {/* anillo exterior girando */}
            <div style={{
              position:"absolute", inset:-5, borderRadius:"50%",
              background:"conic-gradient(#be123c, #7c3aed, #ffffff, #be123c)",
              animation:"spin-slow 4s linear infinite", opacity:0.8,
            }}/>
            {/* pulso */}
            <div style={{
              position:"absolute", inset:-5, borderRadius:"50%",
              background:"transparent", border:"2px solid #7c3aed",
              animation:"pulse-ring 2s ease-out infinite",
            }}/>
            <img src={LOGO_B64} alt="Army Jessy"
              style={{ width:100, height:100, borderRadius:"50%",
                objectFit:"cover", position:"relative", display:"block",
                border:"3px solid #0d0015",
                animation:"float 3.5s ease-in-out infinite",
              }}/>
          </div>

          <h1 style={{ color:"#f3e8ff", fontSize:22, fontWeight:700, margin:0,
            textShadow:"0 0 20px #7c3aed88" }}>
            Regla del Aspa
          </h1>
          <p style={{ color:"#7c3aed", fontSize:12, margin:"4px 0 0" }}>
            Método de Aligación · Diluciones IV
          </p>
          <p style={{ color:"#be123c", fontSize:12, margin:"6px 0 0", fontWeight:700, letterSpacing:1 }}>
            💜 Para Jessy, con amor 💜
          </p>
          <p style={{ color:"#4c1d95", fontSize:10, margin:"4px 0 0" }}>
            by MediShorts 360
          </p>
        </div>

        {/* ── TABS ── */}
        <div style={{ display:"flex", gap:6, marginBottom:20,
          background:"#1a0a2e", borderRadius:12, padding:4,
          border:"1px solid #3b1f6e" }}>
          {Object.entries(PRESETS).map(([k,v]) => (
            <button key={k} onClick={() => handleTipo(k)} style={{
              flex:1, padding:"8px 4px", border:"none", borderRadius:9,
              background: tipo===k ? v.acento : "transparent",
              color: tipo===k ? "#fff" : "#7c3aed",
              fontWeight: tipo===k ? 700 : 400, fontSize:12,
              cursor:"pointer", transition:"all .2s",
              boxShadow: tipo===k ? `0 0 10px ${v.acento}66` : "none",
            }}>{v.icon} {k}</button>
          ))}
        </div>

        {/* ── CONCENTRACIONES ── */}
        <div style={{ background:"#12002a", borderRadius:16, padding:20, marginBottom:14,
          border:`1px solid ${ac}44`, boxShadow:`0 0 20px ${ac}18` }}>
          <p style={{ color:"#7c3aed", fontSize:10, textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>
            Presentaciones disponibles
          </p>
          {preset.opciones_conc.length > 0 && (
            <div style={{ marginBottom:6 }}>
              <div style={{ fontSize:10, color:"#a78bfa", marginBottom:5 }}>Concentrada:</div>
              <ToggleGroup opciones={preset.opciones_conc} seleccionado={cConc} onSelect={handleSelConc} color={ac}/>
            </div>
          )}
          {preset.opciones_dil.length > 0 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:"#a78bfa", marginBottom:5 }}>Diluida:</div>
              <ToggleGroup opciones={preset.opciones_dil} seleccionado={cDil} onSelect={handleSelDil} color={ac}/>
            </div>
          )}
          {tipo==="Genérica" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
              {[["Nombre conc.", labelConc, setLabelConc],["Nombre dil.", labelDil, setLabelDil]].map(([lbl,val,set])=>(
                <div key={lbl} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={{ fontSize:10, color:"#a78bfa", textTransform:"uppercase", letterSpacing:1 }}>{lbl}</label>
                  <input value={val} onChange={e=>set(e.target.value)}
                    style={{ background:"#1a0a2e", border:`1px solid ${ac}44`, borderRadius:8,
                      color:"#f3e8ff", padding:"8px 10px", fontSize:13, outline:"none" }}/>
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <NumInput label={labelConc} value={cConc} onChange={setCConc} min={0} max={100} ac={ac}/>
            <NumInput label={labelDil}  value={cDil}  onChange={setCDil}  min={0} max={100} ac={ac}/>
          </div>
        </div>

        {/* ── OBJETIVO ── */}
        <div style={{ background:"#12002a", borderRadius:16, padding:20, marginBottom:14,
          border:`1px solid ${ac}44`, boxShadow:`0 0 20px ${ac}18` }}>
          <p style={{ color:"#7c3aed", fontSize:10, textTransform:"uppercase", letterSpacing:1, margin:"0 0 14px" }}>
            Objetivo
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <NumInput label="Concentración deseada" value={cDeseada} onChange={setCDeseada} min={0} max={100} ac={ac}/>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              <label style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#a78bfa" }}>Volumen final</label>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                {preset.volumenes.map(v => (
                  <button key={v} onClick={()=>setVFinal(v)} style={{
                    flex:1, minWidth:42, padding:"9px 4px", border:"none", borderRadius:8,
                    background: vFinal===v ? ac : "#1a0a2e",
                    color: vFinal===v ? "#fff" : "#7c3aed",
                    fontWeight: vFinal===v ? 700 : 400, fontSize:12,
                    cursor:"pointer", transition:"all .15s",
                    boxShadow: vFinal===v ? `0 0 8px ${ac}66` : "none",
                  }}>{v}</button>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", background:"#1a0a2e",
                borderRadius:8, border:`1px solid ${ac}44`, marginTop:2 }}>
                <input type="number" value={vFinal} min={1}
                  onChange={e=>setVFinal(parseFloat(e.target.value)||0)}
                  style={{ background:"transparent", border:"none", color:"#f3e8ff",
                    fontSize:16, fontFamily:"'DM Mono',monospace", padding:"8px 12px",
                    width:"100%", outline:"none" }}/>
                <span style={{ paddingRight:12, color:"#7c3aed", fontSize:13 }}>mL</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ERROR ── */}
        {!valido && (
          <div style={{ background:"#2d001a", border:"1px solid #be123c",
            borderRadius:12, padding:"12px 16px", marginBottom:14,
            color:"#fda4af", fontSize:13 }}>
            ⚠️ La concentración deseada debe estar <strong>entre</strong> la diluida ({cDil}%) y la concentrada ({cConc}%).
          </div>
        )}

        {/* ── RESULTADO ── */}
        {res && (
          <div style={{ background:"#0d0015", borderRadius:16,
            border:`1.5px solid ${ac}55`, overflow:"hidden", marginBottom:14,
            boxShadow:`0 0 30px ${ac}22` }}>

            <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${ac}22` }}>
              <p style={{ color:"#7c3aed", fontSize:10, textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>
                Diagrama del Aspa
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:8 }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ color:ac, fontWeight:700, fontSize:20, fontFamily:"'DM Mono'", textShadow:`0 0 10px ${ac}88` }}>{cConc}%</div>
                  <div style={{ color:"#7c3aed", fontSize:10 }}>{labelConc}</div>
                </div>
                <div style={{ width:60, height:60 }}>
                  <svg viewBox="0 0 60 60" width="60" height="60">
                    <line x1="5" y1="5" x2="55" y2="55" stroke="#3b1f6e" strokeWidth="1.5"/>
                    <line x1="55" y1="5" x2="5" y2="55" stroke="#3b1f6e" strokeWidth="1.5"/>
                    <circle cx="30" cy="30" r="14" fill="#12002a" stroke={ac} strokeWidth="1.5"/>
                    <text x="30" y="34" textAnchor="middle" fill={ac} fontSize="10" fontWeight="700" fontFamily="monospace">{cDeseada}%</text>
                  </svg>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ color:"#a78bfa", fontWeight:700, fontSize:20, fontFamily:"'DM Mono'" }}>{cDil}%</div>
                  <div style={{ color:"#7c3aed", fontSize:10 }}>{labelDil}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ color:"#4c1d95", fontSize:10 }}>→ partes</div>
                  <div style={{ color:"#f3e8ff", fontWeight:600, fontSize:15, fontFamily:"'DM Mono'" }}>{res.pConc.toFixed(2)}</div>
                </div>
                <div/>
                <div style={{ textAlign:"center" }}>
                  <div style={{ color:"#4c1d95", fontSize:10 }}>→ partes</div>
                  <div style={{ color:"#f3e8ff", fontWeight:600, fontSize:15, fontFamily:"'DM Mono'" }}>{res.pDil.toFixed(2)}</div>
                </div>
              </div>
              <div style={{ textAlign:"center", marginTop:8, color:"#7c3aed", fontSize:11 }}>
                Total: <span style={{ color:"#f3e8ff", fontFamily:"'DM Mono'", fontWeight:600 }}>{res.pTot.toFixed(2)} partes</span>
              </div>
            </div>

            <div style={{ padding:20 }}>
              <p style={{ color:"#7c3aed", fontSize:10, textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>
                Volúmenes para {vFinal} mL
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[
                  { label:labelConc, v:res.vConc, c:cConc, color:ac },
                  { label:labelDil,  v:res.vDil,  c:cDil,  color:"#a78bfa" },
                ].map(({ label, v, c, color }) => (
                  <div key={label} style={{ background:"#12002a", borderRadius:12,
                    padding:"14px 16px", borderLeft:`3px solid ${color}`,
                    boxShadow:`0 0 12px ${color}22` }}>
                    <div style={{ color:"#7c3aed", fontSize:10, marginBottom:4 }}>{label} ({c}%)</div>
                    <div style={{ color:color, fontSize:24, fontWeight:700,
                      fontFamily:"'DM Mono'", textShadow:`0 0 8px ${color}66` }}>
                      {v.toFixed(1)} <span style={{ fontSize:12, fontWeight:400 }}>mL</span>
                    </div>
                    <div style={{ marginTop:8, background:"#0d0015", borderRadius:6, height:6, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${(v/vFinal)*100}%`,
                        background:`linear-gradient(90deg,${color}88,${color})`,
                        borderRadius:6, transition:"width .4s" }}/>
                    </div>
                    <div style={{ color:"#4c1d95", fontSize:10, marginTop:4 }}>
                      {((v/vFinal)*100).toFixed(1)}% del total
                    </div>
                  </div>
                ))}
              </div>

              {ampolla && ampollasCeil !== null && (
                <div style={{ marginTop:12, background:`${ac}15`,
                  border:`1px solid ${ac}55`, borderRadius:10,
                  padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ fontSize:20, marginTop:1 }}>💉</span>
                  <div>
                    <div style={{ color:ac, fontWeight:700, fontSize:14, fontFamily:"'DM Mono'" }}>
                      {ampollasCeil} ampolla{ampollasCeil>1?"s":""} de {labelConc}
                    </div>
                    <div style={{ color:"#a78bfa", fontSize:11, marginTop:2 }}>
                      Necesitas {res.vConc.toFixed(1)} mL exactos.
                      {sobranteMl > 0.05
                        ? ` Usa ${ampollasCeil} amp → descartar ${sobranteMl.toFixed(1)} mL antes de agregar.`
                        : " Usa exactamente esa cantidad."}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop:12, background:"#12002a", borderRadius:10,
                padding:"10px 14px", display:"flex", justifyContent:"space-between",
                alignItems:"center", border:`1px solid ${ac}22` }}>
                <span style={{ color:"#4c1d95", fontSize:12 }}>Verificación</span>
                <span style={{ color:"#f3e8ff", fontFamily:"'DM Mono'", fontSize:13 }}>
                  {res.vConc.toFixed(1)} + {res.vDil.toFixed(1)} ={" "}
                  <strong style={{ color:ac }}>{(res.vConc+res.vDil).toFixed(1)} mL</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── PASOS FINALES ── */}
        {res && pasos && (
          <div style={{ background:"linear-gradient(135deg,#1a0030,#2d001a)",
            border:`2px solid ${ac}`, borderRadius:16, padding:"18px 20px",
            marginBottom:16, boxShadow:`0 0 30px ${ac}44` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span style={{ fontSize:20 }}>💜</span>
              <span style={{ color:ac, fontWeight:700, fontSize:12,
                textTransform:"uppercase", letterSpacing:1 }}>
                Cómo prepararlo — paso a paso
              </span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {pasos.map((paso,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ minWidth:26, height:26, borderRadius:"50%",
                    background:`linear-gradient(135deg,${ac},#7c3aed)`,
                    color:"#fff", fontWeight:700, fontSize:13,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, marginTop:1, boxShadow:`0 0 8px ${ac}88` }}>{i+1}</div>
                  <p style={{ color:"#f3e8ff", fontSize:14, fontWeight:500,
                    lineHeight:1.55, margin:0 }}>{paso}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", marginTop:8 }}>
          <p style={{ color:"#3b1f6e", fontSize:10, margin:"0 0 4px" }}>
            Solo para referencia clínica · Verificar con profesional de salud
          </p>
          <p style={{ color:"#be123c", fontSize:11, margin:0, fontWeight:600 }}>
            💜 MediShorts 360 · Para Jessy ARMY 💜
          </p>
        </div>
      </div>
    </div>
  );
}
