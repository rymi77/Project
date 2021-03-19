import ExternalServices from './externalServices.js';

export default class Login{
  constructor() {
      this.token = null;
      this.services = new ExternalServices();
    }

  async login(creds) {
    try {
      this.token = await this.services.loginRequest(creds);
      console.log(this.token);
    } 
    catch(err) {
      console.log(err);
    }
  }

  async create(creds) {
    try {
      const temp = await this.services.createRequest(creds);
      console.log(temp);
    } 
    catch(err) {
      console.log(err);
    }
  }

  showLogin(){
    document.querySelector('#loginButton').addEventListener('click', (e) => {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      this.login({email, password});
    });
    document.querySelector('#createAccountButton').addEventListener('click', (e) => {
      window.location.href = "../create.html";
    });
  }
  showCreate(){
    document.querySelector('#createButton').addEventListener('click', (e) => {
      const email = document.querySelector('#email-create').value;
      const username = document.querySelector('#username-create').value;
      const password = document.querySelector('#password-create').value;
      const confirmPassword = document.querySelector('#re-password').value;
      this.create({email, username, password, confirmPassword});
    });
  }
}