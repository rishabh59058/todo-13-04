var express = require('express');
var todoController=require('./controllers/todoController');
var app=express();
//setup template engine
app.set('view engine' , 'ejs');
//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);
app.listen(80);
console.log("Port 80 is being used.");
