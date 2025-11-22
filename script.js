let addTaskButton = document.querySelector('.add-task-btn');
let listsContainer = document.querySelector('.lists');
let sortButton = document.querySelector('.sort');

addTaskButton.addEventListener('click', () => {
    addNewTask();
});


let initialSilButtons = document.querySelectorAll('.sil');
initialSilButtons.forEach(button => {
    button.addEventListener('click', removeTask);
});

let i = 2;
function addNewTask() {
    let newList = document.createElement('div');
    newList.classList.add('list');
    newList.innerHTML = `
        <p>${i}</p>
        <input type="text" class="task-input" placeholder="">
        <button class="sil">x</button>
    `;

    const newSilButton = newList.querySelector('.sil');
    newSilButton.addEventListener('click', removeTask);
    listsContainer.appendChild(newList);
    i++;
    const newTaskInput = newList.querySelector('.task-input');
    newTaskInput.focus();
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addNewTask();
    }

})


function removeTask(e) {
    if (listsContainer.children.length > 1) {
        const taskToRemove = e.target.parentNode;
        listsContainer.removeChild(taskToRemove);
    }
    else if (listsContainer.children.length === 1) {
        listsContainer.children[0].querySelector('.task-input').value = '';
    }
}


sortButton.addEventListener('click', () => {
    let tasks = Array.from(listsContainer.children);
    tasks.sort((a, b) => {
        const taskA = a.querySelector('.task-input').value.toLowerCase();
        const taskB = b.querySelector('.task-input').value.toLowerCase();

        if (taskA < taskB) {
            return -1;
        }
        if (taskA > taskB) {
            return 1;
        }
        return 0;
    });

    listsContainer.innerHTML = '';

    tasks.forEach(task => {
        listsContainer.appendChild(task);
    });
});
