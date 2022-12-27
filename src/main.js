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
function loadTasks() {//ska bli renderAllTasks
	tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	console.log(tasks);
	console.log(tasks[0]);

}
//Skapa uppgiftselement
function renderNewTask(task) {
	const list = document.querySelector(".toDoList");
	const listItem = document.createElement("li");
	listItem.setAttribute("id",task.id);
	listItem.innerHTML = `
	<label for="check">	
	<input type="checkbox" id="check${task.id}" class="check" name="check" value="yes">
	<span class="taskText">${task.text} </span>
	<span class="material-symbols-outlined">${categoryIcons[task.category]}</span>
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
	console.log(checkBox);
	checkBox.addEventListener("change",toggleCompleteTask);
	//TODO: gör renderTasks funktion och anropa den på rätt ställen i koden, gör så att info hämtas ur localStorage ist. för tasks

}
//funktion för att checka i task och stryka över texten samt flytta dem sist i arrayen
function toggleCompleteTask(event) {
	if (event.target.checked) {
		event.target.parentNode.querySelector(".taskText").classList.add("complete");
		const index = tasks.findIndex(function compareId(task){
			return event.target.parentElement.parentElement.id === task.id; //checkar li-id
		});
		const task= tasks.splice(index, 1)[0];
		tasks.push(task);
		console.log(tasks);
	}
	else {
		event.target.parentNode.querySelector(".taskText").classList.remove("complete");

	}
}


