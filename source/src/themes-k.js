/* ============ "Zover Flyer" themes — modelled on the company's own designed flyers ============ */
const KI={ /* inclusion icons, 24x24, filled */
 bag:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="3.6" r="2.1"/><path d="M7.6 6.6h2.9c.8 0 1.4.6 1.4 1.4v5.2l-1.6.9v7.2a1 1 0 0 1-2 0v-5.6h-.6v5.6a1 1 0 0 1-2 0V12.1l-1.2-.7V8c0-.8.6-1.4 1.4-1.4z"/><rect x="13.4" y="9.4" width="6.4" height="9.6" rx="1.4"/><path d="M15.2 9.4V7.8h2.8v1.6" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="14.6" cy="20.4" r=".9"/><circle cx="18.6" cy="20.4" r=".9"/></svg>',
 bed:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 6.5a1 1 0 0 1 2 0V13h17a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-2H4v2a1 1 0 0 1-2 0z"/><circle cx="7.4" cy="10.2" r="2.1"/><path d="M10.6 8.6h7.2a3 3 0 0 1 3 3v.4H10.6z"/></svg>',
 cam:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.6 4.5h6.8l1.4 2.2H20a2 2 0 0 1 2 2v9.8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.7a2 2 0 0 1 2-2h3.2zM12 9a4.6 4.6 0 1 0 0 9.2A4.6 4.6 0 0 0 12 9m0 2a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2"/></svg>',
 drv:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.4 6.2C6.6 3.8 9 2.4 12 2.4s5.4 1.4 5.6 3.8L19 7.4H5z"/><path d="M7.4 8.4h9.2a4.6 4.6 0 0 1-9.2 0"/><path d="M4 21.6c0-4.2 3.2-7.2 8-7.2s8 3 8 7.2z"/><circle cx="12" cy="18.6" r="2.6" fill="#fff"/><circle cx="12" cy="18.6" r="1" /></svg>',
 van:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 8a2 2 0 0 1 2-2h11.6c.6 0 1.1.3 1.5.7L20.6 11l1 .4c.3.2.4.5.4.8V16a1 1 0 0 1-1 1h-1.2a2.6 2.6 0 0 0-5.1 0H9.3a2.6 2.6 0 0 0-5.1 0H3a1 1 0 0 1-1-1zm2.6.6v3h4v-3zm5.8 0v3h4v-3zm5.8 0v3h3.2l-2.6-3z"/><circle cx="6.8" cy="17.4" r="1.8"/><circle cx="17.2" cy="17.4" r="1.8"/></svg>',
 sim:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h7.6L19 6.4V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m1.6 9v2.2h2.2V11zm4.6 0v2.2h2.2V11zm-4.6 4.4v2.2h2.2v-2.2zm4.6 0v2.2h2.2v-2.2z"/></svg>',
 food:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.2a1.6 1.6 0 0 1 1.6 1.6v.4A8.6 8.6 0 0 1 20.6 15H3.4a8.6 8.6 0 0 1 7-8.8v-.4A1.6 1.6 0 0 1 12 4.2"/><rect x="2" y="16.4" width="20" height="2.6" rx="1.3"/></svg>',
 plane:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>',
 shield:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 4 5v6.2c0 5 3.4 9.4 8 10.8 4.6-1.4 8-5.8 8-10.8V5zm-1.2 14.2-3.6-3.6 1.4-1.4 2.2 2.2 4.8-4.8 1.4 1.4z"/></svg>',
 visa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m6 4.4a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4M8 17.6v1.6h8v-1.6z"/></svg>',
 tax:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.4 3.2a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 0 1.4l-.6.6.8 1.2 1.4.3a1 1 0 0 1 .8 1v2.6a1 1 0 0 1-.8 1l-1.4.3-.8 1.2.4 1.3-1 1-1.3-.4-1.2.8-.3 1.4H12l-.3-1.4-1.2-.8-1.3.4-1-1 .4-1.3-.8-1.2-1.4-.3a1 1 0 0 1-.8-1V9.7a1 1 0 0 1 .8-1l1.4-.3.8-1.2-.4-1.3 1-1 1.3.4 1.2-.8L12 3h1.4zM13 9a2.8 2.8 0 1 0 0 5.6A2.8 2.8 0 0 0 13 9"/><path d="M1.6 17.6h3.2l3 2.4h5.4a1.2 1.2 0 0 1 0 2.4H1.6z"/></svg>',
 train:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-2.4 2.9L19.4 21h-2.3l-1.5-3H8.4l-1.5 3H4.6l1.8-3.1A3 3 0 0 1 4 15V5a3 3 0 0 1 3-3m-.6 3.4v5h11.2v-5zM7.6 13a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8m8.8 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8"/></svg>',
 hotel:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 2h14v20h-5v-4h-4v4H5zm3 3v2h2V5zm6 0v2h2V5zM8 9v2h2V9zm6 0v2h2V9zm-6 4v2h2v-2zm6 0v2h2v-2z"/></svg>',
 ok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-1.4 14.2-4.2-4.2 1.4-1.4 2.8 2.8 6-6 1.4 1.4z"/></svg>',
 pin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7m0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 9v11h14V9z"/></svg>'
};
const KIC=t=>{t=(t||'').toLowerCase();
 if(/استقبال|توديع|transfer/.test(t))return KI.bag; if(/طيران|تذاكر|flight/.test(t))return KI.plane; if(/قطار|train/.test(t))return KI.train;
 if(/سائق|driver|سيارة|car\b/.test(t))return /جول|tour/.test(t)?KI.van:KI.drv; if(/جول|tour|sightseeing/.test(t))return KI.cam;
 if(/شري|إنترنت|انترنت|sim|data/.test(t))return KI.sim; if(/تأمين|insurance/.test(t))return KI.shield; if(/تأشير|visa/.test(t))return KI.visa;
 if(/ضريب|tax/.test(t))return KI.tax; if(/إفطار|افطار|وجب|breakfast|meal/.test(t)&&!/إقامة|اقامة|night|ليال/.test(t))return KI.food;
 if(/فندق|فنادق|hotel/.test(t))return KI.hotel; if(/إقامة|اقامة|ليال|night|stay/.test(t))return KI.bed; return KI.ok};
