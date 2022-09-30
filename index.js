const request = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')

const scrapingResults = [ 
    {
        title: "Handyman Sam",
        rate: "$150/hour",
        url: "https://www.thumbtack.com/ca/duarte/handyman/handyman-sam/service/451155107447046149?service_pk=451155107447046149&project_pk=464989657804161029&lp_request_pk=464989657798041616&zip_code=90292&is_zip_code_changed=true&keyword_pk=102906936628587357&click_origin=pro%20list%2Fclick%20pro%20name&is_sponsored=false&hideBack=true"

}]

function slimDown(data) {
    
}

async function scrapeCraigslist() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.thumbtack.com/instant-results/?zip_code=90292&is_zip_code_changed=true&keyword_pk=102906936628587357&project_pk=464993319274209296",{ waitUntil: "networkidle0" })
    const html = await page.content();
    let previousElement = ''
    const $ = cheerio.load(html);
    $('._2v5dnc3iwVH_7JAa79QfVk.dib').each((index, element) => console.log($(element).text()));
    $('.b.black.b').each((index, element) => {
         if($(element).text()[0]==='$') { 
                     
            if (previousElement != $(element).text()) {
                previousElement = $(element).text()
                return 'cat'
            } else {
                console.log($(element).text())
            }
            // if(c % 2 == 0) {
            //    console.log($(element).text())
            // }
            
        // }
    
    }})
}

scrapeCraigslist()
