import base64,os,re,json,pathlib
B=pathlib.Path(__file__).parent; S=B/'src'; NM='/home/claude/build/node_modules'
r=lambda p: open(p,encoding='utf-8').read()
b64=lambda p: base64.b64encode(open(p,'rb').read()).decode()
fonts=''
for w in (500,700,800,900):
    fonts+="@font-face{font-family:'Tajawal';font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC;}\n"%(w,b64(f'{NM}/@fontsource/tajawal/files/tajawal-arabic-{w}-normal.woff2'))
def ff(fam,path,w,ur=''):
    return "@font-face{font-family:'%s';font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');%s}\n"%(fam,w,b64(path),ur)
AR="unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+200C-200E,U+FB50-FDFF,U+FE70-FEFC;"
for w in (400,700): fonts+=ff('Amiri',f'{NM}/@fontsource/amiri/files/amiri-arabic-{w}-normal.woff2',w,AR)
for w in (500,600,700): fonts+=ff('El Messiri',f'{NM}/@fontsource/el-messiri/files/el-messiri-arabic-{w}-normal.woff2',w,AR)
for w in (700,900): fonts+=ff('Playfair Display',f'{NM}/@fontsource/playfair-display/files/playfair-display-latin-{w}-normal.woff2',w)
for w in (500,700,800,900):
    fonts+="@font-face{font-family:'Outfit';font-weight:%d;font-display:block;src:url(data:font/woff2;base64,%s) format('woff2');}\n"%(w,b64(f'{NM}/@fontsource/outfit/files/outfit-latin-{w}-normal.woff2'))
data=r(S/'data.js'); keep=[]
for name in ('const CITIES = {','const DESTS = [','const VIA = '):
    i=data.index(name)
    if name.endswith('{'): j=data.index('\n};',i)+3
    elif name.endswith('['): j=data.index('\n];',i)+3
    else: j=data.index(';',i)+1
    keep.append(data[i:j])
keep.append('\n'.join(l for l in data.splitlines() if l.startswith('CITIES.') and '.arr=' in l))
lib={}
img=B/'dist'/'img'
if img.exists():
    for d in sorted(img.iterdir()):
        fs=sorted(f.name for f in d.iterdir() if f.suffix=='.jpg')
        if fs: lib[d.name]=fs
h=r(S/'shell.html')
rep={'/*FONTS*/':fonts,'/*UICSS*/':r(S/'ui.css'),'/*THEMECSS*/':r(S/'theme-zover.css')+r(S/'theme-lux.css'),
 '/*LIBS*/':r(f'{NM}/html-to-image/dist/html-to-image.js').replace('//# sourceMappingURL=html-to-image.js.map','')+'\n'+r(f'{NM}/fflate/umd/index.js'),
 '/*LOGO*/':'data:image/png;base64,'+b64('/home/claude/build/logo_small.png'),'/*DOVE*/':'data:image/png;base64,'+b64('/home/claude/build/dove_white.png'),
 '/*ICON*/':'data:image/png;base64,'+b64('/home/claude/build/icon-192.png'),'/*LIBMAP*/':json.dumps(lib),
 '/*DATA*/':'\n'.join(keep),'/*SPOTS*/':r(S/'spots.js'),'/*THEMES*/':r(S/'themes.js')+'\n'+r(S/'themes-lux.js'),'/*APPJS*/':r(S/'app.js')}
for k,v in rep.items(): h=h.replace(k,v)
open(B/'dist'/'index.html','w',encoding='utf-8').write(h)
print('size',len(h.encode())//1024,'KB', 'lib',{k:len(v) for k,v in lib.items()})
