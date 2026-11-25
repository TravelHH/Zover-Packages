/* ================= Output: PDF document & JPEG poster ================= */
const L={
 ar:{nights:nAr,days:dAr,from:'يبدأ من',pp:'للفرد',cur:'ر.س',flights:'رحلات الطيران',hotels:'الفنادق',prices:'الأسعار',itin:'البرنامج اليومي',incl:'يشمل البرنامج',excl:'لا يشمل',opt:'جولات اختيارية',terms:'الشروط والأحكام',notes:'ملاحظات',day:'اليوم',for:'مقدم إلى',quote:'رقم العرض',valid:'صالح حتى',date:'تاريخ السفر',trav:'المسافرون',
  airline:'الرحلة',route:'المسار',fdate:'التاريخ',dep:'الإقلاع',arr:'الوصول',city:'المدينة',hotel:'الفندق',room:'الغرفة',meal:'الوجبات',nCol:'الليالي',cat:'الفئة',
  sgl:'غرفة مفردة',dbl:'غرفة مزدوجة',trp:'غرفة ثلاثية',cwb:'طفل بسرير',cnb:'طفل بدون سرير',inf:'رضيع',adult:'بالغ',child:'طفل',
  pnote:'الأسعار للفرد بالريال السعودي',vatIn:'شاملة ضريبة القيمة المضافة',total:'الإجمالي التقديري للمجموعة',adt:'بالغ',chd:'طفل',infl:'رضيع',thx:'نتمنى لكم رحلة سعيدة',thx2:'للحجز والاستفسار تواصلوا معنا',option:'خيار',book:'احجز الآن',dep2:'المغادرة',incs:{f:'طيران',h:'فنادق',t:'تنقلات',r:'جولات',v:'تأشيرة'}},
 en:{nights:nEn,days:dEn,from:'Starting from',pp:'per person',cur:'SAR',flights:'Flights',hotels:'Hotels',prices:'Prices',itin:'Day-by-Day Itinerary',incl:'Package Includes',excl:'Not Included',opt:'Optional Tours',terms:'Terms & Conditions',notes:'Notes',day:'Day',for:'Prepared for',quote:'Quote No.',valid:'Valid until',date:'Travel date',trav:'Travelers',
  airline:'Flight',route:'Route',fdate:'Date',dep:'Dep.',arr:'Arr.',city:'City',hotel:'Hotel',room:'Room',meal:'Meals',nCol:'Nights',cat:'Category',
  sgl:'Single room',dbl:'Double room',trp:'Triple room',cwb:'Child with bed',cnb:'Child no bed',inf:'Infant',adult:'Adult',child:'Child',
  pnote:'Prices per person in Saudi Riyals',vatIn:'VAT included',total:'Estimated group total',adt:'Adult',chd:'Child',infl:'Infant',thx:'Wishing you a wonderful trip',thx2:'Contact us to book',option:'Option',book:'Book now',dep2:'Departure',incs:{f:'Flights',h:'Hotels',t:'Transfers',r:'Tours',v:'Visa'}}
};
const tx=(o,l)=>o?(l==='ar'?o.ar:(o.en||o.ar)):'';
const svgCk=(c='#1E9E6A')=>`<svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="${c}"/><path d="M5.5 10.3l3 3 6-6.3" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const svgX=()=>`<svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#D64545"/><path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const svgStars=n=>{n=+n||0;if(!n)return'';const s='<svg width="11" height="11" viewBox="0 0 24 24"><path fill="#FBC42E" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>';return`<span class="stars">${s.repeat(n)}</span>`};
const apName=(c,l)=>{const a=AIRPORTS[(c||'').toUpperCase()];return a?(l==='ar'?a[0]:a[1]):(c||'')};
const alName=(c,l)=>{const a=AIRLINES[(c||'').toUpperCase()];return a?(l==='ar'?a[0]:a[1]):(c||'')};
const money=(n,l)=>l==='ar'?`${fmt(n)} ر.س`:`SAR ${fmt(n)}`;
function paxLine(l){const t=L[l],p=P.pax,a=[];const pl=(n,w,ws)=>`${n} ${l==='en'&&n>1?ws:w}`;if(num(p.adt))a.push(pl(num(p.adt),t.adt,'Adults'));if(num(p.chd))a.push(pl(num(p.chd),t.chd,'Children'));if(num(p.inf))a.push(pl(num(p.inf),t.infl,'Infants'));return a.join(' • ')}
function contactBits(l){const c=S.co,a=[];if(c.phone)a.push(`<span dir="ltr">☎ ${esc(c.phone)}</span>`);if(c.wa&&c.wa!==c.phone)a.push(`<span dir="ltr">WhatsApp ${esc(c.wa)}</span>`);if(c.email)a.push(`<span dir="ltr">${esc(c.email)}</span>`);if(c.web)a.push(`<span dir="ltr">${esc(c.web)}</span>`);if(!a.length)a.push(`<span>${esc(l==='ar'?c.addrAr:c.addrEn)}</span>`);return a}

