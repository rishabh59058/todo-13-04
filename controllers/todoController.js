var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//connect  to database
mongoose.Promise = require("bluebird");﻿
mongoose.connect('mongodb://localhost/myapp');
//create a schema blueprint
var todoSchema = new mongoose.Schema({
  item: String
});
var Todo=mongoose.model("Todo",todoSchema);

//var data = [{item:"get milk"},{item:"go home"},{item:"sleep"}];


var urlencodedParser=  bodyParser.urlencoded({extended:false});
module.exports= function(app){

app.get("/",function(req,res)
{
  res.render("home");
});

app.get("/tnc",function(req,res)
{
  res.render("tnc");
});

app.get("/todos",function(req,res){
    //get data from mongodb and pass it to the view;
Todo.find({},function(err,data)
{
  if(err) throw err;
  res.render("todos",{todos:data});
});
});

app.get("/todo",function(req,res){
    //get data from mongodb and pass it to the view;
Todo.find({},function(err,data)
{
  if(err) throw err;
  res.render("todo",{todos:data});
});
});

app.post("/todos",urlencodedParser,function(req,res)
{
  //get data from view and pass it to the mongodb;
Todo(req.body).save(function(err,data)
{
  if(err) throw err;
  else {
    res.json(data);
  }
})
});

  app.delete("/:item",function(req,res)
{
  Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data)
{
  if(err) throw err;
  res.json(data);
});
});
};
