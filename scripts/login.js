import doesUserExist  from "./utiles/doesUserExist.js";
import doesPasswordMatch from "./utiles/doesPasswordMatch.js";
import createLocalStorageData from "./utiles/createLocalStorageData.js";
import createLoginSession from "./utiles/createLoginSession.js";

const hidePasswordElement = document.getElementById('hide-password');
const passwordInput = document.querySelector("#password");
const loginForm = document.querySelector("#login-form");

let isPasswordVisible = false;

hidePasswordElement.addEventListener("click", () => {
    isPasswordVisible = !isPasswordVisible;
    if (isPasswordVisible) {
        hidePasswordElement.src = `${location.origin}/assets/icons/visible.png`;
        passwordInput.setAttribute("type", "text");
    } else {
            hidePasswordElement.src = `${location.origin}/assets/icons/invisible.png`;
        passwordInput.setAttribute("type", "password");
        }

})

loginForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const elements = event.target.elements;
    const [username, password] = [
        elements.namedItem("username").value || "",
        elements.namedItem("password").value || "",
    ];
    
    const userExist = doesUserExist(username);
    const passwordMatch = doesPasswordMatch(username, password);

    if (userExist){
        if (passwordMatch){
            createLocalStorageData(username);
            createLoginSession(username);
            location.replace(`${location.origin}/index.html`);
        } else {
            alert("رمز عبور اشتباه است!");
        }
    }else {
        alert ("نام کاربری یافت نشد");
    }

})