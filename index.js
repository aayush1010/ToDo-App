var express = require("express");
var bodyParser = require("body-parser");
var todos_db = require("./seed.js"); // seed.js is basically database for our todos

var app = express();

app.use("/", function(req, res, next) {
  //this middleware is used to print in console of node.js
  console.log("Request");
  console.log(req.url);
  console.log(req.method);
  next();
});

app.use("/", express.static(__dirname + "/public")); // calls index.html in public dir
app.use("/", bodyParser.urlencoded({ // setting middle-ware for bodyParser
  extended: false
}));

app.get("/api/todos", function(req, res) { // to display todos by accessing the localhost:3000/api/todos
  res.json(todos_db.todos); // todos_db is module.exports of seed.js so it basically display the todos object of seed.js
});

app.delete("/api/todos/:id", function(req, res) { // to delete a
  var del_id = req.params.id; // get the id from the 24th line url
  var todo = todos_db.todos[del_id]; // get the
  if (!todo) {
    res.status(400).json({
      err: "TODO DOESN'T EXIST"
    });
  } else {
    todo.status = todos_db.StatusENUM.DELETED;
    res.json(todos_db.todos);
  }
});

app.post("/api/todos", function(req, res) { // to add a new task
  var todo = req.body.todo_title; 
  if (!todo || todo == "" || todo.trim() == "") {
    res.status(400).json({
      error: "TODO CANT BE EMPTY"
    });
  } else {
    var new_todo_object = {
      title: req.body.todo_title,
      status: todos_db.StatusENUM.ACTIVE
    }
    todos_db.todos[todos_db.next_todo_id] = new_todo_object;
    todos_db.next_todo_id += 1;
    res.json(todos_db.todos);
  }
});

app.put("/api/todos/:id", function(req, res) {
  var mod_id = req.params.id;
  var todo = todos_db.todos[mod_id];
  if (!todo) {
    res.status(400).json({
      err: "TODO DOESN'T EXIST FOR MODIFICATION"
    });
  } else {
    var todo_title = req.body.todo_title;
    if (todo_title && todo_title != "" && todo_title.trim() != "") {
      todo.title = todo_title;
    }
    var todo_status = req.body.todo_status;
    if (todo_status &&
      (todo_status == todos_db.StatusENUM.ACTIVE ||
        todo_status == todos_db.StatusENUM.COMPLETE)
    ) {
      todo.status = todo_status;
    }
    //todos_db.todos = todo;
    res.json(todos_db.todos);
  }
});

app.listen(4000);
