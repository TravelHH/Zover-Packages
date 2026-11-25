/* ================= Zover Package Builder — app ================= */
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);
const clone=o=>JSON.parse(JSON.stringify(o));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const AD='٠١٢٣٤٥٦٧٨٩', PD='۰۱۲۳۴۵۶۷۸۹';
const num=v=>{if(typeof v==='number')return v;v=String(v==null?'':v).replace(/[٠-٩]/g,d=>AD.indexOf(d)).replace(/[۰-۹]/g,d=>PD.indexOf(d)).replace(/[٫,]/g,'.').replace(/[^0-9.\-]/g,'');const n=parseFloat(v);return isFinite(n)?n:0};
const fmt=n=>Math.round(n||0).toLocaleString('en-US');
const fmt2=n=>(Math.round((n||0)*100)/100).toLocaleString('en-US',{maximumFractionDigits:2});
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){toast('⚠️ مساحة التخزين على الجهاز ممتلئة – صدّر الباكيدجات واحذف القديم');return false}}};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('on'),2600)}
function busy(on,msg){const b=$('#busy');b.classList.toggle('on',!!on);if(msg)$('#busyMsg').textContent=msg}

/* ---------- Arabic wording ---------- */
const nAr=n=>n==1?'ليلة واحدة':n==2?'ليلتان':n<=10?`${n} ليالٍ`:`${n} ليلة`;
const dAr=n=>n==1?'يوم واحد':n==2?'يومان':n<=10?`${n} أيام`:`${n} يومًا`;
const nEn=n=>`${n} Night${n==1?'':'s'}`, dEn=n=>`${n} Day${n==1?'':'s'}`;
const PTYPES={family:['عائلي','Family'],honeymoon:['شهر عسل','Honeymoon'],group:['مجموعات','Group'],corporate:['شركات','Corporate'],individual:['أفراد','Individuals'],students:['طلاب','Students']};
const CLS={economy:['اقتصادي','Economy'],premium:['اقتصادي مميز','Premium Economy'],business:['رجال الأعمال','Business'],first:['الأولى','First']};
const SVC_PRESETS=[
 ['استقبال وتوديع من وإلى المطار','Airport meet & assist with transfers','transfer','grp'],
 ['تنقلات بسيارة خاصة مع سائق طوال البرنامج','Private car with driver throughout the trip','transfer','grp'],
 ['الجولات حسب البرنامج','Tours as per itinerary','tours','grp'],
 ['تذاكر دخول المعالم المذكورة','Entrance tickets to listed sights','tickets','pp'],
 ['تأشيرة الدخول','Entry visa','visa','pp'],
 ['تأمين السفر','Travel insurance','ins','pp'],
 ['شريحة اتصال وإنترنت','SIM card with data','sim','pp'],
 ['مرشد سياحي يتحدث العربية','Arabic-speaking tour guide','guide','grp']
];
const dateLoc=l=>l==='ar'?'ar-EG-u-nu-latn-ca-gregory':'en-GB';
function fDate(s,l,o){if(!s)return'';const d=new Date(s+'T12:00:00');if(isNaN(d))return s;return new Intl.DateTimeFormat(dateLoc(l),o||{day:'numeric',month:'long',year:'numeric'}).format(d)}
function addDays(s,n){const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);

/* ---------- settings ---------- */
function defSettings(){return{v:1,rates:{...CURRENCIES},
 co:{ar:'زوفر العالمية للسفر والسياحة',en:'Zover International Travel & Tourism',phone:'',wa:'',email:'',web:'',addrAr:'الرياض – المملكة العربية السعودية',addrEn:'Riyadh – Saudi Arabia',lic:''},
 def:{markType:'pct',pct:12,fixA:300,fixC:150,vat:'margin',round:10,optPct:15},
 excl:[{ar:'المصاريف الشخصية والإكراميات',en:'Personal expenses and tips'},{ar:'الوجبات غير المذكورة في البرنامج',en:'Meals not mentioned in the program'},{ar:'الجولات الاختيارية',en:'Optional tours'},{ar:'أي خدمة غير مذكورة ضمن ما يشمله البرنامج',en:'Any service not listed under inclusions'}],
 terms:[{ar:'الأسعار خاضعة للتوافر وقت تأكيد الحجز',en:'Prices are subject to availability at the time of confirmation'},{ar:'الإلغاء والتعديل حسب سياسة شركات الطيران والفنادق',en:'Cancellations and changes follow airline and hotel policies'},{ar:'يجب أن يكون جواز السفر ساريًا لمدة 6 أشهر على الأقل من تاريخ السفر',en:'Passports must be valid for at least 6 months from the travel date'}]}}
let S=Object.assign(defSettings(),LS.get('zpb_set',{}));
S.rates=Object.assign({},CURRENCIES,S.rates||{});
const saveS=()=>LS.set('zpb_set',S);

/* ---------- package model ---------- */
function genQ(){const d=new Date();return`ZV-${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${Math.floor(100+Math.random()*900)}`}
function newHotelOpt(i){const L=[['الخيار الأول','Option 1'],['الخيار الثاني','Option 2'],['الخيار الثالث','Option 3'],['الخيار الرابع','Option 4']][i]||[`الخيار ${i+1}`,`Option ${i+1}`];return{lab:{ar:L[0],en:L[1]},cur:'USD',rows:{}}}
function newPkg(){return{id:uid(),v:1,created:Date.now(),updated:Date.now(),destId:null,
 title:{ar:'',en:''},country:{ar:'',en:''},col:['#4B2D8E','#F97A30'],hl:[{ar:'',en:''},{ar:'',en:''},{ar:'',en:''},{ar:'',en:''}],
 client:'',quoteNo:genQ(),start:'',valid:addDays(today(),7),type:'family',pax:{adt:2,chd:0,inf:0},cities:[],
 flights:{incl:true,segs:[],cur:'SAR',adt:'',chd:'',inf:'',bag:'',cls:'economy'},
 hotels:[newHotelOpt(0)],svcs:[],days:[],inclX:[],exclX:clone(S.excl),terms:clone(S.terms),notes:{ar:'',en:''},
 pr:{...S.def},room:{auto:true,sgl:0,dbl:1,trp:0,cwb:0,cnb:0},out:{lang:'ar',showPrice:true,showTotal:false,bg:null}}}
let P=LS.get('zpb_cur',null)||newPkg();
let TAB=LS.get('zpb_tab','dest'), hOpt=0, pick=!P.destId, fQ='', fR='all', outView='pdf', dirty=false;

let _st;function touch(){P.updated=Date.now();dirty=true;clearTimeout(_st);_st=setTimeout(()=>{LS.set('zpb_cur',P);hdr()},350)}
function getPath(o,p){return p.split('.').reduce((a,k)=>a==null?a:a[k],o)}
function setPath(o,p,v){const ks=p.split('.');let a=o;for(let i=0;i<ks.length-1;i++){if(a[ks[i]]==null||typeof a[ks[i]]!=='object')a[ks[i]]={};a=a[ks[i]]}a[ks[ks.length-1]]=v}

const totalNights=()=>P.cities.reduce((a,c)=>a+num(c.n),0);
const fromTemplate=k=>CITIES[k]||null;

