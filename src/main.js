import "./style/style.scss";
let categoryIcons = {
	FamiljOchVaenner: "diversity_3",
	Studier: "import_contacts",
	Husdjur: "pets",
	Handla: "shopping_bag",
	Standard: ""
};
//ladda upp sparade tasks från local storage och kalla på att rita ut tasks
let tasks = [];
window.onload = loadTasks;
function loadTasks() {
	const taskString = localStorage.getItem("tasks");
	tasks = taskString === null ? [] : Array.from(JSON.parse(taskString));
	renderTasks();
}
//rita ut tasks från localstorage arrayen
function renderTasks() {
	const toDoList = document.querySelector(".toDoList");
	toDoList.innerHTML = ""; // töm Ul innan tasks ritas ut på nytt
	tasks.forEach (function createStoredElement(task) { //loopa igenom taskslistan och skapa li till varje task
		const listItem = document.createElement("li");
		listItem.setAttribute("id",task.id);
		listItem.innerHTML +=  `
		<label for="check">	
		<input type="checkbox" id="check${task.id}" class="check" name="check" ${task.completed === true ? "checked" : ""}>
		<span class="material-symbols-outlined">${categoryIcons[task.category]}</span>
		<span class="taskText ${task.completed === true ? "complete" : ""}">${task.text} </span>
		<span class="taskDeadline"> ${task.deadline ? new Date(task.deadline).toDateString() : ""}</span><br>
			<button class="deleteTask">
				<span class="material-symbols-outlined">delete</span>
			</button>
		</label>
		  `;
		toDoList.append(listItem);
		const checkBox = document.querySelector(`#check${task.id}`); // lägg till eventlisteners 
		checkBox.addEventListener("change",toggleCompleteTask);
		const deleteTaskButton = listItem.querySelector(".deleteTask");
		deleteTaskButton.addEventListener("click", deleteTask);
	});
}
//rita ut nya tasks när man trycker på lägg till knappen
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
			<span class="material-symbols-outlined">delete</span>
		</button>
	</label>
	  `;
	list.prepend(listItem);
}
//spara uppgift när man trycker på lägg till knappen
const addToDoButton = document.querySelector(".addToDoButton");
addToDoButton.addEventListener("click", addTask);
function addTask(event) {
	event.preventDefault(); //gör att sidan inte laddar om
	const input = document.querySelector("#addToDo");
	const text = input.value;
	const deadlineInput = document.querySelector("#datePicker");
	const deadline = deadlineInput.value ? new Date(deadlineInput.value).getTime() : "";
	const categoryPicker =  document.querySelector("#categoryPicker");
	const category = categoryPicker.value ?? null; 
	const task = {id: Date.now().toString(), text: text, deadline: deadline, category: category, completed:false};
	tasks.unshift(task);
	localStorage.setItem("tasks", JSON.stringify(tasks)); //sparar i local storage
	if (text) { // tömmer input så man kan skriva något nytt
		input.value = "";
		input.focus();
	}
	else { 
		document.getElementsByName("addToDo")[0].placeholder="Fyll i en uppgift"; 
		//påminnelse att skriva något om man försöker lägga till tom uppgift
	}

	renderNewTask(task);
	//lägg till eventlisteners 
	const checkBox = document.querySelector(`#check${task.id}`);
	checkBox.addEventListener("change",toggleCompleteTask);
	const deleteTaskButton = document.querySelector(".deleteTask");
	deleteTaskButton.addEventListener("click", deleteTask);
	//TODO: ta bort check id? Flytta på eventlisteners deklaration?

}
//funktion för att checka i task som klar och flytta dem sist i arrayen
function toggleCompleteTask(event) {
	const index = tasks.findIndex(function compareId(task){
		return event.target.parentElement.parentElement.id === task.id; //checkar li-id
	});
	if (event.target.checked) { //ta bort ur sin plats på listan och lägger till sist i listan
		const task = tasks.splice(index, 1)[0];
		task.completed = true;
		tasks.push(task);
	}
	else {
		tasks[index].completed = false; //ta bort check ur rutan
	}
	localStorage.setItem("tasks", JSON.stringify(tasks)); //spara till localstorage och rita ut
	renderTasks();
}
function deleteTask(event) { //ta bort task vi tryck på delete knappen
	const index = tasks.findIndex(function compareId(task){
		return event.target.parentElement.parentElement.parentElement.id === task.id; //checkar li-id
	});
	tasks.splice(index, 1);
	localStorage.setItem("tasks", JSON.stringify(tasks)); //sparar i localstorage och ritar ut
	renderTasks();
}
//sorteringsfunktion
const sortIcon = document.querySelector(".sortIcon");
sortIcon.addEventListener("change", sortTasks);
function sortTasks() {
	const sortValue = sortIcon.value;
	if (sortValue === "deadline") {
		tasks.sort((a, b) => a.deadline - b.deadline);
	} else if (sortValue === "text") {
		tasks.sort((a, b) => a.text.localeCompare(b.text));
	} else if (sortValue === "tillagd") {
		tasks.sort((a, b) => b.id - a.id);
	}
	
	renderTasks();
}
const sortItemsLabel = document.querySelector(".sortItemsLabel");
sortItemsLabel.addEventListener("click", toggleSort);
const sortSelect = document.querySelector("#sortItems");
function toggleSort () {
	if (sortSelect.classList.contains("hidden")) {
		sortSelect.classList.remove("hidden");
	} else {
		sortSelect.classList.add("hidden");
	}
}