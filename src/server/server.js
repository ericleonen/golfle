const { linksScraper } = require('./linksScraper');
const { playerScraper } = require('./playerScraper');
const { setData } = require('./firebase');

const scraper = async () => {
    console.log('scraping urls...');
    const urls = await linksScraper();
    console.log('done scraping urls!');

    console.log('scraping players...')
    const playersData = await playerScraper(urls);
    console.log('done scraping players!');

    setData(playersData);
}

scraper();