import base64,os,re
import pathlib
B=str(pathlib.Path(__file__).parent); S=B+'/src'
r=lambda p: open(p,encoding='utf-8').read()
b64=lambda p: base64.b64encode(open(p,'rb').read()).decode()
fonts=''
for w in (500,700,800,900):
    fonts+="@font-face{font-family:'Tajawal';font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC;}\n"%(w,b64(f'{B}/node_modules/@fontsource/tajawal/files/tajawal-arabic-{w}-normal.woff2'))
for w in (500,700,800,900):
    fonts+="@font-face{font-family:'Outfit';font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');}\n"%(w,b64(f'{B}/node_modules/@fontsource/outfit/files/outfit-latin-{w}-normal.woff2'))
data=r(S+'/data.js')
# keep only DESTS (+ CITIES needed? no)
m=re.search(r'const DESTS = \[.*?\n\];',data,re.S); dests=m.group(0)
h=r(S+'/shell.html')
rep={'/*FONTS*/':fonts,'/*UICSS*/':r(S+'/ui.css'),'/*PCSS*/':r(S+'/poster.css'),
 '/*LIBS*/':r(B+'/node_modules/html-to-image/dist/html-to-image.js').replace('//# sourceMappingURL=html-to-image.js.map',''),
 '/*LOGO*/':'data:image/png;base64,'+b64(B+'/logo_small.png'),'/*DOVE*/':'data:image/png;base64,'+b64(B+'/dove_white.png'),
 '/*ICON*/':'data:image/png;base64,'+b64(B+'/icon-192.png'),'/*DATA*/':dests,'/*APPJS*/':r(S+'/app.js')}
for k,v in rep.items(): h=h.replace(k,v)
os.makedirs(B+'/..',exist_ok=True)
open(B+'/../index.html','w',encoding='utf-8').write(h)
print('size',len(h.encode())//1024,'KB')