/* ---------- destination template ---------- */
function loadDest(d){
 P.destId=d.id;P.title={ar:d.ar,en:d.en};P.country={ar:d.car,en:d.cen};P.col=d.col.slice();
 P.hl=d.hl.map(h=>({ar:h[0],en:h[1]}));
 P.cities=d.cities.map(([k,n,via])=>{const c=CITIES[k];return{id:uid(),key:k,ar:c.ar,en:c.en,n,via:via||'air'}});
 P.hotels.forEach(o=>o.rows={});
 if(!P.svcs.length)P.svcs=[mkSvc(SVC_PRESETS[0]),mkSvc(SVC_PRESETS[2])];
 P.days=genDays();
}
function mkSvc(p){return{id:uid(),ar:p[0],en:p[1],kind:p[2],basis:p[3],incl:true,cur:'USD',adt:'',chd:''}}
function genDays(){
 const D=[],cs=P.cities;if(!cs.length)return D;
 cs.forEach((c,ci)=>{const t=fromTemplate(c.key),acts=t?t.act:[];let ai=0;const n=Math.max(1,num(c.n));
  for(let k=0;k<n;k++){
   if(ci===0&&k===0){const a=t&&t.arr;D.push(a?{ar:a[0],en:a[1]}:{ar:`الوصول إلى ${c.ar} والاستقبال في المطار ثم التوجه إلى الفندق وتسجيل الدخول`,en:`Arrival in ${c.en}, meet & assist at the airport and transfer to the hotel for check-in`})}
   else if(k===0){const v=VIA[c.via]||VIA.air;D.push({ar:`تسجيل الخروج والانتقال ${v[0]} إلى ${c.ar} ثم تسجيل الدخول في الفندق`,en:`Check-out and travel ${v[1]} to ${c.en}, then hotel check-in`})}
   else if(ai<acts.length){const a=acts[ai++];D.push({ar:a[0],en:a[1]})}
   else D.push({ar:`يوم حر للراحة أو التسوق في ${c.ar}`,en:`Free day for leisure or shopping in ${c.en}`});
  }});
 D.push({ar:'تسجيل الخروج من الفندق والتوجه إلى المطار للمغادرة مع أطيب الأمنيات',en:'Check-out and transfer to the airport for departure. Bon voyage!'});
 return D;
}

/* ---------- PNR parser (Amadeus itinerary) ---------- */
const MON={JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11};
function pnrDate(dm){const m=MON[dm.slice(2,5)];if(m==null)return'';const d=+dm.slice(0,2);const base=P.start?new Date(P.start+'T12:00:00'):new Date();let y=base.getFullYear();
 let dt=new Date(y,m,d,12);const ref=new Date(base);ref.setDate(ref.getDate()-60);if(dt<ref)dt=new Date(y+1,m,d,12);return`${dt.getFullYear()}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`}
function parsePNR(txt){
 const out=[];const re=/^\s*\d{1,2}\s*\.?\s*([A-Z0-9]{2})\s*(\d{1,4})\s*([A-Z])\s+(\d{2}[A-Z]{3})\s+(?:\d\s*\*?\s*)?([A-Z]{3})\s*([A-Z]{3})\s+(?:[A-Z]{2}\d{1,3}\s+)?(?:\S+\s+)*?(\d{4})\s+(\d{4})(\s*\+1)?/;
 txt.toUpperCase().split(/\r?\n/).forEach(l=>{const m=l.match(re);if(!m)return;
  out.push({id:uid(),al:m[1],fn:m[2],rbd:m[3],from:m[5],to:m[6],date:pnrDate(m[4]),dep:m[7].slice(0,2)+':'+m[7].slice(2),arr:m[8].slice(0,2)+':'+m[8].slice(2),nd:!!m[9]})});
 return out;
}

/* ---------- pricing engine ---------- */
const rate=c=>num(S.rates[c]||(c==='SAR'?1:0))||1;
function calc(){
 const pax=P.pax,adt=num(pax.adt),chd=num(pax.chd),inf=num(pax.inf),pay=Math.max(1,adt+chd);
 const f=P.flights,fr=rate(f.cur);
 const base={a:0,c:0,i:0},fl={a:0,c:0,i:0};
 if(f.incl){fl.a=num(f.adt)*fr;fl.c=(f.chd===''?num(f.adt):num(f.chd))*fr;fl.i=num(f.inf)*fr}
 base.a+=fl.a;base.c+=fl.c;base.i+=fl.i;
 let svA=0,svC=0;
 P.svcs.filter(s=>s.incl).forEach(s=>{const r=rate(s.cur);if(s.basis==='grp'){const sh=num(s.adt)*r/pay;svA+=sh;svC+=sh}else{svA+=num(s.adt)*r;svC+=(s.chd===''?num(s.adt):num(s.chd))*r}});
 base.a+=svA;base.c+=svC;
 const pr=P.pr;
 const sell=(cost,kind)=>{if(!(cost>0))return{cost:0,price:0,vat:0,profit:0};
  let m=pr.markType==='pct'?cost*num(pr.pct)/100:(kind==='i'?0:kind==='c'?num(pr.fixC):num(pr.fixA));
  let pre=cost+m,vat=pr.vat==='margin'?m*.15:pr.vat==='total'?pre*.15:0;
  const rd=num(pr.round)||1;const price=Math.ceil((pre+vat-1e-9)/rd)*rd;return{cost,price,vat,profit:price-cost-vat}};
 const opts=P.hotels.map(o=>{const r=rate(o.cur);const h={sgl:0,dbl:0,trp:0,cwb:0,cnb:0},has={};
  P.cities.forEach(c=>{const w=o.rows[c.id]||{},n=num(c.n);['sgl','dbl','trp','cwb','cnb'].forEach(k=>{if(num(w[k])>0)has[k]=1});
   h.sgl+=num(w.sgl)*n*r;h.dbl+=num(w.dbl)*n*r/2;h.trp+=num(w.trp)*n*r/3;h.cwb+=num(w.cwb)*n*r;h.cnb+=num(w.cnb)*n*r});
  const any=Object.keys(has).length>0;
  const T={sgl:has.sgl||!any?sell(base.a+h.sgl,'a'):null,dbl:has.dbl||!any?sell(base.a+h.dbl,'a'):null,trp:has.trp?sell(base.a+h.trp,'a'):null,
   cwb:(chd||has.cwb)&&(has.cwb||!any)?sell(base.c+h.cwb,'c'):null,cnb:has.cnb?sell(base.c+h.cnb,'c'):null,inf:(inf||fl.i>0)?sell(base.i,'i'):null};
  if(any&&!has.sgl)T.sgl=null;if(any&&!has.dbl)T.dbl=null;
  if(!any&&chd&&!T.cwb)T.cwb=sell(base.c,'c');
  const R=P.room;let tot={cost:0,price:0,vat:0,profit:0};
  const addT=(t,q)=>{if(!t||!q)return;tot.cost+=t.cost*q;tot.price+=t.price*q;tot.vat+=t.vat*q;tot.profit+=t.profit*q};
  addT(T.sgl,num(R.sgl));addT(T.dbl,num(R.dbl)*2);addT(T.trp,num(R.trp)*3);addT(T.cwb,num(R.cwb));addT(T.cnb,num(R.cnb));addT(T.inf,inf);
  return{o,T,tot,from:(T.dbl&&T.dbl.price>0)?T.dbl.price:Math.min(...['sgl','trp'].map(k=>T[k]&&T[k].price>0?T[k].price:Infinity))}});
 const optional=P.svcs.filter(s=>!s.incl).map(s=>{const r=rate(s.cur),pp=s.basis==='grp'?1/pay:1;
  const c=num(s.adt)*r*pp,m=c*num(pr.optPct)/100,v=pr.vat==='none'?0:m*.15,rd=num(pr.round)||1;
  const cc=(s.chd===''?num(s.adt):num(s.chd))*r*pp,mc=cc*num(pr.optPct)/100,vc=pr.vat==='none'?0:mc*.15;
  return{s,a:c>0?Math.ceil((c+m+v)/rd)*rd:0,c:cc>0?Math.ceil((cc+mc+vc)/rd)*rd:0}});
 const from=Math.min(...opts.map(x=>x.from));
 return{opts,optional,from:isFinite(from)?from:0,fl,svA,svC,pay};
}
function autoRoom(){const a=num(P.pax.adt),c=num(P.pax.chd);P.room={auto:true,sgl:a%2,dbl:Math.floor(a/2),trp:0,cwb:c,cnb:0}}

