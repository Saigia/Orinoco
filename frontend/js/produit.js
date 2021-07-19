
// let produit;
// let panier=[];

// function afficheTousLesProduitsPageIndex(){
//     fetch("http://localhost:3000/api/furniture")
//     .then(res => res.json())
//     .then(data => {
//         for(const produit of data){
//             document.getElementById("produits").innerHTML += `
//                 <div class="card col-11 col-md-5 col-xl-3 mt-2 mb-3 space">
//                     <a class="mt-2" href="produit.html?id=${produit._id}">
//                         <img class="imageMobilier" src="${produit.imageUrl}" alt="image produit"/>
//                         <h1 class="mt-2">${produit.name}</h1>
//                         <h2>${produit.price/100} €</h2>
//                     </a>
//                 </div>
//             `;
//         }
//     })
// }

// function afficheDetailsProduitPageProduit(){
//     let params = new URLSearchParams(window.location.search);

//     let idProduit = params.get("id");
//     console.log("http://localhost:3000/api/furniture/"+idProduit);
//     console.log(idProduit);

//     fetch("http://localhost:3000/api/furniture/"+idProduit)
//         .then(res => res.json())
//         .then(data => {
//             produit = data;
//             var img = document.getElementById("imageProduit");
//             img.src = `${produit.imageUrl}`;
//             document.getElementById("nom").innerHTML = `${produit.name}`; 
//             document.getElementById("prix").innerHTML = `${produit.price/100} €`;
//             document.getElementById("description").innerHTML = `${produit.description}`;
//             for (const varnish of data.varnish) {
//                 document.getElementById("choixcouleur").innerHTML += `
//                 <option value="${varnish}">${varnish}</option>
//                 `
//             }
//         }
//     )
// }

// function afficheLesOptionsPageProduit(){
//     fetch("http://localhost:3000/api/furniture")
//     .then(res => res.json())
//     .then(data => {
//         for(const produit of data){
//             document.getElementById("produits").innerHTML += `
//             <select name="#" id="choixcouleur" class="taille">
//                 <option value="Vernis">${produit.varnish}</option>
//             </select>
//             `;
//         }
//     })
// }
