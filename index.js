const Joi = require('joi');

const { response } = require("express");
const express = require("express");
const app = express(); //
app.use(express.json());
const PORT = 8080;
const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
];
app.get('/', (request, response)=> {
        response.send('You ready for the big day buddy?');
 });
app.listen(
        PORT,
        () => console.log(`it's alive on http:/localhost:${PORT}`)
)




app.get('/', (request, response)=> {
    response.send('Muraho amakuru yanyu?');
});

app.get('/api/courses',(request,response)=>{                //http://localhost:8080/api/courses
    response.send(courses);
})
app.post('/api/courses', (request, response) =>{            //postman
    const { error } = validateCourse(request.body);

    if( error )return response.status(400).send(result.error.details[0].message);
       
    const course ={
            id: courses.length +1,
            name: request.body.name     
    }
    courses.push(course);
    response.send(courses);
})

app.put('/api/courses/:id',(request, response) =>{
        const course = courses.find(c=> c.id == parseInt(request.params.id));  //backfunction for looping
    if (!course) response.status(404).send('The course with the given ID was not found')
    const index=courses.indexOf(course);
    course.name=request.body.name;
    courses[index] = course;
    return response.status(200).send({
        message: "Course found!",
        data:courses
    });
})

app.get('/api/courses/:id',(request,response)=>{   
    //Look up the course
    //If not found existing, return 404 error
    const course = courses.find(c=> c.id == parseInt(request.params.id));  //backfunction for looping
if (!course) return response.status(404).send('The course with the given ID was not found')

const { error } = validateCourse(request.body);

if( error)  return response.status(400).send(result.error.details[0].message);
    //Update course
    //Return course
    course.name = request.body.name;
    respond.send(courses);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    
   return Joi.validate(course,schema);
}
// deleting
app.delete('/api/courses/:id', (request,response) =>{
    const course = courses.find(c=> c.id == parseInt(request.params.id));  //backfunction for looping
    if (!course) return response.status(404).send('The course with the given ID was not found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return response.send(courses);
})





