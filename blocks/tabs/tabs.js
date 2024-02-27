import { createAndAppend, getBlockJSON } from "../../scripts/utilities.js";
export default async function decorate(block) { 
    const blockJSON = getBlockJSON(block);
    var keysArray = Object.keys(blockJSON);
    let tabsWrapper = document.createElement('div');
    tabsWrapper.className = 'tabs';
    if (keysArray.length == 0) {
        block.textContent = '';
        return; 
    }
    let nameStartIndex = keysArray.length / 2;
    keysArray.forEach((key, index) => {
        if (index >= nameStartIndex) {
            return;
        }
        let tab = createButton(blockJSON, keysArray, key, nameStartIndex);
        tabsWrapper.append(tab);
    })
    block.textContent = '';
    block.append(tabsWrapper);
    // Attach event listeners to tabs
   createListeners(tabsWrapper, blockJSON);
}

function createButton(tabData, keysArray, key, nameIndex) {
    let tabName = parseInt(key) + nameIndex;
    tabName = tabData[keysArray[tabName]];
    let tab = createAndAppend('span', '', [tabName]);
    tab = createAndAppend('p', 'tab-name', [tab]);
    tab = createAndAppend('span', 'tab-link', [tab]);
    tab.setAttribute('data-container', tabData[key]);
    tab = createAndAppend('div', '', [tab]);
    tab = createAndAppend('span', 'tab-wrapper', [tab]);
    return tab;
}

function createListeners(tabsWrapper) {
    const tabs = tabsWrapper.querySelectorAll('.tab-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Find the tab with the 'active' class and remove it
            const activeTab = tabsWrapper.querySelector('.tab-wrapper.active');
            if (activeTab) {
                activeTab.classList.remove('active');    
                let target = activeTab.querySelector('.tab-link').getAttribute('data-container');
                let targetDivs = document.querySelectorAll('.' + target);
                targetDivs.forEach(div => {
                    div.classList.add('inactive-container');
                    div.classList.remove('active-container'); 
                });
            }
            // Set 'active' class on the clicked tab
            tab.parentElement.parentElement.classList.add('active');
            let newTarget = tab.getAttribute('data-container');
                let targetDivs = document.querySelectorAll('.' + newTarget);
                targetDivs.forEach(div => {
                    div.classList.add('active-container');
                    div.classList.remove('inactive-container'); 
                });
        });
    });
}

function setInitialView(tabsWrapper) {
    // Hide all tabs and their containers except the first one
    const tabs = tabsWrapper.querySelectorAll('.tab-link');
    tabs.forEach((tab, index) => {
        const containerClassName = tab.getAttribute('data-container');
        const container = document.querySelector('.' + containerClassName);
        if (index === 0) {
            // Set the first tab and its container as active
            tab.parentElement.parentElement.classList.add('active');
            container.classList.add('active-container');
        } else {
            // Hide other tabs and their containers
            tab.parentElement.parentElement.classList.add('inactive');
            container.classList.add('inactive-container');
        }
    });
}
export {
    setInitialView
}