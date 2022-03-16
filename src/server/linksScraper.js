const puppeteer = require('puppeteer');

exports.linksScraper = linksScraper = async () => {
    const browser = await puppeteer.launch({});

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.resourceType() === 'script' ||
            request.resourceType() === 'media' ||
            request.resourceType() === 'stylesheet') {
                request.abort();
            }
        else request.continue();
    });
    await page.goto('https://www.pgatour.com/fedexcup/official-standings.html', {
        waitUntil: 'domcontentloaded'
    });

    let playerLinks = await page.evaluate(() => {
        const links = [];
        const items = document.querySelectorAll('.table-fedexcup-standings a');

        items.forEach(({ href }) => {
            links.push(href);
        });

        return links;
    });

    await browser.close();
    return playerLinks;
}