const STATUS_OK = 200;
const RESPONSE_DONE = 4;
const TODOS_LIST_ID = "todos_list_div";

function add_todo_elements(id, todos_data_json) {
  var parent = document.getElementById(id); // get elemnt of div to print the json in div section
  parent.innerText = todos_data_json; // add the things in div section
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
