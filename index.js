const express = require('express');
//setting up our server
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const tasks = require('./models/task');

const mongoose = require('mongoose');
// const task = require('./models/task');

mongoose.set("useFindAndModify",false);

mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser:true},() => {
        console.log('connected to db.');

        //listening at port 3000 only if connection is made to database successfully
        app.listen(3000);
    }
);

//
app.set('view engine','ejs');

//for loading the static css files which are in styles folder
app.use('/static',express.static('/styles'));

app.use(express.urlencoded({extended: true}));

//sending response for '/' route
app.get('/',(req,res) => {
    tasks.find({},(err,tasks)=>{
        
        console.log(tasks);
        res.render('index.ejs',{tasks:tasks});
    });
});


app.post('/',(req,res) => {
    //creating a new task and adding to DB
    const newTask = new tasks({
        content:req.body.content,
    });
    try{
        newTask.save();
        res.redirect('/');
    }
    catch{
        res.redirect('/');
    }
})

//for editing an record
app.route('/edit/:id')
.get((req,res) => {
    const taskId = req.params.id;
    tasks.find({},(err,tasks) => {
        res.render('edit.ejs',{tasks:tasks,taskId:taskId});
    });
})
.post((req,res) => {
    const taskId = req.params.id;
    tasks.findByIdAndUpdate(taskId,{content: req.body.content},err => {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});

//for deleting an record
app.route("/delete/:id")
.get((req,res) => {
    const taskId = req.params.id;
    tasks.findByIdAndDelete(taskId,err => {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

//for marking a task complete
app.route('/mark-complete/:id')
.get((req,res) => {
    const taskId = req.params.id;
    tasks.findByIdAndUpdate(taskId,{isComplete: true},err => {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

//for marking a task incomplete
app.route('/mark-incomplete/:id')
.get((req,res) => {
    const taskId = req.params.id;
    tasks.findByIdAndUpdate(taskId,{isComplete: false},err => {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

