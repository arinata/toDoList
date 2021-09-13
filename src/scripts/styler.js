import '../styles/style.css';
import '../styles/tabStyles.css';
import '../styles/modal.css';
import '../styles/taskStyle.css';
import '../datepicker-master/datepicker.css';
import home from '../img/038-home.png';
import addTask from '../img/057-plus.png';
import help from '../img/043-information.png';
import notification from '../img/034-notification.png';
import account from '../img/048-time.png';
import todayIcon from '../img/014-calendar.png';
import upcomingIcon from '../img/012-calendar.png';
import projectIcon from '../img/026-ellipsis.png';
import addNewProjectIcon from '../img/007-check.png';
import { projects,projectList } from './projects';
import {childrenRemover,childRemover} from './domFunction'
import {DatePicker} from '../datepicker-master/datepicker'
import { addDays, format } from 'date-fns';
import {writeTaskToLocal,writeProjectToLocal,rewriteTasksProjectsToLocal} from './localStorage';

let projectIndexToBeDeleted = 0;
const today = new Date();
const tomorrow = addDays(today,1);
var activeTaskFamily = "Today";
var modifiedTaskIndex = 0;
var modify = 0;

const addImage = (parentElement,imgSrc,style) => {
    const newImage = new Image();
    newImage.src = imgSrc;
    if(style!=undefined){
        newImage.classList.add(style);
        document.getElementById(parentElement).classList.add("iconContainer");
    }
    document.getElementById(parentElement).appendChild(newImage);
}

const pageLoader = () => {
    document.getElementById("background").classList.add("background");
    document.getElementById("backgroundContainer").classList.add("backgroundContainer");
    document.getElementById("headerContainer").classList.add("headerContainer");
    document.getElementById("sideBar").classList.add("sideBar");
    document.getElementById("content").classList.add("content");
    addImage("homeButton",home,"headerIcon");
    addImage("headerAddTask",addTask,"headerIcon");
    addImage("help",help,"headerIcon");
    addImage("notification",notification,"headerIcon");
    addImage("account",account,"headerIcon");
    document.getElementById("tab1").classList.add("tabbed");
    addImage("todayIcon",todayIcon,"headerIcon");
    document.getElementById("tabContainer1").classList.add("tabButton");
    addImage("upcomingIcon",upcomingIcon,"headerIcon");
    document.getElementById("tabContainer2").classList.add("tabButton");
    document.getElementById("projectHeader").classList.add("projectHeader");
    document.getElementById("projects").classList.add("projects");
    addImage("addProjectIcon",addTask,"headerIcon");
    document.getElementById("tab2").classList.add("tabbed");
    document.getElementById("addProjectBG").classList.add("modalProject");
    document.getElementById("addProjectForm").classList.add("modalProjectContent");
    addImage("addNewProjectIcon",addNewProjectIcon,"headerIcon");
    document.getElementById("addProjectName").classList.add("addProjectName");
    deleteConfirmationStyling();    
    addTaskFormStyling();
}

const deleteConfirmationStyling = () => {
    document.getElementById("addTaskBG").classList.add("modalProject");
    document.getElementById("deletePrjctConf").classList.add("modalProjectDelete");
    document.getElementById("confirmBtnContainer").classList.add("modalConfirmButtonContainer");
    document.getElementById("cancelButton").classList.add("confButton");
    document.getElementById("confirmButton").classList.add("confButton");
}

const addTaskFormStyling = () => {
    document.getElementById("deletePrjctBG").classList.add("modalProject");
    document.getElementById("addTaskForm").classList.add("modalAddTask");
    document.getElementById("formAddTaskContainer").classList.add("formAddTaskContainer");
    for(let i=1;i<6;i++){
        document.getElementById("form"+i).classList.add("inputContainer");
    }
    document.getElementById("datepicker").classList.add("datepicker");
    let datepicker = new DatePicker(document.getElementById('datepicker'));
    document.getElementById("addConfirmBtnContainer").classList.add("modalConfirmButtonContainer");
    document.getElementById("addConfirmButton").classList.add("confButton");
    document.getElementById("addCancelButton").classList.add("confButton");
}

