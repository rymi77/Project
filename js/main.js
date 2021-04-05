import { loadHeaderFooter } from "./templates.js";
import ExternalServices from "./externalServices.js";
import ProjectList from "./projectList.js";

loadHeaderFooter();

const dataSource = new ExternalServices();
const listElements = document.querySelector(".projectList");
const projectList = new ProjectList(listElements, dataSource);
projectList.init();
projectList.addProject();