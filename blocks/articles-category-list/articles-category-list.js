import { createAndAppend, getData, createImage, getBlockJSON, formatExcelDate } from "../../scripts/utilities.js";
/***
 * @param {*} block the html for tables authored with the class 
 * Articles Category List
 */
export default async function decorate(block) {
    let title, subtitle, data = '';
    
    let blockJSON = getBlockJSON(block);
    if (blockJSON.hasOwnProperty("title")) {
        title = blockJSON.title;
    }
    if (blockJSON.hasOwnProperty("subtitle")) {
        subtitle = blockJSON.subtitle;
    }
    if (blockJSON.hasOwnProperty("tags")) {

    } 
    if (blockJSON.hasOwnProperty("linkToData")) {
        data = await getData(blockJSON.linkToData);
    }
    block.textContent = '';
    //TODO Style and implement this feature
    block.append(title);
    block.append(subtitle);
    block.append(createArticleBlocks(data));
}

function createArticleBlocks(data) {
    const blocksWrapper = document.createElement('div');
    blocksWrapper.className = 'article-list-wrapper';
    data.data.forEach((article) => {
        let articleContainer = document.createElement('div');
        articleContainer.className = 'article-container';
        let date = formatExcelDate(article.publishedDate);
        const author = createAuthorLink(article.author, article.authorIcon, article.authorLink);
        const info = createInfo(article.title, article.subtitle, article.articleLink);
        const tagline = createTagline(date, article.tags);
        let articleImage = createImage(article.articleCallout);
        let articleImageWrapper = createAndAppend('a', 'article-image-wrapper', [articleImage], article.articleLink);
        let textBody = createAndAppend('div', 'text-body', [author, info, tagline]);
        let articleBlock = createAndAppend('div', 'article-block', [textBody, articleImageWrapper]);
        blocksWrapper.append(articleBlock);
    })
    return blocksWrapper;
}

function createAuthorLink(name, icon, profileLink) {
    let authorNameElement = createAndAppend('p', '', [name]);
    let  authorIconElement = createImage(icon);
    let authorName = createAndAppend('a', '', [authorNameElement], profileLink);
    let authorImage = createAndAppend('a', '', [authorIconElement], profileLink);
    let authorImageElement = createAndAppend('div', 'author-icon', [authorImage]);
    const authorWrapper = createAndAppend('div', "author-wrapper",  [authorName, authorImageElement]);
    return authorWrapper; 
}

function createInfo(title, subtitle, profileLink) {
    let titleElement = createAndAppend('h2', 'article-title', [title])
    let subtitleElement = createAndAppend('p', 'article-subtitle', [subtitle]);
    let subtitleWrapper = createAndAppend('div', 'subtitle-wrapper', [subtitleElement])
    const infoWrapper = createAndAppend('a', 'info', [titleElement, subtitleWrapper], profileLink);
    return infoWrapper;
}

//TODO support more than one tag
function createTagline(date, tags) {
    let tagBasePage = "https://main--adobe-eds-site--sagepath.hlx.live/tags/tag";
    let dateSpan = '';
    if (date != null) {
        dateSpan = createAndAppend('span', 'publish-date', [date]);
    }
   
    if (tags != null && tags != '') {
        tags = tags.split(',');
    } else {
        tags = undefined;
    }
    let tagsContainer = tags == undefined ? '' : createAndAppend('div', 'tag', [tags[0]])
    let tagsLink = tags == undefined ? '' : createAndAppend('a', 'tag-link', [tagsContainer], tagBasePage);
    const taglineWrapper = createAndAppend('div', 'tagline-wrapper', [dateSpan, tagsLink]);
    return taglineWrapper;
}

export {
    createInfo,
    createTagline
}