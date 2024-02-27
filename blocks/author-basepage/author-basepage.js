import { createAndAppend, createImage, formatExcelDate, getBlockJSON, getData } from "../../scripts/utilities.js";
import { createInfo, createTagline } from "../articles-category-list/articles-category-list.js";
import { createPushpin } from "../pushpin-component/pushpin-component.js";
import { setInitialView } from "../tabs/tabs.js";

/***
 * @param {*} block the html for tables authored with the class 
 * Article Basepage
 */
export default async function decorate(block) { 
    const blockJSON = getBlockJSON(block);
    let articleData, authorData, authorID, div1, div2 = '';
    authorID = window.location.search.substring(1);
    if (blockJSON.hasOwnProperty("article-data") && blockJSON.hasOwnProperty("author-data")) {
        articleData = await getData(blockJSON["article-data"]);
        authorData = await getData(blockJSON["author-data"]);
        authorData = findAuthorByID(authorID, authorData);
        if (authorData == null) {
            window.location.href = '404.html';
            return;
        }
        div1 = generateAuthorInfo(authorData, articleData);
        div2 = generateDesktopInfo(authorData);
        organizePage(block, div1, div2);
    } else {
        window.location.href = '404.html';
    }
}

function findAuthorByID(ID, authorData) {
    let targetData = null;
    authorData.data.forEach(author => {
        if (ID == author.id) {
            targetData = author;
        }
    })
    return targetData;
}

function generateAuthorInfo(authorData, articleData) {
    let heroImage = createImage(authorData.heroImage);
    heroImage = createAndAppend('a', 'author-hero', [heroImage], authorData.authorLink);
    let authorTitle = createAndAppend('h1', 'author-title', [authorData.name]);
    let authorIcon = createImage(authorData.authorIcon);
    authorTitle = createAndAppend('div', 'section author-section', [authorIcon, authorTitle]);
    let homeTab = createHomeTab(authorData, articleData);
    let aboutTab = createAboutTab(authorData);
    let authorInfoParent = createAndAppend('div', 'author-info-parent', [heroImage, authorTitle, homeTab, aboutTab]);
    return authorInfoParent;

}

function createHomeTab(authorData, articleData) {
    let blocksWrapper = document.createElement('div');
    blocksWrapper.className = 'article-list-wrapper';
    articleData.data.forEach((article) => {
        if (authorData.id == article.authorId) {
            let block = createModifiedArticleBlock(article);
            blocksWrapper.append(block);
        }
    })
    blocksWrapper = createAndAppend('div', 'articles-category-list block', [blocksWrapper]);
    blocksWrapper = createAndAppend('div', 'author-home-container section', [blocksWrapper]);
    return blocksWrapper;
}

function createModifiedArticleBlock(article) {
    let articleContainer = document.createElement('div');
    articleContainer.className = 'article-container';
    let date = formatExcelDate(article.publishedDate);
    date = createAndAppend('span', 'publish-date', [date]);
    date = createAndAppend('div', 'tagline-wrapper', [date]);
    let info = createInfo(article.title, article.subtitle, article.articleLink);
    let tagline = createTagline(null, article.tags);
    let articleImage = createImage(article.articleCallout);
    let articleImageWrapper = createAndAppend('a', 'article-image-wrapper', [articleImage], article.articleLink);
    let textBody = createAndAppend('div', 'text-body', [date, info, tagline]);
    let articleBlock = createAndAppend('div', 'article-block', [textBody, articleImageWrapper]);
    return articleBlock;
}

function createAboutTab(authorData) {
    let aboutPassage = createAndAppend('p', 'author-about', [authorData.about]);
    aboutPassage = createAndAppend('div', 'author-about-container section', [aboutPassage]);
    return aboutPassage;
}

function organizePage(block, div1, div2) {
    let tabs = document.getElementsByClassName("section tabs-container")[0];
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    let referenceNode = div1.children[2];
    div1.insertBefore(tabs, referenceNode);
    let pageParent = createAndAppend('div', 'page-parent', [div1, div2]);
    mainElement.append(pageParent);
    setInitialView(div1);
    createPushpin('.author-desktop-content', '.page-parent');
}

function generateDesktopInfo(authorData) {
    console.log(authorData);
    let authorIcon = createImage(authorData.authorIcon);
    let authorName = createAndAppend('span', 'expanded-author-name', [authorData.name]);
    authorName = createAndAppend('div', 'author-name-wrapper', [authorName]);
    let authorAbout = createAndAppend('p', 'small-author-about', [authorData.about2]);
    let authorLinked = createAndAppend('a', 'author-linkedin', [], authorData.linkedin);
    let finalDiv = createAndAppend('div', 'author-desktop-content', [authorIcon, authorName, authorAbout, authorLinked]);
    finalDiv = createAndAppend('div', 'author-desktop', [finalDiv]);
    return finalDiv;
}