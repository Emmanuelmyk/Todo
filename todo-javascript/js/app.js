
// date and time js
// date and time js
// date and time js
// date and time js
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();
// end date and time
// end date and time
// end date and time





const dateElement = document.querySelector("#date")
const greetingElement = document.querySelector("#greeting")
const quote = document.querySelector("#quote")
const todoInput = document.querySelector("#text-input")
const todoButton = document.querySelector("#text-button")
const todoList = document.querySelector(".todo-list")

const DATA = "todo-app";
const COMPLETE = "check_box";
const INCOMPLETE = "check_box_outline_blank";
const STRIKE_COLOR = "strike-color";
const STRIKE = "strike";
const TODAY = new Date();
const OPTIONS = {weekday: "long", month:"short", day:"numeric"};

let TASKLIST = [];
let taskId = 0;
let data = localStorage.getItem(DATA);
if (data){
    TASKLIST = JSON.parse(data);
    taskId = TASKLIST.length;
    addTasksFromList(TASKLIST);
}




todoList.addEventListener("click", function(event){
    const task = event.target;
    const status = task.attributes.job.value;
    if(status == "complete"){
        completeTodo(task);
    }else if(status == "remove"){
        deleteTodo(task);
    }
    localStorage.setItem(DATA, JSON.stringify(TASKLIST));
});

document.addEventListener("keyup", function(){
    if (event.keyCode==13){
        const task = todoInput.value;
        if(task){
            addTodo(task, taskId, false, false);
            TASKLIST.push({
                name: task,
                taskId: taskId,
                completed: false,
                deleted: false 
            });
            taskId += 1;
            localStorage.setItem(DATA, JSON.stringify(TASKLIST));
        }
        todoInput.value = "";
    }
});


function addTasksFromList(TODOLIST){
    TODOLIST.forEach(element => {
        addTodo(element.name, element.taskId, element.completed, element.deleted)
    });
}

function addTodo(task, taskId, completed, deleted){
    //event.preventDefault();
    if(deleted){return;}

    const STATUS = completed ? COMPLETE : INCOMPLETE;
    const CHECKBOX = completed ? COMPLETE : INCOMPLETE;
    const STATUSLINE = completed ? STRIKE : "";
    const STRIKECOLOR = completed ? STRIKE_COLOR : "";

    const todo = `<li>
                        <div class="todo ${STRIKECOLOR}">
                            <p contenteditable="true" class="text ${STATUSLINE}">${task}</p>
                            <i class="material-icons complete-icon" job="complete" id=${taskId}>${STATUS}</i>
                            <i class="material-icons delete-icon" job="remove" id=${taskId}>delete</i>
                        </div>
                  </li>`;
    todoList.insertAdjacentHTML("beforeend", todo);
}

function completeTodo(taskElement){
    if (taskElement.innerHTML == COMPLETE) {
        taskElement.innerHTML = INCOMPLETE;
    }else {
        taskElement.innerHTML = COMPLETE;
    }
    taskElement.parentNode.querySelector(".text").classList.toggle(STRIKE);
    taskElement.parentNode.classList.toggle(STRIKE_COLOR);
    TASKLIST[taskElement.id].completed = TASKLIST[taskElement.id].completed ? false : true;
}

function deleteTodo(taskElement){
    taskElement.parentNode.parentNode.removeChild(taskElement.parentNode);
    TASKLIST[taskElement.id].deleted = true;
}

updateGreeting = function(){
    hour = TODAY.getHours();
    if (hour>=5 & hour<=11){
        greetingElement.innerHTML = "Good Morning!";
    }else if (hour>=12 & hour<=16){
        greetingElement.innerHTML = "Good Afternoon!";
    }else{
        greetingElement.innerHTML = "Good Evening!";
    }
}


updateGreeting();