function pageShell(l,inner,cover){const t=L[l],c=S.co;
 const head=cover?'':`<div class="ph"><img src="${IMG.logo}"><div class="pt"><b>${esc(tx(P.title,l))}</b><small>${esc(tx(P.country,l))} • ${t.nights(totalNights())}</small></div><span class="qn">${t.quote}: ${esc(P.quoteNo)}</span></div><div class="phl"></div>`;
 return`<div class="page" dir="${l==='ar'?'rtl':'ltr'}">${head}${inner}<div class="pf"><b style="white-space:nowrap">${esc(l==='ar'?c.ar:c.en)}</b><div class="x">${contactBits(l).join('')}</div><span class="pn"></span></div></div>`}

function coverHTML(l,C){const t=L[l],n=totalNights(),o=P.out;const ttl=tx(P.title,l);
 const bg=o.bg?`<img class="bgi" src="${o.bg}"><div class="shade" style="background:linear-gradient(180deg,rgba(20,10,50,.15) 0%,rgba(20,10,50,.25) 45%,rgba(40,20,90,.85) 100%)"></div>`:`<div class="shade" style="background:linear-gradient(140deg,${P.col[0]} 0%,${P.col[1]} 55%,#4B2D8E 100%)"></div><div class="shade" style="background:radial-gradient(circle at 80% 20%,rgba(255,255,255,.18),transparent 45%),radial-gradient(circle at 10% 90%,rgba(251,196,46,.22),transparent 40%)"></div>`;
 const hl=P.hl.map(h=>tx(h,l)).filter(Boolean);
 const info=[[t.for,P.client],[t.quote,P.quoteNo],[t.date,P.start?fDate(P.start,l):''],[t.trav,paxLine(l)],[t.valid,P.valid?fDate(P.valid,l):'']].filter(x=>x[1]);
 const price=o.showPrice&&C.from>0;
 return`<div class="hero">${bg}<img class="dove" src="${IMG.dove}"><div class="lgc"><img src="${IMG.logo}"></div>${PTYPES[P.type]?`<span class="tp">${PTYPES[P.type][l==='ar'?0:1]}</span>`:''}
 <div class="ht"><div class="cn">${esc(tx(P.country,l))}</div><h1 class="${ttl.length>30?'s':''}">${esc(ttl)}</h1><div class="ch">${n?`<span>${t.nights(n)} / ${t.days(n+1)}</span>`:''}${P.start?`<span class="o">${fDate(P.start,l)}</span>`:''}</div></div></div>
 <div class="cvb">${hl.length?`<div class="hlg">${hl.map(h=>`<div>${svgCk('#F97A30')}<span>${esc(h)}</span></div>`).join('')}</div>`:''}
 <div class="cvi">${info.length?`<div class="inf">${info.map(([k,v])=>`<div><small>${k}</small><b>${esc(v)}</b></div>`).join('')}</div>`:''}${price?`<div class="prb"><small>${t.from}</small><b>${fmt(C.from)}</b><span>${t.cur} / ${t.pp}</span></div>`:''}</div></div>`}

