const projects = (() => {
    const todos = (name) => {
        var title = name, description = "", dueDate = "", priority = 1, checkList = 0, project = "";
        return {title,description,dueDate,priority,checkList,project};
    }

    var tasks = [];

    const addTask = (title,description,dueDate,priority,project) => {
        const newTodos = todos(title);
        todosModify(newTodos,title,description,dueDate,priority,project);
        tasks.push(newTodos);
    }

    const todosModify = (task,title,description,dueDate,priority,project) => {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority
        task.project = project;
    }

    const removeTask = (index) => {
        tasks.splice(index,1);
    }

    const getTasksByProject = (projectTitle) => {
        var taskList = [];
        for(var i = 0;i<tasks.length;i++){
            if(tasks[i].project==projectTitle){
                taskList.push([tasks[i], i]);
            }
        }
        return taskList;
    }

    const removeTaskByProject = (projectTitle) => {
        for(var i = tasks.length-1; i>-1; i--){
            if(tasks[i].project==projectTitle){
                tasks.splice(i,1);
            }
        }
    }

    const getTasksbyDay = (today) => {
        var taskList = [];
        for(var i = 0;i<tasks.length;i++){
            if(tasks[i].dueDate==today){
                taskList.push([tasks[i], i]);
            }
        }
        return taskList;
    }
    
    const getTasksByIndex = (index) => {
        return tasks[index];
    }

    const changePriority = (index,priority) => {
        tasks[index].priority = priority;
    }

    const done = (index) => {
        tasks[index].checkList = 1;
    }

    const getProjectName = (index) => {
        return tasks[index].project;
    }

    const getTasksNumber = () => {
        return tasks.length;
    }

    return {addTask,removeTask,getTasksByIndex,getTasksByProject,changePriority,done,getProjectName,getTasksNumber,todosModify,getTasksbyDay,removeTaskByProject};
})();

const projectsCreate = (name) => {
    const newProject = projects(name);
    return newProject;
}

const projectList = (function(){
    var listOfProjects = [];
    const addProject=(project) => {
        listOfProjects.push(project);
    }
    const removeProject=(index) => {
        listOfProjects.splice(index,1);
    }
    const addTaskToProject = (index,task) => {
        listOfProjects[index].addTask(task);
    }
    const getProject = (index) => {
        return listOfProjects[index];
    }
    const getAllProjects = () => {
        return listOfProjects;
    }
    const showProjectContent = () => {
        let output = []
        for(let i=0; i<listOfProjects.length;i++){
            //output.push(listOfProjects[i].getTitle());
            output.push(listOfProjects[i]);
        }
        return output;
    }
    const getProjectsNumber = () => {
        return listOfProjects.length;
    }
    return {addProject,removeProject,addTaskToProject,getProject,getAllProjects,showProjectContent,getProjectsNumber};
})();

export {projectsCreate,projects,projectList}