/* ---------- header ---------- */
function hdr(){$('#hTitle').textContent=P.title.ar||P.title.en||'باكيدج جديد';
 const n=totalNights();$('#hSub').textContent=[P.country.ar,n?nAr(n):'',P.quoteNo].filter(Boolean).join(' • ')}

/* ---------- small UI builders ---------- */
const F=(lab,k,o={})=>{const v=getPath(o.S?S:P,k);const t=o.t||'text';const kk=(o.S?'S:':'')+k;
 if(t==='select')return`<label class="fl"><span>${lab}</span><select class="in" data-k="${kk}" ${o.live?'data-live="1"':''}>${o.opts.map(([val,l])=>`<option value="${esc(val)}" ${String(v)===String(val)?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`;
 if(t==='area')return`<label class="fl"><span>${lab}</span><textarea class="in" data-k="${kk}" ${o.dir?`dir="${o.dir}"`:''} rows="${o.rows||2}">${esc(v)}</textarea></label>`;
 const isN=t==='num';return`<label class="fl"><span>${lab}</span><input class="in ${isN?'num':''}" ${isN?'inputmode="decimal" data-n="1"':''} type="${isN?'text':t}" data-k="${kk}" value="${esc(v)}" ${o.dir?`dir="${o.dir}"`:''} ${o.ph?`placeholder="${esc(o.ph)}"`:''} ${o.live?'data-live="1"':''} ${o.up?'data-up="1" style="text-transform:uppercase"':''}></label>`};
const curOpts=()=>Object.keys(S.rates).map(c=>[c,c]);
const STP=(lab,k,min=0)=>`<label class="fl"><span>${lab}</span><div class="stp"><button type="button" data-a="step" data-k2="${k}" data-d="1">+</button><input data-k="${k}" data-n="1" data-live="1" inputmode="numeric" value="${esc(getPath(P,k))}"><button type="button" data-a="step" data-k2="${k}" data-d="-1" data-min="${min}">−</button></div></label>`;
const doveMini=()=>`<img class="dv" src="${IMG.dove}" alt="">`;

/* ---------- tabs ---------- */
const TABS=[['dest','🧭','الوجهة'],['flt','✈️','الطيران'],['htl','🏨','الفنادق'],['svc','🚐','الخدمات'],['prog','🗓️','البرنامج'],['price','💰','التسعير'],['out','📄','الإخراج']];
function renderTabs(){$('#tabs').innerHTML=TABS.map(([k,ic,l],i)=>`<button data-a="tab" data-t="${k}" class="${TAB===k?'on':''}"><span class="ic">${ic}</span><span>${l}</span></button>`).join('')}
function go(t){TAB=t;LS.set('zpb_tab',t);renderTabs();render();window.scrollTo({top:0})}
function render(){const m=$('#main');m.innerHTML=(R[TAB]||R.dest)();if(R['_'+TAB])R['_'+TAB]();$$('textarea.in',m).forEach(grow)}
function grow(t){if(CSS.supports&&CSS.supports('field-sizing','content'))return;t.style.height='auto';t.style.height=(t.scrollHeight+3)+'px'}
document.addEventListener('input',e=>{if(e.target.matches&&e.target.matches('textarea.in'))grow(e.target)});
const R={};

/* ===== TAB: destination ===== */
R.dest=()=>{
 let h='';
 if(pick||!P.destId&&!P.cities.length){
  const list=DESTS.filter(d=>(fR==='all'||d.r===fR)&&(!fQ||(d.ar+d.en+d.car+d.cen).toLowerCase().includes(fQ.toLowerCase())));
  h+=`<section class="card"><h3>🧭 اختار الوجهة <span class="badge p">${DESTS.length} وجهة</span><span class="sp"></span>${P.destId?'<button class="btn sm gh" data-a="pickoff">إلغاء</button>':''}</h3>
  <div class="srch"><input class="in" id="dq" placeholder="ابحث: تركيا، Bali، باريس…" value="${esc(fQ)}"></div>
  <div class="chips" style="margin-top:10px">${REGIONS.map(r=>`<button class="chip ${fR===r.id?'on':''}" data-a="reg" data-r="${r.id}">${r.ar}</button>`).join('')}</div>
  <div class="dgrid">${list.map(d=>{const n=d.cities.reduce((a,c)=>a+c[1],0);return`<button class="dc" data-a="dest" data-id="${d.id}" style="background:linear-gradient(140deg,${d.col[0]},${d.col[1]})">${doveMini()}<span class="nn">${nAr(n)}</span><span class="cn">${esc(d.car)}</span><b>${esc(d.ar)}</b><small>${esc(d.en)}</small></button>`}).join('')||'<div class="empty" style="grid-column:1/-1">مفيش نتائج</div>'}</div>
  <div style="margin-top:12px"><button class="btn ln wide" data-a="custom">✏️ باكيدج مخصص بدون قالب</button></div></section>`;
 }else{
  h+=`<section class="card" style="padding:0;overflow:hidden"><div class="dsel" style="background:linear-gradient(130deg,${P.col[0]},${P.col[1]})">${doveMini()}<div class="x"><small>${esc(P.country.ar)}</small><b>${esc(P.title.ar||'باكيدج مخصص')}</b><small style="font-family:Outfit">${esc(P.title.en)}</small></div><button class="btn sm" style="background:#fff;color:var(--p)" data-a="pickon">تغيير الوجهة</button></div></section>`;
 }
 h+=`<section class="card"><h3>📋 بيانات الباكيدج</h3><div class="g g2">
  ${F('اسم الباكيدج (عربي)','title.ar')}${F('Package name (English)','title.en',{dir:'ltr'})}
  ${F('الدولة (عربي)','country.ar')}${F('Country (English)','country.en',{dir:'ltr'})}
  ${F('اسم العميل / الجهة','client',{ph:'اختياري'})}${F('رقم العرض','quoteNo',{dir:'ltr'})}
  ${F('تاريخ السفر','start',{t:'date',live:1})}${F('العرض صالح حتى','valid',{t:'date'})}
  ${F('نوع الباكيدج','type',{t:'select',opts:Object.entries(PTYPES).map(([k,v])=>[k,v[0]])})}
 </div><h4 style="margin-top:14px">👨‍👩‍👧 المسافرين</h4><div class="g g3">${STP('بالغ','pax.adt',1)}${STP('طفل (2-11)','pax.chd')}${STP('رضيع (أقل من سنتين)','pax.inf')}</div></section>`;
 h+=`<section class="card"><h3>🏙️ المدن والليالي <span class="badge" id="totN">${nAr(totalNights())}</span></h3>
  ${P.cities.map((c,i)=>`<div class="sub"><div class="top"><span class="badge p">${i+1}</span><span class="t">${esc(c.ar)}</span>
   <button class="btn xs gh" data-a="cmove" data-i="${i}" data-d="-1" ${i?'':'disabled'}>▲</button><button class="btn xs gh" data-a="cmove" data-i="${i}" data-d="1" ${i<P.cities.length-1?'':'disabled'}>▼</button><button class="btn xs rd" data-a="cdel" data-i="${i}">✕</button></div>
   <div class="g g4">${F('المدينة','cities.'+i+'.ar')}${F('City','cities.'+i+'.en',{dir:'ltr'})}${STP('عدد الليالي','cities.'+i+'.n',1)}
   ${i?F('الانتقال إليها','cities.'+i+'.via',{t:'select',opts:Object.entries(VIA).map(([k,v])=>[k,v[0]])}):'<div></div>'}</div></div>`).join('')||'<div class="empty">اختار وجهة من فوق أو ضيف مدينة</div>'}
  <div class="row" style="margin-top:6px"><select class="in" id="addCity" style="flex:1;min-width:180px"><option value="">+ إضافة مدينة من القائمة…</option>${Object.entries(CITIES).map(([k,c])=>`<option value="${k}">${c.ar} – ${c.en}</option>`).join('')}</select><button class="btn gh" data-a="cadd">+ مدينة فاضية</button></div>
  <div class="hint" style="margin-top:8px">بعد تعديل المدن، روح لتبويب «البرنامج» واضغط «توليد البرنامج» عشان الأيام تتحدّث.</div></section>`;
 h+=`<section class="card"><h3>⭐ أهم المميزات <small style="color:var(--mut);font-weight:600;font-size:12.5px">(بتظهر في الغلاف والصورة)</small></h3>
  ${P.hl.map((x,i)=>`<div class="g g2" style="margin-bottom:8px">${F('ميزة '+(i+1),'hl.'+i+'.ar')}${F('Highlight '+(i+1),'hl.'+i+'.en',{dir:'ltr'})}</div>`).join('')}</section>`;
 return h;
};
R._dest=()=>{const q=$('#dq');if(q){q.oninput=()=>{fQ=q.value;const p=q.selectionStart;render();const n=$('#dq');n.focus();n.setSelectionRange(p,p)}}
 const ac=$('#addCity');if(ac)ac.onchange=()=>{const k=ac.value;if(!k)return;const c=CITIES[k];P.cities.push({id:uid(),key:k,ar:c.ar,en:c.en,n:2,via:'air'});touch();render()}};

/* ===== TAB: flights ===== */
R.flt=()=>{const f=P.flights;
 return`<section class="card"><h3>✈️ الطيران<span class="sp"></span><label class="sw"><input type="checkbox" data-k="flights.incl" ${f.incl?'checked':''}><i></i>مشمول في الباكيدج</label></h3>
 <div class="hint">لو الطيران مش مشمول، اقفل الزرار وهيتشال من السعر ومن العرض.</div>
 <h4>📋 لصق الحجز من أماديوس (اختياري)</h4>
 <textarea class="in" id="pnr" dir="ltr" rows="4" placeholder=" 1  SV 123 Y 15DEC 1 RUHIST HK2  0130 0600  15DEC  E  SV/ABC123&#10; 2  SV 124 Y 22DEC 1 ISTRUH HK2  0745 1200  22DEC  E  SV/ABC123"></textarea>
 <div class="row" style="margin-top:8px"><button class="btn o" data-a="pnr">قراءة الرحلات</button><span class="hint" style="margin:0">بيقرا شاشة الـ itinerary (RT) ويملا الرحلات تحت.</span></div></section>
 <section class="card"><h3>🛫 الرحلات <span class="badge p">${f.segs.length}</span></h3>
 ${f.segs.map((s,i)=>`<div class="sub"><div class="top"><span class="badge p">${i+1}</span><span class="t" style="font-family:Outfit">${esc(s.al)} ${esc(s.fn)} • ${esc(s.from)} → ${esc(s.to)}</span><button class="btn xs rd" data-a="sdel" data-i="${i}">✕</button></div>
  <div class="g g4">${F('شركة الطيران (كود)','flights.segs.'+i+'.al',{dir:'ltr',up:1,ph:'SV'})}${F('رقم الرحلة','flights.segs.'+i+'.fn',{dir:'ltr'})}${F('من (كود المطار)','flights.segs.'+i+'.from',{dir:'ltr',up:1,ph:'RUH'})}${F('إلى (كود المطار)','flights.segs.'+i+'.to',{dir:'ltr',up:1,ph:'IST'})}
  ${F('التاريخ','flights.segs.'+i+'.date',{t:'date'})}${F('الإقلاع','flights.segs.'+i+'.dep',{t:'time'})}${F('الوصول','flights.segs.'+i+'.arr',{t:'time'})}
  <label class="fl"><span>الوصول اليوم التالي</span><label class="sw" style="height:44px"><input type="checkbox" data-k="flights.segs.${i}.nd" ${s.nd?'checked':''}><i></i>+1</label></label></div></div>`).join('')||'<div class="empty">مفيش رحلات لسه – الصق الحجز أو ضيف رحلة</div>'}
 <button class="btn gh" data-a="sadd" style="margin-top:6px">+ إضافة رحلة</button></section>
 <section class="card"><h3>💵 أسعار التذاكر (تكلفة للفرد)</h3><div class="g g4">
  ${F('العملة','flights.cur',{t:'select',opts:curOpts()})}${F('بالغ','flights.adt',{t:'num'})}${F('طفل','flights.chd',{t:'num',ph:'= بالغ'})}${F('رضيع','flights.inf',{t:'num'})}
  ${F('الدرجة','flights.cls',{t:'select',opts:Object.entries(CLS).map(([k,v])=>[k,v[0]])})}${F('الأمتعة','flights.bag',{ph:'مثال: 2 × 23 كجم'})}</div></section>`};

/* ===== TAB: hotels ===== */
R.htl=()=>{if(hOpt>=P.hotels.length)hOpt=0;const o=P.hotels[hOpt],ok='hotels.'+hOpt;
 let h=`<section class="card"><h3>🏨 خيارات الفنادق</h3><div class="hint">ضيف أكتر من خيار (مثلاً 4 نجوم و5 نجوم) وكل خيار هيطلع له سعر منفصل في العرض.</div>
 <div class="chips">${P.hotels.map((x,i)=>`<button class="chip ${i===hOpt?'on':''}" data-a="hopt" data-i="${i}">${esc(x.lab.ar||'خيار '+(i+1))}</button>`).join('')}${P.hotels.length<4?'<button class="chip add" data-a="hadd">+ خيار</button>':''}</div></section>
 <section class="card"><h3>${esc(o.lab.ar)}<span class="sp"></span>${P.hotels.length>1?`<button class="btn sm gh" data-a="hdup">نسخ الخيار</button><button class="btn sm rd" data-a="hdel">حذف</button>`:`<button class="btn sm gh" data-a="hdup">نسخ الخيار</button>`}</h3>
 <div class="g g3">${F('اسم الخيار (عربي)',ok+'.lab.ar')}${F('Option name',ok+'.lab.en',{dir:'ltr'})}${F('عملة أسعار الفنادق',ok+'.cur',{t:'select',opts:curOpts()})}</div></section>`;
 if(!P.cities.length)return h+'<div class="empty">ضيف المدن الأول من تبويب «الوجهة»</div>';
 h+=P.cities.map(c=>{const rk=ok+'.rows.'+c.id;if(!o.rows[c.id])o.rows[c.id]={hotel:'',stars:'4',room:'',meal:'BB',sgl:'',dbl:'',trp:'',cwb:'',cnb:''};
  return`<section class="card"><h3>📍 ${esc(c.ar)} <span class="badge">${nAr(num(c.n))}</span></h3>
  <div class="g g4">${F('اسم الفندق',rk+'.hotel',{dir:'ltr',ph:'Hotel name'})}${F('التصنيف',rk+'.stars',{t:'select',opts:[['3','3 نجوم'],['4','4 نجوم'],['5','5 نجوم'],['0','بدون']]})}
  ${F('نوع الغرفة',rk+'.room',{dir:'ltr',ph:'Standard Room'})}${F('الوجبات',rk+'.meal',{t:'select',opts:Object.entries(MEALS).map(([k,v])=>[k,v[0]])})}</div>
  <h4 style="margin-top:12px">سعر الليلة للغرفة (${esc(o.cur)})</h4><div class="g g5">${F('مفردة SGL',rk+'.sgl',{t:'num'})}${F('مزدوجة DBL',rk+'.dbl',{t:'num'})}${F('ثلاثية TRP',rk+'.trp',{t:'num'})}${F('طفل بسرير',rk+'.cwb',{t:'num'})}${F('طفل بدون سرير',rk+'.cnb',{t:'num'})}</div></section>`}).join('');
 return h};

/* ===== TAB: services ===== */
R.svc=()=>`<section class="card"><h3>🚐 الخدمات والجولات</h3><div class="hint">«مشمول» بيدخل في سعر الباكيدج، و«اختياري» بيظهر في جدول الجولات الاختيارية بسعره.</div>
 <div class="chips">${SVC_PRESETS.map((p,i)=>`<button class="chip add" data-a="svadd" data-i="${i}">+ ${p[0]}</button>`).join('')}<button class="chip add" data-a="svadd" data-i="-1">+ خدمة أخرى</button></div></section>
 ${P.svcs.map((s,i)=>{const k='svcs.'+i;return`<section class="card" style="${s.incl?'':'border-color:#F5DC8F;background:#FFFCF2'}"><h3><span class="badge ${s.incl?'g':''}">${s.incl?'مشمول':'اختياري'}</span> ${esc(s.ar||'خدمة')}<span class="sp"></span><button class="btn xs gh" data-a="svmove" data-i="${i}" data-d="-1" ${i?'':'disabled'}>▲</button><button class="btn xs gh" data-a="svmove" data-i="${i}" data-d="1" ${i<P.svcs.length-1?'':'disabled'}>▼</button><button class="btn xs rd" data-a="svdel" data-i="${i}">✕</button></h3>
 <div class="g g2">${F('الخدمة (عربي)',k+'.ar')}${F('Service (English)',k+'.en',{dir:'ltr'})}</div>
 <div class="g g5" style="margin-top:10px">${F('الحالة',k+'.incl',{t:'select',opts:[['true','مشمول'],['false','اختياري']]})}${F('طريقة الحساب',k+'.basis',{t:'select',opts:[['pp','للفرد'],['grp','للمجموعة كلها']]})}${F('العملة',k+'.cur',{t:'select',opts:curOpts()})}${F(s.basis==='grp'?'التكلفة الكلية':'تكلفة البالغ',k+'.adt',{t:'num'})}${s.basis==='grp'?'<div></div>':F('تكلفة الطفل',k+'.chd',{t:'num',ph:'= بالغ'})}</div></section>`}).join('')||'<div class="empty">مفيش خدمات – اختار من فوق</div>'}`;

/* ===== TAB: program ===== */
const listEd=(key,title,icon)=>`<section class="card"><h3>${icon} ${title}<span class="sp"></span><button class="btn sm gh" data-a="ladd" data-l="${key}">+ سطر</button></h3>
 ${P[key].map((x,i)=>`<div class="g g2 m1" style="margin-bottom:8px;align-items:end;grid-template-columns:1fr 1fr auto">${F('عربي',key+'.'+i+'.ar')}${F('English',key+'.'+i+'.en',{dir:'ltr'})}<button class="btn xs rd" style="height:44px" data-a="ldel" data-l="${key}" data-i="${i}">✕</button></div>`).join('')||'<div class="hint">مفيش سطور</div>'}</section>`;
R.prog=()=>{const auto=autoIncl('ar');
 return`<section class="card"><h3>🗓️ البرنامج اليومي <span class="badge p">${P.days.length} يوم</span><span class="sp"></span><button class="btn sm o" data-a="gen">⚡ توليد البرنامج من المدن</button></h3>
 ${P.days.map((d,i)=>`<div class="day"><div class="dn"><b>${i+1}</b><small>${P.start?fDate(addDays(P.start,i),'ar',{day:'numeric',month:'short'}):''}</small></div>
  <div class="bd">${`<textarea class="in" rows="2" data-k="days.${i}.ar">${esc(d.ar)}</textarea><textarea class="in" rows="2" dir="ltr" data-k="days.${i}.en">${esc(d.en)}</textarea>`}</div>
  <div class="ct"><button class="btn xs gh" data-a="dmove" data-i="${i}" data-d="-1" ${i?'':'disabled'}>▲</button><button class="btn xs gh" data-a="dmove" data-i="${i}" data-d="1" ${i<P.days.length-1?'':'disabled'}>▼</button><button class="btn xs gh" data-a="dins" data-i="${i}">＋</button><button class="btn xs rd" data-a="ddel" data-i="${i}">✕</button></div></div>`).join('')||'<div class="empty">اضغط «توليد البرنامج» بعد اختيار المدن</div>'}
 <button class="btn gh" data-a="dadd">+ إضافة يوم</button></section>
 <section class="card"><h3>✅ يشمل البرنامج (تلقائي)</h3><div class="hint">السطور دي بتتكتب لوحدها من الطيران والفنادق والخدمات المشمولة.</div><div class="chips">${auto.map(x=>`<span class="badge g" style="font-size:12.5px;padding:5px 11px">${esc(x)}</span>`).join('')||'<span class="hint">—</span>'}</div></section>
 ${listEd('inclX','إضافات على «يشمل»','➕')}${listEd('exclX','لا يشمل','⛔')}${listEd('terms','الشروط والأحكام','📌')}
 <section class="card"><h3>📝 ملاحظات إضافية</h3><div class="g g2">${F('ملاحظات (عربي)','notes.ar',{t:'area',rows:3})}${F('Notes (English)','notes.en',{t:'area',rows:3,dir:'ltr'})}</div></section>`};

/* ===== TAB: pricing ===== */
R.price=()=>{const pr='pr.';
 const used=[...new Set([P.flights.cur,...P.hotels.map(o=>o.cur),...P.svcs.map(s=>s.cur)])].filter(c=>c!=='SAR');
 return`<section class="card"><h3>⚙️ إعدادات التسعير</h3><div class="g g4">
 ${F('نوع هامش الربح',pr+'markType',{t:'select',live:1,opts:[['pct','نسبة مئوية %'],['fix','مبلغ ثابت للفرد']]})}
 ${P.pr.markType==='pct'?F('نسبة الربح %',pr+'pct',{t:'num',live:1}):F('ربح البالغ (ر.س)',pr+'fixA',{t:'num',live:1})+F('ربح الطفل (ر.س)',pr+'fixC',{t:'num',live:1})}
 ${F('ضريبة القيمة المضافة',pr+'vat',{t:'select',live:1,opts:[['margin','15% على هامش الربح'],['total','15% على السعر كله'],['none','بدون ضريبة']]})}
 ${F('تقريب السعر لأعلى',pr+'round',{t:'select',live:1,opts:[['1','1'],['5','5'],['10','10'],['50','50'],['100','100']]})}
 ${F('هامش الجولات الاختيارية %',pr+'optPct',{t:'num',live:1})}</div>
 <div class="hint" style="margin-top:10px">⚠️ راجع طريقة احتساب الضريبة مع المحاسب حسب نوع الخدمة.</div>
 ${used.length?`<h4 style="margin-top:12px">💱 أسعار الصرف (1 عملة = ؟ ريال)</h4><div class="g g4">${used.map(c=>F(c,'rates.'+c,{t:'num',live:1,S:1})).join('')}</div>`:''}</section>
 <section class="card"><h3>🛏️ التسكين (لحساب الإجمالي)<span class="sp"></span><button class="btn sm gh" data-a="autoroom">تلقائي من عدد المسافرين</button></h3>
 <div class="g g5">${F('غرف مفردة','room.sgl',{t:'num',live:1})}${F('غرف مزدوجة','room.dbl',{t:'num',live:1})}${F('غرف ثلاثية','room.trp',{t:'num',live:1})}${F('أطفال بسرير','room.cwb',{t:'num',live:1})}${F('أطفال بدون سرير','room.cnb',{t:'num',live:1})}</div><div id="roomWarn"></div></section>
 <div id="prRes"></div>`};
R._price=()=>prRes();
function prRes(){const el=$('#prRes');if(!el)return;const C=calc();const R2=P.room,a=num(P.pax.adt),c=num(P.pax.chd);
 const inRooms=num(R2.sgl)+num(R2.dbl)*2+num(R2.trp)*3,ch=num(R2.cwb)+num(R2.cnb);
 const w=$('#roomWarn');if(w)w.innerHTML=(inRooms!==a?`<div class="warn">عدد البالغين في الغرف (${inRooms}) مش مساوي لعدد البالغين (${a})</div>`:'')+(ch!==c?`<div class="warn">عدد الأطفال في التسكين (${ch}) مش مساوي لعدد الأطفال (${c})</div>`:'');
 const LBL={sgl:'بالغ – غرفة مفردة',dbl:'بالغ – غرفة مزدوجة',trp:'بالغ – غرفة ثلاثية',cwb:'طفل بسرير',cnb:'طفل بدون سرير',inf:'رضيع'};
 let h='';
 C.opts.forEach(x=>{const T=x.T;const rows=Object.keys(LBL).filter(k=>T[k]);
  h+=`<section class="card"><h3>💰 ${esc(x.o.lab.ar)}</h3>
  <div class="kpis"><div class="kpi"><small>إجمالي التكلفة</small><b>${fmt(x.tot.cost)}</b></div><div class="kpi o"><small>إجمالي البيع للعميل</small><b>${fmt(x.tot.price)}</b></div><div class="kpi g"><small>صافي الربح التقريبي</small><b>${fmt(x.tot.profit)}</b></div></div>
  <div class="tw"><table class="t"><tr><th>الفئة</th><th>التكلفة</th><th>سعر البيع</th><th>الضريبة</th><th>الربح</th></tr>
  ${rows.map(k=>`<tr><td>${LBL[k]}</td><td class="n">${fmt2(T[k].cost)}</td><td class="n" style="color:var(--o)">${fmt(T[k].price)}</td><td class="n">${fmt2(T[k].vat)}</td><td class="n ${T[k].profit>=0?'pos':'neg'}">${fmt2(T[k].profit)}</td></tr>`).join('')}</table></div>
  <div class="hint" style="margin-top:8px">كل الأرقام بالريال السعودي وللفرد. الإجمالي محسوب على التسكين اللي فوق.</div></section>`});
 if(C.optional.length)h+=`<section class="card"><h3>🎟️ الجولات الاختيارية (سعر البيع للفرد)</h3><div class="tw"><table class="t"><tr><th>الجولة</th><th>بالغ</th><th>طفل</th></tr>${C.optional.map(o=>`<tr><td>${esc(o.s.ar)}</td><td class="n">${fmt(o.a)}</td><td class="n">${fmt(o.c)}</td></tr>`).join('')}</table></div></section>`;
 h+=`<section class="card"><h3>🔎 تفاصيل التكلفة للفرد</h3><div class="tw"><table class="t"><tr><th>البند</th><th>بالغ</th><th>طفل</th></tr>
 <tr><td>الطيران</td><td class="n">${fmt2(C.fl.a)}</td><td class="n">${fmt2(C.fl.c)}</td></tr><tr><td>الخدمات المشمولة</td><td class="n">${fmt2(C.svA)}</td><td class="n">${fmt2(C.svC)}</td></tr></table></div><div class="hint" style="margin-top:8px">خدمات «للمجموعة» بتتقسم على ${C.pay} فرد (بالغين + أطفال).</div></section>`;
 el.innerHTML=h}

/* ===== TAB: output ===== */
R.out=()=>{const o=P.out;
 return`<section class="card"><h3>📄 الإخراج</h3>
 <div class="row" style="margin-bottom:12px"><div class="seg"><button class="${o.lang==='ar'?'on':''}" data-a="olang" data-l="ar">عربي</button><button class="${o.lang==='en'?'on':''}" data-a="olang" data-l="en">English</button></div>
 <div class="seg"><button class="${outView==='pdf'?'on':''}" data-a="oview" data-v="pdf">📄 عرض PDF</button><button class="${outView==='img'?'on':''}" data-a="oview" data-v="img">🖼️ صورة JPEG</button></div></div>
 <div class="row" style="gap:18px;margin-bottom:12px"><label class="sw"><input type="checkbox" data-k="out.showPrice" data-rerender="1" ${o.showPrice?'checked':''}><i></i>إظهار الأسعار</label>
 <label class="sw"><input type="checkbox" data-k="out.showTotal" data-rerender="1" ${o.showTotal?'checked':''}><i></i>إظهار الإجمالي للمجموعة</label></div>
 <div class="row" style="margin-bottom:12px">${o.bg?`<img class="bgthumb" src="${o.bg}"><button class="btn sm rd" data-a="bgdel">حذف الصورة</button>`:''}<label class="btn sm gh" style="cursor:pointer">🏞️ ${o.bg?'تغيير':'إضافة'} صورة خلفية للوجهة<input type="file" accept="image/*" id="bgIn" hidden></label><span class="hint" style="margin:0">بتظهر في الغلاف وصورة السوشيال</span></div>
 <div class="row">${outView==='pdf'?`<button class="btn o" data-a="pdf">⬇️ تحميل PDF</button><button class="btn ln" data-a="print">🖨️ طباعة</button>`:`<button class="btn o" data-a="jpg">⬇️ تحميل الصورة</button>`}<button class="btn gh" data-a="share" id="shareBtn" style="display:none">📤 مشاركة</button></div></section>
 <section class="card" style="padding:10px"><div class="pvw" id="pvw">${outView==='pdf'?'<div id="docPages" style="display:contents"></div>':'<img id="posterImg" alt="">'}</div></section>`};
R._out=()=>{const bi=$('#bgIn');if(bi)bi.onchange=()=>loadBg(bi.files[0]);
 if(navigator.canShare&&navigator.canShare({files:[new File([''],'a.pdf',{type:'application/pdf'})]}))$('#shareBtn').style.display='';
 setTimeout(()=>{if(outView==='pdf')buildDoc();else drawPoster().then(c=>{$('#posterImg').src=c.toDataURL('image/jpeg',.9)})},30)};
function loadBg(file){if(!file)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const W=1400,s=Math.min(1,W/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);P.out.bg=c.toDataURL('image/jpeg',.82);touch();render()};im.src=r.result};r.readAsDataURL(file)}

/* ---------- inclusions helper ---------- */
function autoIncl(l){const A=[],ar=l==='ar',f=P.flights,n=totalNights();
 if(f.incl&&(f.segs.length||num(f.adt)>0)){const c=CLS[f.cls]||CLS.economy;A.push(ar?`تذاكر الطيران ذهابًا وعودة – درجة ${c[0]}${f.bag?` (الأمتعة: ${f.bag})`:''}`:`Return flight tickets – ${c[1]} class${f.bag?` (baggage: ${f.bag})`:''}`)}
 if(n)A.push(ar?`الإقامة ${nAr(n)} في الفنادق المذكورة حسب نظام الوجبات المحدد`:`${nEn(n)} accommodation in the listed hotels with the stated meal plan`);
 P.svcs.filter(s=>s.incl).forEach(s=>A.push(ar?s.ar:s.en||s.ar));
 P.inclX.forEach(x=>{const t=ar?x.ar:x.en||x.ar;if(t)A.push(t)});
 return A}
function autoExcl(l){const ar=l==='ar',A=P.exclX.map(x=>ar?x.ar:x.en||x.ar).filter(Boolean);
 if(!P.svcs.some(s=>s.incl&&s.kind==='visa'))A.unshift(ar?'رسوم التأشيرة (إن وُجدت)':'Visa fees (if applicable)');
 if(!P.flights.incl)A.unshift(ar?'تذاكر الطيران':'Flight tickets');return A}

/* ---------- actions ---------- */
const A={
 tab:e=>go(e.dataset.t),
 reg:e=>{fR=e.dataset.r;render()},
 pickon:()=>{pick=true;render()},pickoff:()=>{pick=false;render()},
 dest:e=>{const d=DESTS.find(x=>x.id===e.dataset.id);if(P.cities.length&&!confirm('تحميل قالب الوجهة هيستبدل المدن والبرنامج الحاليين. تكمّل؟'))return;loadDest(d);pick=false;touch();render();toast('✅ تم تحميل قالب '+d.ar)},
 custom:()=>{P.destId='custom';pick=false;touch();render()},
 step:e=>{const k=e.dataset.k2,v=Math.max(num(e.dataset.min||0),num(getPath(P,k))+num(e.dataset.d));setPath(P,k,v);if(k.startsWith('pax.')&&P.room.auto)autoRoom();touch();const i=e.parentNode.querySelector('input');i.value=v;live()},
 cmove:e=>{mv(P.cities,+e.dataset.i,+e.dataset.d);touch();render()},
 cdel:e=>{P.cities.splice(+e.dataset.i,1);touch();render()},
 cadd:()=>{P.cities.push({id:uid(),key:'',ar:'',en:'',n:2,via:'air'});touch();render()},
 pnr:()=>{const s=parsePNR($('#pnr').value);if(!s.length)return toast('⚠️ مقدرتش أقرا رحلات – اتأكد من الصيغة');P.flights.segs=s;if(!P.start&&s[0].date)P.start=s[0].date;touch();render();toast(`✅ تم قراءة ${s.length} رحلات`)},
 sadd:()=>{P.flights.segs.push({id:uid(),al:'',fn:'',from:'',to:'',date:'',dep:'',arr:'',nd:false});touch();render()},
 sdel:e=>{P.flights.segs.splice(+e.dataset.i,1);touch();render()},
 hopt:e=>{hOpt=+e.dataset.i;render()},
 hadd:()=>{P.hotels.push(newHotelOpt(P.hotels.length));hOpt=P.hotels.length-1;touch();render()},
 hdup:()=>{const c=clone(P.hotels[hOpt]);const n=newHotelOpt(P.hotels.length);c.lab=n.lab;P.hotels.push(c);hOpt=P.hotels.length-1;touch();render();toast('تم نسخ الخيار')},
 hdel:()=>{if(!confirm('حذف الخيار ده؟'))return;P.hotels.splice(hOpt,1);hOpt=0;touch();render()},
 svadd:e=>{const i=+e.dataset.i;P.svcs.push(i<0?mkSvc(['','','other','pp']):mkSvc(SVC_PRESETS[i]));touch();render();window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})},
 svdel:e=>{P.svcs.splice(+e.dataset.i,1);touch();render()},
 svmove:e=>{mv(P.svcs,+e.dataset.i,+e.dataset.d);touch();render()},
 gen:()=>{if(!P.cities.length)return toast('ضيف المدن الأول');if(P.days.length&&!confirm('هيتم استبدال البرنامج الحالي. تكمّل؟'))return;P.days=genDays();touch();render();toast('✅ تم توليد البرنامج')},
 dmove:e=>{mv(P.days,+e.dataset.i,+e.dataset.d);touch();render()},
 ddel:e=>{P.days.splice(+e.dataset.i,1);touch();render()},
 dins:e=>{P.days.splice(+e.dataset.i+1,0,{ar:'',en:''});touch();render()},
 dadd:()=>{P.days.push({ar:'',en:''});touch();render()},
 ladd:e=>{P[e.dataset.l].push({ar:'',en:''});touch();render()},
 ldel:e=>{P[e.dataset.l].splice(+e.dataset.i,1);touch();render()},
 autoroom:()=>{autoRoom();touch();render()},
 olang:e=>{P.out.lang=e.dataset.l;touch();render()},
 oview:e=>{outView=e.dataset.v;render()},
 bgdel:()=>{P.out.bg=null;touch();render()},
 pdf:()=>exportPDF(),print:()=>doPrint(),jpg:()=>exportJPG(),share:()=>doShare(),
 save:()=>savePkg(),newp:()=>{if(!confirm('بدء باكيدج جديد؟ (احفظ الحالي الأول لو محتاجه)'))return;P=newPkg();autoRoom();pick=true;LS.set('zpb_cur',P);go('dest');hdr()},
 lib:()=>openLib(),set:()=>openSet(),close:()=>$$('.mdl').forEach(m=>m.classList.remove('on')),
 lopen:e=>{const L=lib(),p=L.find(x=>x.id===e.dataset.id);if(!p)return;P=migrate(clone(p));LS.set('zpb_cur',P);pick=false;A.close();go('dest');hdr();toast('📂 تم فتح '+(P.title.ar||'الباكيدج'))},
 ldup:e=>{const L=lib(),p=clone(L.find(x=>x.id===e.dataset.id));p.id=uid();p.quoteNo=genQ();p.title.ar=(p.title.ar||'')+' (نسخة)';p.updated=Date.now();L.unshift(p);LS.set('zpb_lib',L);openLib()},
 lrm:e=>{if(!confirm('حذف الباكيدج نهائيًا من الجهاز؟'))return;LS.set('zpb_lib',lib().filter(x=>x.id!==e.dataset.id));openLib()},
 lexp:e=>{const L=lib();const items=e.dataset.id?L.filter(x=>x.id===e.dataset.id):L;if(!items.length)return toast('المكتبة فاضية');download(new Blob([JSON.stringify({app:'zover-packages',v:1,pkgs:items})],{type:'application/json'}),(items.length===1?'Zover-'+(items[0].title.en||items[0].title.ar||'package'):'Zover-packages-'+today())+'.json')},
 setsave:()=>{saveS();A.close();toast('✅ تم حفظ الإعدادات');render()},
 setreset:()=>{if(!confirm('إرجاع أسعار الصرف للقيم الافتراضية؟'))return;S.rates={...CURRENCIES};saveS();openSet()},
 curadd:()=>{const c=(prompt('كود العملة (3 حروف) مثل QAR')||'').trim().toUpperCase();if(!/^[A-Z]{3}$/.test(c))return;const v=num(prompt('1 '+c+' = كام ريال؟')||0);if(v>0){S.rates[c]=v;saveS();openSet()}}
};
function mv(a,i,d){const j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]]}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const f=A[b.dataset.a];if(f){e.preventDefault();f(b)}});
function onField(e){const el=e.target.closest('[data-k]');if(!el)return;let k=el.dataset.k,tgt=P;if(k.startsWith('S:')){k=k.slice(2);tgt=S}
 let v;if(el.type==='checkbox')v=el.checked;else if(el.tagName==='SELECT'&&(el.value==='true'||el.value==='false'))v=el.value==='true';else v=el.value;
 if(el.dataset.up&&typeof v==='string'){v=v.toUpperCase()}
 if(el.dataset.n)v=el.value===''?'':num(el.value);
 setPath(tgt,k,v);if(tgt===S)saveS();else{if(k.startsWith('pax.')&&P.room.auto)autoRoom();if(k.startsWith('room.'))P.room.auto=false;touch()}
 if(e.type==='change'&&(el.tagName==='SELECT'||el.type==='checkbox'||el.type==='date')){if(el.dataset.rerender||/\.basis$|\.incl$|markType|stars$|^start$/.test(k)||TAB==='out'){render();return}}
 if(el.dataset.live)live()}
document.addEventListener('input',onField);document.addEventListener('change',onField);
function live(){const t=$('#totN');if(t)t.textContent=nAr(totalNights());if(TAB==='price')prRes()}

/* ---------- library ---------- */
const lib=()=>LS.get('zpb_lib',[]);
function migrate(p){const d=newPkg();for(const k in d)if(p[k]===undefined)p[k]=d[k];p.out=Object.assign(d.out,p.out||{});p.pr=Object.assign(d.pr,p.pr||{});return p}
function savePkg(){const L=lib();const i=L.findIndex(x=>x.id===P.id);P.updated=Date.now();if(i>=0)L[i]=clone(P);else L.unshift(clone(P));if(LS.set('zpb_lib',L)){LS.set('zpb_cur',P);dirty=false;toast('💾 تم الحفظ في المكتبة')}}
function openLib(){const L=lib().sort((a,b)=>b.updated-a.updated);
 $('#libBody').innerHTML=`<div class="row" style="margin-bottom:12px"><button class="btn o sm" data-a="lexp">⬇️ تصدير الكل</button><label class="btn gh sm" style="cursor:pointer">⬆️ استيراد ملف<input type="file" accept=".json,application/json" id="impIn" hidden></label><span class="hint" style="margin:0">التصدير بيطلع ملف تقدر تبعته لأي موظف يستورده عنده.</span></div>`+
 (L.map(p=>`<div class="libi"><div class="sq" style="background:linear-gradient(135deg,${p.col[0]},${p.col[1]})"></div><div class="x"><b>${esc(p.title.ar||p.title.en||'بدون اسم')}</b><small>${esc(p.client||'')} ${p.client?'• ':''}${esc(p.quoteNo)} • ${new Date(p.updated).toLocaleDateString('en-GB')}</small></div>
 <button class="btn xs" data-a="lopen" data-id="${p.id}">فتح</button><button class="btn xs gh" data-a="ldup" data-id="${p.id}" title="نسخة">⧉</button><button class="btn xs gh" data-a="lexp" data-id="${p.id}" title="تصدير">⬇</button><button class="btn xs rd" data-a="lrm" data-id="${p.id}">✕</button></div>`).join('')||'<div class="empty">المكتبة فاضية – اضغط «حفظ» عشان تحفظ الباكيدج الحالي</div>');
 $('#impIn').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);const items=(j.pkgs||[j]).filter(x=>x&&x.id&&x.title);const L2=lib();items.forEach(p=>{const i=L2.findIndex(x=>x.id===p.id);if(i>=0)L2[i]=p;else L2.unshift(p)});LS.set('zpb_lib',L2);toast(`✅ تم استيراد ${items.length} باكيدج`);openLib()}catch(err){toast('⚠️ الملف مش صالح')}};r.readAsText(f)};
 $('#mLib').classList.add('on')}
function openSet(){const c='co.';
 $('#setBody').innerHTML=`<h4>🏢 بيانات الشركة (بتظهر في العروض)</h4><div class="g g2">${F('اسم الشركة (عربي)',c+'ar',{S:1})}${F('Company name',c+'en',{S:1,dir:'ltr'})}${F('رقم الهاتف',c+'phone',{S:1,dir:'ltr',ph:'+966 …'})}${F('واتساب',c+'wa',{S:1,dir:'ltr'})}${F('البريد الإلكتروني',c+'email',{S:1,dir:'ltr'})}${F('الموقع الإلكتروني',c+'web',{S:1,dir:'ltr'})}${F('العنوان (عربي)',c+'addrAr',{S:1})}${F('Address',c+'addrEn',{S:1,dir:'ltr'})}${F('رقم الترخيص / السجل',c+'lic',{S:1,dir:'ltr'})}</div>
 <h4 style="margin-top:16px">💱 أسعار الصرف (1 عملة = ؟ ريال سعودي)</h4><div class="hint">قيم تقريبية – حدّثها حسب سعر اليوم.</div><div class="g g4">${Object.keys(S.rates).filter(k=>k!=='SAR').map(k=>F(k,'rates.'+k,{S:1,t:'num'})).join('')}</div>
 <div class="row" style="margin-top:10px"><button class="btn sm gh" data-a="curadd">+ عملة</button><button class="btn sm ln" data-a="setreset">استرجاع الافتراضي</button></div>
 <h4 style="margin-top:16px">💰 إعدادات التسعير الافتراضية للباكيدجات الجديدة</h4><div class="g g4">${F('نسبة الربح %','def.pct',{S:1,t:'num'})}${F('الضريبة','def.vat',{S:1,t:'select',opts:[['margin','على الهامش'],['total','على الإجمالي'],['none','بدون']]})}${F('التقريب','def.round',{S:1,t:'select',opts:[['1','1'],['5','5'],['10','10'],['50','50'],['100','100']]})}${F('هامش الاختياري %','def.optPct',{S:1,t:'num'})}</div>
 <div style="margin-top:16px"><button class="btn o wide" data-a="setsave">حفظ الإعدادات</button></div>`;
 $('#mSet').classList.add('on')}

/* ---------- files ---------- */
function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name.replace(/[\\/:*?"<>|]+/g,'-');document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000)}
const fileBase=()=>`Zover-${(P.title.en||P.title.ar||'Package').replace(/\s+/g,'-')}-${P.out.lang.toUpperCase()}`;

/* ---------- boot ---------- */
function boot(){if(!P.room)autoRoom();P=migrate(P);renderTabs();render();hdr();
 window.addEventListener('beforeunload',()=>LS.set('zpb_cur',P));
 if('serviceWorker'in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
 window.addEventListener('resize',()=>{if(TAB==='out'&&outView==='pdf')scalePages()})}