function blocksHTML(l,C){const t=L[l],B=[],o=P.out;const st=(s,sm='')=>B.push({h:`<div class="st"><i></i><b>${s}</b>${sm?`<small>${sm}</small>`:''}</div>`,keep:1});
 const f=P.flights;
 if(f.incl&&f.segs.length){st(t.flights,f.bag?`🧳 ${esc(f.bag)}`:'');
  B.push({h:`<table class="dt"><tr><th>${t.airline}</th><th>${t.route}</th><th>${t.fdate}</th><th>${t.dep}</th><th>${t.arr}</th></tr>${f.segs.map(s=>`<tr><td><b>${esc(alName(s.al,l))}</b><div class="n" style="font-family:Outfit;font-size:11.5px;color:#7a7390" dir="ltr">${esc(s.al)} ${esc(s.fn)}</div></td><td><b>${esc(apName(s.from,l))}</b> ${l==='ar'?'←':'→'} <b>${esc(apName(s.to,l))}</b></td><td class="n">${s.date?fDate(s.date,l,{weekday:'short',day:'numeric',month:'short'}):''}</td><td class="n">${esc(s.dep)}</td><td class="n">${esc(s.arr)}${s.nd?' <small style="color:#F97A30">+1</small>':''}</td></tr>`).join('')}</table>`})}
 // hotels
 const hasH=P.cities.length&&P.hotels.some(op=>P.cities.some(c=>op.rows[c.id]&&op.rows[c.id].hotel));
 if(hasH){st(t.hotels);P.hotels.forEach((op,oi)=>{const rows=P.cities.map(c=>({c,w:op.rows[c.id]||{}}));
  B.push({h:`${P.hotels.length>1?`<div class="opt">${esc(tx(op.lab,l))}</div>`:''}<table class="dt"><tr><th>${t.city}</th><th>${t.hotel}</th><th>${t.room}</th><th>${t.meal}</th><th>${t.nCol}</th></tr>${rows.map(({c,w})=>`<tr><td><b>${esc(tx(c,l))}</b></td><td class="htl" dir="auto">${esc(w.hotel||'—')}<small>${svgStars(w.stars)}</small></td><td dir="auto">${esc(w.room||'')}</td><td>${MEALS[w.meal]?MEALS[w.meal][l==='ar'?0:1]:''}</td><td class="n">${num(c.n)}</td></tr>`).join('')}</table>`})})}
 // prices
 if(o.showPrice){const keys=['sgl','dbl','trp','cwb','cnb','inf'].filter(k=>C.opts.some(x=>x.T[k]&&x.T[k].price>0));
  if(keys.length){st(t.prices,t.pnote+(P.pr.vat!=='none'?' – '+t.vatIn:''));
   B.push({h:`<table class="dt prc"><tr><th>${C.opts.length>1?t.option:t.cat}</th>${keys.map(k=>`<th>${t[k]}</th>`).join('')}</tr>${C.opts.map(x=>`<tr><td>${esc(tx(x.o.lab,l))}</td>${keys.map(k=>`<td class="pr">${x.T[k]&&x.T[k].price>0?fmt(x.T[k].price):'—'}</td>`).join('')}</tr>`).join('')}</table>`+
   (o.showTotal?C.opts.map(x=>x.tot.price>0?`<div class="tot">${t.total}${C.opts.length>1?' – '+esc(tx(x.o.lab,l)):''} <span style="font-weight:600;color:#7a7390;font-size:12px">(${paxLine(l)})</span><b>${money(x.tot.price,l)}</b></div>`:'').join(''):'')})}}
 // itinerary
 if(P.days.length){st(t.itin);P.days.forEach((d,i)=>{const txt=tx(d,l);if(!txt)return;B.push({h:`<div class="dd"><div class="nb"><small>${t.day}</small><b>${i+1}</b></div><div class="tx">${P.start?`<small>${fDate(addDays(P.start,i),l,{weekday:'long',day:'numeric',month:'long'})}</small>`:''}<div>${esc(txt)}</div></div></div>`})})}
 // incl / excl
 const inc=autoIncl(l),exc=autoExcl(l);
 if(inc.length||exc.length)B.push({h:`<div class="two" style="margin-top:14px">${inc.length?`<div class="box g"><h5>${t.incl}</h5><ul class="ck">${inc.map(x=>`<li>${svgCk()}<span>${esc(x)}</span></li>`).join('')}</ul></div>`:''}${exc.length?`<div class="box r"><h5>${t.excl}</h5><ul class="ck">${exc.map(x=>`<li>${svgX()}<span>${esc(x)}</span></li>`).join('')}</ul></div>`:''}</div>`});
 // optional
 const opt=C.optional.filter(x=>tx(x.s,l));if(opt.length){st(t.opt,o.showPrice?t.pnote:'');
  B.push({h:`<table class="dt"><tr><th>${t.opt}</th>${o.showPrice?`<th>${t.adult}</th><th>${t.child}</th>`:''}</tr>${opt.map(x=>`<tr><td><b>${esc(tx(x.s,l))}</b></td>${o.showPrice?`<td class="pr">${x.a?fmt(x.a):'—'}</td><td class="pr">${x.c?fmt(x.c):'—'}</td>`:''}</tr>`).join('')}</table>`})}
 // terms
 const terms=P.terms.map(x=>tx(x,l)).filter(Boolean);if(P.valid)terms.push(l==='ar'?`هذا العرض صالح حتى ${fDate(P.valid,l)}`:`This offer is valid until ${fDate(P.valid,l)}`);
 if(terms.length){st(t.terms);B.push({h:`<ul class="ck">${terms.map(x=>`<li>${svgCk('#4B2D8E')}<span>${esc(x)}</span></li>`).join('')}</ul>`})}
 const nt=tx(P.notes,l);if(nt){st(t.notes);B.push({h:`<div class="box" style="white-space:pre-wrap;font-size:13px;font-weight:600">${esc(nt)}</div>`})}
 B.push({h:`<div class="thx"><b>${t.thx} ✈</b><span>${t.thx2}${S.co.phone?` • <span dir="ltr">${esc(S.co.phone)}</span>`:''}</span></div>`});
 return B}

