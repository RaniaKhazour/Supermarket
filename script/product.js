/**
 * @file: product.js
 * @author Alessandro, Alice, Mirco, Rania
 * 
 * This file contains all the products functions
 */

/**
* @description This function pushes on the "list" array "num" new random products
* @param {Object} list - array of products
* @param {number} num - number of products
*/
function generateNewProducts(list, num) {

    for (var i=0; i<num; i++) {
        list.push(newProduct());       
    }
}

/**
* @description This function generates and returns a new random product
* @returns {Object} prod - new product
*/
function newProduct() {
    var prod = {
        id: newId() ,
        name: newName(mySpace.managerSettings.names) ,
        expiry: newExpiry(), 
        state: "new",
        check: 0
    }
    return prod;
}

/**
* @description This function generates and returns as a string a new id based on "countId"
* @returns {string} padId - new id in the format "XXX"
*/
function newId() {
    var padId="";

    if (mySpace.countId < 10) {
        padId += "00" + mySpace.countId;
    } else if (mySpace.countId < 100) {
        padId += "0" + mySpace.countId;
    } else {
        padId += mySpace.countId;
    }

    mySpace.countId++;
    return padId;
}

/**
* @description This function generates and returns as a string a new random product noun based on the passed
* string array parameter 
* @param {Object} namesArray - string array
* @returns {string} - new random noun
*/
function newName(namesArray) {
	
    return namesArray[Math.floor(Math.random() * namesArray.length)];
}

/**
* @description This function generates and returns a new random date based on the managerSettings object
* @returns {date} expiryDate - new random expiry date
*/
function newExpiry() { 
    var end = new Date(mySpace.managerSettings.startDate);
    end.setDate(end.getDate() + mySpace.managerSettings.weeks*7);
    
    var expiryDate = new Date(mySpace.managerSettings.startDate.getTime() + Math.floor(Math.random() *(end.getTime() - mySpace.managerSettings.startDate.getTime())));
    expiryDate.setDate(expiryDate.getDate()-5);//it considers also 5 days before the starting date(products can arrive already expired)

    return expiryDate;
}

/**
* @description This function deletes the 'index'th element in the array "products" passed as parameter
* @param {Object} products - products array
* @param {number} index - the index of the product to delete
*/
function deleteProduct(products, index) {
    products.splice(index, 1);
}

/**
* @description This function generates and returns a copy of the product object passed as parameter
* @param {Object} product - product object
* @return {Object} prod - new product copy 
*/
function copyProduct(product) {
    var prod = {
        id: product.id ,
        name: product.name ,
        expiry: product.expiry, 
        state: product.state,
        check: product.check
    }
    return prod;
}

/**
* @description This function checks and set the state of the product object passed as parameters based on its "check" parameter
* @param {Object} product - product object
* @returns {boolean} - false if the product has "old" or "expired" state, otherwise true
*/
function checkProductState(product) {
    if (product.check > 0 && product.check <= mySpace.managerSettings.checkThreshold ) {
        product.state="valid";
    } else if (product.state != "expired" && product.check > mySpace.managerSettings.checkThreshold) {
        product.state="old";
    }

    if (product.state == "old" || product.state == "expired") {
        return false;
    } else {
         return true;
     }
}

/**
* @description This function compares the first date parameter with the second one
* @param {date} dateExpiry - expiry date to check
* @param {date} dateWeek - date to confront
* @returns {boolean} - true if the first one precedes the second one, false otherwise
*/
function checkExpiry(dateExpiry, dateWeek) {
    var time1 = new Date(dateExpiry).getTime();
    var time2 = new Date(dateWeek).getTime();
    if(time1 < time2) {
        return true;//expired
    } else {
        return false;//not expired
    }
}
