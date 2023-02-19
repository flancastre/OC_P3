

const modalEdit = document.getElementById("modalEdit");
const logOut = document.getElementById("logOut");
const logIn = document.getElementById("logIn");
const edits = document.querySelectorAll(".edit");
const modal = document.getElementById("modalContainer");
const cross = document.getElementById("cross");
const test = document.querySelector(".test");


const token = JSON.parse(localStorage.getItem("token"));
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


logOut.addEventListener('click' , (e) => {
    localStorage.removeItem("token");
    document.location.href="index.html";
})



let works = [];

const getAllWorks = async () => {
    await fetch("http://localhost:5678/api/works")
     .then((res) => res.json())
     .then((data) => works = data)
     .catch((error) => {console.log(error)});
  
 };

 console.log(token);

 
const suppCall = () => {
    const supp = document.querySelectorAll(".trashClass");
    supp.forEach((sup) => {
        sup.addEventListener("click", (e) => {

            fetch("http://localhost:5678/api/works/" + e.target.id, {
        method: "DELETE",
        headers: { 'accept': '*/*',
                     'Authorization': `Bearer ${localStorage.getItem("token")}`},
        mode: "cors",
        cretentials: "same-origin"
     }).then(res => res.json())
      .then(data => console.log(data))
      .catch((error) => {console.log(error)})

            
        });       
    });
}






   

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
  trash.setAttribute("id" , [i+1]);

 
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


 const clearModals = () => {
    const sectionModals = document.querySelector(".modal-gallery");
    sectionModals.innerHTML = "";
   
 }
 

 const display = (works) => {
    for (let i = 0; i < works.length; i++) {
       
        const work = works[i];
        const figureElement = document.createElement("figure");
         const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
 imageElement.crossOrigin = "anonymous";
//   imageElement.classList.add("testimg");
 
 const nomElement = document.createElement("figcaption");
  nomElement.innerText = work.title;
 
  const sectionGallery = document.querySelector(".gallery");
 
  sectionGallery.appendChild(figureElement);
 figureElement.appendChild(imageElement);
  figureElement.appendChild(nomElement);
 }
 }
 
const worksDisplay = async () => {
    await  getAllWorks(); 
    display(works);
}

const modalsDisplay = async () => {
    await  getAllWorks(); 
    displayModals(works);
    suppCall();
}



const filterDisplay = (works) => {
display(works);
 }

 const filterEvent = () => {
     // config bouton tout 
        
     const boutonTout = document.querySelector(".btn-tout");
     boutonTout.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = "";
    worksDisplay();
 });
 
 // config bouton objet
 
 const boutonObjet = document.querySelector(".btn-objet");
 
 boutonObjet.addEventListener("click", () => {
     const photosObjets = works.filter((work)=>{
         return work.categoryId === 1;
        });
    document.querySelector(".gallery").innerHTML = "";
    filterDisplay(photosObjets);
});
// // configuration bouton filtre Appartements 
 const boutonAppartement = document.querySelector(".btn-appartement");
 boutonAppartement.addEventListener("click", () => {
     const photosObjets = works.filter((work)=>{
         return work.categoryId === 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        filterDisplay(photosObjets);
    });  
    // // Config bouton hotel resto   
    const boutonHotel = document.querySelector(".btn-hotel");
    boutonHotel.addEventListener("click", () => {
        const photosObjets = works.filter((work)=>{
         return work.categoryId === 3;
     });
    document.querySelector(".gallery").innerHTML = "";
    filterDisplay(photosObjets);
});
}


modalEdit.addEventListener("click" , (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    modalsDisplay();
   
   
})

cross.addEventListener("click" , (e) => {
    modal.style.display = "none";
    // document.body.style.background = "white";
    clearModals();

})

const stopPropa = document.getElementById('modale');

stopPropa.addEventListener("click", (e) => {
    e.stopPropagation();
})


test.addEventListener("click", () =>{
    modal.style.display = "none";
    clearModals();

})



 


worksDisplay();
filterEvent();


