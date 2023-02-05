// // VERSION 1 

// // fetch("http://localhost:5678/api/works").then((res) => res.json()).then((data) => {
// //     console.log(data);
   
  
// // })

// // Recupère les travaux et les affiche sur le dom 


// (async ()=> {

//     const works = await fetch('http://localhost:5678/api/works')
//     .then((works) => works.json())
//     .then((project) => getWorks(project))
//     .catch((error) => {console.log(error);
// })
  
// })();
//     // console.log(works);
//     function getWorks(works) {

//         for (let i = 0; i < works.length; i++) {
            
//             const work = works[i];
            
//             // console.log(work);
            
//             // On boucle pour afficher tout les traveaux 
            
//             const sectionTest = document.querySelector(".test");
            
//             const photoElement = document.createElement("article");
            
//             const imageElement = document.createElement("img");
//             imageElement.src = work.imageUrl;
//             imageElement.crossOrigin = "anonymous";
//             imageElement.classList.add("testimg");
            
//             const nomElement = document.createElement("p");
//             nomElement.innerText = work.title;
            
//             sectionTest.appendChild(photoElement);
            
//             photoElement.appendChild(imageElement);
//             photoElement.appendChild(nomElement);
            
            
            
            
//         }
//     }

//     // getWorks(works);
        
//         // ----------------------------------------------------------------/

//         // première versions sans boucle récuperation des travaux
//     // const imageElement = document.createElement("img");
//     // imageElement.src = work.imageUrl;
//     // imageElement.crossOrigin = "anonymous";
//     // imageElement.classList.add("testimg");

//     // const nomElement = document.createElement("p");
//     // nomElement.innerText = work.title;

//     // const sectionTest = document.querySelector(".test");

//     // sectionTest.appendChild(imageElement);
//     // sectionTest.appendChild(nomElement);


//     // ---------------------------------------------------------------
//         //  test de mapping
//     // const name = works.map(work => work.categoryId);
//     // console.log(name);


//     // config bouton tout 

    
//     const boutonTout = document.querySelector(".btn-tout");
// boutonTout.addEventListener("click", () => {
//    document.querySelector(".test").innerHTML = "";
//    getWorks(works);
// });


//     // configuration bouton filtre Object

//     const boutonObjet = document.querySelector(".btn-objet");
// boutonObjet.addEventListener("click", () => {
//     const photosObjets = works.filter((work)=>{
//         return work.categoryId === 1;
//     });
//    document.querySelector(".test").innerHTML = "";
//    getWorks(photosObjets);
// });


// // configuration bouton filtre Appartements 

// const boutonAppartement = document.querySelector(".btn-appartement");
// boutonAppartement.addEventListener("click", () => {
//     const photosObjets = works.filter((work)=>{
//         return work.categoryId === 2;
//     });
//    document.querySelector(".test").innerHTML = "";
//    getWorks(photosObjets);
// });


// // Config bouton hotel resto 

// const boutonHotel = document.querySelector(".btn-hotel");
// boutonHotel.addEventListener("click", () => {
//     const photosObjets = works.filter((work)=>{
//         return work.categoryId === 3;
//     });
//    document.querySelector(".test").innerHTML = "";
//    getWorks(photosObjets);
// });








//************************* */ VERSION 2 ***********************************************// 
let works = [];

const getAllWorks = async () => {
    await fetch("http://localhost:5678/api/works")
     .then((res) => res.json())
     .then((data) => works = data)
     .catch((error) => {console.log(error)});
  
 };

 const display = (works) => {
    for (let i = 0; i < works.length; i++) {
       
        const work = works[i];
        const figureElement = document.createElement("figure");
         const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
 imageElement.crossOrigin = "anonymous";
  imageElement.classList.add("testimg");
 
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


worksDisplay();
filterEvent();