const generateProjectsList = () => {
    for(let i=0; i<projectList.showProjectContent().length;i++){
        insertNewElement("input","tab-pro-"+i,"","","tab2");
        document.getElementById("tab-pro-"+i).type = "radio";
        document.getElementById("tab-pro-"+i).setAttribute("name","tabs")
        insertNewElement("label","labelForTabPro"+i,"","","tab2");
        document.getElementById("labelForTabPro"+i).htmlFor = "tab-pro-"+i;
        insertNewElement("div","tabPro"+i,"tabButton","","labelForTabPro"+i)
        document.getElementById("tabPro"+i).addEventListener('click',function(e){
            let idProject = this.id;
            activeTaskFamily = projectList.getProject(idProject[idProject.length-1]);
            childrenRemover("contentContainer");
            var filteredTasks = projects.getTasksByProject(activeTaskFamily);
            showTasks(filteredTasks);
        })
        insertNewElement("div","project"+i,"","","tabPro"+i);
        addImage("project"+i,projectIcon,"headerIcon");
        insertNewElement("span","project"+i+"Title","",projectList.getProject(i),"tabPro"+i);
        insertNewElement("div","projectDelete"+i,"deleteIcon","","tabPro"+i);
        insertNewElement("span","proDelIcon"+i,"","❌","projectDelete"+i);
        document.getElementById("projectDelete"+i).addEventListener('click',function(e){
            let idProject = this.id;
            projectIndexToBeDeleted = idProject[idProject.length-1];
            console.log("Project yang mau dihapus: "+projectIndexToBeDeleted);
            document.getElementById("deletePrjctBG").style.display="block";
        })
    }
}

const showAddedProject = () => {
    let i = projectList.getAllProjects().length-1;
    console.log(i);
    insertNewElement("input","tab-pro-"+i,"","","tab2");
    document.getElementById("tab-pro-"+i).type = "radio";
    document.getElementById("tab-pro-"+i).setAttribute("name","tabs")
    insertNewElement("label","labelForTabPro"+i,"","","tab2");
    document.getElementById("labelForTabPro"+i).htmlFor = "tab-pro-"+i;
    insertNewElement("div","tabPro"+i,"tabButton","","labelForTabPro"+i)
    document.getElementById("tabPro"+i).addEventListener('click',function(e){
        let idProject = this.id;
        activeTaskFamily = projectList.getProject(idProject[idProject.length-1]);
        childrenRemover("contentContainer");
        var filteredTasks = projects.getTasksByProject(activeTaskFamily);        
        showTasks(filteredTasks);
    })
    insertNewElement("div","project"+i,"","","tabPro"+i);
    addImage("project"+i,projectIcon,"headerIcon");
    insertNewElement("span","project"+i+"Title","",projectList.getProject(i),"tabPro"+i);
    insertNewElement("div","projectDelete"+i,"deleteIcon","","tabPro"+i);
    insertNewElement("span","proDelIcon"+i,"","❌","projectDelete"+i);
    document.getElementById("projectDelete"+i).addEventListener('click',function(e){
        let idProject = this.id;
        projectIndexToBeDeleted = idProject[idProject.length-1];
        console.log("Project yang mau dihapus: "+projectIndexToBeDeleted);
        document.getElementById("deletePrjctBG").style.display="block";
    })
}

