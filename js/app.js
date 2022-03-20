//============= Random Background Image (picsum-photo)

const id = Math.floor(Math.random() * 1000 + 1);
downloadUrl = `https://picsum.photos/id/${id}/1500/900`;

document.body.style.backgroundImage = `url(${downloadUrl})`;

//============= Date, time, weather info and greeting ================//

fetch("https://type.fit/api/quotes")
  .then((res) => res.json())
  .then((data) => {
    const id = Math.floor(Math.random() * 1643 + 1);
    const quoteText = data[id].text;
    const quoteAuthor = data[id].author;

    document.getElementById("quoteText").innerHTML = quoteText;
    document.getElementById("quoteAuthor").innerHTML = `' ${quoteAuthor} '`;
  });

const today = new Date();
const currentDate = today.toString().slice(0, 15);

document.getElementById("date").innerHTML = currentDate;

const apiKey = `37e1d9040c7ab2d43abe80e782cb924c`;
const loc = "luton";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;

document.getElementById("loc").innerHTML = loc;

fetch(weatherUrl)
  .then((res) => res.json())
  .then((data) => {
    const temperature = Math.trunc(data.main.temp) - 273;
    const description = data.weather[0].description;
    const weatherImg = data.weather[0].icon;
    const iconurl = "http://openweathermap.org/img/w/" + weatherImg + ".png";

    document.getElementById("temp").innerHTML = `${temperature}°C`;
    document.getElementById("description").innerHTML = description;
    document.getElementById("weatherImg").src = iconurl;
  });

startTime = () => {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };
  m = checkTime(m);
  s = checkTime(s);

  setTimeout(() => {
    startTime();
  }, 30000);

  localTime = h + ":" + m;

  if (h < 12) {
    greeting = "Good morning";
  } else if (h >= 12 && h < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  document.getElementById("localTime").innerHTML = localTime;
  document.getElementById("greeting").innerHTML = `${greeting}, Akin.`;
};
startTime();

//================= todolist =====================//

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

let todos = [];

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = "";
  }
}

function renderTodos(todos) {
  todoItemsList.innerHTML = "";
  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;
    const li = document.createElement("li");
    // li.setAttribute("class", "item");

    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      <span class="todo-item">${item.name}</span>
      <button name="checkButton" class="checkbox" ${checked}><i class="fas fa-check-square"></i></button>
      <button class="delete-button" name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add("todo-list-item");
    todoItemsList.append(li);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

getFromLocalStorage();
todoItemsList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  if (event.target.name === "checkButton") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});

document.getElementById("clearAll").addEventListener("click", handleClearAll);

function handleClearAll(e) {
  document.querySelector("ul").innerHTML = "";
  localStorage.clear();
}
