'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);
const digits=v=>String(v==null?'':v).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const fmtAmt=v=>{v=digits(v).replace(/[^\d.]/g,'');if(!v)return'';const [a,b]=v.split('.');return Number(a).toLocaleString('en-US')+(b?'.'+b:'')};
const nW=n=>n>=3&&n<=10?'ليالي':'ليلة',dW=n=>n>=3&&n<=10?'أيام':'يوم';
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)}
function busy(on,m){$('#busy').classList.toggle('on',!!on);if(m)$('#busyMsg').textContent=m}

const SIZES={sq:[1080,1080,'مربع 1:1'],pt:[1080,1350,'طولي 4:5'],st:[1080,1920,'ستوري 9:16']};
const OUTS=[['poster','🖼️','صورة شاملة'],['slides','🎞️','مجموعة صور'],['pdf','📄','بروشور PDF']];
const THEME_LIST=[['zover','زوفر','بنفسجي وبرتقالي – هوية الشركة',1],['lux','فاخر','كحلي وذهبي – خط كلاسيكي',1],['mag','مجلة','أبيض نظيف – قريبًا',0],['viv','حيوي','ألوان جريئة – قريبًا',0]];
const CURS=['ر.س','€','$','£','د.إ'];
const LABELS=['السعر للشخصين','السعر للفرد','للفرد في غرفة مزدوجة','السعر للعائلة','فندق 4 نجوم','فندق 5 نجوم'];
const BADGES=['عرض خاص','عروض الصيف','عروض الشتاء','عرض محدود','شامل الطيران','أفضل سعر'];
const INCL=n=>['تذاكر الطيران ذهاب وعودة',`الإقامة ${n} ${nW(n)} مع الإفطار`,'فنادق 4 نجوم','فنادق 5 نجوم','الاستقبال والتوديع من وإلى المطار','سيارة خاصة مع سائق','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت','تأمين السفر','التأشيرة','شامل الضرائب'];
const EXCL0=['المصاريف الشخصية والإكراميات','الوجبات غير المذكورة','الجولات الاختيارية','رسوم التأشيرة ما لم تُذكر'];

const libPhotos=k=>(LIB[k]||[]).map(f=>`img/${k}/${f}`);
const mkCity=(k,n)=>{const c=CITIES[k]||{ar:k};return{id:uid(),key:k,ar:c.ar,n:n||3,photos:libPhotos(k),spots:(SPOTS[k]||['','','','']).slice()}};
const newOffer=()=>({v:3,id:uid(),theme:'zover',size:'pt',out:'poster',destId:'',sub:'',title:'',cities:[],dates:'',badge:'',
 prices:[{amt:'',cur:'ر.س',lab:'السعر للشخصين',stars:''}],incl:[],excl:EXCL0.slice(),notes:'',showItin:true,days:[],updated:Date.now()});
let O=newOffer();
let C=Object.assign({phone:'',wa:'',web:'',cta:'احجز الآن'},JSON.parse(localStorage.getItem('zst_set')||'{}'));
const saveC=()=>localStorage.setItem('zst_set',JSON.stringify(C));

function genDays(){const D=[],cs=O.cities;if(!cs.length)return D;
 cs.forEach((c,ci)=>{const t=CITIES[c.key],acts=t?t.act:[];let ai=0;const n=Math.max(1,+c.n||1);
  for(let k=0;k<n;k++){
   if(ci===0&&k===0)D.push(t&&t.arr?t.arr[0]:`الوصول إلى ${c.ar} والاستقبال في المطار ثم التوجه إلى الفندق`);
   else if(k===0)D.push(`الانتقال ${(VIA[c.via]||VIA.air)[0]} إلى ${c.ar} وتسجيل الدخول في الفندق`);
   else if(ai<acts.length)D.push(acts[ai++][0]);
   else D.push(`يوم حر للراحة والتسوق في ${c.ar}`)}});
 D.push('تسجيل الخروج والتوجه إلى المطار للمغادرة مع أطيب الأمنيات');return D}

