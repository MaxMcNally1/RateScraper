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
    $('.bb.b-gray-300.pv3.m_pv4').map((index, card) => {
        card('_2dXladWy3z9cVjUMFQArns.b').map((index, card2) => {
            console.log($(card2).find('.b.black.b').css({"color": "#2f3033!important",}).text())
        }
            )
        })
    
    ;

}

scrapeCraigslist()