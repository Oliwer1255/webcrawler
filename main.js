import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    const args = process.argv;

    if(args.length <= 2) {
        console.error("No url was specified");
        return;
    }

    if(args.length > 3) {
        console.error("Too many arguments");
        return;
    }

    console.log("Crawling has started on url: " + args[2])
    const pages = await crawlPage(args[2]);

    printReport(pages);
}

main()