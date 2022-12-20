import "style/style.scss";

let tasks = [];

//Skapa uppgiftselement
function renderTask(task) {
	const list = document.querySelector(".toDoList");
	const isDone = task.checked ? "done":"";
	const listItem = document.createElement("li");
	listItem.setAttribute("class", `task ${isDone}`);
	listItem.setAttribute("data-key", task.id);
	listItem.innerHTML = "";
}

//lägg till uppgifter i array
function addTask(text) {
	const task = {text: text, checked: false, id: Date.now()};

	tasks.push(task);
	console.log(tasks);
}
//spara uppgift när man trycker på lägg till knappen
const addToDoButton = document.querySelector(".addToDoButton");
addToDoButton.addEventListener("submit", submitEvent());
function submitEvent() {
	submitEvent.preventDefault();
	const input = document.querySelector(".addToDo");
	const text = input.value;
	if (text !== "") {
		addTask(text);
		input.value = "";
		input.focus();
	}
	else { 
		document.getElementsByName("addToDo")[0].placeholder="Fyll i en uppgift";
	}
}
