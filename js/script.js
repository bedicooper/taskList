{
    const tasks = [
        ];

const addNewTask = (newTaskContent) => {
    tasks.push({
        content: newTaskContent,
        done: false,
    });

    render();
};

const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
        <li class="list__item${task.done ? " list__item--done" : ""}">
        <button class="js-done list__button${task.done ? " list__button--done" : ""}"></button>
        <span class="list__content">${task.content}</span>
        <button class="js-delete list__button list__button--delete"></button>
        </li>
        `;
    }
document.querySelector(".js-tasks").innerHTML = htmlString;
console.log(tasks);
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    addNewTask(newTaskContent);
};

const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
};

init();

}