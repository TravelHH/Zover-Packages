'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9)+Date.now().toString(36).slice(-4);
const AD='٠١٢٣٤٥٦٧٨٩';
const digits=v=>String(v==null?'':v).replace(/[٠-٩]/g,d=>AD.indexOf(d)).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const fmtAmt=v=>{v=digits(v).replace(/[^\d.]/g,'');if(!v)return'';const [a,b]=v.split('.');return Number(a).toLocaleString('en-US')+(b?'.'+b:'')};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2400)}
function busy(on,m){$('#busy').classList.toggle('on',!!on);if(m)$('#busyMsg').textContent=m}
const nW=n=>n>=3&&n<=10?'ليالي':'ليلة',dW=n=>n>=3&&n<=10?'أيام':'يوم';

const SIZES={sq:{h:1080,l:'مربع'},pt:{h:1350,l:'طولي'},st:{h:1920,l:'ستوري'}};
const THEMES={zover:['#6a3fc2','#24104f','36,16,79'],sea:['#1b8fd6','#062a52','6,42,82'],green:['#2aa36d','#08301f','8,48,31'],gold:['#6b4c2c','#140d07','20,13,7'],red:['#cf3050','#3d0712','61,7,18']};
const TPLS=[['collage','كولاج صور'],['photo','صورة كاملة'],['card','بطاقة']];
const CURS=['ر.س','€','$','£','د.إ'];
const LABELS=['السعر للشخصين','السعر للفرد','للفرد في غرفة مزدوجة','السعر للعائلة','فندق 4 نجوم','فندق 5 نجوم'];
const BADGES=['عرض خاص','عروض الصيف','عرض محدود','شامل الطيران','عروض الشتاء','أفضل سعر'];
const INCL=n=>['تذاكر الطيران ذهاب وعودة',`الإقامة ${n} ${nW(n)} مع الإفطار`,'فنادق 4 نجوم','فنادق 5 نجوم','الاستقبال والتوديع من وإلى المطار','سيارة خاصة مع سائق','جولات سياحية حسب البرنامج','سيارة حديثة بدون سائق','شريحة اتصال وإنترنت','تأمين السفر','التأشيرة','شامل الضرائب'];

const newOffer=()=>({id:uid(),tpl:'collage',size:'sq',theme:'zover',sub:'',title:'',nights:6,dates:'',badge:'',photos:[],
 prices:[{amt:'',cur:'ر.س',lab:'السعر للشخصين',stars:''}],incl:[],updated:Date.now()});
let O=newOffer();
let C=Object.assign({phone:'',wa:'',web:'',cta:'احجز الآن'},JSON.parse(localStorage.getItem('zof_set')||'{}'));
const saveC=()=>localStorage.setItem('zof_set',JSON.stringify(C));

/* ---------- IndexedDB ---------- */
const DB={db:null,
 open(){return new Promise(r=>{try{const q=indexedDB.open('zover-offers',1);q.onupgradeneeded=()=>q.result.createObjectStore('kv');q.onsuccess=()=>{this.db=q.result;r()};q.onerror=()=>r()}catch(e){r()}})},
 get(k){return new Promise(r=>{if(!this.db)return r(null);const q=this.db.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result||null);q.onerror=()=>r(null)})},
 set(k,v){return new Promise(r=>{if(!this.db)return r(false);const t=this.db.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=()=>r(true);t.onerror=()=>r(false)})}};
let _sv;function touch(){O.updated=Date.now();clearTimeout(_sv);_sv=setTimeout(()=>DB.set('draft',O),500);schedule()}

