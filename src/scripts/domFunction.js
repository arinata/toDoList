import '../styles/style.css';
import { projects, projectList } from './projects';
import {activeTaskFamily,showTask,modifiedTaskIndex,modify,changeTaskColor,generateProjectsList,
    showTasks, showAddedProject, projectIndexToBeDeleted, showTaskForm} from './styler';
import {writeTaskToLocal,writeProjectToLocal,rewriteTasksProjectsToLocal} from './localStorage';
import { addDays, format } from 'date-fns';

const childrenRemover = (parentElement) => {
    while(document.getElementById(parentElement).hasChildNodes()){
        document.getElementById(parentElement).removeChild(document.getElementById(parentElement).firstChild);
    }
}

const childRemover = (parentElement,index) => {
    document.getElementById(parentElement).removeChild(document.getElementById(parentElement).childNodes[index]);
    console.log("masuk")
    console.log(parentElement)
    console.log(document.getElementById(parentElement).childNodes);
}

document.getElementById("addCancelButton").addEventListener('click',function(e){
    document.getElementById("addTaskBG").style.display="none";
})

document.getElementById("addConfirmButton").addEventListener('click',function(e){
    let tanggalInput = document.getElementById("datepicker").value;
    //console.log(formatDateISO(tanggalInput));
    var title = document.getElementById("addTaskName").value;
    var description = document.getElementById("addDescription").value;
    var dueDate = document.getElementById("datepicker").value;
    var priority = document.getElementById("selectPriority").value;
    var project = document.getElementById("selectProject").value;
    if((title != "")&&(dueDate != "")){
        document.getElementById("addTaskBG").style.display="none";
        if(modify==0){
            projects.addTask(title,description,dueDate,priority,project);
            writeTaskToLocal(projects.getTasksNumber()-1);
            if(project==activeTaskFamily){
                let childIndex = (document.getElementById("contentContainer").childElementCount-1)/2;
                let taskIndex = projects.getTasksNumber()-1;
                let task = [projects.getTasksByIndex(taskIndex), taskIndex];
                showTask(childIndex,task);
            }
        }
        else if(modify==1){
            projects.todosModify(projects.getTasksByIndex(modifiedTaskIndex),title,description,dueDate,priority,project);
            document.getElementById("taskTitle"+modifiedTaskIndex).textContent = title;
            document.getElementById("dueDate"+modifiedTaskIndex).textContent = dueDate;
            document.getElementById("selectPriority"+modifiedTaskIndex).value = priority;
            changeTaskColor(projects.getTasksByIndex(modifiedTaskIndex),modifiedTaskIndex);
            writeTaskToLocal(modifiedTaskIndex);
        }
    }
})

document.getElementById("addProjectIcon").addEventListener('click',function(e){
    document.getElementById("addProjectBG").style.display="block";
}) 
window.onclick = function(event) {
    if (event.target == document.getElementById("addProjectBG")) {
        document.getElementById("addProjectBG").style.display = "none";
    }
  }
document.getElementById("addNewProjectIcon").addEventListener('click',function(e){
    if(document.getElementById("addProjectName").value != ""){
        projectList.addProject(document.getElementById("addProjectName").value);
        document.getElementById("addProjectBG").style.display = "none";
        console.log(document.getElementById("addProjectName").value);
        console.log(projectList.showProjectContent());
        showAddedProject();
    }
})

document.getElementById("tabContainer1").addEventListener('click',function(e){
    childrenRemover("contentContainer");
    var filteredTasks = projects.getTasksbyDay(format(today, 'dd/MM/yyyy'));
    showTasks(filteredTasks);    
})

document.getElementById("tabContainer2").addEventListener('click',function(e){
    childrenRemover("contentContainer");
    var filteredTasks = projects.getTasksbyDay(format(tomorrow, 'dd/MM/yyyy'));
    showTasks(filteredTasks);    
})

document.getElementById("cancelButton").addEventListener('click',function(e){
    document.getElementById("deletePrjctBG").style.display="none";
})

document.getElementById("confirmButton").addEventListener('click',function(e){
    document.getElementById("deletePrjctBG").style.display="none";
    console.log("Project yang mau dihapus: "+projectIndexToBeDeleted);
    projects.removeTaskByProject(projectList.getProject(projectIndexToBeDeleted));
    console.log(projects.getTasksByProject(projectList.getProject(projectIndexToBeDeleted)));
    projectList.removeProject(projectIndexToBeDeleted);
    console.log(projects.getTasksByProject(projectList.getAllProjects()));
    console.log(localStorage.getItem("ProjecListSize"));
    rewriteTasksProjectsToLocal();
    childrenRemover("tab2");
    generateProjectsList();
})

export {childRemover,childrenRemover};