const showTask = (index,task) => {
    if(task[0].checkList==0){
        if(document.getElementById("contentContainer").childElementCount==0){
            insertNewElement("div","taskMargin","taskMargin","","contentContainer");
        }
        insertNewElement("div", "task"+task[1], "task", "", "contentContainer");
        insertNewElement("div","priorityColor"+task[1],"priorityColor","","task"+task[1]);
        changeTaskColor(task[0],task[1]);
        insertNewElement("div","taskTitle"+task[1],"taskTitle",task[0].title,"task"+task[1]);
        insertNewElement("div","dueDate"+task[1],"dueDate",task[0].dueDate,"task"+task[1]);
        insertNewElement("div","prioritySet"+task[1],"prioritySet","","task"+task[1]);
        insertNewElement("label","priorityLabel"+task[1],"selectPriority","Priority","prioritySet"+task[1]);
        document.getElementById("priorityLabel"+task[1]).htmlFor = "selectPriority"+task[1];
        insertNewElement("select","selectPriority"+task[1],"","","prioritySet"+task[1]);
        insertNewElement("option","option1"+task[1],"","1","selectPriority"+task[1]);
        document.getElementById("option1"+task[1]).value = "1";
        insertNewElement("option","option2"+task[1],"","2","selectPriority"+task[1]);
        document.getElementById("option2"+task[1]).value = "2";
        insertNewElement("option","option3"+task[1],"","3","selectPriority"+task[1]);
        document.getElementById("option3"+task[1]).value = "3";
        insertNewElement("option","option4"+task[1],"","4","selectPriority"+task[1]);
        document.getElementById("option4"+task[1]).value = "4";
        document.getElementById("selectPriority"+task[1]).value = task[0].priority;
        insertNewElement("div","taskDone"+task[1],"taskDone","","task"+task[1]);
        insertNewElement("div","","doneIcon","✔","taskDone"+task[1]);
        insertNewElement("div","deleteTask"+task[1],"deleteTask","","task"+task[1]);
        insertNewElement("div","","deleteIcon","❌","deleteTask"+task[1]);
        insertNewElement("div","botMargin"+task[1],"taskMargin","","contentContainer");


        document.getElementById("task"+task[1]).addEventListener('click', function(e){
            showTaskForm();            
            var indexTask = getTaskIndex(this.id,4);
            document.getElementById("addTaskName").value = projects.getTasksByIndex(indexTask).title;
            document.getElementById("addDescription").value = projects.getTasksByIndex(indexTask).description;
            document.getElementById("datepicker").value = projects.getTasksByIndex(indexTask).dueDate;
            console.log(projects.getTasksByIndex(indexTask).dueDate);
            document.getElementById("selectPriority").value = projects.getTasksByIndex(indexTask).priority;
            document.getElementById("selectProject").value = projects.getTasksByIndex(indexTask).project;
            modify = 1;
            modifiedTaskIndex = indexTask;
        })
        document.getElementById("selectPriority"+task[1]).addEventListener('click', function(e){
            e.stopPropagation();
            var indexTask = getTaskIndex(this.id,14);
            projects.changePriority(indexTask,document.getElementById("selectPriority"+indexTask).value);
            changeTaskColor(projects.getTasksByIndex(indexTask),indexTask);
        })
        document.getElementById("taskDone"+task[1]).addEventListener('click', function(e){
            e.stopPropagation();
            var indexTask = getTaskIndex(this.id,8);
            projects.done(indexTask);
            writeTaskToLocal(indexTask);
            if(document.getElementById("contentContainer").childElementCount == 3){
                childrenRemover("contentContainer");
            }
            else{
                let delChild1 = document.getElementById("task"+indexTask);
                let delChild2 = document.getElementById("botMargin"+indexTask);
                document.getElementById("contentContainer").removeChild(delChild1);
                document.getElementById("contentContainer").removeChild(delChild2);
            }
        })
        document.getElementById("deleteTask"+task[1]).addEventListener('click', function(e){
            e.stopPropagation();
            var indexTask = getTaskIndex(this.id,10);
            console.log(indexTask);
            let projectName = projects.getProjectName(indexTask);
            projects.removeTask(indexTask);
            childrenRemover("contentContainer");
            var filteredTasks = projects.getTasksByProject(projectName);
            showTasks(filteredTasks);
            rewriteTasksProjectsToLocal();
        })
    }
}

const changeTaskColor = (task,index) => {
    switch(task.priority){
        case '1':
            document.getElementById("priorityColor"+index).style.backgroundColor = 'red';
            break;
        case '2':
            document.getElementById("priorityColor"+index).style.backgroundColor = 'orange';
            break;
        case '3':
            document.getElementById("priorityColor"+index).style.backgroundColor = 'yellow';
            break;
        case '4':
            document.getElementById("priorityColor"+index).style.backgroundColor = 'greenyellow';
            break;
    }
}

const showTaskForm = () => {
    document.getElementById("addTaskBG").style.display="block";
    let isiProject = projectList.getAllProjects();
    childrenRemover("selectProject");
    for(let i=0;i<isiProject.length;i++){
        let options = document.createElement("option");
        options.text = isiProject[i];
        options.value = isiProject[i];
        document.getElementById("selectProject").appendChild(options);
    }
    document.getElementById("addTaskName").value = "";
    document.getElementById("addDescription").value = "Add some description....";
    document.getElementById("datepicker").value = format(tomorrow, 'dd/MM/yyyy');
    document.getElementById("selectPriority").value = "1";
}

const showTasks = (filteredTasks) => {
    if(filteredTasks!=null){
        for(let i=0; i<filteredTasks.length;i++){
            showTask(i,filteredTasks[i]);
        }
    }
}

const getTaskIndex = (idTask,idStart) => {
    var indexTask = "";
    for(var i = idStart;i<idTask.length;i++){
        indexTask = indexTask + idTask[i];
    }
    console.log("indexnya"+indexTask);
    return parseInt(indexTask);
}

const insertDateHeader = (date) => {
    if(date==today){
        insertNewElement("div","headerToday","dateHeader","Today","contentContainer");
    }
    else{
        insertNewElement("div","headerToday","dateHeader",format(date,"EEE, dd/MM/yyyy"),"contentContainer");
    }
}

const insertNewElement = (elmntType,elmntId,elmntClass,text,parentElmnt) => {
    const newElmnt = document.createElement(elmntType);
    newElmnt.id = elmntId;
    if(elmntClass!=""){newElmnt.classList.add(elmntClass);}
    newElmnt.textContent = text;
    document.getElementById(parentElmnt).appendChild(newElmnt);
}

document.getElementById("headerAddTask").addEventListener('click',function(e){
    showTaskForm();
    modify = 0;
})

export {pageLoader,generateProjectsList,showAddedProject,activeTaskFamily,showTask,modifiedTaskIndex,modify,
    changeTaskColor, showTasks, projectIndexToBeDeleted, showTaskForm};