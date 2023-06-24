// FUNCTIONS

/**
 *
 * @param {Object} deliveryHarvestProducts Products object harvested from deliveryReportHarvest
 * @param {string} orderInvoiceDate The date for which you want to place the order!
 * @param {number} salesTotalLastWeek Sales forecast for last week!
 * @param {number} weeklySalesForecast Weekly forecast inclusive of order date.
 * @param {number} salesQuotaWeekend Forecasted sales quota as a percentage for the weekend (Friday, Saturday, Sunday)
 * @param {boolean} previousIsInvoiced Has the previous order been invoiced ? true or false
 * @param {boolean} checkTime If placing your order at the end of the sales day set to true
 * @param {Array} orderDays Enter your available order days if omitted: "Monday", "Wednesday" and "Friday"
 * @returns Forecasted order requirements as an Object!
 */
function nextOrder(
  products,
  orderInvoiceDate,
  previousIsInvoiced,
  receivedToday = false,
  salesTotalLastWeek,
  weeklySalesForecast,
  salesQuotaWeekend = 51,
  checkTime = true
) {
  orderInvoiceDate = dateConverter(orderInvoiceDate);
  let placementDate = new Date();
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  //Calculate how long the shop has been opened for
  let time = new Date().getHours() + new Date().getMinutes() / 60;
  let openTimePercentage = 0;
  if (time >= 11 && time <= 22) openTimePercentage = time - 11;
  else if (time > 22) openTimePercentage = 11;
  openTimePercentage /= 11;

  let productEvolution = {};
  // Variable to hold cost amount
  let orderTotal = 0;

  //HTML Visualize Table headers

  let dataTableHeader = domGen(`
    <table .data-table-header>
        <tr .product-table-header-row>
            <th .data-table-header__product-th>Product</th>
            <th data-table-header__order-th>Order</th>
            <th .data-table-header__weekly-usage-th>Weekly Usage</th>
            <th .data-table-header__price-th>Price</th>
            <th .data-table-header__in-stock-th>In Stock</th>
            <th .data-table-header__stock-on-1-th>${weekDays[orderInvoiceDate.getDay() - 1].slice(0, 3)}</th>
            <th .data-table-header__stock-on-2-th>${weekDays[
                findDeliveryDate(orderInvoiceDate, true).getDay() - 1]
                .slice(0,3)}</th>
            <th .data-table-header__keep-th>Keep</th>
        </tr>
    </table>
  `)

  headerOutputAreaElement.appendChild(dataTableHeader);


  let dataTable = domGen(`
  <table .data-table>
  <tbody .product-table-tbody></tbody>
  </table>
  `)

  outputAreaElement.appendChild(dataTable);

  let currentOrderProducts = {
    counter: 0,
  };

  for (let product in products) {
    let nextOrderDate = findDeliveryDate(orderInvoiceDate, true);
    let productUsageMap = findDeliveryDate(
      placementDate,
      false,
      true,
      true,
      nextOrderDate,
      true
    );

    // date object from stored date string!
    let productLastOrderedOn = new Date(products[product].previousOrderDate);

    let productArrivalDate = findDeliveryDate(productLastOrderedOn, true);
    productArrivalDate = dateConverter(productArrivalDate, true);

    //Pre-define variables to store product object params
    let onHand = products[product].onHand;
    let currentDemand = products[product].previousWeeksUsage;
    let lastOrderQuantity = products[product].previousOrderQuantity;
    let price = products[product].price;
    //  let productSize = products[product].case;
    let quotaReverse = products[product].quotaReverse ? true : false;
    let dailyUse = products[product].dailyUse;
    let deviational = 0;
    if (products[product].sustainAmount) {
      deviational = products[product].sustainAmount;
    }
    let safeQuantity = products[product].safeQuantity;
    safeQuantity =
      orderInvoiceDate.getDay() >= 5 ? safeQuantity * 1 : safeQuantity;

    //Map onHand and daily usage figures
    productUsageDaily(
      currentDemand,
      productUsageMap,
      onHand,
      lastOrderQuantity,
      productLastOrderedOn,
      quotaReverse,
      dailyUse
    );

    //Extract Data for UsageGraph
    productEvolution[product] = productUsageMap;

    /**
     *  Calculate order amount!
     */ //================================================

    //Iterate through the map and get the last entry (last date's params)
    let lastMapEntry;
    for (lastMapEntry of productUsageMap.entries()) {
      lastMapEntry = lastMapEntry[1];
    }
    let productRemain = lastMapEntry.onHand;

    let orderNow = 0;
    if (productRemain < 0) {
      productRemain = Math.abs(productRemain);
      orderNow = productRemain + safeQuantity + deviational;
    } else if (productRemain >= 0) {
      orderNow =
        productRemain >= safeQuantity + deviational
          ? 0
          : safeQuantity + deviational - productRemain;
    }

    //Get Delivery day date
    let orderDayOnHand;
    for (let entry of productUsageMap.entries()) {
      if (
        entry[0].split("<=>")[1].trim() ===
        dateConverter(orderInvoiceDate, true)
      ) {
        orderDayOnHand = entry[1].onHand;
        break;
      }
    }

    if (!currentOrderProducts.hasOwnProperty(product)) {
      currentOrderProducts[product] = {
        order: Math.max(0, Math.ceil(orderNow)),
        isInvoiced: previousIsInvoiced,
        price: price,
        usage: currentDemand.toFixed(2),
        onHand: onHand,
        stockOnOrderDay: orderDayOnHand.toFixed(2),
        nextOrderDayOnHand: lastMapEntry.onHand.toFixed(2),
        arrivalDate: productArrivalDate,
        id: null,
        isInDataTable: false,
        readyToAdd: false,
      };
      currentOrderProducts[product].count =
        currentOrderProducts[product].order > 0
          ? currentOrderProducts.counter++
          : null;
      if (currentOrderProducts[product].order > 0) {
        productTableConstructor(currentOrderProducts, product);
      }
    }
  }

  // console.log(currentOrderProducts);
  return currentOrderProducts;

  /**======================================================================
   *
   * @param {Number} weeklyUsage Usage for previous week
   * @param {map} productMap date range map
   * @param {Number} onHand Current on hand quantity
   * @param {Number} incomingStock Amount of incoming stock
   * @param {date} incomingStockDate Arrival date for incoming stock
   * @param {boolean} quotaReverse Inverse week and weekend usage!
   * @param {number} dailyUse Added usage regardless of stats!
   * @returns Filled map with daily requirement data!
   */
  function productUsageDaily(
    weeklyUsage,
    productMap,
    onHand,
    incomingStock,
    incomingStockDate,
    quotaReverse,
    dailyUse
  ) {
    //Check if there is incoming stock
    if (incomingStock > 0) {
      incomingStockDate = findDeliveryDate(incomingStockDate, true);
      incomingStockDate = dateConverter(incomingStockDate, true);
    }

    // Estimate days to cover sales quota
    let weekDayQuota = Math.abs((100 - salesQuotaWeekend) / 4);
    let weekendQuota = salesQuotaWeekend / 3;
    if (quotaReverse) {
      weekendQuota = Math.abs((100 - salesQuotaWeekend) / 3);
      weekDayQuota = salesQuotaWeekend / 4;
    }

    // Adjust previous weeks usage based on sales forecast!
    let usagePerThousand = (weeklyUsage / salesTotalLastWeek) * 1000;
    weeklyUsage = usagePerThousand * (weeklySalesForecast / 1000);
    //DeliveryDay Reached marker
    let deliveryDayMarker = false;

    // map out usage and onHand within productMap
    for (let [key, object] of productMap.entries()) {
      //Check if this is a weekend day or weekday
      let dayType = weekDays.indexOf(key.split("<=>")[0].trim()) + 1;
      let dayDate = key.split("<=>")[1].trim();
      let currentUsage;
      if (dayType >= 5) currentUsage = weeklyUsage * (weekendQuota / 100);
      else currentUsage = weeklyUsage * (weekDayQuota / 100);
      currentUsage += dailyUse;
      //If placing order end of day!
      if (dayDate === dateConverter(placementDate, true) && checkTime) {
        currentUsage = currentUsage - currentUsage * openTimePercentage;
      }
      //If previous order is invoiced
      if (incomingStockDate === dayDate) {
        if (!receivedToday) {
          incomingStock = previousIsInvoiced ? 0 : incomingStock;
        } else {
          if (previousIsInvoiced) {
            incomingStock = 0;
          } else {
            if (incomingStockDate === dateConverter(placementDate, true)) {
              incomingStock = 0;
            }
          }
        }
        onHand += incomingStock;
      }

      // Zero out minus quantities that add up to onHand before deliveryDay
      deliveryDayMarker =
        dayDate === dateConverter(orderInvoiceDate, true)
          ? true
          : deliveryDayMarker;
      if (onHand <= 0 && !deliveryDayMarker) {
        onHand = 0;
        currentUsage = 0;
      }

      //set usage for the date in the map object

      let innerProperties = {
        onHand: onHand,
        usage: currentUsage,
      };
      productMap.set(key, innerProperties);
      onHand -= currentUsage;
    }

    return productMap;
  }
}

