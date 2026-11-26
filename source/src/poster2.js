/* ============ Poster v2 — rebuilt layouts (bilingual-ready) ============ */
const L=(a,e)=>(O.lang==='en'?e:a);
const nWL=n=>L(nW(n),n===1?'night':'nights'),dWL=n=>L(dW(n),n===1?'day':'days');
const ctaT=()=>{const c=C.cta||'';if(isEN()&&c==='احجز الآن')return'Book now';if(!isEN()&&c==='Book now')return'احجز الآن';return c};
const exT=x=>{const A=isEN()?EXCL_AR:EXCL_EN,B=isEN()?EXCL_EN:EXCL_AR,i=A.indexOf(x);return i>=0?B[i]:x};
const P2={
 plist(cls){const P=H.prices().slice(0,3);if(!P.length)return'';const one=P.length===1;
  return`<div class="q-pl n${P.length} ${cls||''}">${one?`<span class="q-fr2">${L('السعر','Price')}</span>`:''}${P.map(p=>`<div class="q-pr"><span class="q-lb">${esc(p.lab||'')}</span><div class="q-am"><b>${fmtAmt(p.amt)}</b><small>${esc(p.cur)}</small></div></div>`).join('')}</div>`},
 meta(){const n=H.tot();const a=[];if(n)a.push(`<span class="q-m">${IC.moon}<span><b>${n}</b> ${nWL(n)} · <b>${n+1}</b> ${dWL(n+1)}</span></span>`);if(O.dates)a.push(`<span class="q-m">${IC.cal}<span>${esc(O.dates)}</span></span>`);return a.join('')},
 thumbs(max){const multi=O.cities.length>1,c0=O.cities[0]||{photos:[],spots:[]};
  const t=multi?O.cities.slice(0,max).map((c,i)=>({s:H.cityPh(c,i===0?1:0),a:c.ar,b:`${c.n} ${nWL(+c.n)}`}))
   :[1,2,3].map(i=>({s:c0.photos[i]||'',a:(c0.spots||[])[i-1]||'',b:''})).filter(x=>x.s).slice(0,max);
  return t},
 price(){const f=H.from();if(!f)return'';const many=H.prices().length>1;
  return`<div class="q-pz"><span class="q-fr2">${many?L('يبدأ من','From'):L('السعر','Price')}</span><div class="q-am"><b>${fmtAmt(f.amt)}</b><small>${esc(f.cur)}</small></div>${f.lab?`<span class="q-lb">${esc(f.lab)}</span>`:''}</div>`},
 contacts(){const c=H.contacts();return c.map(([t,v])=>`<span class="q-ct">${IC[t]}<bdi>${esc(v)}</bdi></span>`).join('')},
 title(){return`${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||L('اسم الباكيدج','Package name'))}</div>`}
};

/* ---------- ZOVER · Signature ---------- */
ZV.poster=function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={...{sq:{ph:'48%',tn:3,inc:4},pt:{ph:'52%',tn:3,inc:8},st:{ph:'50%',tn:3,inc:8},a4:{ph:'50%',tn:3,inc:8}}[sz]};if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),pr=P2.plist('q-pz');
 return{cls:'p2 zs',vars:`--ph:${cfg.ph}`,html:`
 <div class="q-hero">${H.img(c0.photos[0],c0.ar)}<i class="q-sh"></i></div>
 <img class="q-lg2" src="${IMG.glow}">${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}
 <div class="q-hd" data-tmin="230">${P2.title()}<div class="q-meta">${P2.meta()}</div></div>
 <div class="q-pan"><i class="q-seam"></i>
  ${th.length?`<div class="q-tn q-n${th.length}">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption><b>${esc(t.a)}</b>${t.b?`<small>${esc(t.b)}</small>`:''}</figcaption></figure>`).join('')}</div>`:''}
  <div class="q-mid" data-fit>${inc.length?`<ul class="q-inc">${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}${pr}</div>
  <div class="q-ft"><div class="q-cts">${P2.contacts()||`<span class="q-ct">${L('زوفر العالمية للسفر والسياحة','Zover International Travel & Tourism')}</span>`}</div>${C.cta?`<span class="q-cta">${esc(ctaT())}</span>`:''}</div>
 </div>`}};

/* ---------- LUX · Night & gold ---------- */
LX.poster=function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={sq:{tn:0},pt:{tn:3},st:{tn:3},a4:{tn:3}}[sz];
 const th=P2.thumbs(cfg.tn),f=H.from(),inc=o.cover?[]:H.incl().slice(0,sz==='sq'?4:8);
 return{cls:'p2 ls',html:`${H.img(c0.photos[0],c0.ar)}<i class="q-sh"></i><i class="q-bd"></i>
 <img class="q-lg2" src="${IMG.glow}">${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}
 <div class="q-cn" data-fit>${P2.title()}<i class="q-rule"></i><div class="q-meta">${P2.meta()}</div>
  ${th.length?`<div class="q-tn">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption>${esc(t.a)}</figcaption></figure>`).join('')}</div>`:''}
  ${inc.length?`<div class="q-inc">${inc.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}
  ${P2.plist('q-pz')}
 </div>
 <div class="q-ft">${P2.contacts()}${C.cta?`<span class="q-cta">${esc(ctaT())}</span>`:''}</div>`}};

