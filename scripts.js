const MAX_NUM_LENGTH = 12;

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

const mathOperators = ["/", "*", "-", "+"];

let resetDisplayNum = false;

const screenArea = document.querySelector(".screen-area");
const buttonsArea = document.querySelector(".buttons-area");

window.addEventListener("load", (e) => {
    updateScreenText();
})

buttonsArea.addEventListener("click", (e) => {
    let input = e.target.value ? e.target.value : e.target.id;

    // Number button
    if (isDigit(input)) {
        if (resetDisplayNum) {
            calculation.displayNum = "0";
            resetDisplayNum = false;
        }
        changeDisplayNum(input);
        return;
    }

    // Math operator buttons
    if (mathOperators.includes(input)) {
        if (!calculation.cacheNum && !calculation.operator) {
            calculation.set(calculation.displayNum, input);
        } else {
            calculation.displayNum = calculation.operate();
            updateScreenText();
            calculation.set(calculation.displayNum, input);
        }

        resetDisplayNum = true;
        return;
    }

    // Equals button
    if (input === "equals") {
        if (calculation.cacheNum && calculation.operator) {
            calculation.set(null, null, calculation.operate());
            updateScreenText();
            resetDisplayNum = true;
        }
        return;
    }

    // Clear button
    if (input === "clear") {
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
    if (calculation.displayNum.length < MAX_NUM_LENGTH) {
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