/* ---------- IndexedDB ---------- */
const DB={db:null,open(){return new Promise(r=>{try{const q=indexedDB.open('zover-studio',1);q.onupgradeneeded=()=>q.result.createObjectStore('kv');q.onsuccess=()=>{this.db=q.result;r()};q.onerror=()=>r()}catch(e){r()}})},
 get(k){return new Promise(r=>{if(!this.db)return r(null);const q=this.db.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null)})},
 set(k,v){return new Promise(r=>{if(!this.db)return r(false);const t=this.db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=()=>r(true);t.onerror=()=>r(false)})}};
let _sv;function touch(){O.updated=Date.now();clearTimeout(_sv);_sv=setTimeout(()=>DB.set('draft',O),600);schedule()}

/* ---------- frames ---------- */
let _rt;const schedule=()=>{clearTimeout(_rt);_rt=setTimeout(renderFrames,220)};
function frameSpecs(){const T=THEMES[O.theme]||ZV,sz=O.size,[w,h]=SIZES[sz];
 if(O.out==='poster')return[{...T.poster(sz),w,h,sz}];
 if(O.out==='slides')return T.slides(sz).map(f=>({...f,w,h,sz}));
 return T.pdf().map(f=>({...f,w:794,h:1123,sz:'a4'}))}
function renderFrames(){const pv=$('#pv');const specs=frameSpecs();pv.innerHTML='';
 specs.forEach((f,i)=>{const wr=document.createElement('div');wr.className='fw';
  wr.innerHTML=`<div class="fr ${({zover:'zv',lux:'lx',mag:'mg',viv:'vv'})[O.theme]||'zv'} ${f.cls} s-${f.sz}" style="width:${f.w}px;height:${f.h}px;${f.vars||''}">${f.html}</div>${O.out!=='poster'?`<span class="fno">${i+1}</span>`:''}`;
  pv.appendChild(wr)});
 const imgs=$$('img',pv);Promise.all(imgs.map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r}))).then(()=>{$$('.fr',pv).forEach(fit);scale()});
 $$('.fr',pv).forEach(fit);scale()}
function fit(fr){
 $$('[data-ft]',fr).forEach(el=>{const lines=+el.dataset.ft;let ts=parseFloat(getComputedStyle(el).fontSize);el.style.fontSize='';ts=parseFloat(getComputedStyle(el).fontSize);
  let g=0;while(g++<40&&(el.scrollHeight>ts*1.14*lines+6||el.scrollWidth>el.clientWidth+2)&&ts>30){ts-=3;el.style.fontSize=ts+'px'}});
 $$('[data-fit]',fr).forEach(el=>{let f=1;el.style.setProperty('--f',1);let g=0;while(g++<30&&(el.scrollHeight>el.clientHeight+1)&&f>.55){f-=.04;el.style.setProperty('--f',f.toFixed(2))}})}
function scale(){const pv=$('#pv');const W=pv.clientWidth-4;const mob=innerWidth<=900;
 $$('.fw',pv).forEach(wr=>{const fr=wr.firstElementChild,w=+fr.style.width.replace('px',''),h=+fr.style.height.replace('px','');
  let s=W/w;if(O.out==='poster'){const mh=mob?innerHeight*.6:innerHeight-210;s=Math.min(s,mh/h)}if(O.out==='slides'&&!mob)s=Math.min(s,(innerHeight-210)/h);
  wr.style.width=w*s+'px';wr.style.height=h*s+'px';fr.style.transform=`scale(${s})`})}

