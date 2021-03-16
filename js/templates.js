export function getParams(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }

export function renderListWithTemplate(template, parent, list, callback) {
    list.forEach(item => {
      const clone = template.content.cloneNode(true);
      const templateWithData = callback(clone, item);
      parent.appendChild(templateWithData);
    })
  }

export function renderWithTemplate(template, parent, data, callback) {
    let clone = template.content.cloneNode(true);
    if(callback){
        clone = callback(clone, data);
    }
    parent.appendChild(clone);
}

export async function loadTemplate(path){
    const data = await fetch(path).then(response => response.text());
    const template = document.createElement("template")
    template.innerHTML = data;
    return template;
}

export async function loadHeaderFooter(){
    const templateHeader = await loadTemplate("../partials/header.html");
    const templateFooter = await loadTemplate("../partials/footer.html");
    const header = document.getElementById("main-header");
    const footer = document.getElementById("main-footer");
    renderWithTemplate(templateHeader, header);
    renderWithTemplate(templateFooter, footer);
}
  