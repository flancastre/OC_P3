
// const init2 = {
//     method: "POST",
//     headers: {
//         "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//         email: "sophie.bluel@test.tld",
//         password: "S0phie",

//     }),
//     mode: "cors",
//     cretentials: "same-origin",
// };

// fetch("http://localhost:5678/api/users/login", init2)
// .then((res) => res.json())
// .then((data) => console.log(data))
// .catch((error) => {console.log(error)});



// -------------------------------------------------------------------------------

// ```
// email: sophie.bluel@test.tld

// password: S0phie
// ```


// --------------------------------------------------------------------------/


const email = document.querySelector("#email-log");
const password = document.querySelector("#password");
let mail, passwords;


const logUser = async () => {

    const users = {
        email: mail,
        password: passwords
    }

    localStorage.removeItem("token");

    const chargeUtile = JSON.stringify(users);
    
   await  fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile,
        mode: "cors",
        cretentials: "same-origin"
     })
 .then((res) => {
    if (!res.ok) {
        alert('Email ou mot de passe incorect veuillez réesayer');
        throw new Error("HTTP status " + res.status);
       
    }
    return res.json();
    
 })
 .then((data) => window.localStorage.setItem("token", JSON.stringify(data.token)))
 .catch((error) => {console.log(error)});

 await logRedirection();


}

const logRedirection = async () => {
    
const token = JSON.parse(localStorage.getItem("token"));
if (token != null ){
    alert('connexion reussi vous allez etre rediridez...');
    document.location.href="index.html";

}
}


email.addEventListener("input", (e) => {

    mail = e.target.value;

});

password.addEventListener("input", (e) => {

    passwords = e.target.value;
 
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

     logUser();


});






