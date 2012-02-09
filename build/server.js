// Require libraries
var fs = require("fs");
var express = require("express");
var Db = require('backbone-mongodb/lib/db');
var $ = require('jquery');
var Backbone = require('backbone');
var backboneapp = require('status/todoapp');
var todoapp = backboneapp.todoapp;
require('status/modules/todos');
todoapp.init();

var db = new Db({
  name: 'test',
  host: '127.0.0.1',
  port: 27017
})

var app = express.createServer();
app.use(express.bodyParser());

// Determine which dist directory to use
var dir = process.argv.length > 2 && "./dist/" + process.argv[2];

// Use custom JS folder based off debug or release
dir && app.use("/assets/js", express.static(dir + "/js"));
dir && app.use("/assets/css", express.static(dir + "/css"));

// Serve static files
app.use("/app", express.static("./app"));
app.use("/assets", express.static("./assets"));
app.use("/dist", express.static("./dist"));

// Serve favicon.ico
app.use(express.favicon("./favicon.ico"));

// Ensure all routes go home, client side app..
app.get("/", function(req, res) {
  fs.createReadStream("./index.html").pipe(res);
});
app.get("/todos", function(req, res){
  todoapp.Todos.fetch(false, function(err){
    if(err) res.send(err.responseText);
    else res.send(JSON.stringify(todoapp.Todos.toJSON()));
  })
});
app.post("/todos", function(req, res){
  todoapp.Todos.create(req.body, function(err, data){
    if(err) res.send(err.responseText);
    else res.send(JSON.stringify(data[0]));
  })
});
app.put("/todos/:id", function(req, res){
  var todo = todoapp.Todos.get(req.params.id);
  if (todo) {
    todo.save(req.body, function(err, model){
      if(err) res.send(err.responseText);
      else res.send(JSON.stringify(model.toJSON()));
    });
  } else {
    var body = 'No record found for id ' + req.params.id;
    res.writeHead(500, body,{
      'Content-Length': body.length,
      'Content-Type': 'text/plain' });
  }
});
app.delete("/todos/:id", function(req, res){
  var todo = todoapp.Todos.get(req.params.id);
  if (todo) {
    todo.destroy(function(err, cbres){
      if(err) res.send(err.responseText);
      else res.send('OK');
    });
  } else {
    res.send('No record found for id ' + request.params.id);
  }
});

// Actually listen
app.listen(8000);

console.log("Server listening on http://localhost:8000");
