

function printReport(pages) {
    console.log('Web Crawling Report');
    console.log('-------------------');

    Object.values(pages).forEach((value, index) => {
        const key = Object.keys(pages)[index];
        console.log(`There is ${value.count} internal links to ${key}`);
    });
}

export { printReport };