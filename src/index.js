import {todosCreate,todosDone} from './scripts/tasks';
import {projectsCreate,showProjectContent,projectList} from './scripts/projects';
import {pageLoader,generateProjectsList,showAddedProject} from './scripts/styler';
import {childRemover} from "./scripts/domFunction";
//import { add } from 'date-fns';

const {format} = require('date-fns');
const today = format(new Date(), 'E');
console.log(today);

pageLoader();

const dummyData = [ ["cuci baju","cuci semua baju kotor termasuk punya tetangga","30062021",1],
                    ["cuci piting","cuci piring, gelas, wajan, panci kotor","30062021",1],
                    ["tidur","","30062021",2],
                    ["makan","pastikan makan sayur, prona, prohe","30062021",2],
                    ["masak","jangan kebanyakan garam lagi","30062021",0]
                    ];
//console.log(dummyData[4])
//const projectList = [];
projectList.addProject(projectsCreate("Work"));
//projectList.push(projectsCreate("Work"));

for(let i=0;i<5;i++){
    projectList.addTaskToProject(0,todosCreate(dummyData[i][0],dummyData[i][1],dummyData[i][2],dummyData[i][3]));
    //projectList[0].addTask(todosCreate(dummyData[i][0],dummyData[i][1],dummyData[i][2],dummyData[i][3]));
}

// console.log(projectList[0].getTasks()[4][1].get.values());
// todosDone(projectList[0].getTasks()[4][1]);
// console.log(projectList[0].getTasks()[4][1].get.values());

// projectList[0].removeTask(3);
// console.log(projectList[0].getTasks());

// projectList[0].addTask(todosCreate("oke","description","dueDate",0));
// console.log(projectList[0].getTasks()[0][1].get.values());
// console.log(projectList[0].getTasks());

// projectList[0].changePriority(0,4);
// console.log(projectList[0].getTasks()[0][1].get.values());
// console.log(projectList[0].getTasks());
// console.log(projectList[0].getTasks()[4][1].get.values());

// console.log(showProjectContent(projectList[0].getTasks()));

generateProjectsList(projectList);
const addEvntLstner = () => {
    console.log(1);
    document.getElementById("addProjectIcon").addEventListener('click',function(e){
        document.getElementById("addProjectBG").style.display="block";
    }) 
    console.log(2);
    window.onclick = function(event) {
        if (event.target == document.getElementById("addProjectBG")) {
            document.getElementById("addProjectBG").style.display = "none";
        }
      }
      console.log(3);
    document.getElementById("addNewProjectIcon").addEventListener('click',function(e){
        if(document.getElementById("addProjectName").value != ""){
            projectList.push(projectsCreate(document.getElementById("addProjectName").value));
            document.getElementById("addProjectBG").style.display = "none";
            showAddedProject(projectList)
        }
    })
    console.log(4);
}
addEvntLstner();

