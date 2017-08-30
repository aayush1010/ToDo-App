const STATUS_OK = 200;
const RESPONSE_DONE = 4;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";

window.onload = getTodosAJAX();

function add_todo_elements(id, todos_data_json) {
  var parent = document.getElementById(id); // get elemnt of div to print the json in div section
  //parent.innerText = todos_data_json; // add the things in div section
  var todos = JSON.parse(todos_data_json);
  parent.innerHTML = "";
  if(parent){
    Object.keys(todos).forEach(
        function (key) {
          var todo_element = createTodoElement(key, todos[key]);
          parent.appendChild(todo_element);
        }
    )
  }
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );


    if (todo_object.status == "ACTIVE"){

        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark as Complete";
        complete_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }

    if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE"){
        var delete_button = document.createElement("button");
        delete_button.innerText = "DELETE";
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    return todo_element;
}

function getTodosAJAX() {
  var xhr = new XMLHttpRequest(); //xhr - JS object for making request to server via JS
  xhr.open("GET", "/api/todos", true); // actually make the request to the /api/todos
  xhr.onreadystatechange = function() {
    // code that needs to be exexuted after response
    if (xhr.readyState == RESPONSE_DONE) {
      if (xhr.status == STATUS_OK) {
        console.log(xhr.responseText); // data coming from index.js from app.get of /api/todos which is basically a json file of todos
        add_todo_elements(TODOS_LIST_ID, xhr.responseText); // function for print the json file we get in xhr.responseText
      }
    }
  }
  xhr.send(data = null);
}


function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    console.log(title);

    var xhr = new XMLHttpRequest();

    var bodata = "todo_title="+ encodeURI(title);
    xhr.open("post", "/api/todos", true);
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded"
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else{
                console.log(xhr.response);
            }
        }
    }

    xhr.send(data = bodata);
}

function completeTodoAJAX(id) {

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);

}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_status=DELETED";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }


    xhr.send(data);
}