const KSHORT=(t,st)=>{const s=String(t||'');
 const M=[[/^تذاكر الطيران/,'طيران ذهاب وعودة'],[/^الإقامة .*الإفطار/,st?`إقامة ${st} نجوم مع الإفطار`:'إقامة مع الإفطار'],[/^الاستقبال والتوديع/,'استقبال وتوديع'],[/^سيارة خاصة مع سائق/,'سائق خاص'],[/^جولات سياحية/,'جولات سياحية'],[/^شريحة اتصال/,'شرائح إنترنت'],[/^شامل الضرائب/,'شامل الضريبة'],[/^تأمين السفر/,'تأمين السفر'],
  [/^Return flights/i,'Return flights'],[/nights? with breakfast/i,st?`${st}-star stay & breakfast`:'Stay with breakfast'],[/^Airport transfers/i,'Airport transfers'],[/^Private car/i,'Private driver'],[/^Sightseeing/i,'Sightseeing tours'],[/^SIM card/i,'SIM & data'],[/^All taxes/i,'Taxes included']];
 for(const [r,v] of M)if(r.test(s))return v;return s};
const kStars=()=>Math.max(0,...H.prices().map(p=>+p.stars||0));
const kCur=c=>{if(c==='ر.س')return L('ريال','SAR');return c};
const kLogoPanel=()=>`<div class="k-lp"><img src="${IMG.logo}"></div>`;
const kNights=()=>{const n=H.tot(),st=kStars();if(!n)return'';return`<div class="k-nt"><div class="k-nn"><b>${n}</b><span>${nWL(n)}</span></div>${st?`<div class="k-ns">${L(`${st} نجوم`,`${st} stars`)}</div><div class="k-nr">${'★'.repeat(st)}</div>`:''}</div>`};
const kSeason=()=>O.badge?`<div class="k-ss"><span>${esc(O.badge)}</span></div>`:'';
const kPin=()=>{const multi=O.cities.length>1,c0=O.cities[0]||{spots:[]};const t=multi?O.cities.map(c=>c.ar).join(' - '):((c0.spots||[]).filter(Boolean).slice(0,2).length?[c0.ar].concat((c0.spots||[]).filter(Boolean).slice(0,2)).join(' - '):c0.ar);return t?`<div class="k-pin">${KI.pin}<span>${esc(t)}</span></div>`:''};
const kCircles=max=>{const multi=O.cities.length>1,c0=O.cities[0]||{photos:[],spots:[]};
 const t=multi?O.cities.slice(0,max).map((c,i)=>({s:H.cityPh(c,i===0?1:0),a:c.ar,n:c.n})):kRest(c0).map(x=>({...x,n:0})).filter(x=>x.s).slice(0,max);
 return t.length?`<div class="k-cir n${t.length}">${t.map(x=>`<figure><div class="k-ph">${H.img(x.s,x.a)}</div>${x.a?`<figcaption>${x.n?`<i>${x.n}</i>`:''}${esc(x.a)}</figcaption>`:''}</figure>`).join('')}</div>`:''};
