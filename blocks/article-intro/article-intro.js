import { createAndAppend, createImage } from "../../scripts/utilities.js";

/***
 * @param {*} block the html for tables authored with the class 
 * Article Intro
 */
export default function decorate(block) {
    console.log(block);
    let title, subtitle, author, authorIcon, authorLink, publishDate = '';
    [...block.children].forEach((row) => {
        let children = row.children;
        if (children.length < 2) {
            return;
        } else if (children[0].innerText == 'title') {
            title = children[1].innerText;
        } else if (children[0].innerText == 'subtitle') {
            subtitle = children[1].innerText;
        } else if (children[0].innerText == 'author') {
            author = children[1].innerText;
        } else if (children[0].innerText == 'authorIcon') {
            authorIcon = children[1].innerText;
        } else if (children[0].innerText == 'authorLink') {
            authorLink = children[1].authorLink;
        } else if (children[0].innerText == 'publishDate') {
            publishDate = children[1].innerText;
        }
    });
    block.textContent = ''; 
    if (title.length > 1) {
        title = createAndAppend('h1', 'article-title', [title]);
        block.append(title);
    }
    if (subtitle.length > 1) {
        subtitle = createAndAppend('h2', '', [subtitle]);
        subtitle = createAndAppend('i', 'article-subtitle', [subtitle]);
        block.append(subtitle);
    } 
    if (author.length > 1) {
        author = createAndAppend('p', 'article-author', [author]);
        author = createAndAppend('a', 'article-author-link', [author], authorLink);
    } 
    if (authorIcon.length > 1) {
        authorIcon = createImage(authorIcon);
        authorIcon = createAndAppend('a', 'article-author-image-link', [authorIcon], authorLink);
    }
    if (publishDate.length > 1) {
        publishDate = createAndAppend('span', 'article-publish-date', [publishDate]);
    }
    let authorInfo = createAndAppend('div', 'article-author-info', [author, publishDate])
    let authorSection = createAndAppend('div', 'article-author-section', [authorIcon, authorInfo])
    block.append(authorSection);
}