import { loadHeaderFooter } from "./templates.js";
import ExternalServices from "./externalServices.js";
import UserTicketList from "./userTicketList.js";

loadHeaderFooter();

const dataSource = new ExternalServices();
const listElements = document.querySelector(".commentList");
const ticketList = new UserTicketList(listElements, dataSource);
ticketList.init();