const kPrice=()=>{const P=H.prices().slice(0,3);if(!P.length)return'';
 return`<div class="k-pb n${P.length}"><div class="k-pbi">${P.map(p=>`<div class="k-pr"><span class="k-pl">${esc(p.lab||L('السعر للشخص','Price per person'))}</span>${P2.old(p)}<div class="k-am"><b>${fmtAmt(p.amt)}</b><i>${esc(kCur(p.cur))}</i></div></div>`).join('')}</div>${P2.inst()}</div>`};
const kIcons=(inc,max)=>{const st=kStars(),L2=inc.slice(0,max);return L2.length?`<div class="k-ic n${L2.length}">${L2.map(x=>`<div><span class="k-ico">${KIC(x)}</span><b>${esc(KSHORT(x,st))}</b></div>`).join('')}</div>`:''};
const kPills=inc=>{const a=[];const st=kStars();
 if(O.dates)a.push(`<div class="k-pw">${KI.cal}<span>${esc(O.dates)}</span></div>`);
 else if(inc.length)a.push(`<div class="k-pw"><span>${L('شامل ','Includes ')}${inc.slice(0,3).map(x=>esc(KSHORT(x,st))).join(L(' و',', '))}</span></div>`);
 if(O.sub)a.push(`<div class="k-py"><span>${esc(O.sub)}</span></div>`);
 return a.length?`<div class="k-pills">${a.join('')}</div>`:''};
const kContacts=()=>{const c=H.contacts();return c.length?`<div class="k-ct">${c.map(([t,v])=>`<span>${IC[t]}<bdi>${esc(v)}</bdi></span>`).join('')}</div>`:''};
const kHI=()=>{const c0=O.cities[0]||{photos:[]};const h=+O.hero||0;return c0.photos[h]?h:0};
const kHero=()=>{const c0=O.cities[0]||{photos:[],ar:''};return`<div class="k-hero">${H.img(c0.photos[kHI()],c0.ar)}</div><i class="k-fade"></i>`};
const kRest=c0=>c0.photos.map((p,i)=>({p,i})).filter(x=>x.i!==kHI()).map(x=>({s:x.p,a:x.i===0?c0.ar:((c0.spots||[])[x.i-1]||'')}));

/* ---- 1. Classic navy (Azerbaijan / Cairo flyers) ---- */
const KCL={poster(sz,o={}){const inc=H.incl(),max={sq:4,pt:5,tall:5,st:6,a4:6}[sz]||5;
 return{cls:'k k1',html:`${kHero()}${kLogoPanel()}${kSeason()}${kNights()}
 <div class="k-main" data-fit><div class="ttl" data-ft="${(O.title||'').length>14?2:1}">${esc(O.title||'')}</div>${kPin()}
  ${sz==='sq'?'':kCircles(3)}${kPrice()}${o.cover?'':kIcons(inc,max)}${o.cover?'':kPills(inc)}${kContacts()}</div>`}}};

/* ---- 2. Splash (Malaysia / Thailand flyers) ---- */
const KSP={poster(sz,o={}){const inc=H.incl(),multi=O.cities.length>1;
 const route=multi?`<div class="k-rt">${O.cities.map(c=>`<span><b>${c.n}</b> ${esc(c.ar)}</span>`).join('<i></i>')}</div>`:kPin();
 return{cls:'k k2',html:`${kHero()}${kLogoPanel()}${kSeason()}${kNights()}
 <div class="k-main" data-fit><div class="ttl" data-ft="${(O.title||'').length>14?2:1}">${esc(O.title||'')}</div>${O.sub?`<div class="k-sub"><span>${esc(O.sub)}</span></div>`:''}
  <div class="k-low">${kPrice()}<div class="k-side">${route}${o.cover?'':`<div class="k-cards"><span class="k-yl">${L('يشمل','Includes')}</span>${inc.slice(0,{sq:5,pt:5,tall:6,st:6,a4:6}[sz]||5).map(x=>`<div><span class="k-ico">${KIC(x)}</span><b>${esc(KSHORT(x,kStars()))}</b></div>`).join('')}</div>`}</div></div>
  ${O.dates?`<div class="k-xp"><span>${KI.cal}${esc(O.dates)}</span></div>`:''}${kContacts()}</div>`}}};

