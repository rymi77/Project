import { renderListWithTemplate } from './templates.js';

export default class ProjectList {
  constructor(listElement, dataSource) {
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getProjects();
    console.log(list)
    this.renderList(list);
  }
  /***************************************************************************
   * Add Project 
   ***************************************************************************/
  async addProject() {
    document.querySelector('#addProject').addEventListener('click', async(e) => {
      this.postProject();
    });
  }
  async postProject() {
    document.getElementById("addProjectForm").style.display = "block";
    document.querySelector('#addProjectButton').addEventListener('click', async(e) => {
      const name = document.querySelector('#addProjectTitle').value;
      const description = document.querySelector('#addProjectDescription').value;
      const reponse = await this.addProject({name, description});
      location.reload();
    });
  }
  
  prepareTemplate(template, projects) {
    console.log(projects._id)
    console.log(projects.name)
    template.querySelector('a').href +=  projects._id;
    template.querySelector('.projectName').textContent += projects.name;
    return template;
  }
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('projectCardTemplate');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
  }
    
}