const MAX_CALC_NUM_LENGTH = 9;

const calculation = {
    displayNum: "0",
    cacheNum: null,
    operator: null,
    set: function (cacheNum, operator, displayNum = this.displayNum) {
        this.cacheNum = cacheNum;
        this.operator = operator;
        this.displayNum = displayNum;
    },
    operate: function () {
        let numOne = +this.cacheNum;
        let numTwo = +this.displayNum;
        let result = 0;
        switch (this.operator) {
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
    },
}

let resetDisplayNum = false;

const screenArea = document.querySelector(".screen-area");
const buttonsArea = document.querySelector(".buttons-area");

window.addEventListener("load", (e) => {
    updateScreenText();
})

buttonsArea.addEventListener("click", (e) => {

    // Number button
    if (isDigit(e.target.value)) {
        if (resetDisplayNum) {
            calculation.displayNum = "0";
            resetDisplayNum = false;
        }
        changeDisplayNum(e.target.value);
        return;
    }

    // Clear button
    if (e.target.id === "clear") {
        calculation.set(null, null, "0");
        updateScreenText();

        return;
    }
})

function updateScreenText() {
    screenArea.textContent = calculation.displayNum;
}

function isDigit(digit) {
    return (Number(digit) || Number(digit) === 0) && digit !== "";
}

function changeDisplayNum(inputNum) {
    if (calculation.displayNum.length < MAX_CALC_NUM_LENGTH) {
        if (calculation.displayNum === "0" && inputNum != "0") {
            calculation.displayNum = inputNum;
        }
        else if (calculation.displayNum !== "0") {
            calculation.displayNum = calculation.displayNum.concat(inputNum);
        }
        updateScreenText();
    }
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