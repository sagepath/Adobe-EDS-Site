/***
 * @param {*} block the html for tables authored with the class teaser
 */
export default function decorate(block) {
    //The teaser will queue each item in order. 
    var elements = [];
    var titles = [];
    var images = [];
    
    //sort through the html of the teaser block by row
    [...block.children].forEach((row) => {
        //pull the following items out
        let htmlItem = row.querySelector('h1, h2, h3, h4, h5, h6, em, a, p, button, picture');
        if (htmlItem != null) {
            let nodeName = htmlItem.nodeName;
            //if it is a title then push into titles array
            if (nodeName.includes('H')) {
                titles.push(htmlItem.parentElement);
            //if it is an image optimize and put into an images array
            //TODO add createOptimizedPicture;
            } else if (nodeName.includes('PICTURE')) {
                images.push(htmlItem.parentElement);
            } else if (nodeName.includes('EM') && row.querySelector('a') != null) {
                htmlItem.parentElement.classList.add('button-container');
                htmlItem.firstElementChild.classList.add('button');
                htmlItem.firstElementChild.classList.add('secondary');
                elements.push(htmlItem.parentElement);
            } else {
                //else push into a general array
                //TODO add a case for a tag | button items
                elements.push(htmlItem.parentElement);
                
            }
        } else {
            //check if there is any text being missed
            if (row.innerText.trim().length != 0) {
                //wrap in a p tag
                const div = document.createElement('div');
                div.append(document.createElement('p'));
                div.children[0].append(row.innerText.trim())
                elements.push(div);  
            }
        }
        
    })
    if (titles.length > 1) {
        titles[0].className = 'teaser-pre-title';
        titles[1].className = 'teaser-main-title'
    }
    if (images.length > 1) {
        images[0].className = 'teaser-first-image';
        images[1].className = 'teaser-second-image';
    }
    block.textContent = '';
    titles.forEach((title) => {
        title.firstElementChild.classList.add('title');
        block.append(title);
    })
    images.forEach((image) => {
        image.classList.add('image')
        block.append(image);
    })
    elements.forEach((element) => {
        block.append(element);
        
    })
}