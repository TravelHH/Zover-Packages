import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    sc,th,out,sz=sys.argv[1:5]
    SC={'maldives':"loadDest(DESTS.find(d=>d.id==='mle'));O.badge='أفضل سعر';O.dates='1 الى 15 يونيو';O.prices=[{amt:'7990',cur:'ر.س',lab:'السعر للشخصين',stars:'5'}];",
        'spain':"loadDest(DESTS.find(d=>d.id==='esp'));O.badge='عروض الصيف';O.sub='باكيدج الصيف المميز في';O.dates='من 1 يوليو إلى 31 أغسطس 2027';O.prices=[{amt:'12490',cur:'ر.س',lab:'السعر للشخصين – 4 نجوم',stars:'4'},{amt:'15990',cur:'ر.س',lab:'السعر للشخصين – 5 نجوم',stars:'5'}];O.incl=['تذاكر الطيران ذهاب وعودة','الإقامة 7 ليالي مع الإفطار','الاستقبال والتوديع من وإلى المطار','القطار السريع بين المدن','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];",
        'cairo':"loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'ر.س',lab:'للفرد',stars:''}];"}
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':1500,'height':1000},accept_downloads=True); pg=await ctx.new_page()
        await pg.goto('http://localhost:8770/index.html'); await pg.wait_for_timeout(900)
        await pg.evaluate("C.phone='+966 11 000 0000';C.web='www.zuvar.com.sa';C.cta='احجز الآن'")
        await pg.evaluate(f"O=newOffer();{SC[sc]}O.theme='{th}';O.font='{(sys.argv[6] if len(sys.argv)>6 else "alexandria")}';O.out='{out}';O.size='{sz}';form();renderFrames()"); await pg.wait_for_timeout(900)
        btn={'poster':'dl','slides':'zip','pdf':'pdf'}[out]
        async with pg.expect_download() as dl: await pg.click(f'#acts [data-a="{btn}"]')
        await (await dl.value).save_as(sys.argv[5]); await b.close()
asyncio.run(main())
