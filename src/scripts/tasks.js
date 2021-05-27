const todos = (name) => {
    var set = {}, get = {}, title = name, description = "", dueDate = "", priority = 1, checkList = 0;
    set.title = (value) => {title = value;}
    set.description = (value) => {description = value;}
    set.dueDate = (value) => {dueDate = value;}
    set.priority = (value) => {priority = value;}
    set.checkList = (value) => {checkList = value;}
    get.title = () => {return(title);}
    get.description = () => {return(description);}
    get.dueDate = () => {return(dueDate);}
    get.priority = () => {return(priority);}
    get.checkList = () => {return(checkList);}
    get.values = () =>{
        const todo = {}
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        todo.checkList = checkList;
        return todo;
    }
    return {set,get};
}

const todosCreate = (title,description,dueDate,priority) => {
    const newTodos = todos(title);
    todosModify(newTodos,title,description,dueDate);
    if(priority!=undefined){newTodos.set.priority(priority);}
    return newTodos;
}

const todosModify = (todos,title,description,dueDate) => {
    if(title!=undefined){todos.set.title(title);}
    if(description!=undefined){todos.set.description(description);}
    if(dueDate!=undefined){todos.set.dueDate(dueDate);}
}

const todosSetPriority = (todos,priority) => {
    console.log("ini");
    console.log(todos);
    todos.set.priority(priority);
}

const todosDone = (todos) => {
    todos.set.checkList(1);
}

export {todosCreate,todosModify,todosSetPriority,todosDone,todos};