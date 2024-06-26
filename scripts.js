let numInputOne;
let numInputTwo;
let operatorInput;
let calcNumber = "0";

const screenArea = document.querySelector(".screen-area");
const buttonsArea = document.querySelector(".buttons-area");

window.addEventListener("load", (e) => {
    updateScreenText();
})

buttonsArea.addEventListener("click", (e) => {
    /*
    TODO: 
        - Get value from button that was clicked
        - Update calculator number depending on button clicked
    */
})

function updateScreenText() {
    screenArea.textContent = calcNumber;
}

function operate(numOne, numTwo, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(numOne, numTwo);
            break;
        case "-":
            result = subtract(numOne, numTwo);
            break;
        case "*":
            result = multiply(numOne, numTwo);
            break;
        case "/":
            result = divide(numOne, numTwo);
            break;
        default:
            console.error("function operate: Given operator was not valid");
            break;
    }

    return result;
}

function add(numOne, numTwo) {
    return numOne + numTwo;
}

function subtract(numOne, numTwo) {
    return numOne - numTwo;
}

function multiply(numOne, numTwo) {
    return numOne * numTwo;
}

function divide(numOne, numTwo) {
    return numOne / numTwo;
}