// Warning message printer!
function printWarningMessage(messageContainer, message, action) {
  if (action === "add") {
    let warningElements = document.querySelectorAll(`.warning-message`);
    if (warningElements) {
      let isPresent = false;
      for (let i = 0; i < warningElements.length; i++) {
        if (warningElements[i].textContent.includes(message)) {
          isPresent = true;
          break;
        }
      }
      if (!isPresent) {
        let warningOrderedList = document.createElement("p");
        warningOrderedList.textContent = message;
        warningOrderedList.className = "warning-message";
        messageContainer.appendChild(warningOrderedList);
      }
    }
  } else if (action === "remove") {
    let warningElements = document.querySelectorAll(`.warning-message`);
    for (let i = 0; i < warningElements.length; i++) {
      if (warningElements[i].textContent.includes(message)) {
        warningElements[i].remove();
      }
    }
  }
}

//Convert orderDays from name strings to a numbered day array
function orderDaysToNum(orderDays) {
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  // let orderDaysRegEx = /\W+/;
  // orderDays = orderDays.split(orderDaysRegEx);

  orderDays.map((el) => {
    if (
      weekDays.includes(el) &&
      !orderDays.includes(weekDays.indexOf(el) + 1)
    ) {
      orderDays.splice(orderDays.indexOf(el), 1, weekDays.indexOf(el) + 1);
      return 0;
    } else {
      console.log("Please include only valid delivery days!");
    }
  });
  orderDays = orderDays.sort((a, b) => a - b);
  return orderDays;
}

