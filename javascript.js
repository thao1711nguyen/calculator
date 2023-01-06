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

const values = []; //store operands & operators
operands.forEach(button => button.addEventListener('click', function(e) {
    values.push(e.target.textContent); //store for operation
    let displayCal = values.reduce((accumulator,value) => accumulator+value);
    display(displayCal);
}));


//perform calculations
const equal = document.querySelector('.equal'); 
equal.addEventListener('click', function() {
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
    
    
    
    let answer=Number(values[0]); //operation & display result
    while(values.length >=3){
        answer = operate(values);
        for(let i=0; i<3; i++){
            values.shift();
        }
        values.unshift(answer);
    }
    
    if(Number.isNaN(answer)) answer = "ERROR!";
    display(answer);
});

function display(answer){
    let displayDiv = document.querySelector('.display'); //display
    displayDiv.textContent = answer;
    
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', (e) => {
    values.length = 0;
    display('');
});

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', function() {
    console.log(values);
    values.pop();
    console.log(values);
    let displayCal = values.reduce((accumulator,value) => accumulator+value);
    display(displayCal);
})