/* ---------- MAG · Editorial ---------- */
MG.poster=function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''},multi=O.cities.length>1;
 const cfg={...{sq:{inc:4,tn:0},pt:{inc:8,tn:3},st:{inc:8,tn:3},a4:{inc:8,tn:3}}[sz]};if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),f=H.from(),n=H.tot();
 return{cls:'p2 ms',html:`
 <div class="q-top"><img src="${IMG.logo}">${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}</div>
 <div class="q-hd" data-tmin="0">${P2.title()}</div>
 <div class="q-pics ${th.length?'':'q-one'}"><div class="q-big">${H.img(c0.photos[0],c0.ar)}</div>${th.length?`<div class="q-col">${th.slice(0,2).map(t=>`<figure>${H.img(t.s,t.a)}<figcaption>${esc(t.a)}</figcaption></figure>`).join('')}</div>`:''}</div>
 <div class="q-facts">${n?`<div><small>${L('المدة','Duration')}</small><b>${n} ${nWL(n)}</b></div>`:''}${O.dates?`<div><small>${L('المواعيد','Dates')}</small><b>${esc(O.dates)}</b></div>`:multi?`<div><small>${L('المدن','Cities')}</small><b>${esc(H.cityLine().join(L('، ',', ')))}</b></div>`:''}
  </div>${P2.plist('q-mpl')}
 ${inc.length?`<ul class="q-inc" data-fit>${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div>${C.cta?`<span class="q-cta">${esc(ctaT())}</span>`:''}</div>`}};

/* ---------- VIV · Color block ---------- */
VV.poster=function(sz,o={}){const c0=O.cities[0]||{photos:[],ar:''};
 const cfg={...{sq:{inc:4,tn:0},pt:{inc:8,tn:3},st:{inc:8,tn:3},a4:{inc:8,tn:3}}[sz]};if(o.cover)cfg.inc=0;
 const th=P2.thumbs(cfg.tn),inc=H.incl().slice(0,cfg.inc),f=H.from();
 return{cls:'p2 vs',html:`
 <div class="q-ph1">${H.img(c0.photos[0],c0.ar)}</div>
 <img class="q-lg2" src="${IMG.glow}">
 <div class="q-blk"><div class="q-hd" data-fit>${O.badge?`<span class="q-bdg">${esc(O.badge)}</span>`:''}${P2.title()}<div class="q-meta">${P2.meta()}</div></div>
  ${H.prices().length===1?`<div class="q-tag"><span class="q-fr2">${L('السعر','Price')}</span><b><bdi>${fmtAmt(f.amt)}</bdi> <i>${esc(f.cur)}</i></b>${f.lab?`<small>${esc(f.lab)}</small>`:''}</div>`:''}</div>
 ${H.prices().length>1?P2.plist('q-vpl'):''}
 ${th.length?`<div class="q-tn">${th.map(t=>`<figure>${H.img(t.s,t.a)}<figcaption>${esc(t.a)}</figcaption></figure>`).join('')}</div>`:''}
 ${inc.length?`<ul class="q-inc" data-fit>${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
 <div class="q-ft"><div class="q-cts">${P2.contacts()}</div>${C.cta?`<span class="q-cta">${esc(ctaT())}</span>`:''}</div>`}};

/* ============ Shared slides + PDF (skinned per theme) ============ */
const SKIN={zover:'zs',lux:'ls',mag:'ms',viv:'vs'};
const P3={
 logo(){return`<img class="q-lgs" src="${['mag','day','tkt','pc','arch'].includes(O.theme)?IMG.logo:IMG.glow}">`},
 pg(i,n){return`<span class="q-pg"><bdi>${i} / ${n}</bdi></span>`},
 foot(i,n){const c=H.contacts();return`<div class="q-sf">${this.logo()}<div class="q-cts">${c.map(([t,v])=>`<span class="q-ct">${IC[t]}<bdi>${esc(v)}</bdi></span>`).join('')}</div>${this.pg(i,n)}</div>`},
 city(sz,i,n,c,ci){const r=H.ranges()[ci],ph=c.photos,sp=(c.spots||[]).filter(Boolean).slice(0,4),multi=O.cities.length>1;
  return{cls:`p3 q-city ${SKIN[O.theme]}`,html:`
  <div class="q-ph">${H.img(ph[0],c.ar)}${multi?`<span class="q-stop">${L('المحطة','Stop')} ${ci+1}</span>`:''}</div>
  ${ph[1]?`<div class="q-two">${[ph[1],ph[2]].filter(Boolean).map(p=>`<div>${H.img(p)}</div>`).join('')}</div>`:''}
  <div class="q-body" data-fit><h2 class="q-h" data-ft="1">${esc(c.ar)}</h2>
   <div class="q-sm"><span>${IC.moon}<b>${c.n}</b> ${nWL(+c.n)}</span><span>${L(`اليوم ${r[0]} – ${r[1]}`,`Day ${r[0]} – ${r[1]}`)}</span></div>
   ${sp.length?`<ul class="q-sp">${sp.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}</div>
  ${this.foot(i,n)}`}},
 itin(sz,i,n){const D=O.days.length?O.days:genDays(),rs=H.ranges(),tot=H.tot();
  const cityOf=d=>{for(let k=0;k<rs.length;k++)if(d>=rs[k][0]&&d<=rs[k][1])return O.cities[k].ar;return''};
  return{cls:`p3 q-itin ${SKIN[O.theme]}`,html:`
  <div class="q-head"><h2 class="q-h">${L('البرنامج اليومي','Day by day')}</h2><div class="q-sm"><span>${IC.moon}<b>${tot}</b> ${nWL(tot)}</span><span>${esc(H.cityLine().join(L('، ',', ')))}</span></div></div>
  <ol class="q-days" data-fit style="--k:${(D.length<=6?1.32:D.length<=9?1.14:1)*(sz==='a4'?1.15:1)}">${D.map((d,k)=>{const cn=cityOf(k+1),pv=k?cityOf(k):'';return`<li><i><bdi>${k+1}</bdi></i><div>${O.cities.length>1&&cn&&cn!==pv?`<em>${esc(cn)}</em>`:''}<span>${esc(d)}</span></div></li>`}).join('')}</ol>
  ${this.foot(i,n)}`}},
 price(sz,i,n,full){const P=H.prices(),inc=H.incl(),ex=full?H.excl().map(exT):[];
  return{cls:`p3 q-price ${SKIN[O.theme]}`,html:`
  <div class="q-head"><h2 class="q-h">${esc(O.title||'')}</h2><div class="q-sm">${P2.meta()}</div></div>
  <div class="q-body" data-fit style="--k:${(inc.length+ex.length<=8?1.25:inc.length+ex.length<=12?1.1:1)*(sz==='a4'?1.25:1)}">
  ${P.length?`<div class="q-prs">${P.map(p=>`<div class="q-prw"><div class="q-pl">${+p.stars?`<span class="q-st">${'★'.repeat(+p.stars)}</span>`:''}<span>${esc(p.lab||L('السعر','Price'))}</span></div><div class="q-am"><b>${fmtAmt(p.amt)}</b><small>${esc(p.cur)}</small></div></div>`).join('')}</div>`:''}
  <div class="q-lists ${ex.length?'two':''}">${inc.length?`<div><h3>${L('البرنامج يشمل','Included')}</h3><ul class="q-ok">${inc.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
  ${ex.length?`<div><h3>${L('لا يشمل','Not included')}</h3><ul class="q-no">${ex.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}</div>
  ${full&&O.notes?`<p class="q-note">${esc(O.notes)}</p>`:''}</div>
  ${C.cta||H.contacts().length?`<div class="q-call">${C.cta?`<span class="q-cta">${esc(ctaT())}</span>`:''}<div class="q-cts">${H.contacts().map(([t,v])=>`<span class="q-ct">${IC[t]}<bdi>${esc(v)}</bdi></span>`).join('')}</div></div>`:''}
  <div class="q-sf">${this.logo()}<span></span>${this.pg(i,n)}</div>`}},
 slides(T,sz){const n=1+O.cities.length+(O.showItin?1:0)+1;let i=1;const L2=[];
  const cv=T.poster(sz,{cover:1});cv.cls+=' q-cover';L2.push(cv);i++;
  O.cities.forEach((c,ci)=>L2.push(this.city(sz,i++,n,c,ci)));if(O.showItin)L2.push(this.itin(sz,i++,n));L2.push(this.price(sz,i++,n));return L2},
 pdf(T){const n=1+O.cities.length+2;let i=1;const L2=[];
  const cv=T.poster('a4',{});L2.push(cv);i++;
  O.cities.forEach((c,ci)=>L2.push(this.city('a4',i++,n,c,ci)));L2.push(this.itin('a4',i++,n));L2.push(this.price('a4',i++,n,1));return L2}
};
[ZV,LX,MG,VV].forEach(T=>{T.slides=function(sz){return P3.slides(this,sz)};T.pdf=function(){return P3.pdf(this)}});
