import asyncio,json,sys
from playwright.async_api import async_playwright
FONT=__import__('os').environ.get('FONT','alexandria')
QA=open('/home/claude/qa/qa.js').read()
SC={
 'maldives':"loadDest(DESTS.find(d=>d.id==='mle'));O.badge='أفضل سعر';O.dates='1 الى 15 يونيو';O.prices=[{amt:'7990',cur:'ر.س',lab:'السعر للشخصين',stars:'5'}];",
 'spain':"loadDest(DESTS.find(d=>d.id==='esp'));O.badge='عروض الصيف';O.sub='باكيدج الصيف المميز في';O.dates='من 1 يوليو إلى 31 أغسطس 2027';O.prices=[{amt:'12490',cur:'ر.س',lab:'السعر للشخصين – 4 نجوم',stars:'4'},{amt:'15990',cur:'ر.س',lab:'السعر للشخصين – 5 نجوم',stars:'5'}];O.incl=['تذاكر الطيران ذهاب وعودة','الإقامة 7 ليالي مع الإفطار','الاستقبال والتوديع من وإلى المطار','القطار السريع بين المدن','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];",
 'cairo':"loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'ر.س',lab:'للفرد',stars:''}];",
}
SC_EN={"maldives": "O.lang='en';loadDest(DESTS.find(d=>d.id==='mle'));O.badge='Best price';O.dates='1 – 15 June';O.prices=[{amt:'7990',cur:'SAR',lab:'Price for two',stars:'5'}];", "spain": "O.lang='en';loadDest(DESTS.find(d=>d.id==='esp'));O.badge='Summer deal';O.sub='Our summer package to';O.dates='1 July – 31 August 2027';O.prices=[{amt:'12490',cur:'SAR',lab:'Price for two – 4-star',stars:'4'},{amt:'15990',cur:'SAR',lab:'Price for two – 5-star',stars:'5'}];O.incl=['Return flights','7 nights with breakfast','Airport transfers','High-speed train between cities','Sightseeing tours as per program','SIM card with data'];", "cairo": "O.lang='en';loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'SAR',lab:'Per person',stars:''}];"}
if __import__('os').environ.get('EN'): SC=SC_EN
EXTRA=("O.prices.forEach(p=>p.old=String(Math.round(parseFloat(p.amt)*1.2)));O.inst='both';O.instN=4;" if __import__('os').environ.get('EXTRA') else '')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':1500,'height':1000}); errs=[]
        pg.on('pageerror',lambda e: errs.append(str(e)))
        await pg.goto('http://localhost:8770/index.html'); await pg.wait_for_timeout(1000)
        await pg.add_script_tag(content=QA)
        await pg.evaluate("C.phone='+966 11 000 0000';C.web='www.zuvar.com.sa';C.cta='"+('Book now' if __import__('os').environ.get('EN') else 'احجز الآن')+"'")
        total=0
        themes=sys.argv[1].split(',') if len(sys.argv)>1 else ['zover','lux','mag','viv']
        for sc,code in SC.items():
            for th in themes:
                for out in ('poster','slides','pdf'):
                    for sz in (('sq','pt','tall','st') if out!='pdf' else ('pt',)):
                        await pg.evaluate(f"O=newOffer();{code}{EXTRA}O.theme='{th}';O.font='{FONT}';O.out='{out}';O.size='{sz}';O.showItin=true;form();renderFrames()")
                        await pg.wait_for_timeout(600)
                        await pg.evaluate("$$('#pv .fr').forEach(fit)")
                        r=await pg.evaluate("__qa()")
                        for x in r: print(f"{sc:8} {th:5} {out:6} {sz}: {x}"); total+=1
        print('TOTAL',total, errs[:3]); await b.close()
asyncio.run(main())
