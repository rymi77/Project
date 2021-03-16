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
  
  prepareTemplate(template, projects) {
    
    template.querySelector('a').href +=  projects.id;
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