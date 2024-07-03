let numInputOne;
let numInputTwo;
let operatorInput;
let displayNum = "0";

const MAX_CALC_NUM_LENGTH = 9;

const screenArea = document.querySelector(".screen-area");
const buttonsArea = document.querySelector(".buttons-area");

window.addEventListener("load", (e) => {
    updateScreenText();
})

buttonsArea.addEventListener("click", (e) => {
    if (Number(e.target.value) || Number(e.target.value) === 0) {
        changeDisplayNum(e.target.value);
    }
})

function updateScreenText() {
    screenArea.textContent = displayNum;
}

function changeDisplayNum(inputNumber) {
    if (displayNum.length < MAX_CALC_NUM_LENGTH) {
        if (displayNum === "0" && inputNumber != "0") {
            displayNum = inputNumber;
        }
        else if (displayNum !== "0") {
            displayNum = displayNum.concat(inputNumber);
        }
        updateScreenText();
    }
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