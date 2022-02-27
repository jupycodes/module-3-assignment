const express = require("express");
const app = express();

const operations = require('./arithmeticModule');

app.use(express.urlencoded({extended:false})); 


app.post("/",function(req,res){

    const calcParam= {
        value_1: req.body.value_1,
        value_2: req.body.value_2,
        operation: req.body.operation
    };
    
    let operation = calcParam.operation;
    let value_1 = parseInt(calcParam.value_1);
    let value_2 = parseInt(calcParam.value_2);

    if (operation == "add"){
        operations.add(value_1,value_2);
    } else if (operation == "subtract"){
        operations.subtract(value_1,value_2);
    } else if (operation == "multiply"){
        operations.multiply(value_1,value_2);
    } else if (operation == "divide"){
        operations.divide(value_1,value_2);
    };
});

app.listen(3000, function(){
    console.log("The server is running");
});