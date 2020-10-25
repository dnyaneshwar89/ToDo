const dotenv = require('dotenv');
dotenv.config();

const tasks = require('./models/task');

const mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true }, () => {
    console.log("connected to db");

    tasks.find({}, (err, tasks) => {
        console.log(tasks);
    })
})


