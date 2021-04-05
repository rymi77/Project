import {getLocalStorage} from "./templates.js";

const baseURL = 'https://nodefinalproject.herokuapp.com/'

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data
  } else {
    throw { name: 'servicesError', message: data };
  }
}

class ExternalServices{
  constructor() {
  }

  async getProjects() {
    return fetch(baseURL + 'projects',{
      method: 'GET'
    }).then(convertToJson).then((data) => data.projects);
  }

  async addProject(project) {
    return fetch(baseURL + 'submitProjectTicket',{
      method: 'Post',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token"),
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(project)
    }).then(convertToJson);
  }

  async addTicket(ticket) {
    return fetch(baseURL + 'postTicket',{
      method: 'Post',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token"),
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(ticket)
    }).then(convertToJson);
  }

  async editTicket(postId, ticket) {
    return fetch(baseURL + 'update/' + postId,{
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token"),
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(ticket)
    }).then(convertToJson);
  }

  async deleteTicket(postId) {
    fetch(baseURL + "delete/" + postId,{
      method: 'Delete',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token")
     }
    }).then(convertToJson);
  }

  async getProjectTickets(project) {
    return fetch(baseURL + 'project/' + project,{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token")
     }
    }).then(convertToJson);
  }

  async getUserTickets() {
    return fetch(baseURL + 'getUserTickets',{
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getLocalStorage("token")
     }
    }).then(convertToJson).then((data) => data.tickets);
  }

  async loginRequest(user){
    const response = await fetch(baseURL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(convertToJson);
    return response;
  }

  async createRequest(user){
    const response = await fetch(baseURL + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(convertToJson);
    return response;
  }
}
export default ExternalServices;
