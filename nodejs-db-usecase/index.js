const express = require('express');
const app = express();
const config = require('./config');
const Student = require('./Models/Students');

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
    } else if (query ==`/by_id/${id}` && method =='GET'){
        getByIdCounter ++
    } else if (query ==`/by_section/${section}` && method =='GET'){
        getBySectionCounter ++
    } else if (method == "POST") {
        postCounter ++
    } else if (method == "PATCH") {
        patchCounter ++
    } else if (method == "DELETE") {
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

//Establish connetion to database
config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err);
});

//1. Create a new student
app.post('/', custom_middleware, function(req, res){
    Student.create(req.body).then(function(result){
        res.redirect('/'); 
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//2. Retrieve all students
app.get('/', custom_middleware, function(req, res){
    Student.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//3a. retrieve a student with a specific ID
app.get("/by_id/:id", custom_middleware, function(req,res){ 
 var studentId = req.params.id;
    
    Student.findByPk(studentId).then(function(result){
        if(result){
            res.status(500).send(result);
        }
    }).catch(function(err){
        res.status(500).send(err);
    })
});

//3b. retrieve studentw with a specific section
app.get("/by_section/:section", custom_middleware, function(req,res){
 var studentSection = req.params.section;
    
    Student.findAll({
        where: {
          section: studentSection
        }
      }).then(function(result){
            if(result){
                res.status(500).send(result);
            }
        }).catch(function(err){
            res.status(500).send(err);
        })
});

//4. Update the GPA of student
app.patch('/:student_id', custom_middleware, function(req, res){
 var studentId = req.params.student_id;

    Student.findByPk(studentId).then(function(result){
        
        if(result){
            result.gpa = req.body.gpa
            result.save().then(function(){
                res.send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Student record not found');
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//5. delete a student
app.delete('/:student_id', custom_middleware, function(req, res){
 var studentId = req.params.student_id;

    Student.findByPk(studentId).then(function(result){

        if(result){
            //Delete student from database
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Student record not found');
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.listen(3000, function(){
    console.log('Server running on port 3000...');
});