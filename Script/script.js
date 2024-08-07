let numCurrent = '';
let numPrevious = '';
let operator = '';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (button.classList.contains('num')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        }

        updateDisplay();
    });
});

function handleNumber(num) {

    if (num === '.' && numCurrent.includes('.')) return;


    if (numCurrent.includes('.')) {
        const decimalPart = numCurrent.split('.')[1];
        if (decimalPart.length >= 3) return;
    }

    if (operator && !numPrevious) {
        numPrevious = numCurrent;
        numCurrent = '';
    }
    numCurrent += num;
}

function handleOperator(op) {
    if (numCurrent === '') return;
    if (numPrevious !== '') {
        calculate();
    }
    operator = op;
    numPrevious = numCurrent;
    numCurrent = '';
}

function calculate() {
    let result;
    const prev = parseFloat(numPrevious);
    const current = parseFloat(numCurrent);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }


    numCurrent = result.toFixed(3);
    operator = '';
    numPrevious = '';
}

function clearDisplay() {
    numCurrent = '';
    operator = '';
    numPrevious = '';
}

function updateDisplay() {
    display.textContent = numCurrent || '0';
    if (operator) {
        display.textContent = `${numPrevious} ${operator} ${numCurrent}`;
    }
}
