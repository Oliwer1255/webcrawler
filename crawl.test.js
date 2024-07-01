import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";



test('normalized URL', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('convert relative URLs to absolute URLs', () => {
    const htmlBody = 
    `<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="/test"><span>test</span></a>
            <div>
                <a href="http://wut.ded.com/doot/"></a>
                <a href="/api/"></a>
            </div>
        </body>
    </html>`;
    const baseURL = "https://blog.boot.dev/";
    const absoluteURLs = [
        "https://blog.boot.dev/", 
        "https://blog.boot.dev/test",
        "http://wut.ded.com/doot/",
        "https://blog.boot.dev/api/"
    ];
    expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(absoluteURLs)
});