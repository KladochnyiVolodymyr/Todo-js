const tasks = [
  { id: 1, title: "Go to the cinema", done: false },
  { id: 2, title: "Go to the theatre", done: true },
  { id: 3, title: "Learn Java Script", done: false },
  { id: 4, title: "Finish HTML project", done: false },
];

function handleTasks() {}

renderTodoList(tasks, true);

function renderTodoList (tasks, renderInfo) {
  var tasksList = document.getElementById('tasks-box');
  var renderListHtml = '';
  tasks.forEach((task) => {
    renderListHtml += `<li class="list-group-item  d-flex" data-id=${task.id}> <span class="${task.done ? 'done' : '' }">${task.title}</span> <div class="icons-box ml-auto"> <i class="fa fa-check mr-3 ${task.done ? 'done' : '' }"></i> <i  class="fa fa-trash"></i> </div> </li>`
  })
  tasksList.innerHTML = renderListHtml;
  document.querySelectorAll('.fa-check').forEach(item => {
    item.addEventListener('click', checkHandle);
  })
  document.querySelectorAll('.fa-trash').forEach(item => {
    item.addEventListener('click', deleteHandle);
  })

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
  if(tasks.length) {
    document.getElementById('tasks-info').style.display = "block"
    var tasksTotal = document.getElementById('tasks-total');
    var tasksDone = document.getElementById('tasks-done');
    var tasksRemain = document.getElementById('tasks-remain');
  
    tasksTotal.innerHTML = tasks.length;
    tasksDone.innerHTML = filterArr(tasks, true).length;
    tasksRemain.innerHTML = filterArr(tasks, false).length;
  } else {
    document.getElementById('tasks-info').style.display = "none"
  }
  
}


function getInputValue(e) {
  e.preventDefault();
  var inputValue = this.getElementsByClassName('form-control')[0].value;
  var newTask = {
    id: tasks.length + 1,
    title: inputValue,
    done: false
  }
  if(inputValue.length >= 5) {
    tasks.push(newTask);
    renderTodoList(tasks, true);
    this.getElementsByClassName('form-control')[0].value = '';
  } else {
    alert('The value must be at least 5 characters!');
  }
}

function checkHandle() {
  var currentElement = this.closest('.list-group-item');
  var currentElementTitle = currentElement.children[0];
  var currentElementId = currentElement.getAttribute('data-id');

  tasks.forEach(item => {
    if(item.id == currentElementId) {
      item.done = !item.done;
    }
  });

  renderTodoInfo(tasks);
  currentElementTitle.classList.toggle("done");
  this.classList.toggle("done");
}

function deleteHandle() {
  var userConfirm = confirm('Do you want to delete this item?');
  if(userConfirm) {
    var currentElementId = this.closest('.list-group-item').getAttribute('data-id');
    for (var i =0; i < tasks.length; i++) {
      if (tasks[i].id == currentElementId) {
        tasks.splice(i,1);
      }
    }
    renderTodoList(tasks, true);
  }
}

function filterTasks() {
  var filteredTasks = [];
  if(this.value == 1) {
    filteredTasks = tasks;
  } else if (this.value == 2) {
    filteredTasks = tasks.filter(item => item.done == true);
  } else {
    filteredTasks = tasks.filter(item => item.done == false);
  }
  renderTodoList(filteredTasks, false);
}


function searchTasks() {
  var searchFor = this.value.toLowerCase();
  var searchResults = [];

  for(var i=0; i < tasks.length; i++){
    if(tasks[i].title.toLowerCase().indexOf(searchFor) > -1) {
      searchResults.push( { id: tasks[i].id, title: tasks[i].title, done: tasks[i].done });
    }
  }

  renderTodoList(searchResults, false);
}

//new task submit form
document.getElementById('task-form').addEventListener('submit', getInputValue);

document.getElementById('filter-tasks').addEventListener("change", filterTasks);

document.getElementById('search-box').addEventListener("keyup", searchTasks);