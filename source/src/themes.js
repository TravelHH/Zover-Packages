/* ================= Theme builders ================= */
const IC={
 ck:'<svg viewBox="0 0 20 20"><path d="M4.5 10.5l3.6 3.6L15.5 6.5" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 x:'<svg viewBox="0 0 20 20"><path d="M6 6l8 8M14 6l-8 8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
 star:s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path fill="#FBC42E" stroke="#e0a800" stroke-width=".6" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>`,
 cal:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 moon:'<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M21 13.5A9 9 0 1110.5 3a7 7 0 0010.5 10.5z"/></svg>',
 ph:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
 wa:'<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.8-.1 1.4z"/></svg>',
 web:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
 arr:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
 swipe:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>'
};
/* helpers shared by all themes */
const H={
 img:(src,lab)=>src?`<img class="ph" src="${src}">`:`<div class="phx">${esc(lab||'')}</div>`,
 nights:n=>`<b>${n}</b> ${nW(n)}`,days:n=>`<b>${n}</b> ${dW(n)}`,
 tot:()=>O.cities.reduce((a,c)=>a+(+c.n||0),0),
 prices:()=>O.prices.filter(p=>fmtAmt(p.amt)),
 from:()=>{const P=H.prices();if(!P.length)return null;let m=P[0];P.forEach(p=>{if(+digits(p.amt).replace(/[^\d.]/g,'')<+digits(m.amt).replace(/[^\d.]/g,''))m=p});return m},
 incl:()=>O.incl.filter(Boolean),
 excl:()=>O.excl.filter(Boolean),
 cityPh:(c,i)=>c.photos[i]||c.photos[0]||'',
 ranges:()=>{let d=1;return O.cities.map((c,i)=>{const s=d,n=+c.n||1;d+=n;return[s,i===O.cities.length-1?s+n:s+n-1]})},
 contacts:()=>{const c=[];if(C.phone)c.push(['ph',C.phone]);if(C.wa&&C.wa!==C.phone)c.push(['wa',C.wa]);if(C.web)c.push(['web',C.web]);return c},
 cityLine:()=>O.cities.map(c=>c.ar).filter(Boolean)
};
function pcards(cls=''){const P=H.prices();if(!P.length)return'';return`<div class="pcs ${cls}">${P.map(p=>`<div class="pc">${+p.stars?`<div class="st">${IC.star(26).repeat(+p.stars)}</div>`:''}<div class="am"><b>${fmtAmt(p.amt)}</b><small>${esc(p.cur)}</small></div>${p.lab?`<div class="lb">${esc(p.lab)}</div>`:''}</div>`).join('')}</div>`}
function lis(arr,ic=IC.ck){return arr.map(x=>`<div class="li"><i class="ck">${ic}</i><span>${esc(x)}</span></div>`).join('')}

/* ======================= ZOVER THEME ======================= */
const ZV={
 name:'زوفر',
 ftr(){const c=H.contacts();return`<div class="ftr"><div class="rbl"></div><div class="bar"><div class="cts">${c.map(([t,v])=>`<div class="ct"><i class="${t==='wa'?'wa':''}">${IC[t]}</i>${esc(v)}</div>`).join('')||'<span class="co">زوفر العالمية للسفر والسياحة</span>'}</div>${C.cta?`<div class="cta">${esc(C.cta)} ${IC.arr}</div>`:''}</div></div>`},
 logo:()=>`<div class="logo"><img src="${IMG.glow}"></div>`,
 chips(){const n=H.tot();return`${n?`<span class="chip w">${IC.moon} ${H.nights(n)} • ${H.days(n+1)}</span>`:''}${O.dates?`<span class="chip o">${IC.cal} ${esc(O.dates)}</span>`:''}`},
 /* ---------- all-in-one poster ---------- */
 poster(sz){const c0=O.cities[0]||{photos:[],ar:''},multi=O.cities.length>1;
  const tiles=multi?O.cities.slice(0,4).map((c,i)=>({src:H.cityPh(c,i===0?1:0),t:c.ar,s:`${c.n} ${nW(+c.n)}`,n:i+1})):[1,2,3].map(i=>({src:c0.photos[i]||'',t:(c0.spots||[])[i-1]||'',s:''}));
  const inc=H.incl().slice(0,7),pr=pcards();
  const dims={sq:['42%',210],pt:['41%',310],st:['36%',450]}[sz];
  return{cls:'poster',vars:`--hh:${dims[0]};--th:${dims[1]}px`,html:`
  <div class="hero">${H.img(c0.photos[0],c0.ar)}<div class="ov"></div>
  <div class="htx" data-tmin="20">${O.badge?`<span class="badge in">${esc(O.badge)}</span>`:''}${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div><div class="chips">${this.chips()}</div></div></div>${this.logo()}
  <div class="tiles">${tiles.map(t=>`<div class="tile">${H.img(t.src,t.t)}${multi?`<span class="n">${t.n}</span>`:''}${t.t?`<div class="lab">${esc(t.t)}${t.s?`<br><small>${esc(t.s)}</small>`:''}</div>`:''}</div>`).join('')}</div>
  <div class="low ${pr?'':'np'} ${inc.length?'':'ni'}">${inc.length?`<div class="incl" data-fit><h4>البرنامج يشمل</h4>${lis(inc)}</div>`:''}${pr?`<div class="prs" data-fit>${pr}</div>`:''}</div>${this.ftr()}`}},
 /* ---------- carousel ---------- */
 cover(sz,i,n){const c0=O.cities[0]||{photos:[]},f=H.from();
  return{cls:'cover',html:`${H.img(c0.photos[0],O.title)}<div class="ov"></div>${this.logo()}<span class="chip g swipe">اسحب ${IC.swipe}</span>
  <div class="txt">${O.badge?`<span class="badge in">${esc(O.badge)}</span>`:''}${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div>
  ${O.cities.length>1?`<div class="cities">${H.cityLine().map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}<div class="chips">${this.chips()}</div>
  ${f?`<div class="fromb"><span>يبدأ من<br>${esc(f.lab||'')}</span><b>${fmtAmt(f.amt)}</b><span style="font-size:30px;color:#F97A30;font-weight:900">${esc(f.cur)}</span></div>`:''}</div><div class="rbb"></div>`}},
 city(sz,i,n,c,ci){const r=H.ranges()[ci],ph=c.photos.slice(0,3),m=ph.length>=3?'':ph.length===2?'m2':'m1',multi=O.cities.length>1;
  const sp=(c.spots||[]).filter(Boolean).slice(0,4);
  return{cls:'city',vars:`--mh:${{sq:'52%',pt:'56%',st:'52%'}[sz]}`,html:`<img class="dove" src="${IMG.dove}">
  <div class="mos ${m}">${(ph.length?ph:['']).map((p,k)=>`<div class="c ${k===0?'big':''}">${H.img(p,c.ar)}${k===0&&multi?`<span class="stop">المحطة ${ci+1}</span>`:''}</div>`).join('')}</div>
  <div class="bt" data-fit><div class="cn"><h2 data-ft="1">${esc(c.ar)}</h2><span class="chip p">${IC.moon} ${H.nights(+c.n)}</span></div>
  <div class="dr">من اليوم ${r[0]} إلى اليوم ${r[1]}${O.dates&&ci===0?` • ${esc(O.dates)}`:''}</div>
  ${sp.length?`<div class="sp">${sp.map(s=>`<div><i class="ck">${IC.ck}</i>${esc(s)}</div>`).join('')}</div>`:''}</div>
  <div class="mini"><img src="${IMG.glow}"></div><span class="pgn">${i}/${n}</span>`}},
 itin(sz,i,n){const D=O.days.length?O.days:genDays();const rs=H.ranges();
  const cityOf=d=>{for(let k=0;k<rs.length;k++)if(d>=rs[k][0]&&d<=rs[k][1])return O.cities[k].ar;return''};
  return{cls:'itin',html:`<div class="ihd"><h2>البرنامج اليومي</h2><div>${H.tot()} ${nW(H.tot())} • ${esc(H.cityLine().join(' – '))}</div></div>${this.logo()}
  <div class="lst" data-fit>${D.map((d,k)=>`<div class="d"><i><small>اليوم</small><b>${k+1}</b></i><span><em>${esc(cityOf(k+1))}</em>${esc(d)}</span></div>`).join('')}</div>${this.ftr()}<span class="pgn">${i}/${n}</span>`}},
 price(sz,i,n){const cl=O.cities[O.cities.length-1]||{photos:[]},inc=H.incl().slice(0,8);
  return{cls:'price',vars:`--ph:${{sq:'250px',pt:'300px',st:'420px'}[sz]}`,html:`<div class="top">${H.img(H.cityPh(cl,1),'')}<div class="ov"></div><div class="tx"><h2>تفاصيل العرض</h2><div class="chips">${this.chips()}</div></div></div>${this.logo()}
  <div class="bd" data-fit>${pcards()}${inc.length?`<div class="incl ${inc.length<4?'one':''}"><h4>البرنامج يشمل</h4>${lis(inc)}</div>`:''}</div>
  <div class="cta2">${esc(C.cta||'احجز الآن')} ${IC.arr}</div>${this.ftr()}`}},
 slides(sz){const L=[];const n=1+O.cities.length+(O.showItin?1:0)+1;let i=1;
  L.push(this.cover(sz,i++,n));O.cities.forEach((c,ci)=>L.push(this.city(sz,i++,n,c,ci)));if(O.showItin)L.push(this.itin(sz,i++,n));L.push(this.price(sz,i++,n));return L},
 /* ---------- PDF ---------- */
 pf(p,n){const c=H.contacts();return`<div class="pf"><b>زوفر العالمية للسفر والسياحة</b><div class="x">${c.map(([t,v])=>`<span dir="ltr">${esc(v)}</span>`).join('')}</div><span class="pn">${p} / ${n}</span></div>`},
 ph2(){return`<div class="ph2"><img src="${IMG.logo}"><b>${esc(O.title)}</b><span>${H.tot()} ${nW(H.tot())}</span></div>`},
 pdf(){const P=[],n=O.cities.length+2,f=H.from(),c0=O.cities[0]||{photos:[]};const multi=O.cities.length>1;
  const tl=multi?O.cities.slice(0,4).map((c,i)=>({s:H.cityPh(c,i===0?1:0),t:c.ar,n:c.n})):[1,2,3].map(i=>({s:c0.photos[i]||'',t:(c0.spots||[])[i-1]||''}));
  const hl=multi?O.cities.flatMap(c=>(c.spots||[]).slice(0,2)).slice(0,6):(c0.spots||[]).slice(0,6);
  P.push({cls:'pg pcov',html:`<div class="hero">${H.img(c0.photos[0],O.title)}<div class="ov"></div>
  <div class="ht">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl" data-ft="2">${esc(O.title||'اسم الباكيدج')}</div><div class="chips">${this.chips()}</div></div></div>${this.logo()}${O.badge?`<div class="badge">${esc(O.badge)}</div>`:''}
  <div class="tl">${tl.map(t=>`<div class="t">${H.img(t.s,t.t)}${t.t?`<div class="lab">${esc(t.t)}${t.n?`<small>${t.n} ${nW(+t.n)}</small>`:''}</div>`:''}</div>`).join('')}</div>
  <div class="inf"><div class="hl">${hl.filter(Boolean).map(h=>`<div><i class="ck">${IC.ck}</i>${esc(h)}</div>`).join('')}</div>${f?`<div class="fb"><small>يبدأ من</small><b>${fmtAmt(f.amt)}</b><span>${esc(f.cur)} • ${esc(f.lab||'')}</span></div>`:''}</div>${this.pf(1,n)}`});
  const D=O.days.length?O.days:genDays(),rs=H.ranges();
  O.cities.forEach((c,ci)=>{const r=rs[ci],ph=c.photos;
   P.push({cls:'pg pcity',html:`${this.ph2()}<div class="big">${H.img(ph[0],c.ar)}<div class="ov"></div>${multi?`<span class="stop">المحطة ${ci+1}</span>`:''}<div class="t"><h2>${esc(c.ar)}</h2><span class="chip o">${H.nights(+c.n)}</span><span class="chip g">اليوم ${r[0]} – ${r[1]}</span></div></div>
   <div class="row3">${[1,2,3].map(k=>`<div>${H.img(ph[k]||'',c.ar)}</div>`).join('')}</div>
   <div class="sp">${(c.spots||[]).filter(Boolean).slice(0,4).map(s=>`<div><i class="ck">${IC.ck}</i>${esc(s)}</div>`).join('')}</div>
   <div class="days"><div class="stt">البرنامج في ${esc(c.ar)}</div>${D.slice(r[0]-1,r[1]).map((d,k)=>`<div class="dd"><i><small>اليوم</small><b>${r[0]+k}</b></i><span>${esc(d)}</span></div>`).join('')}</div>${this.pf(ci+2,n)}`})});
  const terms=['الأسعار خاضعة للتوافر وقت تأكيد الحجز','الإلغاء والتعديل حسب سياسة شركات الطيران والفنادق','يجب أن يكون جواز السفر ساريًا 6 أشهر على الأقل'].concat(O.notes?[O.notes]:[]);
  const c=H.contacts();
  P.push({cls:'pg pfin',html:`${this.ph2()}<div class="bd">${H.prices().length?`<div class="stt">الأسعار</div>${pcards()}`:''}
   <div class="two"><div class="bx g"><h5>البرنامج يشمل</h5>${lis(H.incl())}</div><div class="bx r"><h5>لا يشمل</h5>${lis(H.excl(),IC.x)}</div></div>
   <div class="stt">الشروط والأحكام</div><div class="terms">${lis(terms)}</div>
   <div class="cbox"><div><b>${esc(C.cta||'احجز الآن')}</b>${c.map(([t,v])=>`<div class="cl">${esc(v)}</div>`).join('')}</div><span class="cta">زوفر للسفر والسياحة</span></div></div>${this.pf(n,n)}`});
  return P}
};
const THEMES={zover:ZV};
