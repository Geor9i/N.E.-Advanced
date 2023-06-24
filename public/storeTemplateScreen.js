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

//STORE DETAILS PAGE

let storeDetailsForm = document.querySelector('.store__open-times__form__inactive');

// Dropdown animation and content hight calculation 
storeDetailsForm.addEventListener('click', (e) => {
    
    let numPattern = /[\d.]+/g;
    if (e.target.classList.contains('store__details__bar') || e.target.classList.contains('analysis__inner-bar')) {
        let bar = e.target;
        let dropDown = bar.nextElementSibling;
        let parent = bar.parentElement;
        let isChild = e.target.classList.contains('analysis__inner-bar') ? true: false;
        if (dropDown.style.height === '0px' || dropDown.style.height === '') {
            dropDown.style.height = updateContentHeight(dropDown) + 'px'
            if (isChild) {
                parent.style.height = (Number(parent.style.height.match(numPattern)[0]) + updateContentHeight(dropDown)) + 'px';
            }
        } else {
            dropDown.style.height = 0;
            if (isChild) {
                parent.style.height = (Number(parent.style.height.match(numPattern)[0]) - updateContentHeight(dropDown)) + 'px';
            }
        }
    } else if (e.target.classList.contains('delivery-day-checkbox')) {
        let etaContainer = e.target.parentElement.nextElementSibling; 
        if (e.target.checked) {
            etaContainer.className = 'delivery-day-info__container__active';
        } else {
            etaContainer.className = 'delivery-day-info__container__inactive';
        }
    }
})
//for storeDetailsForm Eventlistener
function updateContentHeight(element) {
    let content = Array.from(element.children);
    contentHeight = content.reduce((acc, curr) => acc + curr.clientHeight, 0);
    return contentHeight;
  }

//Toggle between Weekday Setting screen On and OFF
weekDayMainContainer.addEventListener('click', (e) => {
        if (e.target.className === 'weekday-button__active') {
            e.target.className = 'weekday-button__inactive';
            let storeDetailsMainContainer = e.target.parentElement.children[1];
            storeDetailsMainContainer.className = 'store-details__main-container__inactive';
            children = storeDetailsMainContainer.querySelectorAll('*');

        } else if (e.target.className === 'weekday-button__inactive'){
            e.target.className = 'weekday-button__active';
            let storeDetailsMainContainer = e.target.parentElement.children[1];
            storeDetailsMainContainer.className = 'store-details__main-container__active';

        }
})


