import { todosSetPriority } from "./tasks";

const projects = (name) => {
    var title = name, tasks = [];
    const addTaskLast = (todos) => {
        tasks.push([tasks.length,todos]);
    }
    const addTask = (todos) => {
        if(tasks.length==0){
            addTaskLast(todos);
        }
        else{
            for(let i = 0;i<tasks.length;i++){
                if(tasks[i][1].get.priority()>todos.get.priority()){
                    tasks.splice(i,0,[i,todos]);
                    updateIndexAdd(i);
                    break;
                }
                else if(i==tasks.length-1){
                    addTaskLast(todos);
                    break;
                }
            }
        }   
    }
    const removeTask = (index) => {
        tasks.splice(index,1);
        updateIndexRemove(index);
    }
    const updateIndexRemove = (index) => {
        for(var i=index; i<tasks.length; i++){
            tasks[i][0] = i;
        }
    }
    const updateIndexAdd = (index) => {
        for(let i = index+1; i<tasks.length; i++){
            tasks[i][0] = i;
        }
    }
    const getTasks = () => {
        return tasks;
    }
    const changePriority = (index,priority) => {
        var tempTodos = tasks.splice(index,1)[0][1];
        updateIndexRemove(index);
        todosSetPriority(tempTodos,priority);
        addTask(tempTodos);
    }
    const getTitle = () => {
        return title;
    }
    return {addTask,removeTask,getTasks,changePriority,getTitle};
}

const projectsCreate = (name) => {
    const newProject = projects(name);
    return newProject;
}

const showProjectContent = (project) => {
    var output = []
    for(let i=0; i<project.length;i++){
        output.push(project[i][1].get.values());
    }
    return output;
}

var projectList = (function(){
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
    return {addProject,removeProject,addTaskToProject,getProject};
})();

export {projectsCreate,projects,showProjectContent,projectList}