/**
 * @file: buttons.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains all the button settings and events
 */

//If the object "mySpace" doesn't exist, create it
if(!mySpace) {
  var mySpace = {};
}

//Open Button
mySpace.openButton = document.getElementById('btn-settings');

//Save settings button
mySpace.saveButton = document.getElementById('save');

//Close settings button
mySpace.closeButton = document.getElementById('close');

//Next and previous week buttons 
mySpace.previousButton = document.getElementById('previous');
mySpace.nextButton = document.getElementById('next');

//Hiding the previous button at the start of the program
mySpace.previousButton.style.display = "none";

/**
* @description This function opens the form
*/
function openForm() {
  document.getElementById("settings").style.display = "block";
  document.querySelector('div.container').style.display = "none";
  mySpace.nextButton.style.display = "none";
  mySpace.previousButton.style.display = "none";
  mySpace.closeButton.style.display = "none"
}

/**
* @description This function closes the form
*/
function closeForm() {
  document.getElementById("settings").style.display = "none";
  document.getElementById("btn-settings").style.display = "none";

  //insert spinner
  var spinner = document.createElement('img');
  spinner.src = "https://img.icons8.com/material-two-tone/100/000000/spinner-frame-5.png";
  spinner.style.position = "absolute";
  spinner.style.top = "300px";
  spinner.style.left = "45%";
  document.getElementById('nav').appendChild(spinner);
  setTimeout(function() {
    spinner.src = "https://img.icons8.com/ios-glyphs/100/000000/spinner-frame-5.png";
  }, 600);
 
  //Waiting 1,5 seconds before the table appears
  setTimeout(function() {
    spinner.style.display = "none";
    document.querySelector('div.container').style.display = "block";
    mySpace.nextButton.style.display = "block";
    document.getElementById('btn-settings').style.display = "block";
  }, 1500);
}

/**
* @description This function generates the previous week table. If the current week is the first one
* it will hide the previous button
*/
function printPreviousTable() {
  mySpace.nextButton.style.display = "block";
  mySpace.currentWeek -= 1;
  
  if(mySpace.currentWeek == 0) {
    mySpace.previousButton.style.display = "none";
  } 
  generateWeekTable();
}

/**
* @description This function generate the next week table. If the current week is the last generated one
* it will hide the next button
*/
function printNextTable() {
  mySpace.previousButton.style.display = "block";
  mySpace.currentWeek += 1;

  if(mySpace.currentWeek == mySpace.managerSettings.weeks - 1) {
    mySpace.nextButton.style.display = "none";
  } 

  if (mySpace.currentWeek == mySpace.weeks.length) {
    createWeek();
  } else {
    generateWeekTable();
  }
}

//Calling addEventListener to the buttons
mySpace.openButton.addEventListener('click', openForm);
mySpace.saveButton.addEventListener('click', uploadSettings);
mySpace.closeButton.addEventListener('click', closeForm);
mySpace.previousButton.addEventListener('click', printPreviousTable);
mySpace.nextButton.addEventListener("click", printNextTable);