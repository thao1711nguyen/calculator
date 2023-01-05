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
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
            break;
        case 'x':
            return multiply(num1,num2);
            break;
        case '/':
            if(num2) return divide(num1,num2).toFixed(2);
            else return "ERROR!"
            break;
            
    }
}
const buttons = [...document.querySelectorAll('button')];
const operands= buttons.filter(button => {
    return (button.textContent!=='CLEAR' && button.textContent!=='=');
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
    let pattern1 = /[x|\/|.]/;
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
    
    
    let answer=values[0]; //operation & display 
    while(values.length >=3){
        answer = operate(values);
        for(let i=0; i<3; i++){
            values.shift();
        }
        values.unshift(answer);
    }
    if(typeof answer !== 'number') answer = "ERROR";
    display(answer);
});

function display(answer){
    let displayDiv = document.querySelector('.display'); //display
    displayDiv.textContent = answer;
    
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', (e) => {
    values.length = 0;
    let displayDiv = document.querySelector('.display'); //display
    displayDiv.textContent = '';

});



