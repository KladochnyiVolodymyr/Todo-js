const tasks = [
  { id: 1, title: "Go to the cinema", done: false },
  { id: 2, title: "Go to the theatre", done: true },
  { id: 3, title: "Learn Java Script", done: false },
  { id: 4, title: "Finish HTML project", done: false },
];

function handleTasks() {}

renderTodoList(tasks, true);

function renderTodoList (tasks, renderInfo) {
  var tasksBox = document.getElementById('tasks-box');
  var renderListHtml = '';
  tasks.forEach((task) => {
    renderListHtml += `
      <li class="list-group-item  d-flex" data-id=${task.id}> 
        <span class="${task.done ? 'done' : '' }">${task.title}</span>
        <div class="icons-box ml-auto">
          <i class="fa fa-check mr-3 ${task.done ? 'done' : '' }"></i>
          <i  class="fa fa-trash"></i> 
        </div> 
      </li>`
  })
  tasksBox.innerHTML = renderListHtml;
  //document.querySelectorAll('.fa-check').forEach(item => {
    //item.addEventListener('click', checkHandle);
  //})
  document.getElementById('tasks-box').onclick = function(event) {
    if (!event.target.classList.contains('fa-check')) return;
    checkHandle(event.target);
  }
  //document.querySelectorAll('.fa-trash').forEach(item => {
    //item.addEventListener('click', deleteHandle);
  //})
  document.getElementById('tasks-box').onclick = function(event) {
    if (!event.target.classList.contains('fa-trash')) return;
    deleteHandle(event.target);
  }

  if(renderInfo) {
    renderTodoInfo(tasks);
  }
  
}


function filterArr(arr, state) {
  return arr.filter(function (item) {  
    return item.done === state;
  })
}


function renderTodoInfo(tasks) {

  if(tasks.length === 0) {
    document.getElementById('tasks-info').classList.add("is-hidden");
    return;
  }

  document.getElementById('tasks-info').classList.remove("is-hidden");
  var tasksTotal = document.getElementById('tasks-total');
  var tasksDone = document.getElementById('tasks-done');
  var tasksRemain = document.getElementById('tasks-remain');

  var tasksTotalCount = tasks.length;
  var tasksDoneCount = filterArr(tasks, true).length;

  tasksTotal.innerHTML = tasksTotalCount
  tasksDone.innerHTML = tasksDoneCount;
  tasksRemain.innerHTML = tasksTotalCount - tasksDoneCount;
  
}

function Task(id, title) {
  this.id = id;
  this.title = title;
  this.done = false;
}

function taskFormSubmitHandler(e) {
  e.preventDefault();
  var inputValue = this.getElementsByClassName('form-control')[0].value;

  if(inputValue.length < 5) {
    alert('The value must be at least 5 characters!');
    return;
  }

  var newTask = new Task(tasks.length + 1, inputValue);

  
  tasks.push(newTask);
  renderTodoList(tasks, true);
  this.getElementsByClassName('form-control')[0].value = '';
}

function checkHandle(elem) {
  var currentElement = elem.closest('.list-group-item');
  var currentElementTitle = currentElement.children[0];
  var currentElementId = currentElement.getAttribute('data-id');

  var currentTask = tasks.find(item => item.id == currentElementId);
  currentTask.done = !currentTask.done;

  renderTodoInfo(tasks);
  currentElementTitle.classList.toggle("done");
  elem.classList.toggle("done");
}

function deleteHandle(elem) {
  var userConfirm = confirm('Do you want to delete this item?');
  if(userConfirm) {
    var currentElementId = elem.closest('.list-group-item').getAttribute('data-id');
    
    var currentTask = tasks.findIndex( item => item.id == currentElementId);
    tasks.splice(currentTask,1);

    renderTodoList(tasks, true);
  }
}

function filterTasks() {
  var FILTER_VALUES = {
    ALL: 1,
    DONE: 2,
    REMAIN: 3
  }
  var filteredTasks = [];

  if(this.value == FILTER_VALUES.ALL) {
    filteredTasks = tasks;
  } else if (this.value == FILTER_VALUES.DONE) {
    filteredTasks = tasks.filter(item => item.done == true);
  } else {
    filteredTasks = tasks.filter(item => item.done == false);
  }

  renderTodoList(filteredTasks, false);
}


function searchTasks() {
  var searchFor = this.value.toLowerCase();

  var searchResults = tasks.filter((item, index) => item.title.toLowerCase().indexOf(searchFor) > -1);

  renderTodoList(searchResults, false);
}

//new task submit form
document.getElementById('task-form').addEventListener('submit', taskFormSubmitHandler);

document.getElementById('filter-tasks').addEventListener("change", filterTasks);

document.getElementById('search-box').addEventListener("keyup", searchTasks);
