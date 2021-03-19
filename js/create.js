import { loadHeaderFooter } from "./templates.js";
import Login from "./login.js";

loadHeaderFooter();
const myLogin = new Login();
myLogin.showCreate();