/* ---------- form ---------- */
const stp=(path,val,min=1)=>`<div class="stp"><button type="button" data-a="st" data-k="${path}" data-d="1">+</button><input data-n="${path}" inputmode="numeric" value="${esc(val)}"><button type="button" data-a="st" data-k="${path}" data-d="-1" data-min="${min}">−</button></div>`;
function form(){const n=O.cities.reduce((a,c)=>a+(+c.n||0),0)||6;
 $('#outs').innerHTML=OUTS.map(([k,ic,l])=>`<button class="${O.out===k?'on':''}" data-a="out" data-v="${k}">${ic} ${l}</button>`).join('');
 $('#acts').innerHTML=O.out==='poster'?`<button class="btn o" data-a="dl">⬇️ تحميل الصورة</button><button class="btn wa" data-a="share">📤 مشاركة</button>`:O.out==='slides'?`<button class="btn o" data-a="zip">⬇️ تحميل كل الصور</button><button class="btn wa" data-a="shareall">📤 مشاركة الكل</button>`:`<button class="btn o" data-a="pdf">⬇️ تحميل PDF</button><button class="btn wa" data-a="sharepdf">📤 مشاركة</button>`;
 $('#mbar').innerHTML=$('#acts').innerHTML+'<button class="btn gh" data-a="save">💾</button>';
 $('#form').innerHTML=`
 <div class="card"><h3>🎨 الثيم</h3><div class="ths">${THEME_LIST.map(([k,l,d,on])=>`<button class="th ${O.theme===k?'on':''} ${on?'':'soon'}" data-a="${on?'theme':''}" data-v="${k}"><span class="sw sw-${k}"></span><b>${l}</b><small>${d}</small></button>`).join('')}</div>
  ${O.out!=='pdf'?`<div class="seg">${Object.entries(SIZES).map(([k,v])=>`<button class="${O.size===k?'on':''}" data-a="size" data-v="${k}">${v[2]}</button>`).join('')}</div>`:''}</div>
 <div class="card"><h3>🌍 الوجهة</h3>
  <label class="fl"><span>اختيار باكيدج جاهز</span><select class="in" id="qd"><option value="">— اختار من ${DESTS.length} وجهة —</option>${DESTS.map(d=>`<option value="${d.id}" ${O.destId===d.id?'selected':''}>${d.ar}</option>`).join('')}</select></label>
  <label class="fl"><span>السطر الصغير</span><input class="in" data-b="sub" value="${esc(O.sub)}" placeholder="مثال: عروض الشتاء في"></label>
  <label class="fl"><span>اسم الباكيدج</span><input class="in" data-b="title" value="${esc(O.title)}" placeholder="مثال: إسطنبول وكبادوكيا"></label>
  <div class="g2"><label class="fl"><span>المواعيد</span><input class="in" data-b="dates" value="${esc(O.dates)}" placeholder="من 1 إلى 30 ديسمبر"></label>
  <label class="fl"><span>شارة العرض</span><input class="in" data-b="badge" value="${esc(O.badge)}" list="bdl" placeholder="اختياري"><datalist id="bdl">${BADGES.map(b=>`<option value="${b}">`).join('')}</datalist></label></div></div>
 <div class="card"><h3>🏙️ المدن والصور <span class="cnt">${O.cities.length} مدينة • ${n} ${nW(n)}</span></h3>
  ${O.cities.map((c,i)=>`<div class="cty"><div class="ch"><span class="no">${i+1}</span><input class="in nm" data-c="${i}.ar" value="${esc(c.ar)}"><div style="width:150px">${stp('c.'+i+'.n',c.n)}</div>
   <button class="btn gh xs" data-a="cmv" data-i="${i}" data-d="-1" ${i?'':'disabled'}>▲</button><button class="btn rd xs" data-a="cdel" data-i="${i}">✕</button></div>
   <div class="phs">${[0,1,2,3].map(k=>{const p=c.photos[k];return p?`<div class="ph"><img src="${p}"><button class="x" data-a="pdel" data-i="${i}" data-k="${k}">✕</button>${k?`<button class="m" data-a="pmain" data-i="${i}" data-k="${k}" title="اجعلها الرئيسية">☆</button>`:'<span class="m on">★ الرئيسية</span>'}</div>`:`<label class="ph add">＋ صورة<input type="file" accept="image/*" multiple hidden data-up="${i}"></label>`}).join('')}</div>
   <div class="sps">${[0,1,2,3].map(k=>`<input class="in sm" data-s="${i}.${k}" value="${esc((c.spots||[])[k]||'')}" placeholder="معلم ${k+1}">`).join('')}</div>
   ${!(LIB[c.key]||[]).length&&!c.photos.length?'<div class="hint">مفيش صور جاهزة للمدينة دي لسه – ارفع صورك</div>':''}</div>`).join('')||'<div class="empty">اختار باكيدج جاهز من فوق أو ضيف مدينة</div>'}
  <select class="in" id="addc"><option value="">+ إضافة مدينة…</option>${Object.entries(CITIES).map(([k,c])=>`<option value="${k}">${c.ar}${(LIB[k]||[]).length?' 📸':''}</option>`).join('')}</select></div>
 <div class="card"><h3>💰 الأسعار<span class="sp"></span>${O.prices.length<3?'<button class="btn gh xs" data-a="padd">+ سعر</button>':''}</h3>
  ${O.prices.map((p,i)=>`<div class="prow"><div class="top"><input class="in am" data-p="${i}.amt" inputmode="decimal" value="${esc(p.amt)}" placeholder="السعر"><select class="in" data-p="${i}.cur">${CURS.map(c=>`<option ${p.cur===c?'selected':''}>${c}</option>`).join('')}</select><select class="in" data-p="${i}.stars"><option value="">بدون نجوم</option>${[3,4,5].map(s=>`<option value="${s}" ${+p.stars===s?'selected':''}>${s} ★</option>`).join('')}</select><button class="btn rd xs" data-a="prm" data-i="${i}">✕</button></div>
  <input class="in" style="margin-top:8px" data-p="${i}.lab" value="${esc(p.lab)}" list="lbl" placeholder="السعر للشخصين"></div>`).join('')}<datalist id="lbl">${LABELS.map(b=>`<option value="${b}">`).join('')}</datalist></div>
 <div class="card"><h3>✅ البرنامج يشمل</h3>
  <div class="chips">${INCL(n).map(x=>`<button class="chip ${O.incl.includes(x)?'on':''}" data-a="ich" data-v="${esc(x)}">${O.incl.includes(x)?'✓':'+'} ${esc(x)}</button>`).join('')}</div>
  ${O.incl.map((x,i)=>`<div class="irow"><input class="in" data-l="incl.${i}" value="${esc(x)}"><button class="btn rd xs" data-a="ldel" data-l="incl" data-i="${i}">✕</button></div>`).join('')}
  <button class="btn gh xs" data-a="ladd" data-l="incl">+ سطر</button></div>
 ${O.out!=='poster'?`<div class="card"><h3>🗓️ البرنامج اليومي<span class="sp"></span>${O.out==='slides'?`<label class="tg"><input type="checkbox" data-a2="showItin" ${O.showItin?'checked':''}> صورة للبرنامج</label>`:''}</h3>
  <div class="hint">بيتكتب لوحده من المدن – عدّل أي يوم</div>
  ${(O.days.length?O.days:genDays()).map((d,i)=>`<div class="irow"><span class="dn">${i+1}</span><input class="in" data-d="${i}" value="${esc(d)}"></div>`).join('')}
  ${O.days.length?'<button class="btn gh xs" data-a="dreset">↺ رجّع البرنامج التلقائي</button>':''}</div>`:''}
 ${O.out==='pdf'?`<div class="card"><h3>⛔ لا يشمل</h3>${O.excl.map((x,i)=>`<div class="irow"><input class="in" data-l="excl.${i}" value="${esc(x)}"><button class="btn rd xs" data-a="ldel" data-l="excl" data-i="${i}">✕</button></div>`).join('')}<button class="btn gh xs" data-a="ladd" data-l="excl">+ سطر</button>
  <label class="fl" style="margin-top:10px"><span>ملاحظة إضافية في الشروط</span><input class="in" data-b="notes" value="${esc(O.notes)}"></label></div>`:''}
 <div class="card"><h3>☎️ التواصل <span class="cnt">بيتحفظ لكل العروض</span></h3>
  <div class="g2"><label class="fl"><span>الهاتف</span><input class="in" dir="ltr" data-cs="phone" value="${esc(C.phone)}" placeholder="+966 …"></label><label class="fl"><span>واتساب</span><input class="in" dir="ltr" data-cs="wa" value="${esc(C.wa)}"></label></div>
  <div class="g2"><label class="fl"><span>الموقع</span><input class="in" dir="ltr" data-cs="web" value="${esc(C.web)}" placeholder="www.zuvar.com.sa"></label><label class="fl"><span>زرار الحجز</span><input class="in" data-cs="cta" value="${esc(C.cta)}"></label></div></div>`;
 $('#qd').onchange=e=>{const d=DESTS.find(x=>x.id===e.target.value);if(!d)return;loadDest(d)};
 $('#addc').onchange=e=>{const k=e.target.value;if(!k)return;const c=mkCity(k,3);c.via='air';O.cities.push(c);O.days=[];touch();form()};
 $$('[data-up]').forEach(inp=>inp.onchange=()=>addPhotos(+inp.dataset.up,inp.files));
}
function loadDest(d){O.destId=d.id;O.title=d.ar;O.sub=d.ar===d.car||d.ar.includes(d.car)?'باكيدج':`باكيدج ${d.car}`;
 O.cities=d.cities.map(([k,n,via])=>{const c=mkCity(k,n);c.via=via||'air';return c});O.days=[];const t=O.cities.reduce((a,c)=>a+c.n,0);
 if(!O.incl.length)O.incl=[`الإقامة ${t} ${nW(t)} مع الإفطار`,'الاستقبال والتوديع من وإلى المطار','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];touch();form()}

/* ---------- photos ---------- */
const loadImg=src=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=src});
function shrink(im,max,q){const s=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/jpeg',q)}
async function addPhotos(ci,files){busy(true,'جاري تجهيز الصور…');const c=O.cities[ci];try{for(const f of [...files].slice(0,4-c.photos.length)){const u=URL.createObjectURL(f);const im=await loadImg(u);c.photos.push(shrink(im,1600,.85));URL.revokeObjectURL(u)}}catch(e){toast('⚠️ في صورة مقدرتش أفتحها')}busy(false);touch();form()}

/* ---------- events ---------- */
const A={
 out:e=>{O.out=e.dataset.v;touch();form()},theme:e=>{O.theme=e.dataset.v;touch();form()},size:e=>{O.size=e.dataset.v;touch();form()},
 st:e=>{const [_,i,k]=e.dataset.k.split('.');const c=O.cities[+i];c[k]=Math.max(+(e.dataset.min||1),(+c[k]||0)+(+e.dataset.d));O.days=[];touch();form()},
 cmv:e=>{const i=+e.dataset.i;[O.cities[i-1],O.cities[i]]=[O.cities[i],O.cities[i-1]];O.days=[];touch();form()},
 cdel:e=>{O.cities.splice(+e.dataset.i,1);O.days=[];touch();form()},
 pdel:e=>{O.cities[+e.dataset.i].photos.splice(+e.dataset.k,1);touch();form()},
 pmain:e=>{const c=O.cities[+e.dataset.i],[p]=c.photos.splice(+e.dataset.k,1);c.photos.unshift(p);touch();form()},
 padd:()=>{O.prices.push({amt:'',cur:O.prices[0]?O.prices[0].cur:'ر.س',lab:'',stars:''});touch();form()},prm:e=>{O.prices.splice(+e.dataset.i,1);touch();form()},
 ich:e=>{const v=e.dataset.v,i=O.incl.indexOf(v);i>=0?O.incl.splice(i,1):O.incl.push(v);touch();form()},
 ladd:e=>{O[e.dataset.l].push('');touch();form()},ldel:e=>{O[e.dataset.l].splice(+e.dataset.i,1);touch();form()},
 dreset:()=>{O.days=[];touch();form()},
 dl:()=>exportOne(),share:()=>shareFiles('poster'),zip:()=>exportZip(),shareall:()=>shareFiles('slides'),pdf:()=>exportPdf(),sharepdf:()=>shareFiles('pdf'),
 save:()=>saveOffer(),newo:()=>{if(!confirm('بدء عرض جديد؟'))return;const k={theme:O.theme,size:O.size,out:O.out};O=Object.assign(newOffer(),k);touch();form()},
 lib:()=>openLib(),close:()=>$$('.mdl').forEach(m=>m.classList.remove('on')),
 lo:async e=>{const L=await DB.get('offers')||[];const x=L.find(o=>o.id===e.dataset.id);if(x){O=Object.assign(newOffer(),JSON.parse(JSON.stringify(x.data)));touch();form();A.close()}},
 lc:async e=>{const L=await DB.get('offers')||[];const x=L.find(o=>o.id===e.dataset.id);if(x){O=Object.assign(newOffer(),JSON.parse(JSON.stringify(x.data)));O.id=uid();touch();form();A.close();toast('نسخة جديدة – عدّل واحفظ')}},
 ld:async e=>{if(!confirm('حذف العرض؟'))return;await DB.set('offers',(await DB.get('offers')||[]).filter(o=>o.id!==e.dataset.id));openLib()}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled||!b.dataset.a)return;const f=A[b.dataset.a];if(f){e.preventDefault();f(b)}});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset;
 if(d.b){O[d.b]=t.value;touch()}
 else if(d.c){const [i,k]=d.c.split('.');O.cities[+i][k]=t.value;O.days=[];touch()}
 else if(d.n){const [_,i,k]=d.n.split('.');O.cities[+i][k]=Math.max(1,+digits(t.value)||1);O.days=[];touch()}
 else if(d.s){const [i,k]=d.s.split('.');O.cities[+i].spots[+k]=t.value;touch()}
 else if(d.p){const [i,k]=d.p.split('.');O.prices[+i][k]=t.value;touch()}
 else if(d.l){const [k,i]=d.l.split('.');O[k][+i]=t.value;touch()}
 else if(d.d!=null&&t.tagName==='INPUT'){if(!O.days.length)O.days=genDays();O.days[+d.d]=t.value;touch()}
 else if(d.cs){C[d.cs]=t.value;saveC();schedule()}});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;if(d.p&&t.tagName==='SELECT'){const [i,k]=d.p.split('.');O.prices[+i][k]=t.value;touch()}if(d.a2){O[d.a2]=t.checked;touch()}});

