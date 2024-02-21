import { createAndAppend, getData, createImage } from "../../scripts/utilities.js";
/***
 * @param {*} block the html for tables authored with the class 
 * Articles Category List
 */
export default async function decorate(block) {
    let title, subtitle = '';
    [...block.children].forEach(async (row) => {
        let children = row.children;
        if (children.length < 2) {
            return;
        } else if (children[0].innerText == 'title') {
            title = children[1].innerText;
        } else if (children[0].innerText == 'subtitle') {
            subtitle = children[1].innerText;
        } else if (children[0].innerText == 'tags') {

        } else if (children[0].innerText == 'linkToData') {
            const data = await getData(children[1].innerText);
            if (data != null) {
                block.append(createArticleBlocks(data));
            }     
        }
    });
    block.textContent = '';
    //TODO Style this feature
    block.append(title);
    block.append(subtitle);
}

function createArticleBlocks(data) {
    const blocksWrapper = document.createElement('div');
    blocksWrapper.className = 'article-list-wrapper';
    data.data.forEach((article) => {
        let articleContainer = document.createElement('div');
        articleContainer.className = 'article-container';
        let date = formatDate(article.publishedDate);
        const author = createAuthorLink(article.author, article.authorIcon, article.authorLink);
        const info = createInfo(article.title, article.subtitle, article.articleLink);
        const tagline = createTagline(date, article.tags);
        let articleImage = createImage(article.articleCallout);
        let articleImageWrapper = createAndAppend('a', 'article-image-wrapper', [articleImage], article.articleLink);
        let textBody = createAndAppend('div', 'text-body', [author, info, tagline]);
        let articleBlock = createAndAppend('div', 'article-block', [textBody, articleImageWrapper]);
        console.log(articleBlock);
        blocksWrapper.append(articleBlock);
    })
    return blocksWrapper;
}

function formatDate(date) {
    let formattedDate = new Date(1899, 11, 30);
    formattedDate.setDate(formattedDate.getDate() + parseInt(date));
    let dateArray = formattedDate.toDateString().split(' ');
    return dateArray[1] + " " + dateArray[2] + ", " + dateArray[3];
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
    let dateSpan = createAndAppend('span', 'publish-date', [date]);
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

async function getArticles(linkToData) {
    try {
        const url = new URL("https://main--adobe-eds-site--sagepath.hlx.live" + linkToData + ".json").pathname;
        const resp = await fetch(url);  
        // Check if the request was successful
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response body as JSON or text, depending on your requirement
        const data = await resp.json(); // or resp.text() if the response is not JSON    
        // Now you can work with the data received
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    } 
}