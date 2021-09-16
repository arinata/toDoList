import {projectsCreate,projects,projectList} from './scripts/projects';
import {pageLoader,generateProjectsList,showAddedProject} from './scripts/styler';
import {startTime} from "./scripts/domFunction";
import { initialization } from './scripts/localStorage';
import { addDays, format, isPast } from 'date-fns';

const today = new Date();
const yesterday = addDays(today,-1);

const dummyData = [ ["Proposal submission 1","It is a nice and powerfull proposal...",addDays(today,2),"1"],
                    ["Proposal review 1","It is a nice and powerfull proposal...",today,"2"],
                    ["Weekly meeting 1","It is a nice and powerfull meeting...",addDays(today,1),"3"],
                    ];

initialization(dummyData);
pageLoader();

generateProjectsList(projectList);
startTime();