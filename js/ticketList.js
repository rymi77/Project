import { renderListWithTemplate } from './templates.js';
import {getLocalStorage} from "./templates.js";

export default class TicketList {
  constructor(listElement, dataSource, project) {
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.project = project
  }

  async init() {
    const list = await this.dataSource.getTickets();
    console.log(list);
    this.renderList(list);
    document.querySelector('#reportBug').addEventListener('click', (e) => {
      document.getElementById("addTicketForm").style.display = "block";
      document.querySelector('#addBugButton').addEventListener('click', (e) => {
        const title = document.querySelector('#createTitle').value;
        const description = document.querySelector('#createDescription').value;
        const projectId = this.project;
        const userId = getLocalStorage("userId");
        this.dataSource.addTicket({title, description, projectId, userId});
      });
    });
  }

  prepareTemplate(template, projects) {
    template.querySelector('.cardTitle').innerHTML +=  projects.title;
    template.querySelector('.summary').innerHTML +=  projects.description;
    return template;
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    let projectTickets = [];
    for(let i = 0; i < Object.keys(list).length; i++){
      if(list[i].projectId = this.project){
        projectTickets.push(list[i])
      }
    }
    console.log(projectTickets);
    //get the template
    const template = document.getElementById('bugTicket');
    renderListWithTemplate(template, this.listElement, projectTickets, this.prepareTemplate);
  }
    
}