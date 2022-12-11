{
    let tasks = [
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            }];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        // tasks[taskIndex].done = !tasks[taskIndex].done;
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex], done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1)
        ];
  
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    }

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const deleteButtons = document.querySelectorAll(".js-delete");
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <div class="list__item${task.done ? " list__item--done" : ""}">
        <button class="js-done list__button${task.done ? " list__button--done" : ""}"></button>
        <span class="list__content">${task.content}</span>
        <button class="js-delete list__button list__button--delete"></button>
        </div>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.focus();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}