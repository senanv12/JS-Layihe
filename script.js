let addTaskButton = document.querySelector('.add-task-btn');
let lists = document.querySelector('.lists');
let sortButton = document.querySelector('.sort');

let ikinciclick = true;

addTaskButton.addEventListener('click', () => {
    addNew();
});

let initialSilButtons = document.querySelectorAll('.sil');
initialSilButtons.forEach(button => {
    button.addEventListener('click', remove);
});

let i = 2;
function addNew() {
    let newList = document.createElement('div');
    newList.classList.add('list');
    newList.innerHTML = `
    <p>${i}</p>
    <input type="text" class="task-input" placeholder="">
    <button class="sil">x</button>
    `;

    const newSilButton = newList.querySelector('.sil');
    newSilButton.addEventListener('click', remove);
    lists.appendChild(newList);
    i++;
    const newTaskInput = newList.querySelector('.task-input');
    newTaskInput.focus();
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addNew();
    }
})

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
            const idA = parseInt(a.querySelector('p').textContent, 10);
            const idB = parseInt(b.querySelector('p').textContent, 10);
            return idA - idB;
        });
        ikinciclick = true;
    }

    lists.innerHTML = '';
    tasks.forEach(task => {
        lists.appendChild(task);
    });

    sortlogo(true);
});
