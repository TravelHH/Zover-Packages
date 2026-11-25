import asyncio,json,sys
from playwright.async_api import async_playwright
QA=open('/home/claude/qa/qa.js').read()
SC={
 'maldives':"loadDest(DESTS.find(d=>d.id==='mle'));O.badge='أفضل سعر';O.dates='1 الى 15 يونيو';O.prices=[{amt:'7990',cur:'ر.س',lab:'السعر للشخصين',stars:'5'}];",
 'spain':"loadDest(DESTS.find(d=>d.id==='esp'));O.badge='عروض الصيف';O.sub='باكيدج الصيف المميز في';O.dates='من 1 يوليو إلى 31 أغسطس 2027';O.prices=[{amt:'12490',cur:'ر.س',lab:'السعر للشخصين – 4 نجوم',stars:'4'},{amt:'15990',cur:'ر.س',lab:'السعر للشخصين – 5 نجوم',stars:'5'}];O.incl=['تذاكر الطيران ذهاب وعودة','الإقامة 7 ليالي مع الإفطار','الاستقبال والتوديع من وإلى المطار','القطار السريع بين المدن','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];",
 'cairo':"loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'ر.س',lab:'للفرد',stars:''}];",
}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1500,'height':1000}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e)))
        await pg.goto('http://localhost:8770/index.html'); await pg.wait_for_timeout(1000)
        await pg.add_script_tag(content=QA)
        await pg.evaluate("C.phone='+966 11 000 0000';C.web='www.zuvar.com.sa';C.cta='احجز الآن'")
        total=0
        themes=sys.argv[1].split(',') if len(sys.argv)>1 else ['zover','lux','mag','viv']
        for sc,code in SC.items():
            for th in themes:
                for out in ('poster','slides','pdf'):
                    for sz in (('sq','pt','st') if out!='pdf' else ('pt',)):
                        await pg.evaluate(f"O=newOffer();{code}O.theme='{th}';O.out='{out}';O.size='{sz}';O.showItin=true;form();renderFrames()")
                        await pg.wait_for_timeout(600)
                        await pg.evaluate("$$('#pv .fr').forEach(fit)")
                        r=await pg.evaluate("__qa()")
                        for x in r: print(f"{sc:8} {th:5} {out:6} {sz}: {x}"); total+=1
        print('TOTAL',total, errs[:3]); await b.close()
asyncio.run(main())