/* ---------- export ---------- */
let _fc=null;
async function capture(fr,ratio){await document.fonts.ready;if(!_fc)_fc=await htmlToImage.getFontEmbedCSS(fr);const w=+fr.style.width.replace('px',''),h=+fr.style.height.replace('px','');
 const o={width:w,height:h,pixelRatio:ratio||1,fontEmbedCSS:_fc,style:{transform:'none'},backgroundColor:getComputedStyle(fr).backgroundColor,cacheBust:false};
 if(!capture.w){await htmlToImage.toCanvas(fr,{...o,pixelRatio:.2}).catch(()=>{});capture.w=1}return htmlToImage.toCanvas(fr,o)}
const blobOf=c=>new Promise(r=>c.toBlob(r,'image/jpeg',.93));
const base=()=>`Zover-${(O.title||'offer').replace(/[\\/:*?"<>|\s]+/g,'-')}`;
async function frames(){renderFrames();await new Promise(r=>setTimeout(r,350));await Promise.all($$('#pv img').map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r})));$$('#pv .fr').forEach(fit);return $$('#pv .fr')}
function dl(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},5000)}
async function buildFiles(kind){const F=await frames();const out=[];
 if(kind==='pdf'){const imgs=[];for(let i=0;i<F.length;i++){busy(true,`جاري تجهيز الصفحة ${i+1} من ${F.length}…`);const c=await capture(F[i],2);imgs.push({b:new Uint8Array(await (await blobOf(c)).arrayBuffer()),w:c.width,h:c.height})}
  out.push(new File([makePdf(imgs)],base()+'.pdf',{type:'application/pdf'}))}
 else for(let i=0;i<F.length;i++){busy(true,F.length>1?`جاري تجهيز الصورة ${i+1} من ${F.length}…`:'جاري تجهيز الصورة…');const c=await capture(F[i],1);out.push(new File([await blobOf(c)],kind==='poster'?`${base()}-${O.size}.jpg`:`${base()}-${String(i+1).padStart(2,'0')}.jpg`,{type:'image/jpeg'}))}
 return out}
