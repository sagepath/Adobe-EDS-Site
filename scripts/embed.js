//TODO
/**
 * - look for sections with data-embed
 * - get the component to embed
 * - get columns in the section with embed class
 * - for each column in the the column component
 * - embed as many of the children available 
 */
async function embedSections(main) {
    main.querySelectorAll(':scope > div').forEach((section) => {
        if (section.dataset.template == 'secondary') {
            section.classList.add('secondary');
        }
        if (section.dataset.embed == 'true') {
            let embedColumn = section.querySelector('.columns.embed > div');
            if (embedColumn != undefined) {
                Array.from(embedColumn.children).forEach((child, index) => {
                    let targetHtml = section.children[1];
                    if (targetHtml != undefined) {
                        child.append(targetHtml);
                    }
                })
            }
        }
    })
}

export {
    embedSections
}