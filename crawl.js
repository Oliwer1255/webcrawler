import { JSDOM } from 'jsdom'


function normalizeURL(url) {

    const myURL = new URL(url);
    let normalizedURL = myURL.hostname + myURL.pathname;

    if(normalizedURL.slice(-1) == '/'){
        normalizedURL = normalizedURL.substring(0, normalizedURL.length - 1);
    }

    return normalizedURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;
    const links = document.querySelectorAll('a');

    const urls = [];

    links.forEach(element => {
        const url = new URL(element.href, baseURL);
        urls.push(url.href);
    });

    return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    if(new URL(baseURL).hostname != new URL(currentURL).hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);

    if(pages[normalizedURL] != undefined){
        pages[normalizedURL].count += 1;
        return pages;
    } else {
        const page = {
            count: 1
        };
        pages[normalizedURL] = page;
    }

    const html = await getHTML(currentURL);

    if(html === undefined) {
        return pages;
    }

    const urls = getURLsFromHTML(html, baseURL);

    urls.forEach(url => {
        crawlPage(baseURL, url, pages);
    })

    return pages;
}

async function getHTML(url){
    const response = await fetch(url);

    if(response.status > 400) {
        console.error("Status error: " + response.status);
        return undefined;
    }

    if(response.headers.get('content-type').split(';')[0] != 'text/html'){
        console.error("Response was not HTML");
        return undefined;
    }

    return await response.text();
}

export { normalizeURL, getURLsFromHTML, crawlPage };