const puppeteer = require('puppeteer');

function website(domain, extensions) {
    const url = `https://domains.google.com/m/registrar/search?searchTerm=${domain}`;
    if (extensions) {
        return `${url}&${extensions.map(ext => `tldFilter=${ext.toUpperCase()}`).join('&')}`;
    }
    return url;
}

/**
 * Lookup a domains name, price, and availability
 * @param {string} domain - The name of the domain you are searching for.
 * @param {string[]} extensions - Extensions you would like to include in search. If none are specified, every extension will be used.
 * @example
 * await lookup('thisisaverylongtest', ['com'])
 * // Will return
 * {
 *     "thisisaverylongtest.com": "$12/year",
 *     "averylongtest.com": "$12/year",
 *     "thisisalongtest.com": "$12/year"
 * }
 * @returns {Promise<Object>} Returns a promise, resolving in an object with each domain mapped by name (key) to price (value)
 */
async function lookup(domain, extensions) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website(domain, extensions));
    await page.waitForSelector('search-result-card-header');
    const domains = await page.$$eval('search-result-card-header', (domainCards) => {
        return Array.from(domainCards).map(domainCard => {
            return {
                domain: domainCard.querySelector('span.domain-name').textContent.trim(),
                price: domainCard.querySelector('span.ng-star-inserted:not(.check_circle_filled)').textContent.trim()
            };
        });
    });
    await browser.close();
    return domains;
}

module.exports = lookup;