function buildDoc(){const host=$('#docPages');if(!host)return;const l=P.out.lang,C=calc();host.innerHTML='';
 const mk=(inner,cv)=>{const w=document.createElement('div');w.className='pw';w.innerHTML=pageShell(l,inner,cv);host.appendChild(w);return w.firstElementChild};
 mk(coverHTML(l,C),true);
 let pg=mk('<div class="pc"></div>'),pc=pg.querySelector('.pc');
 const tmp=document.createElement('div');
 blocksHTML(l,C).forEach(b=>{tmp.innerHTML=b.h;const els=[...tmp.childNodes];els.forEach(e=>{if(e.nodeType===1&&b.keep)e.dataset.keep=1});
  els.forEach(e=>pc.appendChild(e));
  if(pc.scrollHeight>pc.clientHeight+2&&pc.children.length>els.length){els.forEach(e=>e.remove());const carry=[];while(pc.lastElementChild&&pc.lastElementChild.dataset.keep)carry.unshift(pc.removeChild(pc.lastElementChild));
   pg=mk('<div class="pc"></div>');pc=pg.querySelector('.pc');carry.concat(els).forEach(e=>pc.appendChild(e))}});
 const pages=$$('.page',host);pages.forEach((p,i)=>{const pn=p.querySelector('.pn');if(pn)pn.textContent=`${i+1} / ${pages.length}`});
 scalePages()}
function scalePages(){const host=$('#pvw');if(!host)return;const w=Math.min(794,host.clientWidth-20),s=w/794;
 $$('.pw',host).forEach(pw=>{pw.style.width=794*s+'px';pw.style.height=1123*s+'px';pw.firstElementChild.style.transform=`scale(${s})`})}

