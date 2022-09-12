const taskInput = document.querySelector("input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

todoListItem = JSON.parse(localStorage.getItem("todo-list-items"));

taskInput.addEventListener("keyup", (e) => {
  // getting input
  let inputTextVal = taskInput.value.trim();
  if (e.key == "Enter" && inputTextVal) {
    // if (!isTask) {
    todoListItem = !todoListItem ? [] : todoListItem;
    let taskInfo = { name: inputTextVal, status: "pending" };
    todoListItem.push(taskInfo);
    taskInput.value = "";
    localStorage.setItem("todo-list-items", JSON.stringify(todoListItem));
    showTodoList(document.querySelector("span.all").id);
  }
});
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.all").classList.remove("all");
    btn.classList.add("all");
    showTodoList(btn.id);
  });
});

function showTodoList(filter) {
  let html = "";
  if (todoListItem) {
    todoListItem.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        html += `<li class="task" id="taskdel">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" class="checklist" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="delete-task">
                                <ul class="task-menu">
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="fa-solid fa-trash-can" id='trash-Box'></i>
                                    </li>
                                </ul>
                            </div>
                        </li>`;
      }
    });
  }
  if (todoListItem == 0) {
    taskBox.innerHTML = `<span>No Tasks Available</span>`;
  } else {
    taskBox.innerHTML = html;
  }
  showTotalItems(todoListItem.length);
}
showTodoList("all");

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todoListItem[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todoListItem[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list-items", JSON.stringify(todoListItem));
}

// delete a perticular task
function deleteTask(deleteId, filter) {
  todoListItem.splice(deleteId, 1);
  localStorage.setItem("todo-list-items", JSON.stringify(todoListItem));
  showTodoList(filter);
}

// function check all the tasks
function deleteCheckedTask(id,filter) {
  let allElemets = document.getElementsByClassName("checklist");
  Array.from(allElemets).forEach((elem) => {
    if (elem.checked==true) {
      deleteTask(id, filter)
    }
    localStorage.setItem("todo-list-items", JSON.stringify(todoListItem));
  })
  }

// clear all the list
clearAll.addEventListener("click", () => {
  todoListItem.splice(0, todoListItem.length);
  localStorage.setItem("todo-list-items", JSON.stringify(todoListItem));
  showTodoList();
});

// function to show total left Items
function showTotalItems(n) {
  let taskAvail = document.getElementById("taskAvail");
  // let taskLeft = document.getElementsByClassName("taskLeft");
  let html = `
        <p class="taskLeft">${n} tasks Left</p>
    `;
  if (todoListItem.length == 0) {
    taskAvail.innerHTML = `<p id="noTask">No Tasks Available</p>`;
  } else {
    taskAvail.innerHTML = html;
  }
}
