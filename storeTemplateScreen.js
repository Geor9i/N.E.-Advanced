//Template variables------------------------------------------

let templateActive;

//------------------------------------------Template variables

let weekDayMainContainer = document.querySelector('.weekday__main__container');

let createButton = document.querySelector('#inventory__start-menu__create-button');
let editButton = document.querySelector('#inventory__start-menu__edit-button');

//CreateSection
let previousTemplatePasswordContainer = document.querySelector('.previous-template-password__container__inactive');

//When Create or edit buttons are pressed

createButton.addEventListener('click', () => {

    startMenu.className = 'inventory__start-menu__inactive';
    appState.setState(4);
    if (templateActive !== undefined) {
        previousTemplatePasswordContainer.className ='previous-template-password__container__active';
    }

})

//Create Template Screen=============================================
let nextBtn = document.querySelector('.template__next-button');

nextBtn.addEventListener('click', () => {
    appState.setState(4.1);
})


let storeOpenTimeInitial = true;
let storeCloseTimeInitial = true;

weekDayMainContainer.addEventListener('click', (e) => {
        if (e.target.className === 'weekday-button__active') {
            e.target.className = 'weekday-button__inactive';
            let storeDetailsMainContainer = e.target.parentElement.children[1];
            storeDetailsMainContainer.className = 'store-details__main-container__inactive';

        } else if (e.target.className === 'weekday-button__inactive'){
            e.target.className = 'weekday-button__active';
            let storeDetailsMainContainer = e.target.parentElement.children[1];
            storeDetailsMainContainer.className = 'store-details__main-container__active';
        }
})



//=============================================Create Template Screen







editButton.addEventListener('click', () => {

    startMenu.className = 'inventory__start-menu__inactive';
    appState.setState(5);
})





function generateStoreOpeningTimesTemplate (weekDayMainContainer) {

    
    for (let i = 0;i < 7;i++) {
        let div = document.createElement('div');
        div.className = 'weekday__container';
        div.id = `weekday__container-${getWeekDay(i)}`;

        let weekdayButton = document.createElement('div');
        weekdayButton.className = 'weekday-button__active';
        weekdayButton.textContent = getWeekDay(i);
       
        div.appendChild(weekdayButton);

        let storeDetailsMainContainer = document.createElement('div');
        storeDetailsMainContainer.className = 'store-details__main-container__active';

        let timeSelectorMainContainer = document.createElement('div');
        timeSelectorMainContainer.className = 'time-selector__main-container';
        
        let timeSelectorOpenContainer = document.createElement('div');
        timeSelectorOpenContainer.className = 'time-selector__inner-container';
        
        let openSelectorLabel = document.createElement('label');
        openSelectorLabel.className = 'time-selector-label';
        openSelectorLabel.setAttribute('for', `${getWeekDay(i)}-open-selector`);
        openSelectorLabel.textContent = 'open';
        
        let openSelector = document.createElement('select');
        openSelector.id = `${getWeekDay(i)}-open-selector`;
        openSelector.className = 'time-selector';
        generateHours(openSelector);

        let timeSelectorCloseContainer = document.createElement('div');
        timeSelectorCloseContainer.className = 'time-selector__inner-container';
        
        let closeSelectorLabel = document.createElement('label');
        closeSelectorLabel.className = 'time-selector-label';
        closeSelectorLabel.textContent = 'close';
        closeSelectorLabel.setAttribute('for', `${getWeekDay(i)}-close-selector`);

        let closeSelector = document.createElement('select');
        closeSelector.id = `${getWeekDay(i)}-close-selector`;
        closeSelector.className = 'time-selector';
        generateHours(closeSelector);

        timeSelectorOpenContainer.appendChild(openSelectorLabel);
        timeSelectorOpenContainer.appendChild(openSelector);

        timeSelectorCloseContainer.appendChild(closeSelectorLabel);
        timeSelectorCloseContainer.appendChild(closeSelector);
        
        timeSelectorMainContainer.appendChild(timeSelectorOpenContainer);
        timeSelectorMainContainer.appendChild(timeSelectorCloseContainer);
        storeDetailsMainContainer.appendChild(timeSelectorMainContainer);

        let dailySalesPercentageContainer = document.createElement('div');
        dailySalesPercentageContainer.className = 'sales-percentage-container'

        let dailySalesPercentageLabel = document.createElement('label');
        dailySalesPercentageLabel.textContent = 'average sales';
        dailySalesPercentageLabel.className = 'sales-percentage-label';
        
        let dailySalesPercentageInput = document.createElement('input');
        dailySalesPercentageInput.className = 'sales-percentage-input';

        let dailySalesPercentageInputSign = document.createElement('p');
        dailySalesPercentageInputSign.className = 'sales-percentage-input-sign';
        dailySalesPercentageInputSign.textContent = '%';

        dailySalesPercentageContainer.appendChild(dailySalesPercentageLabel);
        dailySalesPercentageContainer.appendChild(dailySalesPercentageInput);
        dailySalesPercentageContainer.appendChild(dailySalesPercentageInputSign);

        storeDetailsMainContainer.appendChild(dailySalesPercentageContainer);
        div.appendChild(storeDetailsMainContainer);

        weekDayMainContainer.appendChild(div);

    }


    function generateHours(select) {
        for (let i = 0;i < 24;i++) {
            let option = document.createElement('option');
            option.textContent = i < 10 ? `0${i}:00` : `${i}:00`;
            select.appendChild(option);
        }
    }
}