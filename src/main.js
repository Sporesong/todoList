import { doc } from "prettier";
import "./style/style.scss";
//ladda upp sparade tasks från local storage
let tasks = [];
//window.onload = loadTasks;
/*function loadTasks() {
;Array.from(JSON.parse(localStorage.getItem("tasks")));
}
//Skapa uppgiftselement
/*function renderTask(task) {
	const list = document.querySelector(".toDoList");
	const listItem = document.createElement("li");
	const deadlineInput = document.querySelector("#datePicker");
	const deadline = deadlineInput.value;
	listItem.innerHTML = `
	<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
    <span>${task.text} class="task ${task.completed ? "completed" : ""}"</span>
    <button class="deleteTask" onclick="removeTask(this)>
	<span class="material-symbols-outlined">delete</span>
	</button>
  `;
	list.append(listItem);
}*/

//spara uppgift när man trycker på lägg till knappen
const addToDoButton = document.querySelector(".addToDoButton");
addToDoButton.addEventListener("click", addTask);
function addTask(event) {
	event.preventDefault();
	const input = document.querySelector("#addToDo");
	const text = input.value;
	const deadlineInput = document.querySelector("#datePicker");
	const deadline = deadlineInput.value ? new Date(deadlineInput.value).getTime() : "";
	const categoryPicker =  document.querySelector("#categoryPicker");
	const category = categoryPicker.value ?? null; 
	const task = {id: Date.now(), text: text, deadline: deadline, category: category};
	console.log(task);
	tasks.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
	if (text) {
		input.value = "";
		input.focus();
	}
	else { 
		document.getElementsByName("addToDo")[0].placeholder="Fyll i en uppgift"; 
		//påminnelse att skriva något om man försöker lägga till tom uppgift
	}//TODO: gör så att kategori återställs till tomt värde efter varje submit-klick, samma för datum.
}

