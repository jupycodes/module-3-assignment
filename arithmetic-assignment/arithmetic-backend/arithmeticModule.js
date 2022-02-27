const add = function(value_1,value_2){
    console.log("Operation: Addition")
    console.log(`Value 1: ${value_1}`)
    console.log(`Value 2: ${value_2}`)
    console.log(`Result: ${value_1 + value_2}`)
};

const subtract = function(value_1,value_2){
    console.log("Operation: Subtraction")
    console.log(`Value 1: ${value_1}`)
    console.log(`Value 2: ${value_2}`)
    console.log(`Result: ${value_1 - value_2}`)
};

const multiply = function(value_1,value_2){
    console.log("Operation: Multiplication")
    console.log(`Value 1: ${value_1}`)
    console.log(`Value 2: ${value_2}`)
    console.log(`Result: ${value_1 * value_2}`)
};

const divide = function(value_1,value_2){
    console.log("Operation: Division")
    console.log(`Value 1: ${value_1}`)
    console.log(`Value 2: ${value_2}`)
    console.log(`Result: ${value_1 / value_2}`)
};

module.exports = {add, subtract, multiply, divide}
