import '../styles/style.css';
import '../styles/tabStyles.css';
import '../styles/modal.css';
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

let projectIndexToBeDeleted = 0;
const today = new Date(); ;

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
        insertNewElement("div","project"+i,"","","tabPro"+i);
        addImage("project"+i,projectIcon,"headerIcon");
        insertNewElement("span","project"+i+"Title","",projectList.getProject(i).getTitle(),"tabPro"+i);
        insertNewElement("div","projectDelete"+i,"deleteIcon","","tabPro"+i);
        insertNewElement("span","proDelIcon"+i,"","❌","projectDelete"+i);
        document.getElementById("projectDelete"+i).addEventListener('click',function(e){
            console.log(this);
            let idProject = this.id;
            projectIndexToBeDeleted = idProject[idProject.length-1];
            console.log("ini ID Project:  "+idProject);
            document.getElementById("deletePrjctBG").style.display="block";
            console.log("akan delete index:  "+projectIndexToBeDeleted);
        })
    }
}

const showAddedProject = (projects) => {
    let i = projects.getAllProjects().length-1;
    console.log(i);
    insertNewElement("input","tab-pro-"+i,"","","tab2");
    document.getElementById("tab-pro-"+i).type = "radio";
    document.getElementById("tab-pro-"+i).setAttribute("name","tabs")
    insertNewElement("label","labelForTabPro"+i,"","","tab2");
    document.getElementById("labelForTabPro"+i).htmlFor = "tab-pro-"+i;
    insertNewElement("div","tabPro"+i,"tabButton","","labelForTabPro"+i)
    insertNewElement("div","project"+i,"","","tabPro"+i);
    addImage("project"+i,projectIcon,"headerIcon");
    insertNewElement("span","project"+i+"Title","",projects.getProject(i).getTitle(),"tabPro"+i);
    console.log(i+"okenih"+projects.getProject(i).getTitle());
    insertNewElement("div","projectDelete"+i,"deleteIcon","","tabPro"+i);
    insertNewElement("span","proDelIcon"+i,"","❌","projectDelete"+i);
    document.getElementById("projectDelete"+i).addEventListener('click',function(e){
        console.log(this);
        let idProject = this.id;
        projectIndexToBeDeleted = idProject[idProject.length-1];
        document.getElementById("deletePrjctBG").style.display="block";
    })
}

const showTaskAtDate = (date) => {
    insertDateHeader(date);
}

const insertDateHeader = (date) => {
    if(date==today){
        insertNewElement("div","headerToday","dateHeader","Today","contentContainer");
    }
    else{
        insertNewElement("div","headerToday","dateHeader",format(date,"EEE, dd/MM/yyyy"),"contentContainer");
    }
    
}

document.getElementById("cancelButton").addEventListener('click',function(e){
    document.getElementById("deletePrjctBG").style.display="none";
})

document.getElementById("confirmButton").addEventListener('click',function(e){
    document.getElementById("deletePrjctBG").style.display="none";
    projectList.removeProject(projectIndexToBeDeleted);
    childrenRemover("tab2");
    generateProjectsList();
})

document.getElementById("headerAddTask").addEventListener('click',function(e){
    document.getElementById("addTaskBG").style.display="block";
    let isiProject = projectList.getAllProjects();
    childrenRemover("selectProject");
    for(let i=0;i<isiProject.length;i++){
        let options = document.createElement("option");
        options.text = isiProject[i].getTitle();
        options.value = isiProject[i].getTitle();
        document.getElementById("selectProject").appendChild(options);
    }
})

const insertNewElement = (elmntType,elmntId,elmntClass,text,parentElmnt) => {
    const newElmnt = document.createElement(elmntType);
    newElmnt.id = elmntId;
    if(elmntClass!=""){newElmnt.classList.add(elmntClass);}
    newElmnt.textContent = text;
    document.getElementById(parentElmnt).appendChild(newElmnt);
}

export {pageLoader,generateProjectsList,showAddedProject};