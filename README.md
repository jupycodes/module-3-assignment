# module-3-assignment

## Assignment: arithmetic calculations
02/25/2022
- complete arithmetic assignment
index.html file used for user input of values and operation
index.js file uses imported module and inputs from index.html form to calculate math operations

## assignment prompt:
Create a new folder for the project and name it “Arithmetic Calculation”.
Initialize NPM to create package.json file and install Express library.
Create an index.js file and set up a server inside of it.
Create a POST route, which will receive three post data: operation, value_1, and value_2. The operation post data can only have any of these four (4) values: add, sub, mul, and div. The value_1 and value_2 post data refers to two numbers. Based on the operation specified, an arithmetic computation will be performed on the two numbers.
Create a custom module called arithmeticFunctions.js. Export the following functions from it:
add(value_1, value_2): This will return the addition of the two numbers passed as a parameter.
sub(value_1, value_2): This will return the subtraction of the two numbers passed as parameters.
multiply(value_1, value_2): This will return the multiplication of the two numbers passed as a parameter.
divide(value_1, value_2): This will return the division of the two numbers passed as a parameter.
Import the custom module into index.js.
Based on the value of the operation, call the appropriate function from the custom module and pass value_1 and value_2 into the function.
Print result to console using the following format:
Operation: Addition.
Value 1: 3
Value 2: 10
Result: 13

## assignments: Create an API with Node.js and a database using MySQL
03/05/2022
-complete nodejs-usecase assignemnt (NOTE: middleware does not properly log GET student by ID route)
-complete nodejs-db-usecase assignment

## Assignment prompt: 
create an API which allows for the following tasks
adding student
retrieving all the students
retrieving a student with a specific id or section
updating a student
deleting a student

where each student has
id
name
section
gpa
nationality
Create an array of objects where each object is a student having the mentioned properties.
Apply a custom middleware for each incoming request that logs the number of each request and its HTTP method type at the console.

Create a database using MySQL, which has student table and all its attributes.
Use Sequelize as an ORM.
Apply a custom middleware for each incoming request that logs the number of each request and its HTTP method type at the console.
