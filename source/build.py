import base64,os,json
import pathlib
B=str(pathlib.Path(__file__).parent); S=B+'/src'
r=lambda p: open(p,encoding='utf-8').read()
b64=lambda p: base64.b64encode(open(p,'rb').read()).decode()
fonts=''
for w in (400,500,700,800,900):
    fonts+="@font-face{font-family:'Tajawal';font-style:normal;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC,U+102E0-102FB,U+10E60-10E7E,U+10EFD-10EFF,U+1EE00-1EEFF;}\n"%(w,b64(f'{B}/node_modules/@fontsource/tajawal/files/tajawal-arabic-{w}-normal.woff2'))
for w in (400,500,600,700,800,900):
    fonts+="@font-face{font-family:'Outfit';font-style:normal;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2');}\n"%(w,b64(f'{B}/node_modules/@fontsource/outfit/files/outfit-latin-{w}-normal.woff2'))
h=r(S+'/shell.html')
rep={'/*FONTS*/':fonts,'/*APPCSS*/':r(S+'/app.css'),'/*DOCCSS*/':r(S+'/doc.css'),
 '/*LIBS*/':r(B+'/node_modules/html-to-image/dist/html-to-image.js').replace('//# sourceMappingURL=html-to-image.js.map',''),
 '/*LOGO*/':'data:image/png;base64,'+b64(B+'/logo_small.png'),'/*DOVE*/':'data:image/png;base64,'+b64(B+'/dove_white.png'),
 '/*ICON*/':'data:image/png;base64,'+b64(B+'/icon-192.png'),
 '/*DATA*/':r(S+'/data.js'),'/*APPJS*/':r(S+'/app.js'),'/*OUTJS*/':r(S+'/out.js')}
for k,v in rep.items(): h=h.replace(k,v)
os.makedirs(B+'/..',exist_ok=True)
open(B+'/../index.html','w',encoding='utf-8').write(h)
print('size',len(h.encode())//1024,'KB')
