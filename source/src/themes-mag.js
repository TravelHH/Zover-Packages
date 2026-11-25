/* ======================= MAGAZINE THEME (مجلة) ======================= */
const MG={
 name:'مجلة',
 top(){return`<div class="top"><img src="${IMG.logo}"><div class="is"><b>${esc(O.badge||'عرض خاص')}</b>${esc(O.dates||'')}</div></div>`},
 foot(){const c=H.contacts();return`<div class="foot">${c.map(([t,v])=>`<span dir="ltr">${esc(v)}</span>`).join('')||'<span>زوفر العالمية للسفر والسياحة</span>'}${C.cta?`<span class="cta">${esc(C.cta)}</span>`:''}</div>`},
 facts(){const n=H.tot(),f=H.from();return`<div class="facts" data-fit><div><small>المدة</small><b><em>${n}</em> <small>${nW(n)}</small> / <em>${n+1}</em> <small>${dW(n+1)}</small></b></div>
  <div><small>${O.cities.length>1?'المدن':'الوجهة'}</small><b style="font-size:30px;font-weight:700">${esc(H.cityLine().join(' · ')||O.title)}</b></div>
  ${f?`<div><small>يبدأ من</small><b><em>${fmtAmt(f.amt)}</em> <small>${esc(f.cur)}</small></b></div>`:''}</div>`},
 il(L){return`<div class="il">${L.map((x,k)=>`<div><i>${String(k+1).padStart(2,'0')}</i>${esc(x)}</div>`).join('')}</div>`},
 grid(){const c0=O.cities[0]||{photos:[],spots:[]},multi=O.cities.length>1;
  const L=multi?O.cities.slice(0,3).map((c,i)=>({s:H.cityPh(c,0),t:c.ar,n:i+1})):[0,1,2].map(i=>({s:c0.photos[i]||'',t:i?(c0.spots||[])[i-1]||'':c0.ar,n:i+1})).filter(x=>x.s);
  return`<div class="grid ${L.length<2?'n1':''}">${L.map(x=>`<div>${H.img(x.s,x.t)}<span><i>${String(x.n).padStart(2,'0')}</i>${esc(x.t)}</span></div>`).join('')}</div>`},
 prc(){const P=H.prices();return P.length?`<div class="prc">${P.map(p=>`<div class="p">${+p.stars?`<span class="stars">${'★'.repeat(+p.stars)}</span>`:''}<small>${esc(p.lab||'')}</small><b>${fmtAmt(p.amt)}<em>${esc(p.cur)}</em></b></div>`).join('')}</div>`:''},
 poster(sz){const g={sq:['300px','400px'],pt:['330px','540px'],st:['420px','800px']}[sz];
  return{cls:'poster',vars:`--gt:${g[0]};--gh:${g[1]}`,html:`${this.top()}<div class="mhd">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="1">${esc(O.title||'اسم الباكيدج')}</div></div>
  ${this.grid()}${this.facts()}<div class="bt" data-fit><h4>البرنامج يشمل</h4>${this.il(H.incl().slice(0,sz==='sq'?4:6))}</div>${this.foot()}`}},
 cover(sz,i,n){const c0=O.cities[0]||{photos:[]},f=H.from();
  return{cls:'cover',vars:`--cb:${{sq:'400px',pt:'440px',st:'520px'}[sz]}`,html:`${this.top()}<div class="pic">${H.img(c0.photos[0],O.title)}</div>
  <div class="tx">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div>
  <div class="row"><div class="sub" style="font-size:28px">${H.tot()} ${nW(H.tot())} · ${esc(H.cityLine().join(' · '))}</div>${f?`<div class="prc"><div class="p"><small>يبدأ من</small><b>${fmtAmt(f.amt)}<em>${esc(f.cur)}</em></b></div></div>`:''}</div></div>
  <span class="pgn">0${i} / 0${n}  →</span>`}},
 city(sz,i,n,c,ci){const r=H.ranges()[ci],ph=c.photos,sp=(c.spots||[]).filter(Boolean).slice(0,4);
  return{cls:'city',vars:`--ch:${{sq:'50%',pt:'54%',st:'50%'}[sz]}`,html:`<div class="pic">${H.img(ph[0],c.ar)}</div><span class="no">${String(ci+1).padStart(2,'0')}</span>
  <div class="bd" data-fit><h2 data-ft="1">${esc(c.ar)}</h2><div class="mt"><b>${c.n}</b> ${nW(+c.n)} — من اليوم <b>${r[0]}</b> إلى <b>${r[1]}</b></div>
  ${this.il(sp)}${ph.length>1?`<div class="thumbs">${ph.slice(1,4).map(p=>`<div>${H.img(p)}</div>`).join('')}</div>`:''}</div>
  <span class="pgn">0${i} / 0${n}</span><img class="lg" src="${IMG.logo}">`}},
 itin(sz,i,n){const D=O.days.length?O.days:genDays(),rs=H.ranges();const co=d=>{for(let k=0;k<rs.length;k++)if(d>=rs[k][0]&&d<=rs[k][1])return O.cities[k].ar;return''};
  return{cls:'itin',html:`${this.top()}<div class="mhd"><h2>البرنامج اليومي</h2></div><div class="lst" data-fit>${D.map((d,k)=>`<div class="d"><b>${String(k+1).padStart(2,'0')}</b><span><em>${esc(co(k+1))}</em>${esc(d)}</span></div>`).join('')}</div><span class="pgn">0${i} / 0${n}</span>`}},
 price(sz,i,n){const ps=O.cities.flatMap(c=>c.photos.slice(1,2)).concat(O.cities[0]?O.cities[0].photos.slice(2,4):[]).filter(Boolean).slice(0,3);
  return{cls:'price',html:`${this.top()}<div class="mhd"><h2>تفاصيل العرض</h2></div><div class="bd" data-fit>${this.prc()}${this.il(H.incl().slice(0,8))}
  ${ps.length?`<div class="strip">${ps.map(p=>`<div>${H.img(p)}</div>`).join('')}</div>`:''}</div>${this.foot()}`}},
 slides(sz){const L=[],n=1+O.cities.length+(O.showItin?1:0)+1;let i=1;L.push(this.cover(sz,i++,n));O.cities.forEach((c,ci)=>L.push(this.city(sz,i++,n,c,ci)));if(O.showItin)L.push(this.itin(sz,i++,n));L.push(this.price(sz,i++,n));return L},
 pf(p,n){const c=H.contacts();return`<div class="pf"><span>زوفر العالمية للسفر والسياحة</span><span dir="ltr">${c.map(x=>esc(x[1])).join('   ')}</span><span dir="ltr">${p} / ${n}</span></div>`},
 pdf(){const P=[],n=O.cities.length+2,D=O.days.length?O.days:genDays(),rs=H.ranges();
  P.push({cls:'pg pcov',html:`${this.top()}<div class="mhd">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div></div>${this.grid()}${this.facts()}<div class="bt">${this.il(H.incl().slice(0,8))}</div>${this.pf(1,n)}`});
  O.cities.forEach((c,ci)=>{const r=rs[ci],ph=c.photos;
   P.push({cls:'pg pcity',html:`${this.top()}<div class="pic">${H.img(ph[0],c.ar)}</div><span class="no">${String(ci+1).padStart(2,'0')}</span>
   <div class="t"><h2>${esc(c.ar)}</h2><div class="mt">${c.n} ${nW(+c.n)} — من اليوم ${r[0]} إلى ${r[1]}</div></div>
   <div class="thumbs">${ph.slice(1,4).map(p=>`<div>${H.img(p)}</div>`).join('')}</div><div class="sp">${this.il((c.spots||[]).filter(Boolean).slice(0,4))}</div>
   <div class="days">${D.slice(r[0]-1,r[1]).map((d,k)=>`<div class="dd"><b>${String(r[0]+k).padStart(2,'0')}</b><span>${esc(d)}</span></div>`).join('')}</div>${this.pf(ci+2,n)}`})});
  const terms=['الأسعار خاضعة للتوافر وقت تأكيد الحجز','الإلغاء والتعديل حسب سياسة شركات الطيران والفنادق','يجب أن يكون جواز السفر ساريًا 6 أشهر على الأقل'].concat(O.notes?[O.notes]:[]),c=H.contacts();
  P.push({cls:'pg pfin',html:`${this.top()}<div class="bd"><h3>الأسعار</h3>${this.prc()}<div class="two"><div><h5>البرنامج يشمل</h5>${H.incl().map(x=>`<div>+ ${esc(x)}</div>`).join('')}</div><div><h5>لا يشمل</h5>${H.excl().map(x=>`<div>− ${esc(x)}</div>`).join('')}</div></div>
   <h3 style="font-size:22px">الشروط والأحكام</h3><div class="tm">${terms.map(t=>`<div>— ${esc(t)}</div>`).join('')}</div>
   <div class="cb"><b>${esc(C.cta||'احجز الآن')}</b>${c.map(x=>`<span dir="ltr">${esc(x[1])}</span>`).join('')}<span class="cta">زوفر</span></div></div>${this.pf(n,n)}`});
  return P}
};
THEMES.mag=MG;
