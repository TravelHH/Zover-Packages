window.__qa=function(){const out=[];
 document.querySelectorAll('#pv .fr').forEach((fr,fi)=>{const s=fr.getBoundingClientRect().width/parseFloat(fr.style.width);const fb=fr.getBoundingClientRect();
  const items=[];const W=document.createTreeWalker(fr,NodeFilter.SHOW_TEXT);let n;
  while(n=W.nextNode()){if(!n.textContent.trim())continue;const el=n.parentElement;const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')continue;
   const r=document.createRange();r.selectNodeContents(n);[...r.getClientRects()].forEach(rc=>{if(rc.width<2||rc.height<2)return;const k=rc.height*.16;items.push({el,r:{left:rc.left+1,right:rc.right-1,top:rc.top+k,bottom:rc.bottom-k},t:n.textContent.trim().slice(0,22)})})}
  fr.querySelectorAll('.logo img,.lg,.mini img,.mg .top img,.hb img,.ph2 img,.q-lg2,.q-lgs,.q-top img').forEach(im=>{const rc=im.getBoundingClientRect();if(rc.width>2)items.push({el:im,r:rc,t:'[LOGO]'})});
  fr.querySelectorAll('.badge,.stk,.burst,.fromb,.stop,.no,.swipe,.swp,.pgn,.q-bdg,.q-tag,.q-stop,.q-cta').forEach(b=>{const rc=b.getBoundingClientRect();if(rc.width>2)items.push({el:b,r:rc,t:'['+b.className+']',box:1})});
  const inter=(a,b)=>{const x=Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left)),y=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));return x*y/(s*s)};
  // INK check: approximate Arabic glyph ink as 1.32*font-size around line centre
  const ink=[];items.forEach(it=>{if(it.box||it.t==='[LOGO]')return;const fs=parseFloat(getComputedStyle(it.el).fontSize)*s;const cy=(it.r.top+it.r.bottom)/2;const k2=/[\u0600-\u06FF]/.test(it.t)?.66:.42;ink.push({el:it.el,t:it.t,r:{left:it.r.left,right:it.r.right,top:cy-fs*k2,bottom:cy+fs*k2}})});
  for(let i=0;i<ink.length;i++)for(let j=i+1;j<ink.length;j++){const A=ink[i],B=ink[j];if(A.el===B.el||A.el.contains(B.el)||B.el.contains(A.el))continue;const a=inter(A.r,B.r);if(a>150)out.push(`F${fi+1} ${fr.className.split(' ').slice(1,3).join('.')} INK "${A.t}" x "${B.t}" ${Math.round(a)}px²`)}
  for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const A=items[i],B=items[j];if(A.el===B.el||A.el.contains(B.el)||B.el.contains(A.el))continue;
   const a=inter(A.r,B.r);if(a>80)out.push(`F${fi+1} ${fr.className.split(' ').slice(1,3).join('.')} OVERLAP "${A.t}" x "${B.t}" ${Math.round(a)}px²`)}
  items.forEach(it=>{const r=it.r;if(r.left<fb.left-2||r.right>fb.right+2||r.top<fb.top-2||r.bottom>fb.bottom+2)out.push(`F${fi+1} ${fr.className.split(' ').slice(1,3).join('.')} OUTSIDE "${it.t}"`)});
  // clipped text: text rects outside an overflow-hidden ancestor
  items.forEach(it=>{if(it.box)return;let p=it.el.parentElement;while(p&&p!==fr){const cs=getComputedStyle(p);if(cs.overflow==='hidden'||cs.overflowY==='hidden'){const pr=p.getBoundingClientRect();if(it.r.bottom>pr.bottom+3||it.r.top<pr.top-3||it.r.left<pr.left-3||it.r.right>pr.right+3){out.push(`F${fi+1} ${fr.className.split(' ').slice(1,3).join('.')} CLIPPED "${it.t}"`);break}}p=p.parentElement}});
 });return [...new Set(out)]};
