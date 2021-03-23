import { loadHeaderFooter, getParams } from "./templates.js";
import ExternalServices from "./externalServices.js";
import TicketList from "./ticketList.js";

loadHeaderFooter();

const project = getParams("project");
console.log(project);
const dataSource = new ExternalServices();
const listElements = document.querySelector(".commentList");
const ticketList = new TicketList(listElements, dataSource, project);
ticketList.init();