async function exportOne(){busy(true);try{const [f]=await buildFiles('poster');dl(f,f.name);toast('✅ تم تحميل الصورة')}catch(e){console.error(e);toast('⚠️ حصلت مشكلة')}busy(false)}
async function exportZip(){busy(true);try{const fs=await buildFiles('slides');const z={};for(const f of fs)z[f.name]=[new Uint8Array(await f.arrayBuffer()),{level:0}];dl(new Blob([fflate.zipSync(z)],{type:'application/zip'}),base()+'-slides.zip');toast(`✅ تم تحميل ${fs.length} صور`)}catch(e){console.error(e);toast('⚠️ حصلت مشكلة')}busy(false)}
async function exportPdf(){busy(true);try{const [f]=await buildFiles('pdf');dl(f,f.name);toast('✅ تم تحميل الـ PDF')}catch(e){console.error(e);toast('⚠️ حصلت مشكلة')}busy(false)}
async function shareFiles(kind){busy(true);try{const fs=await buildFiles(kind);busy(false);if(navigator.canShare&&navigator.canShare({files:fs}))await navigator.share({files:fs});else{fs.length>1&&kind==='slides'?exportZip():fs.forEach(f=>dl(f,f.name));toast('المشاركة مش متاحة هنا – اتحمّل الملف')}}catch(e){busy(false);if(e.name!=='AbortError')toast('⚠️ المشاركة مش متاحة')}}
function makePdf(imgs){const enc=new TextEncoder(),parts=[];let off=0;const xr=[];const push=x=>{const b=typeof x==='string'?enc.encode(x):x;parts.push(b);off+=b.length};
 const obj=(n,fn)=>{xr[n]=off;push(`${n} 0 obj\n`);fn();push('\nendobj\n')};push('%PDF-1.4\n');const n=imgs.length;
 obj(1,()=>push('<< /Type /Catalog /Pages 2 0 R >>'));obj(2,()=>push(`<< /Type /Pages /Kids [${imgs.map((_,i)=>`${3+3*i} 0 R`).join(' ')}] /Count ${n} >>`));
 imgs.forEach((im,i)=>{const p=3+3*i;obj(p,()=>push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i} ${p+2} 0 R >> >> /Contents ${p+1} 0 R >>`));
  const cs=`q\n595.28 0 0 841.89 0 0 cm\n/Im${i} Do\nQ\n`;obj(p+1,()=>{push(`<< /Length ${cs.length} >>\nstream\n`);push(cs);push('endstream')});
  obj(p+2,()=>{push(`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.b.length} >>\nstream\n`);push(im.b);push('\nendstream')})});
 const xo=off,t=3+3*n;let x=`xref\n0 ${t}\n0000000000 65535 f \n`;for(let k=1;k<t;k++)x+=String(xr[k]).padStart(10,'0')+' 00000 n \n';push(x);push(`trailer\n<< /Size ${t} /Root 1 0 R >>\nstartxref\n${xo}\n%%EOF`);
 return new Blob(parts,{type:'application/pdf'})}
async function saveOffer(){busy(true,'جاري الحفظ…');try{const F=await frames();const c=await capture(F[0],.3);const L=await DB.get('offers')||[];
 const rec={id:O.id,title:O.title||'بدون اسم',thumb:c.toDataURL('image/jpeg',.75),updated:Date.now(),data:JSON.parse(JSON.stringify(O))};const i=L.findIndex(x=>x.id===O.id);i>=0?L[i]=rec:L.unshift(rec);
 toast(await DB.set('offers',L)?'💾 تم الحفظ في «عروضي»':'⚠️ الحفظ مش متاح')}catch(e){console.error(e);toast('⚠️ مقدرتش أحفظ')}busy(false)}
async function openLib(){const L=(await DB.get('offers')||[]).sort((a,b)=>b.updated-a.updated);
 $('#libBody').innerHTML=L.length?`<div class="ofs">${L.map(o=>`<div class="of"><img src="${o.thumb}"><b>${esc(o.title)}</b><div class="r"><button data-a="lo" data-id="${o.id}">فتح</button><button data-a="lc" data-id="${o.id}">نسخة</button><button class="d" data-a="ld" data-id="${o.id}">✕</button></div></div>`).join('')}</div>`:'<div class="empty">مفيش عروض محفوظة</div>';$('#mLib').classList.add('on')}

async function boot(){$('#hLogo').src=IMG.logo;await DB.open();const d=await DB.get('draft');if(d&&d.v===3)O=Object.assign(newOffer(),d);
 form();renderFrames();document.fonts.ready.then(renderFrames);addEventListener('resize',()=>scale());
 if('serviceWorker'in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{})}
