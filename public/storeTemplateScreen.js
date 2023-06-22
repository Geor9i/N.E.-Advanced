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

        let weekDayContainer = domGen(
            `<div .weekday__container #weekday__container-${getWeekDay(i)}>
            <div .weekday-button__active>${getWeekDay(i)}
            </div>
              <div .store-details__main-container__active>
              <div .time-selector__main-container>

              <div .time-selector__inner-container>
              <label .time-selector-label for="${getWeekDay(i)}-open-selector">open
              </label>
              <select #${getWeekDay(i)}-open-selector .time-selector>
              (generateHours(<select>))
              </select>
              </div>
              
              <div .time-selector__inner-container>
              <label .time-selector-label for="${getWeekDay(i)}-close-selector">close
              </label>
              <select #${getWeekDay(i)}-close-selector .time-selector>
              (generateHours(<select>))
              </select>
              </div>
              </div>
              
              <div .sales-percentage-container>
              <label .sales-percentage-label for="sales-percentage-input-${getWeekDay(i)}">average sales
              </label>
              <input .sales-percentage-input #sales-percentage-input-${getWeekDay(i)}>
              </input>
              <p .sales-percentage-input-sign>%
              </p>
              </div>
          
              </div>
              </div>
              `);
              weekDayMainContainer.appendChild(weekDayContainer);
    }
}