/* ---------- icons ---------- */
const IC={
 ck:'<svg viewBox="0 0 20 20"><path d="M4.5 10.5l3.6 3.6L15.5 6.5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 cal:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 star:'<svg width="30" height="30" viewBox="0 0 24 24"><path fill="#FBC42E" stroke="#e0a800" stroke-width=".6" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>',
 ph:'<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
 wa:'<svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.8-.1 1.4z"/></svg>',
 web:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
 arr:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>'};

/* ---------- poster builders ---------- */
const dtsHTML=()=>O.dates?`<div class="dts">${IC.cal}<span>${esc(O.dates)}</span></div>`:'';
const dIn=()=>O.size==='sq';
function partHdr(){const n=+O.nights||0;return`<div class="hdr"><div class="logo"><img src="${IMG.logo}"></div><div class="hside">${n?`<div class="nts"><b>${n}</b> ${nW(n)} • <b>${n+1}</b> ${dW(n+1)}</div>`:''}${dIn()?dtsHTML():''}</div></div>`}
function partTitle(noD){return`<div class="ttlb ${O.badge&&O.tpl!=='collage'?'nb':''}">${O.sub?`<div class="sub">${esc(O.sub)}</div>`:''}<div class="ttl">${esc(O.title||'اسم الوجهة')}</div>${!noD&&!dIn()?dtsHTML():''}</div>`}
function partIncl(){const L=O.incl.filter(Boolean);if(!L.length)return'';return`<div class="incl ${L.length<3?'n1':''}"><div class="ih">البرنامج يشمل</div>${L.map(x=>`<div class="li"><i>${IC.ck}</i><span>${esc(x)}</span></div>`).join('')}</div>`}
function partPrices(){const P=O.prices.filter(p=>fmtAmt(p.amt));if(!P.length)return'';return`<div class="prc">${P.map(p=>`<div class="pc">${+p.stars?`<div class="stars">${IC.star.repeat(+p.stars)}</div>`:''}<div class="am"><b>${fmtAmt(p.amt)}</b><small>${esc(p.cur)}</small></div>${p.lab?`<div class="lb">${esc(p.lab)}</div>`:''}</div>`).join('')}</div>`}
function partBtm(){const i=partIncl(),p=partPrices();if(!i&&!p)return'';return`<div class="btm ${i&&p?'':'one'}">${i}${p}</div>`}
function partFtr(){const c=[];if(C.phone)c.push(`<div class="ct"><i>${IC.ph}</i>${esc(C.phone)}</div>`);if(C.wa&&C.wa!==C.phone)c.push(`<div class="ct"><i class="wa">${IC.wa}</i>${esc(C.wa)}</div>`);if(C.web)c.push(`<div class="ct"><i>${IC.web}</i>${esc(C.web)}</div>`);
 return`<div class="ftr"><div class="rb"></div><div class="bar"><div class="cts">${c.join('')||'<span class="co">زوفر العالمية للسفر والسياحة</span>'}</div>${C.cta?`<div class="cta">${esc(C.cta)} ${IC.arr}</div>`:''}</div></div>`}
const partBadge=st=>O.badge?`<div class="badge" style="${st}"><span>${esc(O.badge)}</span></div>`:'';
const POL={1:[[8,3,84,94,-2]],2:[[50,6,47,86,4],[3,2,47,86,-3]],3:[[64,10,35,80,6],[31,1,38,92,-1],[1,12,34,78,-6]],4:[[74,13,26,74,6],[49,4,27,82,2],[24,6,27,82,-3],[0,14,26,72,-7]]};
function bgPlain(){return`<div class="bg"><div class="ov" style="background:linear-gradient(150deg,var(--c) 0%,var(--a) 45%,var(--b) 100%)"></div><div class="pat"></div><img class="dove" src="${IMG.dove}"></div>`}
function build(){const t=O.tpl,ph=O.photos,rgb=THEMES[O.theme][2];let h='';
 if(t==='collage'){
  const bg=ph.length?`<div class="bg"><img class="blur" src="${ph[0].s}"><div class="ov" style="background:linear-gradient(170deg,rgba(${rgb},.80) 0%,rgba(${rgb},.88) 55%,rgba(${rgb},.97) 100%)"></div><div class="pat"></div><img class="dove" src="${IMG.dove}"></div>`:bgPlain();
  const n=Math.min(ph.length,4),pos=POL[n]||[];
  const pols=pos.map((p,i)=>`<div class="pol" style="left:${p[0]}%;top:${p[1]}%;width:${p[2]}%;height:${p[3]}%;transform:rotate(${p[4]}deg)"><img src="${ph[i].m}"></div>`).join('');
  const acc=n?`<div class="accb" style="left:${pos[0][0]+pos[0][2]-12}%;top:${pos[0][1]-3}%;width:16%;height:30%;transform:rotate(${pos[0][4]+4}deg)"></div><div class="accb" style="left:${pos[n-1][0]-2}%;top:${pos[n-1][1]+pos[n-1][3]-24}%;width:14%;height:30%;transform:rotate(${pos[n-1][4]-4}deg)"></div>`:'';
  h=`${bg}<div class="wrap">${partHdr()}${partTitle()}${n?`<div class="photos">${acc}${pols}${partBadge('left:-24px;top:-40px')}</div>`:`<div style="flex:1;position:relative">${partBadge('left:0;top:10px')}</div>`}${partBtm()}${partFtr()}</div>`;
 }else if(t==='photo'){
  const bg=ph.length?`<div class="bg"><img src="${ph[0].m}"><div class="ov" style="background:linear-gradient(180deg,rgba(${rgb},.88) 0%,rgba(${rgb},.45) 26%,rgba(${rgb},0) 44%,rgba(${rgb},.15) 58%,rgba(${rgb},.85) 78%,rgba(${rgb},.97) 100%)"></div></div>`:bgPlain();
  const th=ph.slice(1,4).map(p=>`<div><img src="${p.m}"></div>`).join('');
  h=`${bg}<div class="wrap">${partHdr()}${partTitle()}${partBadge('left:28px;top:'+(O.size==='sq'?205:150)+'px')}<div class="spacer">${th?`<div class="thumbs">${th}</div>`:''}</div>${partBtm()}${partFtr()}</div>`;
 }else{
  const hb=ph.length?`<div class="hbg"><img src="${ph[0].m}"><div class="ov"></div></div>`:`<div class="hbg" style="background:linear-gradient(150deg,var(--c),var(--a) 50%,var(--b))"><img src="${IMG.dove}" style="position:absolute;height:120%;width:auto;left:-6%;top:-10%;opacity:.13"></div>`;
  const th=O.size==='sq'?'':ph.slice(1,4).map(p=>`<div><img src="${p.m}"></div>`).join('');const n=+O.nights||0;
  const T=partTitle(true);
  h=`<div class="wrap"><div class="hero" style="${th?'padding-bottom:110px':''}">${hb}<div class="hdr"><div class="logo"><img src="${IMG.logo}"></div></div>${partBadge('left:30px;top:150px')}${T}${th?`<div class="thumbs">${th}</div>`:''}</div>
  <div class="body" style="${th?'padding-top:84px':''}"><div class="row">${n?`<span class="nts2"><b>${n}</b> ${nW(n)} • <b>${n+1}</b> ${dW(n+1)}</span>`:''}${dtsHTML()}</div>${partIncl()}${partPrices()}</div>${partFtr()}</div>`;
 }
 return h}

let poster,_rt;const schedule=()=>{clearTimeout(_rt);_rt=setTimeout(renderPoster,60)};
function renderPoster(){const H=SIZES[O.size].h;poster.className=`pst t-${O.tpl} s-${O.size} th-${O.theme}`;poster.style.height=H+'px';poster.innerHTML=build();fit();scalePv()}
function fit(){const H=SIZES[O.size].h,P=poster;let ts={sq:88,pt:108,st:120}[O.size];const ttl=$('.ttl',P);
 if(O.tpl==='card')P.style.setProperty('--hh',{sq:'49%',pt:'52%',st:'54%'}[O.size]);
 if(ttl){ttl.style.whiteSpace='normal';const fitT=()=>{P.style.setProperty('--ts',ts+'px');return ttl.scrollHeight<=ts*1.12*2+8&&ttl.scrollWidth<=ttl.clientWidth+2};while(!fitT()&&ts>54)ts-=4}
 const minPh={sq:210,pt:360,st:560}[O.size];let k=1;
 const over=()=>{const w=$('.wrap',P);if(w.scrollHeight>H+1)return true;const ph=$('.photos',P);if(ph&&ph.clientHeight<minPh)return true;const b=$('.body',P);if(b&&b.scrollHeight>b.clientHeight+1)return true;const sp=$('.spacer',P);if(sp&&sp.clientHeight<{sq:120,pt:220,st:420}[O.size]&&O.photos.length)return true;return false};
 P.style.setProperty('--k',k);while(over()&&k>0.6){k-=0.03;P.style.setProperty('--k',k.toFixed(2))}
 if(over()&&ts>60){while(over()&&ts>56){ts-=4;P.style.setProperty('--ts',ts+'px')}}
}
function scalePv(){const box=$('#pvbox'),pw=$('#pvw');const H=SIZES[O.size].h;const mob=innerWidth<=900;
 const aw=box.clientWidth-(mob?20:28),ah=mob?innerHeight*0.62:innerHeight-190;const s=Math.min(aw/1080,ah/H,1);
 pw.style.width=1080*s+'px';pw.style.height=H*s+'px';poster.style.transform=`scale(${s})`}

/* ---------- form ---------- */
function stp(k,min=0){return`<div class="stp"><button type="button" data-a="st" data-k="${k}" data-d="1">+</button><input data-b="${k}" inputmode="numeric" value="${esc(O[k])}"><button type="button" data-a="st" data-k="${k}" data-d="-1" data-min="${min}">−</button></div>`}
function form(){const n=+O.nights||0;
 $('#form').innerHTML=`
 <div class="card"><h3>🎨 التصميم</h3>
  <div class="tpls">${TPLS.map(([k,l])=>`<button class="tpl ${O.tpl===k?'on':''}" data-a="tpl" data-v="${k}"><span class="ic">${tplIcon(k)}</span>${l}</button>`).join('')}</div>
  <div class="seg">${Object.entries(SIZES).map(([k,v])=>`<button class="${O.size===k?'on':''}" data-a="size" data-v="${k}">${v.l} <small style="opacity:.7;font-family:Outfit">${k==='sq'?'1:1':k==='pt'?'4:5':'9:16'}</small></button>`).join('')}</div>
  <div class="ths">${Object.entries(THEMES).map(([k,v])=>`<button class="th ${O.theme===k?'on':''}" data-a="theme" data-v="${k}" style="background:linear-gradient(135deg,${v[0]},${v[1]})"></button>`).join('')}</div></div>
 <div class="card"><h3>🌍 الوجهة</h3>
  <label class="fl"><span>اختيار سريع (اختياري)</span><select class="in" id="qd"><option value="">— اختار وجهة جاهزة —</option>${DESTS.map(d=>`<option value="${d.id}">${d.ar}</option>`).join('')}</select></label>
  <label class="fl"><span>السطر الصغير فوق الاسم</span><input class="in" data-b="sub" value="${esc(O.sub)}" placeholder="مثال: باكيدج شهر مايو في"></label>
  <label class="fl"><span>اسم الوجهة</span><input class="in" data-b="title" value="${esc(O.title)}" placeholder="مثال: البوسنة والهرسك"></label>
  <div class="g2"><label class="fl"><span>عدد الليالي ${n?`(${n} ${nW(n)} / ${n+1} ${dW(n+1)})`:''}</span>${stp('nights')}</label>
  <label class="fl"><span>المواعيد</span><input class="in" data-b="dates" value="${esc(O.dates)}" placeholder="من 1 إلى 30 يونيو"></label></div>
  <label class="fl" style="margin:0"><span>شارة العرض (اختياري)</span><input class="in" data-b="badge" value="${esc(O.badge)}" list="bdl" placeholder="مثال: عروض الصيف"><datalist id="bdl">${BADGES.map(b=>`<option value="${b}">`).join('')}</datalist></label></div>
 <div class="card"><h3>🖼️ الصور <span style="font-weight:600;color:var(--mut);font-size:12.5px">حتى 4 صور – الأولى هي الرئيسية</span></h3>
  <div class="phs">${O.photos.map((p,i)=>`<div class="ph"><img src="${p.s}"><button class="x" data-a="pdel" data-i="${i}">✕</button><button class="m ${i?'':'on'}" data-a="pmain" data-i="${i}">${i?'اجعلها رئيسية':'الرئيسية'}</button></div>`).join('')}
  ${O.photos.length<4?`<label class="ph add">＋<br>إضافة صور<input type="file" id="phin" accept="image/*" multiple hidden></label>`:''}</div></div>
 <div class="card"><h3>💰 الأسعار<span class="sp"></span>${O.prices.length<3?'<button class="btn gh sm" data-a="padd">+ سعر</button>':''}</h3>
  ${O.prices.map((p,i)=>`<div class="prow"><div class="top"><input class="in am" data-p="${i}.amt" inputmode="decimal" value="${esc(p.amt)}" placeholder="السعر"><select class="in" data-p="${i}.cur">${CURS.map(c=>`<option ${p.cur===c?'selected':''}>${c}</option>`).join('')}</select><select class="in" data-p="${i}.stars"><option value="">بدون نجوم</option>${[3,4,5].map(s=>`<option value="${s}" ${+p.stars===s?'selected':''}>${s} ★</option>`).join('')}</select><button class="btn rd sm" data-a="prm" data-i="${i}" style="width:38px;padding:0">✕</button></div>
  <input class="in" style="margin-top:8px" data-p="${i}.lab" value="${esc(p.lab)}" list="lbl" placeholder="مثال: السعر للشخصين"></div>`).join('')}<datalist id="lbl">${LABELS.map(b=>`<option value="${b}">`).join('')}</datalist>
  <div class="hint" style="margin:4px 0 0">مثال: سعرين لفندق 4 و5 نجوم، كل سعر بنجومه.</div></div>
 <div class="card"><h3>✅ البرنامج يشمل</h3><div class="hint">اضغط لإضافة سطر – يفضّل 4 إلى 6 سطور</div>
  <div class="chips">${INCL(n||6).map(x=>`<button class="chip ${O.incl.includes(x)?'on':''}" data-a="ich" data-v="${esc(x)}">${O.incl.includes(x)?'✓ ':'+ '}${esc(x)}</button>`).join('')}</div>
  ${O.incl.map((x,i)=>`<div class="irow"><input class="in" data-i2="${i}" value="${esc(x)}"><button class="btn gh" data-a="iup" data-i="${i}" ${i?'':'disabled'}>▲</button><button class="btn rd" data-a="idel" data-i="${i}">✕</button></div>`).join('')}
  <button class="btn gh sm" data-a="iadd">+ سطر بخطك</button></div>
 <div class="card"><h3>☎️ بيانات التواصل <span style="font-weight:600;color:var(--mut);font-size:12.5px">بتتحفظ لكل العروض</span></h3>
  <div class="g2"><label class="fl"><span>رقم الهاتف</span><input class="in" dir="ltr" data-c="phone" value="${esc(C.phone)}" placeholder="+966 …"></label><label class="fl"><span>واتساب</span><input class="in" dir="ltr" data-c="wa" value="${esc(C.wa)}"></label></div>
  <div class="g2"><label class="fl"><span>الموقع</span><input class="in" dir="ltr" data-c="web" value="${esc(C.web)}" placeholder="www.zuvar.com.sa"></label><label class="fl"><span>زرار الحجز</span><input class="in" data-c="cta" value="${esc(C.cta)}"></label></div></div>`;
 const pi=$('#phin');if(pi)pi.onchange=()=>addPhotos(pi.files);
 $('#qd').onchange=e=>{const d=DESTS.find(x=>x.id===e.target.value);if(!d)return;const n=d.cities.reduce((a,c)=>a+c[1],0);
  O.title=d.ar;O.sub=d.ar===d.car||d.ar.includes(d.car)?'باكيدج':`باكيدج ${d.car}`;O.nights=n;
  if(!O.incl.length)O.incl=[`الإقامة ${n} ${nW(n)} مع الإفطار`,'الاستقبال والتوديع من وإلى المطار','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];touch();form()};
}
function tplIcon(k){if(k==='collage')return'<i style="position:absolute;left:12%;top:28%;width:28%;height:46%;background:#fff;transform:rotate(-8deg);border-radius:2px"></i><i style="position:absolute;left:38%;top:22%;width:28%;height:50%;background:#fff;border-radius:2px"></i><i style="position:absolute;left:62%;top:30%;width:26%;height:44%;background:#FBC42E;transform:rotate(7deg);border-radius:2px"></i>';
 if(k==='photo')return'<i style="position:absolute;inset:0;background:linear-gradient(180deg,#24104f,#1b8fd6 50%,#24104f)"></i><i style="position:absolute;left:10%;right:10%;bottom:10%;height:26%;background:#fff;border-radius:4px"></i>';
 return'<i style="position:absolute;inset:0 0 45% 0;background:#1b8fd6;border-radius:0 0 12px 12px"></i><i style="position:absolute;inset:55% 0 0 0;background:#fff"></i><i style="position:absolute;left:12%;right:12%;bottom:10%;height:18%;background:#4B2D8E;border-radius:3px"></i>'}

/* ---------- photos ---------- */
const loadImg=src=>new Promise((r,j)=>{const i=new Image();i.onload=()=>r(i);i.onerror=j;i.src=src});
function shrink(im,max,q){const s=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/jpeg',q)}
async function addPhotos(files){busy(true,'جاري تجهيز الصور…');try{for(const f of [...files].slice(0,4-O.photos.length)){const url=URL.createObjectURL(f);const im=await loadImg(url);O.photos.push({m:shrink(im,1600,.85),s:shrink(im,64,.7)});URL.revokeObjectURL(url)}}catch(e){toast('⚠️ في صورة مقدرتش أفتحها')}busy(false);touch();form()}

/* ---------- events ---------- */
const A={
 tpl:e=>{O.tpl=e.dataset.v;touch();form()},size:e=>{O.size=e.dataset.v;touch();form()},theme:e=>{O.theme=e.dataset.v;touch();form()},
 st:e=>{const k=e.dataset.k;O[k]=Math.max(+(e.dataset.min||0),(+O[k]||0)+(+e.dataset.d));touch();form()},
 pdel:e=>{O.photos.splice(+e.dataset.i,1);touch();form()},pmain:e=>{const i=+e.dataset.i;if(!i)return;const [p]=O.photos.splice(i,1);O.photos.unshift(p);touch();form()},
 padd:()=>{O.prices.push({amt:'',cur:O.prices[0]?O.prices[0].cur:'ر.س',lab:'السعر للشخصين',stars:''});touch();form()},prm:e=>{O.prices.splice(+e.dataset.i,1);touch();form()},
 ich:e=>{const v=e.dataset.v,i=O.incl.indexOf(v);if(i>=0)O.incl.splice(i,1);else O.incl.push(v);touch();form()},
 idel:e=>{O.incl.splice(+e.dataset.i,1);touch();form()},iup:e=>{const i=+e.dataset.i;[O.incl[i-1],O.incl[i]]=[O.incl[i],O.incl[i-1]];touch();form()},
 iadd:()=>{O.incl.push('');touch();form();const l=$$('[data-i2]');l[l.length-1].focus()},
 dl:()=>exportJpg(),share:()=>share(),save:()=>saveOffer(),
 newo:()=>{if(!confirm('بدء عرض جديد؟'))return;const t=O.tpl,s=O.size,th=O.theme;O=newOffer();O.tpl=t;O.size=s;O.theme=th;touch();form()},
 lib:()=>openLib(),close:()=>$$('.mdl').forEach(m=>m.classList.remove('on')),
 lo:async e=>{const L=await DB.get('offers')||[];const x=L.find(o=>o.id===e.dataset.id);if(x){O=JSON.parse(JSON.stringify(x.data));touch();form();A.close();toast('📂 تم فتح العرض')}},
 lc:async e=>{const L=await DB.get('offers')||[];const x=L.find(o=>o.id===e.dataset.id);if(x){O=JSON.parse(JSON.stringify(x.data));O.id=uid();touch();form();A.close();toast('تم عمل نسخة – عدّل واحفظ')}},
 ld:async e=>{if(!confirm('حذف العرض؟'))return;const L=(await DB.get('offers')||[]).filter(o=>o.id!==e.dataset.id);await DB.set('offers',L);openLib()}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const f=A[b.dataset.a];if(f){e.preventDefault();f(b)}});
document.addEventListener('input',e=>{const t=e.target;
 if(t.dataset.b){O[t.dataset.b]=t.dataset.b==='nights'?(+digits(t.value)||0):t.value;touch()}
 else if(t.dataset.p){const [i,k]=t.dataset.p.split('.');O.prices[+i][k]=t.value;touch()}
 else if(t.dataset.i2!=null){O.incl[+t.dataset.i2]=t.value;touch()}
 else if(t.dataset.c){C[t.dataset.c]=t.value;saveC();schedule()}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.p&&t.tagName==='SELECT'){const [i,k]=t.dataset.p.split('.');O.prices[+i][k]=t.value;touch()}});

/* ---------- export ---------- */
let _fc=null,_warm=false;
async function toCanvas(){await document.fonts.ready;if(!_fc)_fc=await htmlToImage.getFontEmbedCSS(poster);const H=SIZES[O.size].h;
 const o={width:1080,height:H,pixelRatio:1,fontEmbedCSS:_fc,style:{transform:'none'},backgroundColor:'#ffffff'};
 if(!_warm){await htmlToImage.toCanvas(poster,o).catch(()=>{});_warm=true}return htmlToImage.toCanvas(poster,o)}
const fname=()=>`Zover-${(O.title||'offer').replace(/[\\/:*?"<>|\s]+/g,'-')}-${O.size}.jpg`;
async function getBlob(){renderPoster();const c=await toCanvas();return new Promise(r=>c.toBlob(r,'image/jpeg',.93))}
async function exportJpg(){busy(true,'جاري تجهيز الصورة…');try{const b=await getBlob();const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fname();document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);toast('✅ تم تحميل الصورة')}catch(e){console.error(e);toast('⚠️ حصلت مشكلة – جرّب تاني')}busy(false)}
async function share(){busy(true,'جاري التجهيز…');try{const b=await getBlob();const f=new File([b],fname(),{type:'image/jpeg'});busy(false);
 if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f]});else{busy(false);exportJpg()}}catch(e){busy(false);if(e.name!=='AbortError')toast('⚠️ المشاركة مش متاحة – اتحمّلت الصورة بدلها')}}
