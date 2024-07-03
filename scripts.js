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
                if (numTwo === 0) {
                    alert("You cannot do that :l");
                    result = NaN;
                    break;
                }
                result = divide(numOne, numTwo);
                break;
            default:
                console.error("function operate: Given operator was not valid");
                break;
        }
        if (String(result).length > MAX_NUM_LENGTH) {
            if (String(result).includes(".")) {
                let number = String(result).slice(0, MAX_NUM_LENGTH + 1);
                let decimalNum = number.slice(number.indexOf(".") + 1);

                // Round decimal based on length starting from decimal point to last decimal number
                return Number(number).toFixed(decimalNum.length - 1);
            } else {
                result = NaN;
            }
        }
        return String(result);
    },
}

const screenArea = document.querySelector(".screen-area");
const buttonsArea = document.querySelector(".buttons-area");
const decimalBtn = buttonsArea.querySelector("#decimal");
const mathButtons = {
    "/": buttonsArea.querySelector("#divide"),
    "*": buttonsArea.querySelector("#multiply"),
    "-": buttonsArea.querySelector("#subtract"),
    "+": buttonsArea.querySelector("#add"),
}

let resetDisplayNum = false;


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

    // Decimal button
    if (input === ".") {
        if (resetDisplayNum) {
            calculation.displayNum = "0.";
            resetDisplayNum = false;
        } else if (!calculation.displayNum.includes(".")) {
            calculation.displayNum += ".";
        }
        decimalBtn.disabled = true;
        updateScreenText();

        return;
    }

    // Math operator buttons
    if (input in mathButtons) {
        if (!calculation.cacheNum && !calculation.operator) {
            calculation.set(calculation.displayNum, input);
            highlightBtn(calculation.operator, true);
        } else {
            calculation.displayNum = calculation.operate();
            highlightBtn(calculation.operator, false);
            updateScreenText();

            // New calculation w/ previous result
            calculation.set(calculation.displayNum, input);
            highlightBtn(calculation.operator, true);
        }
        resetDisplayNum = true;
        decimalBtn.disabled = false;

        return;
    }

    // Equals button
    if (input === "equals") {
        if (calculation.cacheNum && calculation.operator) {
            highlightBtn(calculation.operator, false);
            calculation.set(null, null, calculation.operate());
            updateScreenText();
            decimalBtn.disabled = false;
            resetDisplayNum = true;
        }

        return;
    }

    // Backspace button
    if (input === "backspace") {
        if (calculation.displayNum.length === 1 || calculation.displayNum === "NaN") {
            calculation.displayNum = "0";
        } else {
            if (calculation.displayNum.at(calculation.displayNum.length - 1) === ".") {
                decimalBtn.disabled = false;
            }
            calculation.displayNum = calculation.displayNum.slice(0, calculation.displayNum.length - 1);
        }
        updateScreenText();

        return;
    }

    // Clear button
    if (input === "clear") {
        if (calculation.operator) {
            highlightBtn(calculation.operator, false);
        }
        calculation.set(null, null, "0");
        decimalBtn.disabled = false;
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

function highlightBtn(btn, highlight) {
    if (highlight) {
        mathButtons[`${btn}`].classList.add("active");
    } else {
        mathButtons[`${btn}`].classList.remove("active");
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