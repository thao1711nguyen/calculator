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