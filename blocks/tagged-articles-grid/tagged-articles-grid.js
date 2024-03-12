import { createAndAppend, createImage, formatExcelDate, getBlockJSON, getData } from "../../scripts/utilities.js";

export default async function decorate(block) {
     const blockJSON = getBlockJSON(block);
     let articleData, tag = '';
     if (blockJSON.hasOwnProperty("article-data")) {
        articleData = await(getData(blockJSON["article-data"]));
     } 
     if (blockJSON.hasOwnProperty("tag")) {
        tag = blockJSON.tag;
     }
     let blocks = createArticleBlocks(tag, articleData);
     if (blocks[0] > 0) {
        block.textContent = '';
        block.append(blocks[1]);
        return;
     }
}

function createArticleBlocks(tag, articleData) {
    let total = 0;
    let parent = createAndAppend('div', 'article-grid-wrapper', []);
    //for each check if it matches a tag
    articleData.data.forEach(article => {
        console.log(article);
        let tags = article.tags.split(', ');
        if (tags.includes(tag)) {
           total++;
           console.log(total);
            let block = createBlock(article);
            parent.append(block);
        }
    })
    return [total, parent];
}

function createBlock(article) {
    let image = createImage(article.articleCallout);
    image = createAndAppend('div', '', [image]);
    image = createAndAppend('a', 'image-wrapper', [image], article.articleLink);

    let authorName = createAndAppend('p', 'author', [article.author]);
    authorName = createAndAppend('a', 'author-link', [authorName], article.authorLink);
    let authorImage = createImage(article.authorIcon);
    authorImage = createAndAppend('a', 'author-link', [authorImage], article.authorLink);
    let title = createAndAppend('h2', 'article-title', [article.title]);
    let subtitle = createAndAppend('h3', 'article-description', [article.subtitle]);
    title = createAndAppend('div', '', [title]);
    subtitle = createAndAppend('div', '', [subtitle]);

    let authorSection = createAndAppend('div', 'author-wrapper', [authorImage, authorName]);
    let articleSection = createAndAppend('a', 'titles-wrapper', [title, subtitle], article.articleLink);
    
    let blockWrapper = createAndAppend('div', 'block-wrapper', [image, authorSection, articleSection]);
    return blockWrapper;

}