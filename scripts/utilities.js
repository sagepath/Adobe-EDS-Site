
function createAndAppend(element, className, array, link) {
    let newElement = document.createElement(element);
    if (element = 'a') {
        newElement.href = link;
    }
    newElement.className = className;
    array.forEach((item) => {
        newElement.append(item);
    })
    return newElement;
}

async function getData(linkToData) {
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

export {
    getData,
    createAndAppend
}