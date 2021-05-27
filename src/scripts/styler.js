import '../styles/style.css';
import '../styles/tabStyles.css';
import '../styles/modal.css';
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
    
    document.getElementById("deletePrjctBG").classList.add("modalProject");
    document.getElementById("deletePrjctConf").classList.add("modalProjectDelete");
    document.getElementById("confirmBtnContainer").classList.add("modalConfirmButtonContainer");
}

const generateProjectsList = () => {
    for(let i=0; i<projects.length;i++){
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
            popUpDeleteProjectNotif(i);
        })
    }
}

const popUpDeleteProjectNotif = (index) => {
    document.getElementById("deletePrjctBG").style.display="block";
}

const showAddedProject = (projects) => {
    let i = projects.length - 1;
    insertNewElement("input","tab-pro-"+i,"","","tab2");
    document.getElementById("tab-pro-"+i).type = "radio";
    document.getElementById("tab-pro-"+i).setAttribute("name","tabs")
    insertNewElement("label","labelForTabPro"+i,"","","tab2");
    document.getElementById("labelForTabPro"+i).htmlFor = "tab-pro-"+i;
    insertNewElement("div","tabPro"+i,"tabButton","","labelForTabPro"+i)
    insertNewElement("div","project"+i,"","","tabPro"+i);
    addImage("project"+i,projectIcon,"headerIcon");
    insertNewElement("span","project"+i+"Title","",projects[i].getTitle(),"tabPro"+i);
}

const insertNewElement = (elmntType,elmntId,elmntClass,text,parentElmnt) => {
    const newElmnt = document.createElement(elmntType);
    newElmnt.id = elmntId;
    if(elmntClass!=""){newElmnt.classList.add(elmntClass);}
    newElmnt.textContent = text;
    document.getElementById(parentElmnt).appendChild(newElmnt);
}

export {pageLoader,generateProjectsList,showAddedProject};

