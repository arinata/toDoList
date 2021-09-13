import {projectsCreate,projects,projectList} from './scripts/projects';
import {pageLoader,generateProjectsList,showAddedProject} from './scripts/styler';
import {childRemover} from "./scripts/domFunction";
import { initialization } from './scripts/localStorage';

initialization();
pageLoader();

generateProjectsList(projectList);