//Generate store details tab
function generateStoreOpeningTimesTemplate (weekDayMainContainer) {

    for (let i = 0;i < 7;i++) {

        let weekDayContainer = domGen(
            `<div .weekday__container #weekday__container-${getWeekDay(i)}>
                <div .weekday-button__active #weekday-button__active-${getWeekDay(i)}>${getWeekDay(i)}</div>
                <div .store-details__main-container__active>

                    <div .time-selector__main-container>

                        <div .time-selector__inner-container>
                            <label .time-selector-label for="${getWeekDay(i)}-open-selector">open</label>
                            <select #open-selector-${getWeekDay(i)} .time-selector>(generateHours(<select>))</select>
                        </div>
                        
                        <div .time-selector__inner-container>
                            <label .time-selector-label for="${getWeekDay(i)}-close-selector">close</label>
                            <select #close-selector-${getWeekDay(i)} .time-selector>(generateHours(<select>))</select>
                            </div>
                    </div>
                        
                    <div .sales-percentage-container>
                        <label for="sales-percentage-input-${getWeekDay(i)}" .sales-percentage-label for="sales-percentage-input-${getWeekDay(i)}">Daily Sales</label>
                        <input maxlength="5" .sales-percentage-input #sales-percentage-input-${getWeekDay(i)} placeholder="0"></input>
                        <p .sales-percentage-input-sign>%</p>
                    </div>

                    <div .delivery-day-input-container>
                    <label for="delivery-day-checkbox-${getWeekDay(i)}" .delivery-day-label>Store Delivery</label>
                    <input #delivery-day-checkbox-${getWeekDay(i)} .delivery-day-checkbox type="checkbox"></input>
                    </div>
                        <div .delivery-day-info__container__inactive>
                            <div .delivery-day-eta__container>
                                <label for="arrival-time-${getWeekDay(i)}" .delivery-day-arrival-time-text>ETA</label>
                                <select #arrival-time-${getWeekDay(i)} .delivery-arrival-selector>(generateHours(<select>))</select>
                            </div>
                        <div .order-cutoff-details__container>
                            <label for="cutoff-weekday-${getWeekDay(i)}" .delivery-day-arrival-time-text>Order placement deadline</label>
                            <select #cutoff-weekday-${getWeekDay(i)} .delivery-arrival-cutoff-weekday>(generateWeekdays(<select>))</select>
                            <select #cutoff-time-${getWeekDay(i)} .delivery-arrival-cutoff-time>(generateHours(<select>))</select>
                        </div>
                    </div>
                </div>
            </div>
              `);
              weekDayMainContainer.appendChild(weekDayContainer);
    }
    //get all store opening time selectors and sales %
    let timeSelectors = document.querySelectorAll('.time-selector');
    let openTimeSelectors = [];
    let closeTimeSelectors = [];
    let dailySalesFields = Array.from(document.querySelectorAll('.sales-percentage-input'));
    //sort selectors in 2 groups
    timeSelectors.forEach((el,i) => {
        let offButton = el.parentElement.parentElement.parentElement.parentElement.children[0];
        let isOn = offButton.className === 'weekday-button__active' ? true : false;
        if (i % 2 === 0 && isOn) {
            openTimeSelectors.push(el);
        } else if (i % 2 !== 0 && isOn) {
            closeTimeSelectors.push(el);
        }
    });

    let autoFillInitial = {
        open:false,
        close: false,
        dailySales:false,
    }

    //Adjust Availability of fields as weekdays are switched off
    weekDayMainContainer.addEventListener('click', (e) => {
        let current = e.target
        if (current.className === 'weekday-button__active'  || current.className === 'weekday-button__inactive') {
            let activeButtons = document.querySelectorAll('.weekday-button__active');
            //reset all input arr
            openTimeSelectors = [];
            closeTimeSelectors = [];
            dailySalesFields = [];
            for (let section of activeButtons) {
                let container = section.parentElement
                let [open, close] = container.querySelectorAll('.time-selector');
                let dailySales = container.querySelector('.sales-percentage-input');
                openTimeSelectors.push(open);
                closeTimeSelectors.push(close);
                dailySalesFields.push(dailySales);


            }
        }
    })

    //Autofil timesector for the first selection 
    weekDayMainContainer.addEventListener('change', (e) => {
        let current = e.target;
        if (current.className ==='time-selector') {
            if (openTimeSelectors.includes(current) && !autoFillInitial.open) {
                    openTimeSelectors.forEach(el => el.value = current.value);
                    autoFillInitial.open = true;
            } else if (closeTimeSelectors.includes(current) && !autoFillInitial.close) {
                    closeTimeSelectors.forEach(el => el.value = current.value);
                    autoFillInitial.close = true;
            }
        } else if (current.className ==='sales-percentage-input') {
            if (stringToNumber(current.value) > 99) {
                e.target.value = 99;
            }
            if (dailySalesFields.includes(current) && !autoFillInitial.dailySales) {
                dailySalesFields.forEach(el => el.value = current.value);
                autoFillInitial.dailySales = true;
            }
            equalizePercent();
            //Adjust Percentage values to fit within 100%

            function equalizePercent () {
                let sum = 0;
                let currentIndex = dailySalesFields.indexOf(current);
                dailySalesFields.forEach(el => sum += stringToNumber(el.value));
                if(sum > 100 && dailySalesFields.length > 1) {
    
                    let difference = 100 - Number(current.value);
                    let ratio = 100 - Number(current.value);
                    let sumWithoutFocused = 0;
                    // get total sum without the focused value
                    for (let i = 0;i < dailySalesFields.length;i++) {
                        if (i !== currentIndex) {
                            sumWithoutFocused += Number(dailySalesFields[i].value);
                        } 
                    }
                    ratio /= sumWithoutFocused;
        
                   let totalOfRemaining = 0;
                   for (let i = 0;i < dailySalesFields.length;i++) {
                    if (i !== currentIndex) {
                        let value = Number(dailySalesFields[i].value)
                        dailySalesFields[i].value = value * ratio;
                        totalOfRemaining += Number(dailySalesFields[i].value);
                    }
                   }
                   adjustedTotal = totalOfRemaining / (totalOfRemaining * difference);
        
                   for (let i = 0;i < dailySalesFields.length;i++) {
                    if (i !== currentIndex) {
                        let value = Number(dailySalesFields[i].value)
                        dailySalesFields[i].value = (value  / (totalOfRemaining * adjustedTotal)).toFixed(2);
                    }
                   }
                   sum = 0;
                dailySalesFields.forEach(el => sum += stringToNumber(el.value));
                console.log(sum);
                }
            }
           
        } 
    })

    //Use tab key to switch between same type fields for easy input
    weekDayMainContainer.addEventListener('keydown', (e) => {

        const keyCode = e.keyCode || e.which;

        // Check if the Tab key is pressed
        if (keyCode === 9) {
            e.preventDefault();

          let currentField = e.target;
          if (currentField.className ==='time-selector') {
            const focusedField = document.querySelectorAll('.time-selector:focus');
            if (focusedField) {
                if (openTimeSelectors.includes(currentField)) {
                    switchField(currentField, openTimeSelectors)
                } else if (closeTimeSelectors.includes(currentField)) {
                    switchField(currentField, closeTimeSelectors)
                }
            }
        } else if (currentField.className ==='sales-percentage-input') {
            const focusedField = document.querySelectorAll('.sales-percentage-input:focus');
            if (focusedField) {
                switchField(currentField, dailySalesFields)
            }
        }
    }
    //Change field on keyPress
    function switchField(field, fieldArr) {
                const currentIndex = fieldArr.indexOf(field);
                const nextIndex = e.shiftKey ? currentIndex - 1 : currentIndex + 1;
                const wrappedIndex = nextIndex < 0 ? fieldArr.length - 1 : nextIndex % fieldArr.length;
                fieldArr[wrappedIndex].focus();
    }
    })
}
//Fill StoreDetails Obj

