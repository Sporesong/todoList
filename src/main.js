import "./style/style.scss";
let categoryIcons = {
	FamiljOchVaenner: "diversity_3",
	Studier: "import_contacts",
	Husdjur: "pets",
	Handla: "shopping_bag",
	Standard: ""
};
//ladda upp sparade tasks från local storage
let tasks = [];
window.onload = loadTasks;
function loadTasks() {
	const taskString = localStorage.getItem("tasks");
	tasks = taskString === null ? [] : Array.from(JSON.parse(taskString));
	renderTasks();
}
function renderTasks() {
	const toDoList = document.querySelector(".toDoList");
	toDoList.innerHTML = "";
	tasks.forEach (function createStoredElement(task) {
		const listItem = document.createElement("li");
		listItem.setAttribute("id",task.id);
		listItem.innerHTML +=  `
		<label for="check">	
		<input type="checkbox" id="check${task.id}" class="check" name="check" ${task.completed === true ? "checked" : ""}>
		<span class="material-symbols-outlined">${categoryIcons[task.category]}</span>
		<span class="taskText ${task.completed === true ? "complete" : ""}">${task.text} </span>
		<span class="taskDeadline"> ${task.deadline ? new Date(task.deadline).toDateString() : ""}</span><br>
			<button class="deleteTask">
		</label>
			<span class="material-symbols-outlined">delete</span>
			</button>
		  `;
		toDoList.append(listItem);
		const checkBox = document.querySelector(`#check${task.id}`);
		checkBox.addEventListener("change",toggleCompleteTask);
	});
}
//Skapa uppgiftselement
function renderNewTask(task) {
	const list = document.querySelector(".toDoList");
	const listItem = document.createElement("li");
	listItem.setAttribute("id",task.id);
	listItem.classList.add("listItem");
	listItem.innerHTML = `
	<label for="check">	
	<input type="checkbox" id="check${task.id}" class="check" name="check">
	<span class="material-symbols-outlined">${categoryIcons[task.category]}</span>
	<span class="taskText">${task.text} </span>
	<span class="taskDeadline"> ${task.deadline ? new Date(task.deadline).toDateString() : ""}</span><br>
		<button class="deleteTask">
	</label>
		<span class="material-symbols-outlined">delete</span>
		</button>
	  `;
	list.prepend(listItem);
}
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
	const task = {id: Date.now().toString(), text: text, deadline: deadline, category: category, completed:false};
	tasks.unshift(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
	if (text) {
		input.value = "";
		input.focus();
	}
	else { 
		document.getElementsByName("addToDo")[0].placeholder="Fyll i en uppgift"; 
		//påminnelse att skriva något om man försöker lägga till tom uppgift
	}

	renderNewTask(task);
	//lägg till id på checkbox
	const checkBox = document.querySelector(`#check${task.id}`);
	checkBox.addEventListener("change",toggleCompleteTask);
	//TODO: gör renderTasks funktion och anropa den på rätt ställen i koden, gör så att info hämtas ur localStorage ist. för tasks
	//töm ul i inner html i början av rendertasks 

}
//funktion för att checka i task och flytta dem sist i arrayen
function toggleCompleteTask(event) {
	const index = tasks.findIndex(function compareId(task){
		return event.target.parentElement.parentElement.id === task.id; //checkar li-id
	});
	if (event.target.checked) {
		const task = tasks.splice(index, 1)[0];
		task.completed = true;
		tasks.push(task);
	}
	else {
		tasks[index].completed = false;
	}
	localStorage.setItem("tasks", JSON.stringify(tasks));
	renderTasks();
}