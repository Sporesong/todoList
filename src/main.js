let tasks = [];
console.log("hej");
function addTask() {
	let text = document.querySelector(".addToDo").value;
	let ul = document.querySelector("ul");
	const task = document.createElement("li");
	task.innerHTML = `<span><i class="fa fa-trash"></i></span>${text}`;
	console.log();
	ul.appendChild(task);
	tasks.push(task);
}
document.querySelector(".addToDo").addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		addTask();
	}
});