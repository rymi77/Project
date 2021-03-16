const baseURL = 'https://nodefinalproject.herokuapp.com/'

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data
  } else {
    throw { name: 'servicesError', message: data };
  }
}

class ExteralServices{
  constructor() {
  }
  
  getProjects() {
    return fetch(baseURL + 'projects',{
      method: 'GET'
    }).then(convertToJson).then((data) => data.projects);
  }
}
export default ExteralServices;