/**=====================================================================
 * This function finds the next or previous order date!
 * @param {boolean} isArray Return an array?
 * @param {boolean} asDateMap Return an object of date Ranges
 * @param {boolean} goForward - Preset to go forward, if false is supplied it goes backwards!
 * @param {object} dateFrom - Provide a date object for the start date! For example today!
 * @param {boolean} asDate returns result as a date Object!
 * @param {object} dateTo Will return complete day sequence between two dates if specified!
 * @returns {any} Depending on option selected 1.date, 2.array, 3.number
 */
function findDeliveryDate(
  dateFrom,
  asDate = false,
  isArray = false,
  goForward = true,
  dateTo = null,
  asDateMap = false
) {
  let orderDays = [1, 3, 5];
  let step = goForward ? 1 : -1;
  let i = dateFrom.getDay();
  let arr = [];
  let countDown = dateTo !== null ? dateDifference(dateFrom, dateTo) : 0;

  //Fill an array with a range of weekdays matching the selected dates!
  arr.push(i);
  do {
    i += step;
    countDown !== 0 ? countDown-- : countDown;
    i > 7 ? (i = 1) : i;
    i < 1 ? (i = 7) : i;
    arr.push(i);
  } while (countDown !== 0 || !orderDays.includes(i));

  //If array has been selected as output
  if (isArray) {
    arr = goForward ? arr : arr.reverse();
    //If asDateMap is true convert dates to a map of weekly stats and estimates
    if (asDateMap) {
      let map = new Map();
      let dateStamp = new Date(dateFrom);
      let dateStampFormat;
      let properties = {};
      for (let i = 0; i < arr.length; i++) {
        dateStampFormat = `${
          weekDays[dateStamp.getDay() === 0 ? 6 : dateStamp.getDay() - 1]
        } <=> ${dateConverter(dateStamp, true)}`;
        map.set(dateStampFormat, properties);
        dateStamp = new Date(dateStamp.setDate(dateStamp.getDate() + 1));
      }

      return map;
    }
    return arr;
  } else {
    //if date has been selected as output
    if (asDate) {
      let date = new Date(dateFrom);
      if (goForward) {
        date = new Date(date.setDate(dateFrom.getDate() + arr.length - 1));
      } else {
        date = new Date(date.setDate(dateFrom.getDate() - arr.length - 1));
      }
      return date;
    }
  }
}

