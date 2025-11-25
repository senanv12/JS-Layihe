let addTaskButton = document.querySelector('.add-task-btn');
let lists = document.querySelector('.lists');
let sortButton = document.querySelector('.sort');
let ikinciclick = true;
let initialSilButtons = document.querySelectorAll('.sil');
let initialLists = document.querySelectorAll('.list');
let i = 2;

function addDragEvents(element) {
    element.addEventListener('dragstart', () => {
        element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
        element.classList.remove('dragging');
    });
}

initialLists.forEach(item => {
    addDragEvents(item);
});

addTaskButton.addEventListener('click', () => {
    addNew();
});

initialSilButtons.forEach(button => {
    button.addEventListener('click', remove);
});

function addNew() {
    let newList = document.createElement('div');

    newList.classList.add('list');
    newList.setAttribute('draggable', 'true');

    newList.innerHTML = `
    <p>${i}</p>
    <input type="text" class="task-input" placeholder="">
    <button class="sil"><span>x</span></button>
    `;

    const newSilButton = newList.querySelector('.sil');
    newSilButton.addEventListener('click', remove);


    addDragEvents(newList);

    lists.appendChild(newList);

    i++;

    const newTaskInput = newList.querySelector('.task-input');
    // newTaskInput.focus();                                                                elave funksiya

    // newTaskInput.addEventListener('keydown', (e) => {
    //     if (e.key === 'Delete') {                                                         elave funksiya
    //         remove({ target: newSilButton });
    //     }
    // });
}

// document.addEventListener('keydown', (e) => {                                          elave funksiya
//     if (e.key == 'Enter') {      
//         addNew();
//     }
// });

function remove(e) {
    if (lists.children.length > 1) {
        const taskToRemove = e.target.parentNode;
        lists.removeChild(taskToRemove);
    }
    else if (lists.children.length === 1) {
        lists.children[0].querySelector('.task-input').value = '';
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