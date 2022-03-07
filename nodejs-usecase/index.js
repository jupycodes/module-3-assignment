const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));

//custom middleware

var getAllCounter = 0
var getByIdCounter = 0
var getBySectionCounter = 0
var postCounter = 0
var patchCounter = 0
var deleteCounter = 0

function custom_middleware(req,res,next) {
    var method = req.method
    var query = req.url
    var id = req.params.id
    var section = req.params.section
    if (query == '/' && method =='GET'){
        getAllCounter ++
    }
    if (query ==`/by_id/${id}` && method =='GET'){
        getByIdCounter ++
    }
    if (query ==`/by_section/${section}` && method =='GET'){
        getBySectionCounter ++
    }
    if (method == "POST") {
        postCounter ++
    }
    if (method == "PATCH") {
        patchCounter ++
    }
    if (method == "DELETE") {
        deleteCounter ++
    }
    console.log(`Most recent route call: ${query}
    GET (all students) count: ${getAllCounter}
    GET (by student ID) count: ${getByIdCounter}
    GET (by section) count: ${getBySectionCounter}
    POST count: ${postCounter}
    PATCH count: ${patchCounter}
    DELETE count: ${deleteCounter}`);
    next(); 
}

//create array of student objects
let students = [
    {id: 0, name: "name", section: "section", gpa: 0.1, nationality: "nationality"},
    {id: 1, name: "Bob Smith", section: "A", gpa: 4.0, nationality: "Canadian"},
    {id: 2, name: "John Baker", section: "B", gpa: 2.0, nationality: "American"},
    {id: 3, name: "Linda Lewis", section: "A", gpa: 3.8, nationality: "Canadian"}
]

//1. adding a student
app.post("/", custom_middleware, function(req,res){
    let newStudent = {
        id: req.body.id,
        name: req.body.name,
        section: req.body.section,
        gpa: req.body.gpa,
        nationality: req.body.nationality
    };
    students.push(newStudent);
    res.status(200).redirect('/'); //redirect to the GET route
})

//2. retrieve all the students
app.get('/', custom_middleware, function(req,res){
    res.send(students);
})

//3a. retrieve a student with a specific ID
app.get("/by_id/:student_id", custom_middleware, function(req,res){
    //get the student id from the url
    let studentId = parseInt(req.params.student_id);
    let studentIndex = students.findIndex( function(s){
        return s.id == studentId;
    });
    //return the student with the requested id
    let requestedId = students[studentIndex] 
    res.send(requestedId) 
});

//3b. retrieve a student with a specific section
app.get("/by_section/:section", custom_middleware, function(req,res){
    //get the student section from the url
    let studentSection = req.params.section;
    let studentIndex = students.findIndex( function(s){
        return s.section == studentSection;
    });
    //return the student with the requested section
    let requestedSection = students[studentIndex] 
    res.send(requestedSection) 
});

//4. Update a student (this route will update the GPA)
app.patch("/:student_id", custom_middleware, function(req,res){
    let studentId = parseInt(req.params.student_id);
    let studentIndex = students.findIndex( function(s){
        return s.id == studentId;
    });
    let newGPA = req.body.gpa;
    students[studentIndex].gpa = newGPA; 
    res.redirect('/'); 
});

//5. Delete a student
app.delete("/:student_id", custom_middleware, function(req,res){
    let studentId = parseInt(req.params.student_id);
    let studentIndex = students.findIndex( function(s){
        return s.id == studentId;
    });
    students.splice(studentIndex, 1);

    res.redirect('/');
});

app.listen(3000, function(){
    console.log("server listening on port 3000...");
});