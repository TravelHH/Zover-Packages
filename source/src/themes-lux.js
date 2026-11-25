/* ======================= LUXURY THEME (فاخر) ======================= */
const LX={
 name:'فاخر',
 logo:()=>`<div class="logo"><img src="${IMG.glow}"></div>`,
 meta(){const n=H.tot();return`<div class="meta">${n?`<span><b>${n}</b> ${nW(n)}</span><span><b>${n+1}</b> ${dW(n+1)}</span>`:''}${O.dates?`<span>${esc(O.dates)}</span>`:''}</div>`},
 dv:()=>`<div class="div"><i></i></div>`,
 prices(){const P=H.prices();if(!P.length)return'';return`<div class="prs">${P.map(p=>`<div class="pr">${+p.stars?`<div class="st">${IC.star(22).repeat(+p.stars)}</div>`:''}<div class="am"><b>${fmtAmt(p.amt)}</b><small>${esc(p.cur)}</small></div>${p.lab?`<div class="lb">${esc(p.lab)}</div>`:''}</div>`).join('')}</div>`},
 inc(max){const L=H.incl().slice(0,max||6);return L.length?`<div class="inc">${L.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''},
 ft(){const c=H.contacts();return`<div class="ft">${c.map(([t,v])=>`<span class="ct">${esc(v)}</span>`).join('')}${C.cta?`<span class="cta">${esc(C.cta)}</span>`:''}</div>`},
 circles(){const c0=O.cities[0]||{photos:[],spots:[]},multi=O.cities.length>1;
  const L=multi?O.cities.slice(0,4).map((c,i)=>({s:H.cityPh(c,i===0?1:0),t:c.ar,m:`${c.n} ${nW(+c.n)}`})):[1,2,3].map(i=>({s:c0.photos[i]||'',t:(c0.spots||[])[i-1]||'',m:''})).filter(x=>x.s);
  return L.length?`<div class="cir">${L.map(x=>`<div><span>${H.img(x.s,x.t)}</span><b>${esc(x.t)}</b>${x.m?`<small>${esc(x.m)}</small>`:''}</div>`).join('')}</div>`:''},
 poster(sz){const c0=O.cities[0]||{photos:[]};
  return{cls:'poster',html:`${H.img(c0.photos[0],O.title)}<div class="ov"></div><div class="frame"></div>${this.logo()}${O.badge?`<div class="badge">${esc(O.badge)}</div>`:''}
  <div class="c" data-fit>${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div>${this.dv()}${this.meta()}
  ${this.circles()}${H.prices().length?`<div class="frm">تبدأ الأسعار من</div>${this.prices()}`:''}${this.inc(5)}${this.ft()}</div>`}},
 cover(sz,i,n){const c0=O.cities[0]||{photos:[]},f=H.from();
  return{cls:'cover',html:`${H.img(c0.photos[0],O.title)}<div class="ov"></div><div class="frame"></div>${this.logo()}<span class="swp">اسحب ←</span>${O.badge?`<div class="badge">${esc(O.badge)}</div>`:''}
  <div class="c" data-fit>${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div>${this.dv()}${this.meta()}
  ${O.cities.length>1?`<div class="sub" style="color:#fff;letter-spacing:0">${esc(H.cityLine().join('  ◆  '))}</div>`:''}
  ${f?`<div class="frm">تبدأ الأسعار من</div><div class="prs"><div class="pr"><div class="am"><b>${fmtAmt(f.amt)}</b><small>${esc(f.cur)}</small></div><div class="lb">${esc(f.lab||'')}</div></div></div>`:''}</div><span class="pgn">${i} / ${n}</span>`}},
 city(sz,i,n,c,ci){const r=H.ranges()[ci],ph=c.photos,sp=(c.spots||[]).filter(Boolean).slice(0,4);
  const dim={sq:['60%','46%'],pt:['66%','50%'],st:['74%','46%']}[sz];
  return{cls:'city',vars:`--aw:${dim[0]};--ah:${dim[1]}`,html:`<div class="frame"></div><div class="arch">${H.img(ph[0],c.ar)}</div>${ph[1]?`<div class="sm a">${H.img(ph[1])}</div>`:''}${ph[2]?`<div class="sm b">${H.img(ph[2])}</div>`:''}
  <div class="ct2" data-fit>${O.cities.length>1?`<div class="no">— ${String(ci+1).padStart(2,'0')} —</div>`:''}<h2 data-ft="1">${esc(c.ar)}</h2>${this.dv()}<div class="mt"><b>${c.n}</b> ${nW(+c.n)} · من اليوم <b>${r[0]}</b> إلى <b>${r[1]}</b></div>
  ${sp.length?`<div class="sp">${sp.map(s=>`<div>${esc(s)}</div>`).join('')}</div>`:''}</div><span class="mini">ZOVER</span><span class="pgn">${i} / ${n}</span>`}},
 itin(sz,i,n){const D=O.days.length?O.days:genDays(),rs=H.ranges();const cityOf=d=>{for(let k=0;k<rs.length;k++)if(d>=rs[k][0]&&d<=rs[k][1])return O.cities[k].ar;return''};
  return{cls:'itin',html:`<div class="frame"></div>${this.logo()}<div class="hd2"><h2>البرنامج اليومي</h2>${this.dv()}</div>
  <div class="lst" data-fit>${D.map((d,k)=>`<div class="d"><b><small>اليوم</small>${String(k+1).padStart(2,'0')}</b><span><em>${esc(cityOf(k+1))}</em>${esc(d)}</span></div>`).join('')}</div><div class="bt">${this.ft()}</div><span class="pgn">${i} / ${n}</span>`}},
 price(sz,i,n){const cl=O.cities[O.cities.length-1]||{photos:[]},inc=H.incl().slice(0,8);
  return{cls:'price',html:`<div class="top">${H.img(H.cityPh(cl,1))}<div class="ov"></div></div><div class="frame"></div>${this.logo()}
  <div class="c" data-fit><div class="tt">تفاصيل العرض</div>${this.dv()}${this.meta()}${H.prices().length?this.prices():''}
  ${inc.length?`<div class="il">${inc.map(x=>`<div>${esc(x)}</div>`).join('')}</div>`:''}<div class="bigcta">${esc(C.cta||'احجز الآن')}</div>${this.ft().replace(/<span class="cta">.*?<\/span>/,'')}</div><span class="pgn">${i} / ${n}</span>`}},
 slides(sz){const L=[],n=1+O.cities.length+(O.showItin?1:0)+1;let i=1;L.push(this.cover(sz,i++,n));O.cities.forEach((c,ci)=>L.push(this.city(sz,i++,n,c,ci)));if(O.showItin)L.push(this.itin(sz,i++,n));L.push(this.price(sz,i++,n));return L},
 pf(p,n){const c=H.contacts();return`<div class="pf"><span>زوفر العالمية للسفر والسياحة</span><span>${c.map(([t,v])=>`<span dir="ltr">${esc(v)}</span>`).join(' · ')}</span><span dir="ltr">${p} / ${n}</span></div>`},
 pdf(){const P=[],n=O.cities.length+2,c0=O.cities[0]||{photos:[]},D=O.days.length?O.days:genDays(),rs=H.ranges();
  P.push({cls:'pg pcov',html:`${H.img(c0.photos[0],O.title)}<div class="ov"></div><div class="frame"></div>${this.logo()}
   <div class="c" data-fit>${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div>${this.dv()}${this.meta()}${this.circles()}${H.prices().length?`<div class="frm">تبدأ الأسعار من</div>${this.prices()}`:''}</div>${this.pf(1,n)}`});
  O.cities.forEach((c,ci)=>{const r=rs[ci],ph=c.photos;
   P.push({cls:'pg pcity',html:`<div class="frame"></div><div class="arch">${H.img(ph[0],c.ar)}</div>
   <div class="t">${O.cities.length>1?`<div class="no">— ${String(ci+1).padStart(2,'0')} —</div>`:''}<h2>${esc(c.ar)}</h2><div class="mt">${c.n} ${nW(+c.n)} · من اليوم ${r[0]} إلى ${r[1]}</div></div>
   <div class="r3">${[1,2,3].map(k=>ph[k]?`<div>${H.img(ph[k])}</div>`:'').join('')}</div>
   <div class="sp">${(c.spots||[]).filter(Boolean).slice(0,4).map(s=>`<span>${esc(s)}</span>`).join('')}</div>
   <div class="days">${D.slice(r[0]-1,r[1]).map((d,k)=>`<div class="dd"><b>${String(r[0]+k).padStart(2,'0')}</b><span>${esc(d)}</span></div>`).join('')}</div>${this.pf(ci+2,n)}`})});
  const terms=['الأسعار خاضعة للتوافر وقت تأكيد الحجز','الإلغاء والتعديل حسب سياسة شركات الطيران والفنادق','يجب أن يكون جواز السفر ساريًا 6 أشهر على الأقل'].concat(O.notes?[O.notes]:[]);const c=H.contacts();
  P.push({cls:'pg pfin',html:`<div class="frame"></div>${this.logo()}<div class="bd">${H.prices().length?`<div class="h3">الأسعار</div>${this.dv()}${this.prices()}`:''}
   <div class="two"><div class="bx"><h5>البرنامج يشمل</h5>${H.incl().map(x=>`<div>${esc(x)}</div>`).join('')}</div><div class="bx r"><h5>لا يشمل</h5>${H.excl().map(x=>`<div>${esc(x)}</div>`).join('')}</div></div>
   <div class="h3" style="font-size:20px">الشروط والأحكام</div><div class="tm">${terms.map(t=>`<div>◆ ${esc(t)}</div>`).join('')}</div>
   <div class="cb"><b>${esc(C.cta||'احجز الآن')}</b>${c.map(([t,v])=>`<span class="ct">${esc(v)}</span>`).join('')}</div></div>${this.pf(n,n)}`});
  return P}
};
THEMES.lux=LX;
