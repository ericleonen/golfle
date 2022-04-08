const { Cluster } = require('puppeteer-cluster');

exports.playerScraper = playerScraper = async (urls) => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 35,
        puppeteerOptions: {
            headless: true,
        }
    });

    const data = {};

    await cluster.task(async ({ page, data: url }) => {
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'script' ||
                request.resourceType() === 'media' ||
                request.resourceType() === 'stylesheet') {
                    request.abort();
                }
            else request.continue();
        });
        await page.goto(url);

        const playerData = await page.evaluate(() => {
            const nameRef = document.querySelector('.main .info-mobile .player-name');
            const heightRef = document.querySelector('.hidden-small .col:nth-of-type(1) .item:nth-of-type(1) .hide-on-metric');
            const ageRef = document.querySelector('.hidden-small .col:nth-of-type(2) .item:nth-of-type(1) .value');
            const debutRef = document.querySelector('.hidden-small .col:nth-of-type(2) .item:nth-of-type(2) .value');
            const fedexRef = document.querySelector('.career-notes .row:nth-of-type(1) .item:nth-of-type(1) .value');
            const owgrRef = document.querySelector('.career-notes .row:nth-of-type(2) .item:nth-of-type(1) .value');
            const cntryRef = document.querySelector('.main .info-mobile .clearfix .country .icon');

            return {
                name: nameRef.textContent,
                stats: {
                    name: nameRef.textContent,
                    height: heightRef.textContent.split(' ').map(i => Number(i)).filter(x => !isNaN(x)),
                    age: Number(ageRef.textContent),
                    debut: Number(debutRef.textContent),
                    fedex: Number(fedexRef.textContent),
                    owgr: Number(owgrRef.textContent),
                    cntry: cntryRef.textContent
                }
            }
        });

        const id = parseInt(url.replace(/[^0-9]/g, ''));
        playerData.stats.photo = `https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_d%E2%80%A6.png,dpr_2.0,f_auto,g_face:center,h_350,q_auto,w_280/headshots_${id}.png`;
        
        data[playerData.name] = playerData.stats;
        console.log(Object.keys(data).length + '/' + urls.length);
    });

    for (const url of urls) {
        cluster.queue(url);
    }

    await cluster.idle();
    await cluster.close();

    return data;
}