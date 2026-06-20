// ---------- Todo List ----------
var todos = [];
var todoFilter = 'all';

function loadTodos() {
    var saved = localStorage.getItem('todos');
    if (saved) {
        try {
            todos = JSON.parse(saved);
        } catch (e) {
            todos = [];
        }
    }
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    var input = document.getElementById('todoInput');
    if (!input) return;
    var text = input.value.trim();
    if (text === '') return;
    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    saveTodos();
    input.value = '';
    renderTodos();
}

function toggleTodo(id) {
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].completed = !todos[i].completed;
            break;
        }
    }
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    var newTodos = [];
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id !== id) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    var newTodos = [];
    for (var i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            newTodos.push(todos[i]);
        }
    }
    todos = newTodos;
    saveTodos();
    renderTodos();
}

function setFilter(filter) {
    todoFilter = filter;
    var buttons = document.querySelectorAll('.todo-filter-btn');
    buttons.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderTodos();
}

function renderTodos() {
    var list = document.getElementById('todoList');
    var countEl = document.getElementById('todoCount');
    if (!list) return;

    var filtered = [];
    for (var i = 0; i < todos.length; i++) {
        if (todoFilter === 'active' && todos[i].completed) continue;
        if (todoFilter === 'completed' && !todos[i].completed) continue;
        filtered.push(todos[i]);
    }

    var activeCount = 0;
    for (var i = 0; i < todos.length; i++) {
        if (!todos[i].completed) activeCount++;
    }

    list.innerHTML = '';
    for (var i = 0; i < filtered.length; i++) {
        var item = filtered[i];
        var li = document.createElement('li');
        li.className = 'todo-item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = item.completed;
        (function (id) {
            checkbox.addEventListener('change', function () {
                toggleTodo(id);
            });
        })(item.id);

        var span = document.createElement('span');
        span.className = 'todo-text' + (item.completed ? ' completed' : '');
        span.textContent = item.text;

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-delete-btn';
        deleteBtn.textContent = '✕';
        (function (id) {
            deleteBtn.addEventListener('click', function () {
                deleteTodo(id);
            });
        })(item.id);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }

    if (countEl) {
        countEl.textContent = activeCount + ' task' + (activeCount !== 1 ? 's' : '') + ' remaining';
    }
}

function initTodo() {
    var input = document.getElementById('todoInput');
    var addBtn = document.getElementById('todoAddBtn');
    var clearBtn = document.getElementById('todoClearBtn');

    if (addBtn) {
        addBtn.addEventListener('click', addTodo);
    }
    if (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') addTodo();
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCompleted);
    }

    var filterBtns = document.querySelectorAll('.todo-filter-btn');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setFilter(btn.dataset.filter);
        });
    });

    loadTodos();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initTodo);