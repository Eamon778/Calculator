const displayInput = document.querySelector('.displayInput');
let currentValue = '';

function updateDisplay(value) {
    displayInput.value = value;
}

function clearDisplay() {
    currentValue = '0';
    updateDisplay(currentValue);
}

function clearLastValue() {
    if (currentValue === 'Error') {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
        if (currentValue === '') {
            currentValue = '0';
        }
    }
    updateDisplay(currentValue);
}

function addValue(symbol) {
    if (currentValue === 'Error') {
        currentValue = '0';
    }

    if (currentValue === '' && ['+', '-', '×', '÷'].includes(symbol)) {
        currentValue = '0' + symbol;
    } else if (currentValue === '' && symbol === '.') {
        currentValue = '0.';
    } else if (currentValue === '0' && !['+', '-', '×', '÷'].includes(symbol)) {
        currentValue = symbol;
    } else if (['+', '-', '×', '÷'].includes(symbol)) {
        if (['+', '-', '×', '÷'].includes(currentValue.slice(-1))) {
            currentValue = currentValue.slice(0, -1) + symbol;
        } else if (currentValue !== '') {
            currentValue += symbol;
        }
    } else {
        currentValue += symbol;
    }

    updateDisplay(currentValue);
}

function calculate() {
    try {
        // Convert symbols to their respective operators for evaluation
        currentValue = currentValue
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        if (['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
            currentValue = 'Error';
        } else {
            currentValue = eval(currentValue).toString();
            if (!isFinite(currentValue)) {
                currentValue = 'Error';
            }
        }
        updateDisplay(currentValue);
    } catch (error) {
        currentValue = 'Error';
        updateDisplay(currentValue);
    }
}