/* ---- 3. Light (Northern Turkey flyer) ---- */
const KLT={poster(sz,o={}){const inc=H.incl(),n=H.tot(),multi=O.cities.length>1,c0=O.cities[0]||{photos:[],spots:[]};
 const cards=(multi?O.cities.slice(0,3).map((c,i)=>({s:H.cityPh(c,i===0?1:0),a:c.ar})):kRest(c0).filter(x=>x.s).slice(0,3));
 return{cls:'k k3',html:`${kHero()}${kLogoPanel()}
 <div class="k-tt">${O.badge?`<span class="k-tb">${esc(O.badge)}</span>`:''}<div class="ttl" data-ft="2">${esc(O.title||'')}</div>${kPin()}</div>
 <div class="k-body" data-fit><div class="k-mid">${cards.length?`<div class="k-pol">${cards.map(c=>`<figure>${H.img(c.s,c.a)}<figcaption>${esc(c.a)}</figcaption></figure>`).join('')}</div>`:''}
  <div class="k-rc">${n?`<div class="k-nb"><b>${n}</b><span>${nWL(n)}</span>${kStars()?`<em>${'★'.repeat(kStars())}</em>`:''}</div>`:''}
   <div class="k-ls">${(o.cover?[]:inc.slice(0,{sq:3,pt:4,tall:5,st:6,a4:6}[sz]||4)).map(x=>`<div><span class="k-ico">${KIC(x)}</span><b>${esc(KSHORT(x,kStars()))}</b></div>`).join('')}</div></div></div>
 <div class="k-bot">${kPrice()}${O.dates?`<div class="k-dt">${KI.cal}<span>${esc(O.dates)}</span></div>`:''}</div></div>
 <div class="k-foot">${O.sub?`<span class="k-fs">${esc(O.sub)}</span>`:''}${kContacts()}</div>`}}};

/* ---- 4. Banner (Cruise flyer) ---- */
const KBN={poster(sz,o={}){const inc=H.incl(),n=H.tot(),P=H.prices().slice(0,3);
 const rows=[];if(O.dates)rows.push([L('المواعيد:','Dates:'),O.dates]);if(O.cities.length)rows.push([L('المدن:','Cities:'),O.cities.map(c=>`${c.ar} (${c.n})`).join(L('، ',', '))]);
 return{cls:'k k4',html:`${kHero()}<i class="k-top"></i>
 <div class="k-main" data-fit><img class="k-lg" src="${IMG.logo}">
  <div class="k-bar"><div class="ttl" data-ft="2">${esc(O.title||'')}</div></div>
  ${O.sub?`<div class="k-ob">${esc(O.sub)}</div>`:''}${n?`<div class="k-nb2">${L(`${n+1} أيام / ${n} ليالي`,`${n+1} days / ${n} nights`)}${kStars()?` · ${'★'.repeat(kStars())}`:''}</div>`:''}
  ${O.badge?`<div class="k-bd">${esc(O.badge)}</div>`:''}
  <span class="k-sp"></span>
  ${rows.map(([k,v])=>`<div class="k-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}
  ${o.cover?'':`<div class="k-chips">${inc.slice(0,{sq:4,pt:6,tall:6,st:8,a4:8}[sz]||6).map(x=>`<span>${KIC(x)}${esc(KSHORT(x,kStars()))}</span>`).join('')}</div>`}
  ${P.length===1?P.map(p=>`<div class="k-obar">${P2.old(p)}<span>${esc(p.lab||L('سعر الفرد','Per person'))}:</span><b>${fmtAmt(p.amt)}</b><span>${esc(kCur(p.cur)==='ريال'?L('ريال سعودي','SAR'):kCur(p.cur))}</span></div>`).join(''):`<div class="k-obar k-om">${P.map(p=>`<div class="k-op"><span>${esc(p.lab||'')}</span>${P2.old(p)}<b>${fmtAmt(p.amt)}<small>${esc(kCur(p.cur))}</small></b></div>`).join('')}</div>`}
  ${P2.inst()}</div>
 <div class="k-wave">${kContacts()}</div>`}}};

[KCL,KSP,KLT,KBN].forEach(T=>{T.slides=function(sz){return P3.slides(this,sz)};T.pdf=function(){return P3.pdf(this)}});
Object.assign(THEMES,{kcl:KCL,ksp:KSP,klt:KLT,kbn:KBN});
Object.assign(SKIN,{kcl:'kn',ksp:'kn',klt:'kw',kbn:'kn'});
