{
    let tasks = [
    ];

    let doneTasksHidden = false;

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

    const markAllTasksAsDone = () => {
        tasks = tasks.map((item) => ({ ...item, done: true, }));
        render();
    };

    const toggleHideAllDoneTasks = () => {
        doneTasksHidden = !doneTasksHidden;
        render();
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindDeleteEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");
        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const bindEditButtonsEvents = () => {
        const hideAllDoneButton = document.querySelector(".js-hideAllDone");
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (tasks.length !== 0) {
            markAllDoneButton.addEventListener("click", () => {
                markAllTasksAsDone();
            });
            hideAllDoneButton.addEventListener("click", () => {
                toggleHideAllDoneTasks();
            });
        };
    };

    const renderTasksList = () => {
        let taskListHtml = "";

        for (const task of tasks) {
            taskListHtml += `
                <li class="list__item${task.done & doneTasksHidden ? " list__item--hidden list__item--done" : task.done ? " list__item--done" : ""}">
                    <button title="toggle done" class="js-done list__button${task.done ? " list__button--done" : ""}"></button>
                    <span class="list__content">${task.content}</span>
                    <button title="delete task" class="js-delete list__button list__button--delete"></button>
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = taskListHtml;
    };

    const renderListEditButtons = () => {
        let listEditButtonsHtml = "";
        if (tasks.length !== 0) {
            listEditButtonsHtml += `
                <button class="list__editButton js-hideAllDone">${doneTasksHidden ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
                <button class="list__editButton js-markAllDone"${tasks.every(({ done }) => done) ? " disabled" : ""}>Ukończ wszystkie</button>
            `;
        }
        document.querySelector(".js-listEditButtons").innerHTML = listEditButtonsHtml;
    };

    const render = () => {
        renderTasksList();
        renderListEditButtons();

        bindToggleDoneEvents();
        bindDeleteEvents();
        bindEditButtonsEvents();
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