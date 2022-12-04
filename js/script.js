{
    const tasks = [
        { },
];

const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
        <li>
        ${task.content}
        </li>
        `;
    }
document.querySelector(".js-tasks").innerHTML = htmlString;
};

const onFormSubmit = (event) => {
    event.preventDefault();
};

const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
};

init();

}