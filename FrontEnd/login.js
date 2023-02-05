


const init2 = {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        password: "S0phie",

    }),
    mode: "cors",
    cretentials: "same-origin",
};

fetch("http://localhost:5678/api/users/login", init2)
.then((res) => res.json())
.then((data) => console.log(data))
.catch((error) => {console.log(error)});



