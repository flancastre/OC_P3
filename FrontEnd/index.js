
const modalEdit = document.getElementById("modalEdit");
const logOut = document.getElementById("logOut");
const logIn = document.getElementById("logIn");
const edits = document.querySelectorAll(".edit");
const modal = document.getElementById("modalContainer");
const cross = document.getElementById("cross");
const cross1 = document.getElementById("cross1");
const test = document.querySelector(".test");
const msgModal = document.getElementById("msgModal");
const addPicture = document.getElementById("addPicture");
const addWork = document.getElementById("addWork");
const back = document.getElementById("back");
const preview = document.getElementById("file-preview");
const category = document.getElementById("category");
const msgAddproject = document.getElementById("msg-addProject");
const title = document.getElementById("title");
const checkForm = document.getElementById("checkform");
const modalWork = document.getElementById('modale');

/* Affichage ou non de la page administrateur */

const userStatus = () => {

    const token = localStorage.getItem("token");
    if(token != null) {
        console.log("user connecter");
        
        logOut.style.display = "block";
        logIn.style.display = "none";
        edits.forEach((edit) => {
            edit.style.visibility = "visible";
        });
        
    } else {
        console.log("user deconecter");
        
        logOut.style.display = "none";
        logIn.style.display= "block";
        edits.forEach((edit) => {
            edit.style.visibility = "hiden";
        });
    }
}

/* Bouton de deconnexion */

logOut.addEventListener('click' , (e) => {
    localStorage.removeItem("token");
    document.location.href="index.html";
})

/* Recuperation des travaux via l'api */

let works = [];

const getAllWorks = async () => {
    await fetch("http://localhost:5678/api/works")
     .then((res) => res.json())
     .then((data) => works = data)
     .catch((error) => {console.log(error)});
 };

/* Suppresion des tableau via la modal */
 
const suppCall = () => {
    const supp = document.querySelectorAll(".trashClass");
    supp.forEach((sup) => {
        sup.addEventListener("click", (e) => {
            fetch("http://localhost:5678/api/works/" + e.target.id, {
        method: "DELETE",
        headers: { 'accept': '*/*',
                     'Authorization': `Bearer ${localStorage.getItem("token")}`}
     }).then(res => res)
      .then(data => { 
        if(!data.ok) {
            msgModal.innerText = "Suppression Impossible";
            msgModal.style.color = "red";
            throw new Error("HTTP status " + data.status);
        } else {
            msgModal.innerText = "Travaux bien supprimer";
            msgModal.style.color = "green";
        }
            })
      .catch((error) => {console.log(error)})
        clearModals();
        modalsDisplay();
        clearWorks();
        worksDisplay();
        });       
    });
}

/* Afficher dynamiquement les travaux via la modal */

 const displayModals = (works) => {
    for (let i = 0; i < works.length; i++) {   
        const work = works[i];
        const figureElement = document.createElement("figure");
         const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
 imageElement.crossOrigin = "anonymous";
  imageElement.classList.add("testimg");

  const trash = document.createElement("img");
  trash.src = "./assets/icons/trash.png";
  trash.classList.add("trashClass");
  trash.classList.add("iconClass");
  trash.setAttribute("id" , work.id);
 
 const editElement = document.createElement("figcaption");
  editElement.innerText = "éditer";
 
  const sectionGallery = document.querySelector(".modal-gallery");
 
  sectionGallery.appendChild(figureElement);
 figureElement.appendChild(imageElement);
  figureElement.appendChild(editElement);
  figureElement.appendChild(trash);
 }
 const switchs = document.querySelector(".modal-gallery figure:first-child");
   switchs.innerHTML += ` <img src="./assets/icons/multidirection.png" class="deplaceClass iconClass">
        `;
 }

 /* Afficher dynamiquement les travaux sur la gallery */
 const display = (works) => {
    for (let i = 0; i < works.length; i++) {    
        const work = works[i];
        const figureElement = document.createElement("figure");
         const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
 imageElement.crossOrigin = "anonymous";

 const nomElement = document.createElement("figcaption");
  nomElement.innerText = work.title;
 
  const sectionGallery = document.querySelector(".gallery");
 
  sectionGallery.appendChild(figureElement);
 figureElement.appendChild(imageElement);
  figureElement.appendChild(nomElement);
 }
 }
 
 /* Clean de la modal et de la gallery pour afficher les travaux mis a jour par la suite */

 const clearModals = () => {
    const sectionModals = document.querySelector(".modal-gallery");
    sectionModals.innerHTML = "";  
 }

 const clearWorks = () => {
    const sectionWorks = document.querySelector(".gallery");
    sectionWorks.innerHTML = "";
 }
 
/* Fonction des comportement des mise a jour des travaux sur la gallery et la modal */

const worksDisplay = async () => {
    await  getAllWorks(); 
    display(works);
}

const modalsDisplay = async () => {
    await  getAllWorks(); 
    displayModals(works);
    suppCall();
}

/* Fonction pour afficher les travaux filter */

const filterDisplay = (works) => {
display(works);
 }

 /* Fonction pour la prévuasilation de l'image a ajouter */
 
