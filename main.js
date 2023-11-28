
class Calculator {
    constructor (previousOperandTextElelment, currentOperandTextElelment) {
        this.previousOperandTextElelment = previousOperandTextElelment;
        this.currentOperandTextElelment = currentOperandTextElelment;
        
        this.clear()
    }



    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand =  this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return;

        switch(this.operation) {
            case '+':
                computation = prev + current;
            break;
            case '-':
                computation = prev - current;
            break;
            case '*':
                computation = prev * current;
            break;
            case '/':
                computation = prev / current;
            break;
            default: 
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]

        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }

        if (decimalDigits != null ) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }

    updatedisplay() {
        this.currentOperandTextElelment.innerText = 
        this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElelment.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else {
            this.previousOperandTextElelment.innerText = this.previousOperand;
        }
    }
    
}

const numberButtons = document.querySelectorAll('.keys [data-number]')
const operationButtons = document.querySelectorAll('.keys [data-operation]')
const deleteButton = document.querySelector('.keys [data-delete]')
const resetButton = document.querySelector('.keys [data-reset]')
const equalsButton = document.querySelector('.keys [data-equals]')
const previousOperandTextElelment = document.querySelector('.calculator-box [data-previous-operand]')
const currentOperandTextElelment = document.querySelector('.calculator-box [data-current-operand]')



const calculator = new Calculator(previousOperandTextElelment, currentOperandTextElelment)



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updatedisplay()
    })
}) 


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updatedisplay()
    })
}) 



equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updatedisplay()
})

resetButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updatedisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updatedisplay()
})