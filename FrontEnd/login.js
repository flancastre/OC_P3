
// -------------------------------------------------------------------------------

// ```
// email: sophie.bluel@test.tld

// password: S0phie
// ```


// --------------------------------------------------------------------------/


const email = document.querySelector("#email-log");
const password = document.querySelector("#password");
let mail, passwords;


/* Fonction qui gère la connexion de l'administrateur */

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
        alert('“Erreur dans l\’identifiant ou le mot de passe”');
        throw new Error("HTTP status " + res.status);
       
    }
    return res.json();
    
 })
 .then((data) => window.localStorage.setItem("token", data.token))
 .catch((error) => {console.log(error)});

 await logRedirection();


}


/* Redirection après connexion vers la page d'acceuil admin */
const logRedirection = async () => {
    
const token = localStorage.getItem("token");
if (token != null ){
    alert('Connexion réussie vous allez être redirigés...');
    document.location.href="index.html";

}
}

/* Récuperation des data saisie par le user */

email.addEventListener("input", (e) => {
    mail = e.target.value;
});

password.addEventListener("input", (e) => {
    passwords = e.target.value;
});

/* Event sur le bouton de connexion */

form.addEventListener("submit", (e) => {
    e.preventDefault();
     logUser();


});






