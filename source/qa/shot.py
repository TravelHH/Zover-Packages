import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    sc,th,out,sz=sys.argv[1:5]
    SC={'maldives':"loadDest(DESTS.find(d=>d.id==='mle'));O.badge='أفضل سعر';O.dates='1 الى 15 يونيو';O.prices=[{amt:'7990',cur:'ر.س',lab:'السعر للشخصين',stars:'5'}];",
        'spain':"loadDest(DESTS.find(d=>d.id==='esp'));O.badge='عروض الصيف';O.sub='باكيدج الصيف المميز في';O.dates='من 1 يوليو إلى 31 أغسطس 2027';O.prices=[{amt:'12490',cur:'ر.س',lab:'السعر للشخصين – 4 نجوم',stars:'4'},{amt:'15990',cur:'ر.س',lab:'السعر للشخصين – 5 نجوم',stars:'5'}];O.incl=['تذاكر الطيران ذهاب وعودة','الإقامة 7 ليالي مع الإفطار','الاستقبال والتوديع من وإلى المطار','القطار السريع بين المدن','جولات سياحية حسب البرنامج','شريحة اتصال وإنترنت'];",
        'cairo':"loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'ر.س',lab:'للفرد',stars:''}];"}
    SC_EN={"maldives": "O.lang='en';loadDest(DESTS.find(d=>d.id==='mle'));O.badge='Best price';O.dates='1 – 15 June';O.prices=[{amt:'7990',cur:'SAR',lab:'Price for two',stars:'5'}];", "spain": "O.lang='en';loadDest(DESTS.find(d=>d.id==='esp'));O.badge='Summer deal';O.sub='Our summer package to';O.dates='1 July – 31 August 2027';O.prices=[{amt:'12490',cur:'SAR',lab:'Price for two – 4-star',stars:'4'},{amt:'15990',cur:'SAR',lab:'Price for two – 5-star',stars:'5'}];O.incl=['Return flights','7 nights with breakfast','Airport transfers','High-speed train between cities','Sightseeing tours as per program','SIM card with data'];", "cairo": "O.lang='en';loadDest(DESTS.find(d=>d.id==='cai'));O.badge='';O.dates='';O.prices=[{amt:'2450',cur:'SAR',lab:'Per person',stars:''}];"}
    if __import__('os').environ.get('EN'): SC=SC_EN
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':1500,'height':1000},accept_downloads=True); pg=await ctx.new_page()
        await pg.goto('http://localhost:8770/index.html'); await pg.wait_for_timeout(900)
        await pg.evaluate("C.phone='+966 11 000 0000';C.web='www.zuvar.com.sa';C.cta='"+('Book now' if __import__('os').environ.get('EN') else 'احجز الآن')+"'")
        await pg.evaluate(f"O=newOffer();{SC[sc]}O.theme='{th}';O.font='{(sys.argv[6] if len(sys.argv)>6 else "alexandria")}';O.out='{out}';O.size='{sz}';form();renderFrames()"); await pg.wait_for_timeout(900)
        btn={'poster':'dl','slides':'zip','pdf':'pdf'}[out]
        async with pg.expect_download() as dl: await pg.click(f'#acts [data-a="{btn}"]')
        await (await dl.value).save_as(sys.argv[5]); await b.close()
asyncio.run(main())
