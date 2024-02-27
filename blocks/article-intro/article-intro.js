import { createAndAppend, createImage, getBlockJSON } from "../../scripts/utilities.js";

/***
 * @param {*} block the html for tables authored with the class 
 * Article Intro
 */
export default function decorate(block) {
    let title, subtitle, author, authorIcon, publishDate = '';
    const blockJSON = getBlockJSON(block);
    block.textContent = ''; 
    if (blockJSON.hasOwnProperty("title")) {
        title = createAndAppend('h1', 'article-title', [blockJSON.title]);
        block.append(title);
    }
    if (blockJSON.hasOwnProperty("subtitle")) {
        subtitle = createAndAppend('h2', '', [blockJSON.subtitle]);
        subtitle = createAndAppend('i', 'article-subtitle', [subtitle]);
        block.append(subtitle);
    } 
    if (blockJSON.hasOwnProperty("author") && blockJSON.hasOwnProperty("authorLink")) {
        author = createAndAppend('p', 'article-author', [blockJSON.author]);
        author = createAndAppend('a', 'article-author-link', [author], blockJSON.authorLink);
    } 
    if (blockJSON.hasOwnProperty("authorIcon") && blockJSON.hasOwnProperty("authorLink")) {
        authorIcon = createImage(blockJSON.authorIcon);
        authorIcon = createAndAppend('a', 'article-author-image-link', [authorIcon], blockJSON.authorLink);
    }
    if (blockJSON.hasOwnProperty("publishDate")) {
        publishDate = createAndAppend('span', 'article-publish-date', [blockJSON.publishDate]);
    }
    let authorInfo = createAndAppend('div', 'article-author-info', [author, publishDate])
    let authorSection = createAndAppend('div', 'article-author-section', [authorIcon, authorInfo])
    block.append(authorSection);
}