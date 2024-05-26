document.addEventListener('DOMContentLoaded', function() {
    const columnsContainer = document.getElementById('columns-container');
    let draggingColumn = null;
    let draggingTask = null;

    columnsContainer.addEventListener('dragstart', function(event) {
        if (event.target.classList.contains('column')) {
            draggingColumn = event.target;
            setTimeout(function() {
                draggingColumn.classList.add('ghost');
            }, 0);
        } else if (event.target.classList.contains('task')) {
            draggingTask = event.target;
            setTimeout(function() {
                draggingTask.classList.add('ghost');
            }, 0);
        }
    });

    columnsContainer.addEventListener('dragend', function(event) {
        if (draggingColumn) {
            draggingColumn.classList.remove('ghost');
            draggingColumn = null;
        } else if (draggingTask) {
            draggingTask.classList.remove('ghost');
            draggingTask = null;
        }
    });

    columnsContainer.addEventListener('dragover', function(event) {
        event.preventDefault();
        const closestColumn = event.target.closest('.column');
        if (closestColumn && closestColumn !== draggingColumn) {
            const rect = closestColumn.getBoundingClientRect();
            const next = (event.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            columnsContainer.insertBefore(draggingColumn ? draggingColumn : draggingTask, next ? closestColumn.nextSibling : closestColumn);
        }
    });

    columnsContainer.addEventListener('drop', function(event) {
        event.preventDefault();
        const closestColumn = event.target.closest('.column');
        if (closestColumn && draggingTask && closestColumn !== draggingTask.closest('.column')) {
            closestColumn.querySelector('ul').appendChild(draggingTask);
        }
    });

    function createTask(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.className = 'task';
        li.draggable = true;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            li.remove();
        });
        
        li.appendChild(deleteButton);
        
        li.addEventListener('click', function() {
            toggleTaskCompleted(li);
        });
        
        return li;
    }

    function addTask(list, input) {
        const text = input.value.trim();
        if (text) {
            const task = createTask(text);
            list.appendChild(task);
            input.value = '';
        }
    }

    function toggleTaskCompleted(task) {
        task.classList.toggle('completed');
    }

    document.getElementById('add-work-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('work-list'), document.getElementById('work-input'));
    });

    document.getElementById('add-personal-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('personal-list'), document.getElementById('personal-input'));
    });

    document.getElementById('add-health-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('health-list'), document.getElementById('health-input'));
    });

    document.getElementById('add-education-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('education-list'), document.getElementById('education-input'));
    });

    document.getElementById('add-financial-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('financial-list'), document.getElementById('financial-input'));
    });

    document.getElementById('add-social-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(document.getElementById('social-list'), document.getElementById('social-input'));
    });
});
