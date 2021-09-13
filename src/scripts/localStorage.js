import { projects,projectList } from './projects';
import { addDays, format } from 'date-fns';

const today = new Date();
const tomorrow = addDays(today,1);
var localStorageAvailable = false;

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

const writeTaskToLocal = (taskIndex) =>{
    console.log(localStorage.getItem("task"+taskIndex+".checkList"));
    var task = projects.getTasksByIndex(taskIndex);
    localStorage.setItem("ProjectSize",projects.getTasksNumber());
    localStorage.setItem("task"+taskIndex+".title",task.title);
    localStorage.setItem("task"+taskIndex+".description",task.description);
    localStorage.setItem("task"+taskIndex+".dueDate",task.dueDate);
    localStorage.setItem("task"+taskIndex+".priority",task.priority);
    localStorage.setItem("task"+taskIndex+".checkList",task.checkList);
    localStorage.setItem("task"+taskIndex+".project",task.project);
    console.log(localStorage.getItem("task"+taskIndex+".checkList"));
}

const rewriteTasksProjectsToLocal = () => {
    localStorage.clear();
    var taskLength = projects.getTasksNumber();
    localStorage.setItem("ProjectSize",taskLength);
    for(let i = 0; i<taskLength; i++){
        let task = projects.getTasksByIndex(i);
        localStorage.setItem("task"+i+".title",task.title);
        localStorage.setItem("task"+i+".description",task.description);
        localStorage.setItem("task"+i+".dueDate",task.dueDate);
        localStorage.setItem("task"+i+".priority",task.priority);
        localStorage.setItem("task"+i+".checkList",task.checkList);
        localStorage.setItem("task"+i+".project",task.project);
    }

    var projectsLength = projectList.getProjectsNumber();
    localStorage.setItem("ProjectListSize",projectsLength);
    for(let i = 0; i<projectsLength; i++){
        localStorage.setItem("project"+i,projectList.getProject(i));
    }

    console.log(localStorage.getItem("ProjectSize"));
}

const writeProjectToLocal = (projectIndex) =>{
    var project = projectList.getProject(projectIndex);
    if(localStorage.getItem("ProjectListSize")!=null){
        localStorage.setItem("ProjecListSize",1);
    }
    else{
        if(localStorage.getItem(ProjectListSize)<projectIndex){
            localStorage.setItem("ProjecListtSize",projectIndex);
        }
    }
    localStorage.setItem("project"+projectIndex,project);
}

const readAllProject = () =>{
    if(localStorage.getItem("ProjectSize")!=null){
        for(var i=0;i<localStorage.getItem("ProjectSize");i++){
            projects.addTask(   localStorage.getItem("task"+i+".title"),
                                localStorage.getItem("task"+i+".description"),
                                localStorage.getItem("task"+i+".dueDate"),
                                localStorage.getItem("task"+i+".priority"),
                                localStorage.getItem("task"+i+".project")
                            );
            if(localStorage.getItem("task"+i+".checkList")==1){
                projects.done(i);
            }
        }
    }
}

const readAllProjectList = () =>{
    if(localStorage.getItem("ProjectListSize")!=null){
        console.log("adaprojectName="+localStorage.getItem("ProjectListSize"));
        for(var i=0;i<localStorage.getItem("ProjectListSize");i++){
            projectList.addProject(localStorage.getItem("project"+i));
            console.log("iterasi ke:"+i);
        }
    }
}

function initialization(){
    if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
        localStorageAvailable = true;
        if(!localStorage.getItem('ProjectListSize')){
            console.log("ternyata masuk sini");
            localStorage.setItem("ProjectSize",5);
            localStorage.setItem("ProjectListSize",1);
            localStorage.setItem("project0","Project 1");
            for(let i=0;i<5;i++){
                localStorage.setItem("task"+i+".title",dummyData[i][0]);
                localStorage.setItem("task"+i+".description",dummyData[i][1]);
                localStorage.setItem("task"+i+".dueDate",format(today, 'dd/MM/yyyy'));
                localStorage.setItem("task"+i+".priority",dummyData[i][3]);
                localStorage.setItem("task"+i+".checkList",0);
                localStorage.setItem("task"+i+".project","Project 1");                
            }
        }
        readAllProjectList();
        readAllProject();
        console.log(projects.getTasksByIndex(0));
        console.log(projectList.getAllProjects());
    }
    else {
    // Too bad, no localStorage for us
        localStorageAvailable = false;
    }        
}


const dummyData = [ ["cuci baju","cuci semua baju kotor termasuk punya tetangga",today,"1"],
                    ["cuci piting","cuci piring, gelas, wajan, panci kotor",today,"2"],
                    ["tidur","",today,"3"],
                    ["makan","pastikan makan sayur, prona, prohe",today,"4"],
                    ["masak","jangan kebanyakan garam lagi",today,'1']
                    ];

export {initialization,writeTaskToLocal,writeProjectToLocal,rewriteTasksProjectsToLocal};