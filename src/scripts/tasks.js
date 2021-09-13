const todos = (name) => {
    var title = name, description = "", dueDate = "", priority = 1, checkList = 0, project = "";
    return {title,description,dueDate,priority,checkList,project};
}

const todosCreate = (title,description,dueDate,priority,project) => {
    const newTodos = todos(title);
    todosModify(newTodos,title,description,dueDate,priority,project);
    return newTodos;
}

const todosModify = (todos,title,description,dueDate,priority,project) => {
    todos.title = title;
    todos.description = description;
    todos.dueDate = dueDate;
    todos.priority = priority
    todos.project = project;
}

const todosSetPriority = (todos,priority) => {
    todos.priority = priority;
}

const todosDone = (todos) => {
    todos.set.checkList(1);
}

export {todosCreate,todosModify,todosSetPriority,todosDone,todos};