function add(...args){
    return args.reduce((total,number) => total+number)
}
function subtract(...args){
    return args.reduce((total,number) => total-number)
    
}
function multiply(...args){
    return args.reduce((total,number) => total*number)
    
}
function divide(...args){
    return args.reduce((total,number) => total/number)

}
function operate(values){
    let num1 = Number(values[0]);
    let num2 = Number(values[2]);
    let operator = values[1];
    let result = 0;
    let condition = (Number.isInteger(num1) && Number.isInteger(num2)) ; //check if numbers have decimal
    if(!condition) {
        num1*=10;
        num2*=10;
    }
    switch(operator){
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
        case 'x':
            result = multiply(num1,num2);
            break;
        case '/':
            if(num2) result = Number(divide(num1,num2).toFixed(2));
            else result = NaN;
            break;        
    }
    if(!condition) {
        result /= 10;
    }
    return result;
}
const buttons = [...document.querySelectorAll('button')];
const operands= buttons.filter(button => {
    return (button.textContent!=='CLEAR' && button.textContent!=='='
            && button.textContent !== 'Backspace');
});


//store operands & operators && display
const values = []; 
operands.forEach(button => button.addEventListener('click', (e) => store(e.target.textContent)));
function store(operand) {
    values.push(operand); 
    let displayCal = values.reduce((accumulator,value) => accumulator+value);
    display(displayCal);
};


//perform calculations
const equal = document.querySelector('.equal'); 
equal.addEventListener('click', result)
function result() {
    let pattern1 = /[x|\/|.]/; //check the first number
    let pattern2 = /[+|-]/;
    if(pattern1.test(values[0])) {
        display('ERROR!');
        return;
    }
    
    if(pattern2.test(values[0])) { //transform the array
        values[1] = values[0].concat(values[1]);
        values.shift();
    }
    for(let i=0; i < values.length;){
        let current = values[i];
        let next = values[i+1];
        let pattern3 = /[0-9|.]/;
        if(pattern3.test(current) && pattern3.test(next)){
            values[i+1] = values[i].concat(values[i+1]);
            values.splice(i,1);
        } else i++;
        
    }
    
    //operation & display result
    let answer=Number(values[0]); 
    while(values.length >=3){
        answer = operate(values);
        values.splice(0,3); //remove the first three operands
        values.unshift(answer);
    }
    
    if(Number.isNaN(answer)) answer = "ERROR!";
    display(answer);
};

function display(calculations){
    let displayDiv = document.querySelector('.display'); 
    displayDiv.value = calculations;
    
    
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearFunction);
function clearFunction()  {
    values.length = 0;
    display('');
}

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', backspaceFunction);

function backspaceFunction() {
    values.pop();
    let displayCal = values.reduce((accumulator,value) => accumulator+value);
    display(displayCal);
}

//Add keyboard support
let displayDiv = document.querySelector('.display');
displayDiv.addEventListener('keydown', keyBoardSupport);
function keyBoardSupport(e) {
    console.log(e.key);
    let eKey = /[0-9|.|+|\-|x|\/]/;
    if(eKey.test(e.key)) values.push(e.key);
    else if(e.key === 'Backspace') {
        if(values.length > 1) values.pop();
        else clearFunction();
    }
    else if(e.key === '=') {
        result();
        e.preventDefault();
    }
    else e.preventDefault();
    
}





