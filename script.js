// === SELECT ELEMENTS ===
const currentOperandText = document.querySelector('.current-operand');
const previousOperandText = document.querySelector('.previous-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const actionButtons = document.querySelectorAll('[data-action]');

// === STATE VARIABLES ===
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

// === UPDATE THE SCREEN ===
function updateDisplay() {
  currentOperandText.innerText = currentOperand;
  
  if (operation != null) {
    previousOperandText.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandText.innerText = previousOperand;
  }
}

// === APPEND A NUMBER OR DECIMAL ===
function appendNumber(number) {
  // Prevent multiple decimals
  if (number === '.' && currentOperand.includes('.')) return;
  
  // Replace the starting 0, unless it's a decimal
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
}

// === CHOOSE AN OPERATOR (+, -, *, /) ===
function chooseOperation(op) {
  if (currentOperand === '') return;
  
  // If we already have a previous number, calculate first
  if (previousOperand !== '') {
    calculate();
  }
  
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '0';
}

// === DO THE MATH ===
function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operation) {
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
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }
  
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}

// === CLEAR EVERYTHING ===
function clear() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
}

// === DELETE LAST DIGIT ===
function deleteDigit() {
  if (currentOperand === '0') return;
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
}

// === EVENT LISTENERS ===

// Number buttons (0-9 and .)
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

// Action buttons (AC, DEL, +, -, *, /, =)
actionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    
    if (action === 'clear') {
      clear();
    } else if (action === 'delete') {
      deleteDigit();
    } else if (action === '=') {
      calculate();
    } else {
      chooseOperation(action);
    }
    
    updateDisplay();
  });
});