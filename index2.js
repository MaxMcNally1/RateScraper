const request = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { first } = require('cheerio/lib/api/traversing');

const scrapingResults = [ 
    {
        title: "Handyman Sam",
        rate: "$150/hour",
        url: "https://www.thumbtack.com/ca/duarte/handyman/handyman-sam/service/451155107447046149?service_pk=451155107447046149&project_pk=464989657804161029&lp_request_pk=464989657798041616&zip_code=90292&is_zip_code_changed=true&keyword_pk=102906936628587357&click_origin=pro%20list%2Fclick%20pro%20name&is_sponsored=false&hideBack=true"

}]

async function cutRating(uncutRating) {
    let firstIndex = uncutRating.indexOf(1,2,3,4,5) 
    let cutRating = uncutRating.slice(firstIndex, (firstindex+2))
    return cutRating 
}


async function scrapeCraigslist() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.thumbtack.com/instant-results/?zip_code=90292&is_zip_code_changed=true&keyword_pk=102906936628587357&project_pk=464993319274209296",{ waitUntil: "networkidle0" })
    const html = await page.content();
    let previousElement = ''
    const $ = cheerio.load(html);
    $('.bb.b-gray-300.pv3.m_pv4').map((index, card) => {
            let titleElement = $(card).find('._2v5dnc3iwVH_7JAa79QfVk.dib.m_dn').text()
            console.log(titleElement)
            let uncutRatingElement = $(card).find('.flex.mr1.b.green.flex-shrink-0.flex-grow-0').text()
            let ratingElement = cutRating(uncutRatingElement)
            console.log(ratingElement)
            let numberReviewsElement = $(card).find('._3n1ubgNywOj7LmMk3eLlub.flex.items-center.black-300.flex-shrink-0.flex-grow-0').text()
            console.log(numberReviewsElement)
            let onlineNowElement = $(card).find('._3n1ubgNywOj7LmMk3eLlub.truncate').text()
            console.log(onlineNowElement)
            

            let uncutRate = $(card).find('.b.black.b').text()
            let dollarIndex = uncutRate.indexOf('$')
            let slashIndex = uncutRate.indexOf('/')
            let rate = uncutRate.slice(dollarIndex,slashIndex)
            console.log(rate)
        })
    
    ;

}

scrapeCraigslist()
