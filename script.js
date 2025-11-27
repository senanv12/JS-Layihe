let addTaskButton = document.querySelector('.add-task-btn');
let lists = document.querySelector('.lists');
let sortButton = document.querySelector('.sort');
let ikinciclick = true;
let i = 1;
let plusButton = document.querySelector('.x');


function updateTaskNumbers() {
    const allLists = lists.querySelectorAll('.list');
    i = 1;
    allLists.forEach(list => {
        list.querySelector('p').textContent = i;
        i++;
    });
}

function addDragEvents(element) {
    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    });
}


addTaskButton.addEventListener('click', () => {
    addNew();
});


function addNew() {
    const mainInput = document.querySelector('.main-input');
    const inputContainer = document.querySelector('.input-container');

    if (mainInput.value.trim() === '') {
        inputContainer.classList.add('hidden');
        return;
    }

    const textValue = mainInput.value;
    let newList = document.createElement('div');

    newList.classList.add('list');
    newList.setAttribute('draggable', 'true');

    newList.innerHTML = `
    <p>${i}</p>
    <input type="text" class="task-input" value="${textValue}" placeholder="" readonly>
    <button class="sil"><span>x</span></button>
    `;

    addDragEvents(newList);

    const newSilButton = newList.querySelector('.sil');
    newSilButton.addEventListener('click', remove);

    lists.classList.remove('hidden');

    lists.appendChild(newList);

    i++;
    mainInput.value = '';
    inputContainer.classList.add('hidden');
}

function remove(e) {
    const taskToRemove = e.target.closest('.list');

    if (taskToRemove) {
        lists.removeChild(taskToRemove);



        if (lists.children.length === 0) {
            lists.classList.add('hidden');
            plus();
        }
    }
}

function sortlogo(isHovering) {
    if (ikinciclick) {
        if (isHovering) {
            sortButton.src = "./images/sortdownblacks.svg";
        } else {
            sortButton.src = "./images/sortdowngrays.svg";
        }
    } else {
        if (isHovering) {
            sortButton.src = "./images/sortupblacks.svg";
        } else {
            sortButton.src = "./images/sortupgrays.svg";
        }
    }
}

sortButton.addEventListener('mouseenter', () => {
    sortlogo(true);
});

sortButton.addEventListener('mouseleave', () => {
    sortlogo(false);
});

sortButton.addEventListener('click', () => {
    let tasks = Array.from(lists.children);

    if (ikinciclick) {
        tasks.sort((a, b) => {
            const taskA = a.querySelector('.task-input').value.toLowerCase();
            const taskB = b.querySelector('.task-input').value.toLowerCase();

            if (taskA < taskB) return -1;
            if (taskA > taskB) return 1;
            return 0;
        });
        ikinciclick = false;
    } else {
        tasks.sort((a, b) => {
            const taskA = a.querySelector('.task-input').value.toLowerCase();
            const taskB = b.querySelector('.task-input').value.toLowerCase();

            if (taskA > taskB) return -1;
            if (taskA < taskB) return 1;
            return 0;
        });
        ikinciclick = true;
    }

    lists.innerHTML = '';
    tasks.forEach(task => {
        lists.appendChild(task);
    });


    sortlogo(true);
});

lists.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(lists, e.clientY);

    const dragging = document.querySelector('.dragging');

    if (dragging) {
        if (afterElement == null) {
            lists.appendChild(dragging);
        } else {
            lists.insertBefore(dragging, afterElement);
        }
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function plus() {
    const inputContainer = document.querySelector('.input-container');
    const mainInput = document.querySelector('.main-input');

    inputContainer.classList.remove('hidden');
    mainInput.value = '';
    mainInput.focus();
}


plusButton.addEventListener('click', (e) => {
    plus()
    e.stopPropagation();

});


document.addEventListener('DOMContentLoaded', () => {
    plus();
});


document.addEventListener('keydown', (e) => {
    if (e.key === '+') {
        e.preventDefault()
        plus();
    }
    if (e.key === 'Enter') {
        addNew();
    }
});