const showPreview = (event) => {
    if(event.target.files.length > 0) {
        let src = URL.createObjectURL(event.target.files[0]);
        preview.src = src;
        preview.style.display = "block";
        preview.style.zIndex = "2";       
    }
}

 /* Comportement des different bouton du site */

const allBtnEven = () => {

// Ouverture de la modal

    modalEdit.addEventListener("click" , (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        modalsDisplay();
        msgAddproject.innerText = "";
    })
    
// fermeutre des modal avec la croix

    cross.addEventListener("click" , (e) => {
        modal.style.display = "none";
        clearModals();
        msgModal.innerText = "";
        preview.style.display = "none";
        preview.style.zIndex = "-1";
        file.value = null;
        title.value = null;
        checkForm.innerText = "";       
    })
    
    cross1.addEventListener("click" , (e) => {
        modal.style.display = "none";
        addWork.style.display = "none";
        modalWork.style.display = "block";
        clearModals();
        msgModal.innerText = "";
        preview.style.display = "none";
        preview.style.zIndex = "-1";
        file.value = null;
        title.value = null;
        checkForm.innerText = "";       
    })
    
    modalWork.addEventListener("click", (e) => {
        e.stopPropagation();
    })
    
    addWork.addEventListener("click", (e) => {
        e.stopPropagation();
    })
    
    // fermeture des modal au click du le body 

    test.addEventListener("click", () =>{
        modal.style.display = "none";
        addWork.style.display = "none";
        modalWork.style.display = "block";
        clearModals();
        msgModal.innerText = "";
        preview.style.display = "none";
        preview.style.zIndex = "-1";
        file.value = null;
        title.value = null;
        checkForm.innerText = "";   
    })
    
    // Bouton pour passer a la modal d'ajout de projet 
    
    addPicture.addEventListener("click" , () => {
    addWork.style.display = "block";
    modalWork.style.display = "none";
    msgModal.innerText = "";
})

// bouton retour 

back.addEventListener("click" , () => {
    addWork.style.display = "none";
    modalWork.style.display = "block";
})

// bouton pour la prévisualisation de l'image a ajouter 

document.getElementById("file").addEventListener("change", (e) => {
    
    showPreview(e);
}
);


}

/* Recuperation des categorie via L'api */

let categorie = [];

const getCategories = async () => {
  await  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((cat) => categorie = cat)
    .catch((error) => {console.log(error)});
}

/* Création des bouton filtre dynamiquement */

const createBtn = async () => {
    const testbtn = document.querySelector(".bouton-filter");
  await getCategories();
    categorie.forEach((catego) => {
        testbtn.innerHTML += `
       <li> <button id="${catego.id}" class="newbtn"> ${catego.name} </button> </li>      
        `;
    })
};

/* Comportement des bouton filtre */

const eventBtn = async () => {
    await getCategories();
const boutonTout = document.querySelector(".btn-tout");
boutonTout.addEventListener("click", () => {
document.querySelector(".gallery").innerHTML = "";
worksDisplay();
});
    const newbtnfilter = document.querySelectorAll(".newbtn");
    newbtnfilter.forEach((btn) => {
        btn.addEventListener("click", (e) => {     
            const photos = works.filter((work) => {
                return work.categoryId.toString() === e.target.id.toString()
            });
            document.querySelector(".gallery").innerHTML= "";
            filterDisplay(photos);    
        })
    })
}

/* Remplisage dynamique de l'input categorie dans l'ajout d'un projet */
const updateSelect = async () => {
    await getCategories();
    categorie.forEach((catego) => {
        category.innerHTML += `
            <option value="${catego.id}"> ${catego.name}</option>
        `;
    })

    
};

/* Fonction qui gère l'ajout d'un projet */
const addProject = async () => {

    let image = document.getElementById("file");
    let file = image.files[0];
    
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;

    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('title', title);
    formData.append('category', category);

        await fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers:{ 
                        'Authorization': `Bearer ${localStorage.getItem("token")}`},
            body: formData
        })
        .then((res) => {
            if (!res.ok) {
                preview.style.zIndex = "-1";
                alert("Impossible d'ajouter le projet");
                throw new Error("HTTP stasus" + res.status);      
            }
            return res.json();
        });

        file.value = null;
        file = null;
        image.value = null;
        checkForm.innerText = "";
        msgAddproject.innerText = "Project corectement ajouter";
        modal.style.display = "none";
        addWork.style.display = "none";
        modalWork.style.display = "block";
        clearModals();
        msgModal.innerText = "";
        preview.style.display = "none";
        preview.style.zIndex = "-1";
        clearWorks();
        worksDisplay();
}

/* Bouton d'ajout du projet */
const btnAddProject = () => {

    const addProjectBtn = document.getElementById("addProjectBtn");

    addProjectBtn.addEventListener("click" , (e) => {
        e.preventDefault();     
            if (title.value === "" || preview.src === "") {
                checkForm.innerText = "Veuillez remplir correctement tout les Champs";
            } else {          
                addProject();
                title.value = null;
            }
    })   
}

/* Appel des toute les fonction créé */

btnAddProject();
allBtnEven();
updateSelect();
getCategories();
createBtn();
eventBtn();
userStatus();
worksDisplay();