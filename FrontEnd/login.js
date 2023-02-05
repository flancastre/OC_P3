
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

email.addEventListener("input", (e) => {

    mail = e.target.value;

    if(mail === "sophie.bluel@test.tld") {
        email.style.border = "solid green 1px";
    } else {
        email.style.border = "solid red 1px";
    }
 
});

password.addEventListener("input", (e) => {

    passwords = e.target.value;
 
    if(passwords === "S0phie") {
        password.style.border = "solid green 1px";
    } else {
        password.style.border = "solid red 1px";
    }

});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const users = {
        email: mail,
        password: passwords
    }

    const chargeUtile = JSON.stringify(users);
    
     fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile,
        mode: "cors",
        cretentials: "same-origin"
     })
 .then((res) => res.json())
 .then((data) => window.localStorage.setItem("token", JSON.stringify(data.token)))
 .catch((error) => {console.log(error)});

 



});




