let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveButton = document.getElementById("saveButton");
let addTodos = document.getElementById("addTodos");
let myArray = ["#FFFFED", "#EDF6FF", "#F6EDFF", "#EDFFFF", "#FFEDFF", "#EDEDFF", "#FFFFF1", "#F0FFED", "#FFF0ED", "#FFEDFA", "#E6E6D7", "#d0d2ff", "#ffe6d0", "#eaffd0", "#d0eaff", "#d0fffd", "#ffd0d2", "#fffeea", "#fff9d0", "#f5ffd0", "#fffdd0", "#fffb9d", "#ebebe4", "#efeee0", "#f4f3db", "#f8f6d7", "#fffdd0", "#DACAA3", "#FFF1A8", "#FFEAAD", "#FAFBDA", "#B2EBF9", "#E4D9C5", "E1D9C5", "#E8E1C7", "#e6ddc5", "#dee6c4", "#c4cde6", "#e6ddc4", "#efeadb"];
let pendingElement = document.getElementById("pending");

function getTodoItemLocalStorage() {
    let stringify = localStorage.getItem("todoList");
    let parse = JSON.parse(stringify);
    if (parse === null) {
        return [];
    } else {
        return parse;
    }
}





let todoList = getTodoItemLocalStorage();
let todosCount = todoList.length;
let pendingCount = 0;
pendingElement.textContent = pendingCount;

function oncheckboxStatus(uniqueIdCheck, uniqueLabel, todoId) {
    let label = document.getElementById(uniqueLabel);
    label.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueno;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function deleteTodo(todoId) {
    let todoContainerel = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoContainerel);
    let deleteTodoItem = todoList.findIndex(function(eachTodo) {
        let todoItem = "todo" + eachTodo.uniqueno;
        if (todoItem === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoItem, 1);

}

function createAndAppendTodo(todo) {

    let uniqueIdCheck = "checkbox" + todo.uniqueno;
    let uniqueLabel = "label" + todo.uniqueno;
    let todoId = "todo" + todo.uniqueno;
    pendingCount = pendingCount + 1;
    pendingElement.textContent = pendingCount;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = uniqueIdCheck;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        oncheckboxStatus(uniqueIdCheck, uniqueLabel, todoId);
    };
    let colorIndex = Math.ceil(Math.random() * (myArray.length) - 1);
    let colorValue = myArray[colorIndex];
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    labelContainer.style.backgroundColor = colorValue;
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", uniqueIdCheck);
    labelElement.classList.add("checkbox-label");
    labelElement.id = uniqueLabel;
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        deleteTodo(todoId);
        pendingCount = pendingCount - 1;
        if (pendingCount === 0) {
            pendingElement.textContent = "Super! You Have Completed All Works.";
            pendingElement.classList.add("completed");
        } else {
            pendingElement.textContent = pendingCount;
        }

    };
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function addTodoItem() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;


    let newTodo = {
        text: userInputValue,
        uniqueno: todosCount,
        isChecked: false

    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";

}
addTodos.onclick = function() {
    addTodoItem();
}
