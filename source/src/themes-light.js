/* ============ Light themes (added on top of the originals) ============ */
IC.plane='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
Object.assign(SKIN,{day:'ds',tkt:'ts',pc:'cs',arch:'as'});
const fromL=()=>H.prices().length>1?L('يبدأ من','From'):L('السعر','Price');
const ctaB=cls=>C.cta?`<span class="q-cta ${cls||''}">${esc(ctaT())}</span>`:'';
const mkT=poster=>({poster,slides(sz){return P3.slides(this,sz)},pdf(){return P3.pdf(this)}});

/* ---------- نهار · Day ---------- */
THEMES.day=mkT(function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={sq:{tn:0,inc:4},pt:{tn:3,inc:8},st:{tn:3,inc:8},a4:{tn:3,inc:8}}[sz];if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),f=H.from();
 return{cls:'p2 dy',html:`
 <div class="q-top"><img src="${IMG.logo}">${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}</div><i class="q-rb"></i>
 <div class="q-hd">${P2.title()}<div class="q-meta">${P2.meta()}</div></div>
 <div class="q-ph1">${H.img(c0.photos[0],c0.ar)}${P2.plist('q-tag')}</div>
 ${th.length?`<div class="q-tn">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption><b>${esc(t.a)}</b>${t.b?`<small>${esc(t.b)}</small>`:''}</figcaption></figure>`).join('')}</div>`:''}
 ${inc.length?`<ul class="q-inc" data-fit>${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div>${ctaB()}</div>`}});

/* ---------- تذكرة · Boarding pass ---------- */
THEMES.tkt=mkT(function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''},cs=O.cities,last=cs[cs.length-1]||c0;
 const cfg={sq:{inc:4},pt:{inc:8},st:{inc:8},a4:{inc:8}}[sz];if(o.cover)cfg.inc=0;
 const inc=H.incl().slice(0,cfg.inc),f=H.from(),n=H.tot(),code=k=>{const c=CITIES[k]||{};return c.iata||({florence:'FLR',granada:'GRX'})[k]||(c.en||'').replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase()};
 const route=[`<div class="q-ap"><b>RUH</b><span>${L('الرياض','Riyadh')}</span></div>`].concat(cs.slice(0,3).map(c=>`<div class="q-ap"><b>${code(c.key)||'✈'}</b><span>${esc(c.ar)}</span></div>`)).join(`<i class="q-fl">${IC.plane}</i>`);
 return{cls:'p2 tk',html:`
 <i class="q-arc"></i>
 <div class="q-pass"><div class="q-top"><img src="${IMG.logo}">${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}</div>
  <div class="q-ph1">${H.img(c0.photos[0],c0.ar)}<div class="q-hd">${P2.title()}</div></div>
  <div class="q-rt n${Math.min(cs.length+1,4)}">${route}</div>
  <div class="q-flds">${n?`<div><small>${L('المدة','Duration')}</small><b>${n} ${nWL(n)}</b></div>`:''}${O.dates?`<div><small>${L('المواعيد','Dates')}</small><b>${esc(O.dates)}</b></div>`:''}<div><small>${L('المدن','Cities')}</small><b>${cs.length}</b></div></div>
  ${inc.length?`<ul class="q-inc" data-fit>${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
  <div class="q-perf"></div>
  <div class="q-stub">${P2.plist('q-pz')||'<span></span>'}${ctaB()}</div>
 </div>
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div></div>`}});

/* ---------- بطاقة بريدية · Postcard ---------- */
THEMES.pc=mkT(function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={sq:{tn:0,inc:4},pt:{tn:3,inc:8},st:{tn:3,inc:8},a4:{tn:3,inc:8}}[sz];if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),f=H.from(),n=H.tot();
 return{cls:'p2 pk',html:`
 <div class="q-card">
  <div class="q-ph1">${H.img(c0.photos[0],c0.ar)}</div>
  <div class="q-stamp"><img src="${IMG.logo}"></div>
  ${n?`<div class="q-pm"><b>${n}</b><span>${nWL(n)}</span><i></i><small>ZOVER</small></div>`:''}
  <div class="q-hd">${P2.title()}${O.dates?`<div class="q-meta"><span class="q-m">${IC.cal}<span>${esc(O.dates)}</span></span></div>`:''}</div>
 </div>
 ${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}
 ${th.length?`<div class="q-tn">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption>${esc(t.a)}</figcaption></figure>`).join('')}</div>`:''}
 <div class="q-row">${inc.length?`<ul class="q-inc" data-fit>${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<span></span>'}
  ${P2.plist('q-pz')}</div>
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div>${ctaB()}</div>`}});

/* ---------- قوس · Arch ---------- */
THEMES.arch=mkT(function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={sq:{tn:0,inc:4},pt:{tn:3,inc:8},st:{tn:3,inc:8},a4:{tn:3,inc:8}}[sz];if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),f=H.from();
 return{cls:'p2 ar',html:`
 <div class="q-top"><img src="${IMG.logo}"></div>
 <div class="q-arch">${H.img(c0.photos[0],c0.ar)}${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}</div>
 <div class="q-cn" data-fit>${P2.title()}<i class="q-orn"></i><div class="q-meta">${P2.meta()}</div>
  ${th.length?`<div class="q-tn">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption>${esc(t.a)}</figcaption></figure>`).join('')}</div>`:''}
  ${inc.length?`<div class="q-inc">${inc.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}</div>
 <div class="q-bt">${P2.plist('q-pz')}${ctaB()}</div>
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div></div>`}});
