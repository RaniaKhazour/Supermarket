/**
 * @file: manager.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains all the manager settings and their relative functions
 */

//If the object "mySpace" doesn't exist, create it
if(!mySpace) {
  var mySpace = {};
}

//The global manager settings object
mySpace.managerSettings = {
    checkThreshold: 2,//costant N: weeks of products on the shelf
    weeklyProducts: 5,//costant M: number of new products each week
    startDate: new Date("2020-06-22"),//start date: the program starting date
    weeks: 5,//costant X: weekly runs of the program
    weekDuration: 2,//week duration in days
    dateOffset: 2, //costant K: days to add to startDate
    names: ["Banana", "Dry Fruit", "Apple", "Tomato", "Rice", "Salad", "Oil"],//product nouns
    template: "light"//template mode (light or dark)
}

/**
* @description This function takes a string as parameter and generates a string array containing all
* the words of the parameter which are separated by a ","
* @param {string} str - string to transform in array 
* @returns {Object} nameArray - array
*/
function getArray(str) {
  var nameArray = str.split(', ');
  return nameArray;
}

/**
* @description This function takes a string as parameter and modifies the color theme of the web page
* @param {string} color - the string representing the color
*/
function getTemplate(color) {
  //Getting elements to modify
  var nav = document.querySelector('body > nav');
  var title = document.querySelector('body > nav > h5');
  var buttonSettings = document.querySelector('button.button-settings');
  var container = document.querySelector('div.container');
  var logo = document.getElementById('logo-nav');
  var th = document.querySelectorAll('.table-custom th');

  var panel = document.getElementById('settings');
  var headTable = document.querySelector('div ul');
  var weekTable = document.querySelector('div ul li');
  var filtTable = document.querySelector('div > p');

  //Dark theme
  if(color == "dark") {
    nav.style.backgroundColor = "#003333";
    panel.style.backgroundColor ="#488d84";
    headTable.style.backgroundColor = "##FFFFCC"
    weekTable.style.color = "#FFFFFF";
    filtTable.style.color = "#FFFFFF";
    title.className = "text-light";
    buttonSettings.style.border = "1px solid #CCFF99";
    container.style.backgroundColor = "#003333";
    logo.src = "img/logo-dark.png";
    buttonSettings.style.color = "white";
    for(var i = 0; i < th.length; i++) {
      th[i].style.backgroundColor = "#999933";
      th[i].style.color ="#FFFFFF";
    }
  }

  //Light theme
  if(color == "light") {
    filtTable.style.color = "#FFFFFF"
    nav.style.backgroundColor = "#fbfbdf";
    panel.style.backgroundColor ="beige";
    title.className = "text-dark";
    buttonSettings.style.border = "1px solid green";
    container.style.backgroundColor = "#fbfbdf";
    logo.src = "img/logo-light.png";
    buttonSettings.style.color = "black";
    for(var i = 0; i < th.length; i++) {
      th[i].style.backgroundColor = "#999933"
      th[i].style.color ="#FFFFFF";
    }
  }
}

/**
* @description This function reset all "mySpace" properties needed by the program and restart it from week 0
*/
function uploadProgram() {
    mySpace.currentDate = new Date(mySpace.managerSettings.startDate.setDate(mySpace.managerSettings.startDate.getDate() 
        + mySpace.managerSettings.dateOffset)); 
        
    mySpace.collection =[];
    mySpace.weeks = []; 
    mySpace.currentWeek = 0;
    mySpace.countId = 1; 
    mySpace.previousButton.style.display = "none";

    //Restarting the program
    startProgram();
}

/**
* @description This function takes a date as parameter and checks if it preceeds the current date. 
* If it's so, it modifies the color of the "startDate" label adding a message for the user
* and blocks the program, returning nothing. Otherwise it returns the parameter date
* @param {date} d - date object inserted
* @returns {0|date} returns date object inserted if it's valid, otherwise returns 0
*/
function isValid(d) {
  //Setting the time equal for both of the dates
  var today = new Date().setHours(0,0,0,0);
  var inputDate = new Date(d).setHours(0,0,0,0);

  var labelDate = document.getElementById('labelDate');

  if(inputDate < today) {
    //invalid 
    document.getElementById('start').style.border = "1px solid red";
    labelDate.innerHTML = "Start date &nbsp; &nbsp; <small>  Are you Marty from <i>Back to the Future<i>? Come to the present!<small>";
    labelDate.style.color = "#a2270d";

    return 0;
  } else {
    //valid
    document.getElementById('start').style.border = "1px solid rgb(206, 212, 218)";
    labelDate.innerHTML = "Start date";
    labelDate.style.color = "#212529";
    mySpace.closeButton.style.display = "block";

    return d;
  }
}

/**
* @description This function takes a string as parameter and checks if it is empty or not
* @param {string} text - string inserted
* @returns {0|string} returns string inserted if it's valid, otherwise returns 0
*/
function isEmpty(text) {
  var labelDate = document.getElementById('labelName');
  
  if(text == "") {
    //invalid 
    document.getElementById('names').style.border = "1px solid red";
    labelDate.innerHTML = "Products name &nbsp; &nbsp; <small>Cannot leave this field empty.<small>";
    labelDate.style.color = "#a2270d";

    return 0;
  } else {
    //valid
    document.getElementById('names').style.border = "1px solid rgb(206, 212, 218)";
    labelDate.innerHTML = "Products name";
    labelDate.style.color = "#212529";
    mySpace.closeButton.style.display = "block";

    return text;
  }
}

/**
* @description This function sets the values of the manager settings object based on the users inputs
*/
var uploadSettings = function() {
  var noClose = 0;

  mySpace.managerSettings.weeks = parseInt(document.getElementById('weeks').value);
  mySpace.managerSettings.weeklyProducts = parseInt(document.getElementById('products').value);
  mySpace.managerSettings.weekDuration = parseInt(document.getElementById('duration').value);
  mySpace.managerSettings.checkThreshold = parseInt(document.getElementById('threshold').value);
  mySpace.managerSettings.dateOffset = parseInt(document.getElementById('offset').value);

  //Check if startDate is valid 
  if (isValid(new Date(document.getElementById('start').value))) {
    mySpace.managerSettings.startDate = new Date(document.getElementById('start').value);
  } else {
    noClose = 1;
  }

  //Check if products noun is valid
  if(isEmpty(document.getElementById('names').value)) {
    mySpace.managerSettings.names = getArray(document.getElementById('names').value);
  } else {
    noClose = 1;
  }
  
  mySpace.managerSettings.template = document.getElementById('template').value;
  getTemplate(mySpace.managerSettings.template);

  //Check if there is an invalid input, if yes hide closeButton
  if(noClose) {
    mySpace.closeButton.style.display = "none";
  }

  uploadProgram();
}