//=========================================================================

// Calculate the difference in days between 2 dates
function dateDifference(date1, date2) {
  // calculate the time difference in milliseconds
  let daysBetween = Math.abs(date1.getTime() - date2.getTime());
  // convert the time difference from milliseconds to days
  daysBetween = Math.ceil(daysBetween / (24 * 60 * 60 * 1000));
  return daysBetween;
}

// Convert a string date to a date object
function dateConverter(
  date,
  deconstruct = false,
  useHyphen = false,
  toRMFDate = false
) {
  if (typeof date === "object") {
    if (deconstruct) {
      let simpleDate = "";
      if (useHyphen) {
        simpleDate = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
      } else if (toRMFDate) {
        simpleDate = `${date.getDate()} ${getMonth(
          date.getMonth()
        )} ${date.getFullYear()}`;
      } else {
        simpleDate = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
      }
      return simpleDate;
    }
    return new Date(
      `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );
  }
  let datePattern = /\D+/;
  let delimiter = date.match(datePattern)[0];
  let [day, month, year] = date.split(delimiter);
  year = year.length !== 4 ? `20${year}` : year;
  return new Date(`${year}/${month}/${day}`);
}

//Side function used with domGen
function domFunctions() {
  return {
    generateHours(select) {
      for (let i = 0; i < 24; i++) {
        let option = document.createElement("option");
        option.textContent = i < 10 ? `0${i}:00` : `${i}:00`;

        let option2 = document.createElement("option");
        option2.textContent = i < 10 ? `0${i}:15` : `${i}:15`;
        
        let option3 = document.createElement("option");
        option3.textContent = i < 10 ? `0${i}:30` : `${i}:30`;
        
        let option4 = document.createElement("option");
        option4.textContent = i < 10 ? `0${i}:45` : `${i}:45`;
        select.appendChild(option);
        select.appendChild(option2);
        select.appendChild(option3);
        select.appendChild(option4);
      }
    },
    generateWeekdays(select) {
      for (let i = 0; i < 7; i++) {
        let option = document.createElement("option");
        option.textContent = getWeekDay(i);
        select.appendChild(option);
        
      }
    },
  };
}

/**
 *
 * @param {*} domString pseudo html to be converted to a DOM tree
 * @param {*} parent Parent element of DOM tree
 */
function domGen(domString) {
  domString = domString
    .split("\n")
    .filter((el) => {
      let pattern = /[^\s\t\n]+/;
      let pass = pattern.test(el);
      if (pass) {
        return true;
      }
      return false;
    })
    .map((el) => el.trim());

  let structure = hierarchy(domString);
  return structure;

  function elementLastIndex(arr, predicate) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (predicate(arr[i])) {
        return i;
      }
    }
    return -1;
  }

  function hierarchy(domString) {
    let regex = {
      tag: /([<\/]{1,2})(?<tag>[a-z1-6]{1,10})/,
      openTag: /<[^\/].+?>/g,
      closeTag: /<\/.+?>/g,
      class: /(?!\.\w+[\$\{\}<]+)\.[-_0-9a-z]+/g,
      id: /\#[-_0-9a-zA-Z]+/g,
      text: />(?<text>[^\n<]+)/,
      attribute: /(?<attribute>[a-z]{1,15})="(?<content>[-\(\)$\{\}\w]+)"/g,
      function: /\((?<name>[\w]+)\((?<arguments>[<>\w,\s]+)\)\)/,
    };

    let tagArr = [];
    for (let i = 0; i < domString.length; i++) {
      //Matched an opening tag
     
      
      if (domString[i].match(regex.openTag) !== null) {
        let tagString = domString[i].match(regex.tag).groups.tag;
        let tag = document.createElement(tagString);

        //Find and assign attributes

        //if Class is found
        if (domString[i].match(regex.class)) {
          let classList = domString[i]
            .match(regex.class)
            .map((el) => el.slice(1));
          tag.classList.add(...classList);
        }

        //If ID is found
        if (domString[i].match(regex.id)) {
          let id = domString[i].match(regex.id).map((el) => el.slice(1));
          tag.id = id;
        }

        //If innerText is found
        if (domString[i].match(regex.text)) {
          let text = domString[i].match(regex.text).groups.text;
          tag.textContent = text;
        }

        //if Attribute is discovered
        if (domString[i].match(regex.attribute)) {
          let match;
          while ((match = regex.attribute.exec(domString[i])) !== null) {
            let attribute = match.groups.attribute;
            let content = match.groups.content;
            tag.setAttribute(attribute, content);
          }
          regex.attribute.lastIndex = 0;
        }
        tagArr.push({ tag, open: true });

        // OR Matched a closing tag
      } 

      if (domString[i].match(regex.function) !== null) {
        let funcObj = domFunctions();
        let fName = domString[i].match(regex.function).groups.name;
        //if the function exists
        if (funcObj[fName]) {
          let fArgs = domString[i].match(regex.function).groups.arguments;
          if (fArgs) {
            fArgs = fArgs.split(",").map((el) => el.trim());
            if (fArgs.length === 1) {
              fArgs = fArgs[0].slice(1, fArgs.length - 2);
              let elementIndex = elementLastIndex(
                tagArr,
                (el) => el.tag.tagName.toLowerCase() === fArgs
              );
              funcObj[fName](tagArr[elementIndex].tag);
            }
          }
        }
        //OR Matched an opening tag
      } 


      if (domString[i].match(regex.closeTag) !== null) {
        let closeTag = domString[i].match(regex.tag).groups.tag;
        // let previousTag = tagArr[tagArr.length - 1].tag.tagName.toLowerCase();
        let previousTagIsOpen = tagArr[tagArr.length - 1].open;
        let parentTagIndex = elementLastIndex(
          tagArr,
          (el) => el.tag.tagName.toLowerCase() === closeTag && el.open
        );
        let children = tagArr.splice(parentTagIndex).map((el) => (el = el.tag));
        let parent = children.shift();

        for (let i = 0; i < children.length; i++) {
          parent.appendChild(children[i]);
        }
        tagArr.push({ tag: parent, open: false });
      }
  
    }
    return tagArr[0].tag;
}
}

//get weekdays
function getWeekDay(index) {
  let daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return daysOfWeek[index];
}

function getMonth(index) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[index];
}

function stringToNumber(string) {
  return Number(string.trim().split(",").join("").split("£").join(""));
}

//Generate tableRows for products
function productTableConstructor(currentOrderProducts, product, append = true) {
  let tableBody = document.querySelector(".product-table-tbody");

  if (!currentOrderProducts[product].isInDataTable) {
    currentOrderProducts[
      product
    ].id = `${currentOrderProducts[product].count}__product`;

    let productElementTr = domGen(`
        <tr .product-table-tr #${currentOrderProducts[product].count}__product>
            <td .product-name-td>${product}</td>

            <td .order-quantity-td>
                <h3 .order-quantity-value>${currentOrderProducts[product].order}
                </h3>
                <div .value-button__container>
                <button .value-button>-</button>
                <button .value-button>+</button>
                </div>
            </td>
            <td .product-usage-td>${currentOrderProducts[product].usage}</td>
            <td .product-price-td>${currentOrderProducts[product].price}</td>
            <td .product-onhand-td>${currentOrderProducts[product].onHand}</td>
            <td .order-day-onhand-td>${currentOrderProducts[product].stockOnOrderDay}</td>
            <td .post-delivery-quantity-td>${currentOrderProducts[product].nextOrderDayOnHand}</td>
            <td .keep-checkbox-td>
                <input .order__checkbox type="checkbox" checked="true">
                </input>
            </td>
        </tr>
    `);

    if (append) {
      tableBody.appendChild(productElementTr);
    } else {
      tableBody.prepend(productElementTr);
    }
    currentOrderProducts[product].isInDataTable = true;
  }
}
