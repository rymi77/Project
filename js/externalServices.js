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
  
  async getProjects() {
    return fetch(baseURL + 'projects',{
      method: 'GET'
    }).then(convertToJson).then((data) => data.projects);
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
export default ExteralServices;