async function saveOffer(){busy(true,'جاري الحفظ…');try{const c=await toCanvas();const t=document.createElement('canvas');const s=300/1080;t.width=300;t.height=Math.round(c.height*s);t.getContext('2d').drawImage(c,0,0,t.width,t.height);
 const L=await DB.get('offers')||[];const rec={id:O.id,title:O.title||'بدون اسم',thumb:t.toDataURL('image/jpeg',.75),updated:Date.now(),data:JSON.parse(JSON.stringify(O))};const i=L.findIndex(x=>x.id===O.id);if(i>=0)L[i]=rec;else L.unshift(rec);
 const ok=await DB.set('offers',L);toast(ok?'💾 تم حفظ العرض في «عروضي»':'⚠️ الحفظ مش متاح على المتصفح ده')}catch(e){console.error(e);toast('⚠️ مقدرتش أحفظ')}busy(false)}
async function openLib(){const L=(await DB.get('offers')||[]).sort((a,b)=>b.updated-a.updated);
 $('#libBody').innerHTML=L.length?`<div class="ofs">${L.map(o=>`<div class="of"><img src="${o.thumb}"><b>${esc(o.title)}</b><div class="r"><button data-a="lo" data-id="${o.id}">فتح</button><button data-a="lc" data-id="${o.id}">نسخة</button><button class="d" data-a="ld" data-id="${o.id}">✕</button></div></div>`).join('')}</div>`:'<div class="empty">مفيش عروض محفوظة – اضغط «حفظ» بعد ما تخلّص العرض</div>';$('#mLib').classList.add('on')}

/* ---------- boot ---------- */
async function boot(){poster=$('#poster');$('#hLogo').src=IMG.logo;await DB.open();const d=await DB.get('draft');if(d&&d.id)O=Object.assign(newOffer(),d);
 form();renderPoster();document.fonts.ready.then(()=>renderPoster());addEventListener('resize',scalePv);
 if('serviceWorker'in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{})}