/* ---------- PDF (images -> minimal PDF writer) ---------- */
function makePdf(imgs){const enc=new TextEncoder(),parts=[];let off=0;const xr=[];
 const push=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);off+=b.length};
 const obj=(n,fn)=>{xr[n]=off;push(`${n} 0 obj\n`);fn();push('\nendobj\n')};
 push('%PDF-1.4\n');const n=imgs.length;
 obj(1,()=>push('<< /Type /Catalog /Pages 2 0 R >>'));
 obj(2,()=>push(`<< /Type /Pages /Kids [${imgs.map((_,i)=>`${3+3*i} 0 R`).join(' ')}] /Count ${n} >>`));
 imgs.forEach((im,i)=>{const p=3+3*i;
  obj(p,()=>push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i} ${p+2} 0 R >> >> /Contents ${p+1} 0 R >>`));
  const cs=`q\n595.28 0 0 841.89 0 0 cm\n/Im${i} Do\nQ\n`;
  obj(p+1,()=>{push(`<< /Length ${cs.length} >>\nstream\n`);push(cs);push('endstream')});
  obj(p+2,()=>{push(`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.b.length} >>\nstream\n`);push(im.b);push('\nendstream')})});
 const xo=off,tot=3+3*n;let x=`xref\n0 ${tot}\n0000000000 65535 f \n`;for(let k=1;k<tot;k++)x+=String(xr[k]).padStart(10,'0')+' 00000 n \n';
 push(x);push(`trailer\n<< /Size ${tot} /Root 1 0 R /Info << /Producer (Zover Package Builder) >> >>\nstartxref\n${xo}\n%%EOF`);
 return new Blob(parts,{type:'application/pdf'})}
const d2b=d=>{const s=atob(d.split(',')[1]),b=new Uint8Array(s.length);for(let i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b};
let _fontCSS=null;
async function pageToJpeg(el){if(!_fontCSS)_fontCSS=await htmlToImage.getFontEmbedCSS(el);
 const opt={pixelRatio:2,width:794,height:1123,backgroundColor:'#ffffff',fontEmbedCSS:_fontCSS,style:{transform:'none',margin:'0'},cacheBust:false};
 let cv=await htmlToImage.toCanvas(el,opt);return{b:d2b(cv.toDataURL('image/jpeg',.9)),w:cv.width,h:cv.height}}
let lastFile=null;
async function buildPdfBlob(){if(!$('#docPages')||!$$('#docPages .page').length)buildDoc();await document.fonts.ready;
 const pages=$$('#docPages .page');busy(true,'جاري تجهيز الـ PDF…');
 try{await htmlToImage.toCanvas(pages[0],{pixelRatio:.3,width:794,height:1123,style:{transform:'none'}}).catch(()=>{});/* warm-up (Safari) */
  const imgs=[];for(let i=0;i<pages.length;i++){$('#busyMsg').textContent=`جاري تجهيز الصفحة ${i+1} من ${pages.length}…`;imgs.push(await pageToJpeg(pages[i]))}
  return makePdf(imgs)}finally{busy(false)}}
async function exportPDF(){try{const b=await buildPdfBlob();lastFile=new File([b],fileBase()+'.pdf',{type:'application/pdf'});download(b,lastFile.name);toast('✅ تم تجهيز الـ PDF')}catch(e){console.error(e);toast('⚠️ حصلت مشكلة – جرّب «طباعة» واختار حفظ كـ PDF')}}
function doPrint(){if(!$$('#docPages .page').length)buildDoc();const r=$('#printRoot');r.innerHTML='';$$('#docPages .page').forEach(p=>{const c=p.cloneNode(true);c.style.transform='none';r.appendChild(c)});setTimeout(()=>window.print(),100)}
async function doShare(){try{let f;if(outView==='pdf'){const b=await buildPdfBlob();f=new File([b],fileBase()+'.pdf',{type:'application/pdf'})}else{const c=await drawPoster();const b=await new Promise(r=>c.toBlob(r,'image/jpeg',.92));f=new File([b],fileBase()+'.jpg',{type:'image/jpeg'})}
 await navigator.share({files:[f],title:tx(P.title,P.out.lang)})}catch(e){if(e&&e.name!=='AbortError')toast('⚠️ المشاركة مش متاحة – استخدم التحميل')}}

/* ---------- JPEG poster 1080x1350 ---------- */
const loadImg=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src});
function rr(x,y,w,h,r,ctx){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function wrap(ctx,text,maxW){const words=String(text).split(/\s+/),lines=[];let cur='';words.forEach(w=>{const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t});if(cur)lines.push(cur);return lines}
async function drawPoster(){const l=P.out.lang,t=L[l],ar=l==='ar',W=1080,H=1350,FF="'Outfit','Tajawal',sans-serif";
 await Promise.all(['400','700','800','900'].map(w=>document.fonts.load(`${w} 40px Tajawal`,'عربي')));await Promise.all(['500','700','800','900'].map(w=>document.fonts.load(`${w} 40px Outfit`,'Abc123')));
 const C=calc(),cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
 const [logo,dove]=await Promise.all([loadImg(IMG.logo),loadImg(IMG.dove)]);
 // background
 if(P.out.bg){const im=await loadImg(P.out.bg);const s=Math.max(W/im.width,H/im.height);x.drawImage(im,(W-im.width*s)/2,(H-im.height*s)/2,im.width*s,im.height*s);
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(20,10,50,.55)');g.addColorStop(.28,'rgba(20,10,50,.15)');g.addColorStop(.55,'rgba(35,18,80,.55)');g.addColorStop(1,'rgba(40,20,95,.96)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 else{let g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,P.col[0]);g.addColorStop(.55,P.col[1]);g.addColorStop(1,'#4B2D8E');x.fillStyle=g;x.fillRect(0,0,W,H);
  let r=x.createRadialGradient(W*.85,H*.15,10,W*.85,H*.15,600);r.addColorStop(0,'rgba(255,255,255,.22)');r.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=r;x.fillRect(0,0,W,H);
  r=x.createRadialGradient(W*.1,H*.95,10,W*.1,H*.95,560);r.addColorStop(0,'rgba(251,196,46,.25)');r.addColorStop(1,'rgba(251,196,46,0)');x.fillStyle=r;x.fillRect(0,0,W,H);
  let g2=x.createLinearGradient(0,H*.5,0,H);g2.addColorStop(0,'rgba(30,15,70,0)');g2.addColorStop(1,'rgba(30,15,70,.55)');x.fillStyle=g2;x.fillRect(0,0,W,H)}
 // dove watermark
 x.save();x.globalAlpha=.14;const dh=1000,dw=dove.width*dh/dove.height;if(ar)x.drawImage(dove,-90,H-dh-90,dw,dh);else{x.translate(W+90,0);x.scale(-1,1);x.drawImage(dove,0,H-dh-90,dw,dh)}x.restore();
 const M=64,sx=ar?W-M:M;x.direction=ar?'rtl':'ltr';x.textAlign=ar?'right':'left';x.textBaseline='alphabetic';
 // logo card
 const lw=300,lh=lw*logo.height/logo.width,lx=ar?W-M-lw-36:M;x.save();x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=24;x.shadowOffsetY=8;x.fillStyle='#fff';rr(lx,48,lw+36,lh+30,26,x);x.fill();x.restore();x.drawImage(logo,lx+18,63,lw,lh);
 // nights chip
 const n=totalNights();if(n){const s=`${t.nights(n)} / ${t.days(n+1)}`;x.font=`800 32px ${FF}`;const w=x.measureText(s).width+48,cx=ar?M:W-M-w;x.fillStyle='rgba(255,255,255,.2)';rr(cx,70,w,64,32,x);x.fill();x.strokeStyle='rgba(255,255,255,.45)';x.lineWidth=2;x.stroke();x.fillStyle='#fff';x.textAlign='center';x.fillText(s,cx+w/2,113);x.textAlign=ar?'right':'left'}
 // ---- middle block: measured & centered between logo and price ----
 const maxW=W-M*2,hl=P.hl.map(h=>tx(h,l)).filter(Boolean).slice(0,4);
 const inc=[];const f=P.flights;if(f.incl&&(f.segs.length||num(f.adt)))inc.push(t.incs.f);if(P.cities.length)inc.push(t.incs.h);if(P.svcs.some(s=>s.incl&&s.kind==='transfer'))inc.push(t.incs.t);if(P.svcs.some(s=>s.incl&&(s.kind==='tours'||s.kind==='tickets')))inc.push(t.incs.r);if(P.svcs.some(s=>s.incl&&s.kind==='visa'))inc.push(t.incs.v);
 let fs=104,lines;do{x.font=`900 ${fs}px ${FF}`;lines=wrap(x,tx(P.title,l),maxW);fs-=6}while((lines.length>2||lines.some(q=>x.measureText(q).width>maxW))&&fs>52);fs+=6;
 let hs=38,hg=68;const top=300,bot=1030;
 const hgt=()=>52+lines.length*(fs*1.12)+(P.start?50:0)+(hl.length?34+hl.length*hg:0)+(inc.length?40+54:0);
 while(hgt()>bot-top&&hg>52){hg-=4;hs-=2}
 let y=top+Math.max(0,(bot-top-hgt())/2);
 x.fillStyle='#FBC42E';x.font=`800 40px ${FF}`;x.fillText(tx(P.country,l),sx,y+36);y+=52;
 x.fillStyle='#fff';x.save();x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=20;x.font=`900 ${fs}px ${FF}`;lines.forEach(q=>{y+=fs*1.12;x.fillText(q,sx,y-fs*.2)});x.restore();
 if(P.start){x.font=`700 30px ${FF}`;x.fillStyle='rgba(255,255,255,.9)';x.fillText(`${t.dep2}: ${fDate(P.start,l)}`,sx,y+40);y+=50}
 if(hl.length){y+=34;hl.forEach(h=>{const yy=y+hg/2+12,cx=ar?W-M-22:M+22;x.fillStyle='#F97A30';x.beginPath();x.arc(cx,yy-13,22,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=5;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(cx-10,yy-13);x.lineTo(cx-3,yy-5);x.lineTo(cx+11,yy-21);x.stroke();
  x.fillStyle='#fff';x.font=`700 ${hs}px ${FF}`;x.fillText(wrap(x,h,maxW-70)[0],ar?W-M-62:M+62,yy);y+=hg})}
 if(inc.length){y+=40;x.font=`800 28px ${FF}`;let px=ar?W-M:M;inc.forEach(s=>{const w=x.measureText(s).width+56;const bx=ar?px-w:px;x.fillStyle='rgba(255,255,255,.95)';rr(bx,y,w,54,27,x);x.fill();x.fillStyle='#1E9E6A';x.beginPath();x.arc(ar?bx+w-24:bx+24,y+27,7,0,7);x.fill();x.fillStyle='#4B2D8E';x.textAlign='center';x.fillText(s,bx+w/2+(ar?-8:8),y+37);x.textAlign=ar?'right':'left';px=ar?bx-12:bx+w+12})}
 // price badge
 const by=1062;if(P.out.showPrice&&C.from>0){const bw=430,bx=ar?W-M-bw:M;x.save();x.shadowColor='rgba(249,122,48,.45)';x.shadowBlur=30;x.shadowOffsetY=10;let g=x.createLinearGradient(bx,by,bx+bw,by+170);g.addColorStop(0,'#F97A30');g.addColorStop(1,'#ec5a12');x.fillStyle=g;rr(bx,by,bw,170,32,x);x.fill();x.restore();
  const tx0=ar?bx+bw-34:bx+34;x.fillStyle='#fff';x.font=`800 30px ${FF}`;x.fillText(t.from,tx0,by+50);x.font=`900 78px Outfit`;x.direction='ltr';x.textAlign=ar?'right':'left';x.fillText(fmt(C.from),tx0,by+128);const pw=x.measureText(fmt(C.from)).width;x.direction=ar?'rtl':'ltr';
  x.font=`700 26px ${FF}`;x.fillText(`${t.cur} / ${t.pp}`,ar?tx0-pw-16:tx0+pw+16,by+126);x.textAlign=ar?'right':'left'}
 else{const bw=360,bx=ar?W-M-bw:M;x.fillStyle='#F97A30';rr(bx,by+40,bw,100,50,x);x.fill();x.fillStyle='#fff';x.font=`900 44px ${FF}`;x.textAlign='center';x.fillText(t.book,bx+bw/2,by+106);x.textAlign=ar?'right':'left'}
 // contacts opposite side
 const cs=[S.co.phone,S.co.web].filter(Boolean);x.font=`700 28px Outfit`;x.fillStyle='#fff';x.textAlign=ar?'left':'right';x.direction='ltr';cs.forEach((s,i)=>x.fillText(s,ar?M:W-M,by+110+i*44-(cs.length-1)*22));x.direction=ar?'rtl':'ltr';
 // footer
 let rg=x.createLinearGradient(0,0,W,0);['#E53935','#F97A30','#FBC42E','#43A047','#1E88E5','#4B2D8E'].forEach((c,i)=>rg.addColorStop(i/5,c));x.fillStyle=rg;x.fillRect(0,H-82,W,8);x.fillStyle='#4B2D8E';x.fillRect(0,H-74,W,74);
 x.fillStyle='#fff';x.font=`800 30px ${FF}`;x.textAlign='center';x.fillText(ar?S.co.ar:S.co.en,W/2,H-27);
 return cv}
async function exportJPG(){busy(true,'جاري تجهيز الصورة…');try{const c=await drawPoster();const b=await new Promise(r=>c.toBlob(r,'image/jpeg',.92));download(b,fileBase()+'.jpg');toast('✅ تم تجهيز الصورة')}catch(e){console.error(e);toast('⚠️ حصلت مشكلة في الصورة')}finally{busy(false)}}
