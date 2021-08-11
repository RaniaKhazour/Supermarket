/**
 * @file: main.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains the starting code of the program
 */

//Starting program
startProgram();

/**
* @description This function starts the program from the week 0
*/
function startProgram() {
    createWeek();
}

/**
* @description This function implements a new week session
*/
function createWeek() {
    generateNewProducts(mySpace.collection, mySpace.managerSettings.weeklyProducts); 
    mySpace.weeks.push(generateNewWeek(mySpace.collection));
    generateWeekTable();
    
    mySpace.currentDate = getNextWeekDate();
}

