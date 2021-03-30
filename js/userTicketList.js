import { renderListWithTemplate } from './templates.js';
import {getLocalStorage} from "./templates.js";

export default class UserTicketList {
  constructor(listElement, dataSource) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getProfile();
    console.log(list);
    const tickets = list.tickets;
    const username = list.username;
    const email = list.email;
    this.renderUser(username, email);
    await this.renderList(tickets);
    this.listElement.addEventListener('click', this.deleteBug.bind(this));
  }

  async deleteBug(e){
    const postId = e.target.dataset.id;
    if(e.target.className == "deleteBtn"){
      const message = await this.dataSource.deleteTicket(postId);
      alert("Ticket deleted")
      location.reload();
    }
    else if(e.target.className == "editBtn"){
      this.editBug(e, postId)
    }
  }
  editBug(e, postId){
    //change card to edit it
    let card = e.target.parentElement;
    let titleInput = document.createElement("input");
    titleInput.value = card.childNodes[1].innerHTML;
    let descInput = document.createElement("textarea");
    descInput.value = card.childNodes[3].innerHTML;
    let changeBtn = document.createElement("button");
    changeBtn.innerHTML = "Change";
    changeBtn.id = "changeBtn"
    card.appendChild(titleInput);
    card.appendChild(descInput);
    card.appendChild(changeBtn);
    card.childNodes[1].style.display = "none";
    card.childNodes[3].style.display = "none";
    card.childNodes[5].style.display = "none";
    card.childNodes[7].style.display = "none";
    //change data
    document.querySelector('#changeBtn').addEventListener('click', async(e) => {
      const title = card.childNodes[9].value;
      const description = card.childNodes[10].value;
      const message = await this.dataSource.editTicket(postId, {title, description});
      alert("Ticket edited")
      location.reload();
    });
  }

  renderUser(username, email){
    document.querySelector("#usernameDisplay").innerHTML += username;
    document.querySelector("#emailDisplay").innerHTML += email;
  }

  prepareTemplate(template, projects) {
    template.querySelector('.cardTitle').innerHTML +=  projects.title;
    template.querySelector('.summary').innerHTML +=  projects.description;
    template.querySelector('.deleteBtn').setAttribute('data-id', projects._id);
    template.querySelector('.editBtn').setAttribute('data-id', projects._id);
    return template;
  }

  async renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';

    //get the template
    const template = document.getElementById('userTicket');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
  }
}