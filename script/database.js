/**
 * @file: database.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains all the database variables, settings and functions
 */

//Check if the global variable "mySpace" exists
if(!mySpace) {
    var mySpace = {};
}

//Dynamic products collection
mySpace.collection = [];

//Singles week collection
mySpace.weeks = [];

//Dynamic current date
mySpace.currentDate = new Date(mySpace.managerSettings.startDate.setDate(mySpace.managerSettings.startDate.getDate() 
        + mySpace.managerSettings.dateOffset)); 

//Dynamic current week number
mySpace.currentWeek = 0;

//Dynamic ID products counter
mySpace.countId = 1; 

/**
* @description This function calculates and returns the next week date based on the "currentDate" and the manager object settings
* @returns {Object} dateOnTable - The new current date
*/
function getNextWeekDate() {
   var dateOnTable = new Date (mySpace.currentDate.setDate(mySpace.currentDate.getDate() + mySpace.managerSettings.weekDuration));

   return dateOnTable;
}

/**
* @description This function generates a new "week" object based on the current collection of products passed as parameter
* @param {Object} database - products array
* @returns {Object} week - The new week object
*/
function generateNewWeek(database) {
    var week = {};
    week.weekDate = new Date(mySpace.currentDate);
    week.products = [];
    week.filtered = [];

    for (var i=0; i < database.length; i++) {
        //check if the product is expired
        if (checkExpiry(database[i].expiry, week.weekDate)) {
            database[i].state="expired";
        }
        //insert the valid product in "filtered"
        if (checkProductState(database[i])) {
            week.filtered.push(copyProduct(database[i]));
        }
        week.products.push(copyProduct(database[i]));

        database[i].check++;
    }
    return week;
}