//Store details info object
let storeDetails = {};

let confirmButton = document.querySelector('.store__details-confirm-button');
confirmButton.addEventListener('click', (e) => {

let weekDaySections = Array.from(weekDayMainContainer.children);

    //iterate through all sections and save available data
    for (let day of weekDaySections) {
      let weekday = day.id.split('-');
       weekday = weekday[weekday.length - 1];
        let isOpen = day.querySelector('.weekday-button__active') ? true : false;
      let [open, close] = day.querySelectorAll('.time-selector');
      let dailySales = day.querySelector('.sales-percentage-input');
      let hasDelivery = day.querySelector('.delivery-day-checkbox');
      let eta = day.querySelector('.delivery-arrival-selector');
      let cutoffDay = day.querySelector('.delivery-arrival-cutoff-weekday');
      let cutoffTime = day.querySelector('.delivery-arrival-cutoff-time');
      storeDetails[weekday] = { 
            workDay: isOpen,
            openTime: open.value,
            closeTime: close.value,
            dailySales: dailySales.value,
            deliveryInfo: {
                hasDelivery: false,
                deliveryETA: null,
                deliveryCutOff: {
                    weekDay: null,
                    time: null
                }
            }
      };
    if (hasDelivery) {
      storeDetails[weekday].deliveryInfo = {
        hasDelivery: hasDelivery.checked,
        deliveryETA: eta.value,
        deliveryCutOff: {
          weekDay: cutoffDay.value,
          time: cutoffTime.value,
        },
      };
    }
                
    }
    console.log(storeDetails);
})


/*
 storeDetails[getWeekDay(i)] = {
        workDay: true,
        openTime: '00:00',
        closeTime: '00:00',
        dailySales: 0,
        deliveryInfo: {
            hasDelivery: false,
            deliveryETA: null,
            deliveryCutOff: {
                weekDay: null,
                time: null
            }
        }
    }
*/
// Store details functionality





//=============================================Create Template Screen







editButton.addEventListener('click', () => {

    startMenu.className = 'inventory__start-menu__inactive';
    appState.setState(5);
})


