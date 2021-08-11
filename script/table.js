/**
 * @file: table.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains all the tables settings and functions
 */

/**
* @description This function generates a week table based on the "currentWeek" value
*/
function generateWeekTable() {
    //Modify tables header
    var headerDate = document.querySelectorAll("ul li");
    headerDate[0].innerHTML = "Week " + (mySpace.currentWeek+1);
    headerDate[1].innerHTML = formatDate(mySpace.weeks[mySpace.currentWeek].weekDate);

    //Removing old rows
    var tables = document.querySelectorAll("table tbody");
    removeRows(tables);

    for (var i=0; i < mySpace.weeks[mySpace.currentWeek].products.length; i++) {
      addRow(mySpace.weeks[mySpace.currentWeek].products[i], tables[0]);
    }

    for (var i=0; i < mySpace.weeks[mySpace.currentWeek].filtered.length; i++) {
      addRow(mySpace.weeks[mySpace.currentWeek].filtered[i], tables[1]);
    }                                         
}

/**
* @description This function adds a row to the table passed as parameter filling it with the product object properties
* @param {object} product - product object
* @param {HTMLElement} tBody - table element
*/
function addRow(product, tBody) {
    var trBody = document.createElement("tr");
    tBody.appendChild(trBody);

    createTd(trBody, product.id);
    createTd(trBody, product.name);
    createTd(trBody, formatDate(product.expiry));
    createTd(trBody, product.state);
    createTd(trBody, product.check);
}

/**
* @description This function adds a row to the table passed as parameter filling it with the product object properties
* @param {HTMLElement} tRow - row element
* @param {string} text - cell content
*/
function createTd(tRow, text) {
    var newTd = document.createElement("td");
    newTd.innerHTML = text;
    tRow.appendChild(newTd);

    changeColor(newTd, text);
}

/**
* @description This function removes all the rows from the table array passed as parameter
* @param {HTMLElement} tables - table elements
*/
function removeRows(tables) {
  for (var i=0; i < tables.length; i++) {
    while(tables[i].hasChildNodes()) {
      tables[i].removeChild(tables[i].firstChild);
    }
  }
}

/**
* @description This function changes the color of the newTd by their text
* @param {HTMLElement} newTd - cell element
* @param {string} text - cell content
*/
function changeColor(newTd, text) {
    if(text == "new") {
        newTd.style.color = "#347235";
    } else if(text == "expired") {
        newTd.style.color = "#C11B17";
    } else if(text == "old") {
        newTd.style.color = "gray";
    } else if(text == "valid") {
        newTd.style.color = "#800080";
    }
}

/**
 * @description Function that formats the date(e.g. "20-JUN-2020")
 * @param {date} d - date to format
 * @returns {string} formatted date
 */
function formatDate(d) {
    //format year
    var year = d.getFullYear().toString();

    //format month
    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var month = monthNames[(d.getMonth())];//getMonth() starts from 0 (= January)

    //format day
    var day = d.getDate();
    if(day < 10) {
    day = "0" + day.toString();
    } else {
    day = day.toString();
    }

    return day + "-" + month + "-" + year;
}
