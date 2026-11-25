/* ======================= VIVID THEME (حيوي) ======================= */
const VV={
 name:'حيوي',
 logo:()=>`<div class="logo"><img src="${IMG.glow}"></div>`,
 stk:()=>O.badge?`<div class="stk">${esc(O.badge)}</div>`:'',
 pills(){const n=H.tot();return`${n?`<span class="pill c">${n} ${nW(n)} • ${n+1} ${dW(n+1)}</span>`:''}${O.dates?`<span class="pill p">${esc(O.dates)}</span>`:''}`},
 burst(f){return f?`<div class="burst"><div><small>يبدأ من</small><b>${fmtAmt(f.amt)}</b><em>${esc(f.cur)} ${esc(f.lab||'')}</em></div></div>`:''},
 p2s(){return H.prices().map(p=>`<div class="p2">${+p.stars?`<small>${'★'.repeat(+p.stars)}</small>`:''}<b>${fmtAmt(p.amt)} <span style="font-size:.45em">${esc(p.cur)}</span></b><small>${esc(p.lab||'')}</small></div>`).join('')},
 chips(L){return L.length?`<div class="chips">${L.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''},
 ftr(dark){const c=H.contacts();return`<div class="ftr">${c.map(([t,v])=>`<span dir="ltr">${esc(v)}</span>`).join('')||'<span>زوفر للسفر والسياحة</span>'}${C.cta?`<span class="cta">${esc(C.cta)}</span>`:''}</div>`},
 stks(){const c0=O.cities[0]||{photos:[],spots:[]},multi=O.cities.length>1;
  const L=multi?O.cities.slice(0,3).map((c,i)=>({s:H.cityPh(c,i===0?1:0),t:c.ar})):[1,2,3].map(i=>({s:c0.photos[i]||'',t:(c0.spots||[])[i-1]||''})).filter(x=>x.s);
  return L.length?`<div class="stks">${L.map(x=>`<div><i>${H.img(x.s,x.t)}</i><span>${esc(x.t)}</span></div>`).join('')}</div>`:''},
 poster(sz){const c0=O.cities[0]||{photos:[]},P=H.prices(),f=H.from();
  const d={sq:['50%','200px','180px'],pt:['50%','262px','242px'],st:['44%','300px','300px']}[sz];
  return{cls:'poster',vars:`--ph:${d[0]};--sw:${d[1]};--sh:${d[2]}`,html:`<div class="pic">${H.img(c0.photos[0],O.title)}</div>${this.logo()}${this.stk()}
  <div class="tt" data-tmin="205">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div><div class="row1">${this.pills()}</div></div>
  <div class="mid" data-fit>${this.stks()}<div class="pr">${P.length>1?this.p2s():this.burst(f)}</div>${this.chips(H.incl().slice(0,6))}</div>${this.ftr()}`}},
 cover(sz,i,n){const c0=O.cities[0]||{photos:[]};
  return{cls:'cover',vars:`--bb:${{sq:'300px',pt:'360px',st:'480px'}[sz]}`,html:`${H.img(c0.photos[0],O.title)}<div class="ov"></div>${this.logo()}${this.stk()}${this.burst(H.from())}
  <div class="tt">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div><div style="display:flex;gap:10px;flex-wrap:wrap">${this.pills()}</div></div><span class="pgn">${i}/${n} ←</span>`}},
 city(sz,i,n,c,ci){const r=H.ranges()[ci],ph=c.photos;
  return{cls:'city',vars:`--bh:${{sq:'44%',pt:'46%',st:'44%'}[sz]}`,html:`<div class="blob a"></div><div class="blob b"></div><div class="big"><i>${H.img(ph[0],c.ar)}</i></div>
  ${ph[1]?`<div class="sm a"><i>${H.img(ph[1])}</i></div>`:''}${ph[2]?`<div class="sm b"><i>${H.img(ph[2])}</i></div>`:''}${O.cities.length>1?`<span class="no">المحطة ${ci+1}</span>`:''}
  <div class="bd" data-fit><h2 data-ft="1">${esc(c.ar)}</h2><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><span class="pill c">${c.n} ${nW(+c.n)}</span><span class="pill p">اليوم ${r[0]} – ${r[1]}</span></div>${this.chips((c.spots||[]).filter(Boolean).slice(0,4))}</div>
  <span class="pgn">${i}/${n}</span><img class="lg" src="${IMG.glow}">`}},
 itin(sz,i,n){const D=O.days.length?O.days:genDays(),rs=H.ranges();const co=d=>{for(let k=0;k<rs.length;k++)if(d>=rs[k][0]&&d<=rs[k][1])return O.cities[k].ar;return''};
  return{cls:'itin',html:`<div class="blob a"></div><div class="vhd"><h2>البرنامج اليومي</h2></div><div class="lst" data-fit>${D.map((d,k)=>`<div class="d"><b>${k+1}</b><span><em>${esc(co(k+1))}</em>${esc(d)}</span></div>`).join('')}</div>${this.ftr()}<span class="pgn">${i}/${n}</span>`}},
 price(sz,i,n){return{cls:'price',html:`<div class="blob a"></div><div class="vhd"><h2>تفاصيل العرض</h2></div><div class="bd" data-fit><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${this.pills()}</div><div class="prs">${this.p2s()}</div>${this.chips(H.incl().slice(0,8))}<div class="big">${esc(C.cta||'احجز الآن')}</div></div>${this.ftr()}`}},
 slides(sz){const L=[],n=1+O.cities.length+(O.showItin?1:0)+1;let i=1;L.push(this.cover(sz,i++,n));O.cities.forEach((c,ci)=>L.push(this.city(sz,i++,n,c,ci)));if(O.showItin)L.push(this.itin(sz,i++,n));L.push(this.price(sz,i++,n));return L},
 pf(p,n){const c=H.contacts();return`<div class="pf"><span>زوفر العالمية للسفر والسياحة</span><span dir="ltr">${c.map(x=>esc(x[1])).join('   ')}</span><span dir="ltr">${p}/${n}</span></div>`},
 hb(){return`<div class="hb"><img src="${IMG.glow}"><b>${esc(O.title)}</b><span class="pill c">${H.tot()} ${nW(H.tot())}</span></div>`},
 pdf(){const P=[],n=O.cities.length+2,c0=O.cities[0]||{photos:[]},D=O.days.length?O.days:genDays(),rs=H.ranges();
  P.push({cls:'pg pcov',html:`<div class="pic">${H.img(c0.photos[0],O.title)}</div>${this.logo()}${this.stk()}<div class="tt">${O.sub?`<div class="sub" style="font-size:20px">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div><div style="display:flex;gap:8px;margin-top:6px">${this.pills()}</div></div>
   ${this.stks()}<div class="low">${this.burst(H.from())}${this.chips(H.incl().slice(0,6))}</div>${this.pf(1,n)}`});
  O.cities.forEach((c,ci)=>{const r=rs[ci],ph=c.photos;
   P.push({cls:'pg pcity',html:`${this.hb()}<div class="big"><i>${H.img(ph[0],c.ar)}</i></div><div class="t"><h2>${esc(c.ar)}</h2><div style="display:flex;gap:8px;justify-content:center;margin-top:6px"><span class="pill c">${c.n} ${nW(+c.n)}</span><span class="pill p">اليوم ${r[0]} – ${r[1]}</span></div></div>
   <div class="stks">${ph.slice(1,4).map((p,k)=>`<div><i>${H.img(p)}</i></div>`).join('')}</div>
   <div class="days">${D.slice(r[0]-1,r[1]).map((d,k)=>`<div class="dd"><b>${r[0]+k}</b><span>${esc(d)}</span></div>`).join('')}</div>${this.pf(ci+2,n)}`})});
  const terms=['الأسعار خاضعة للتوافر وقت تأكيد الحجز','الإلغاء والتعديل حسب سياسة شركات الطيران والفنادق','يجب أن يكون جواز السفر ساريًا 6 أشهر على الأقل'].concat(O.notes?[O.notes]:[]),c=H.contacts();
  P.push({cls:'pg pfin',html:`${this.hb()}<div class="bd"><h3>الأسعار</h3><div class="prs">${this.p2s()}</div><div class="two"><div class="bx g"><h5>البرنامج يشمل</h5>${H.incl().map(x=>`<div>✓ ${esc(x)}</div>`).join('')}</div><div class="bx r"><h5>لا يشمل</h5>${H.excl().map(x=>`<div>✕ ${esc(x)}</div>`).join('')}</div></div>
   <h3 style="font-size:24px">الشروط والأحكام</h3><div class="tm">${terms.map(t=>`<div>• ${esc(t)}</div>`).join('')}</div><div class="cb"><b>${esc(C.cta||'احجز الآن')}</b>${c.map(x=>`<span dir="ltr">${esc(x[1])}</span>`).join('')}</div></div>${this.pf(n,n)}`});
  return P}
};
THEMES.viv=VV;
