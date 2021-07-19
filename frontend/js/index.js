let produit;
let panier = [];
let total = 0;
let produitLS = JSON.parse(localStorage.getItem("panier"));

let strPanierDansStockage=localStorage.getItem("panier");
if (strPanierDansStockage!=null){
    panier=JSON.parse(strPanierDansStockage)
}
console.log(strPanierDansStockage);

function afficheTousLesProduitsPageIndex(){
    fetch("http://localhost:3000/api/furniture") //Recuperation de l'API
    .then(res => res.json())
    .then(data => {
        for(const produit of data){
            document.getElementById("produits").innerHTML += `
                <div class="card col-11 col-md-5 col-xl-3 mt-2 mb-3 space">
                    <a class="mt-2" href="produit.html?id=${produit._id}" target="_blank">
                        <img class="imageMobilier" src="${produit.imageUrl}" alt="image produit"/>
                        <h1 class="mt-2">${produit.name}</h1>
                        <h2>${produit.price/100} €</h2>
                    </a>
                </div>
            `;
        }
    })
}

function afficheDetailsProduitPageProduit(){
    let params = new URLSearchParams(window.location.search);

    let idProduit = params.get("id");
    console.log("http://localhost:3000/api/furniture/"+idProduit);
    console.log(idProduit);

    fetch("http://localhost:3000/api/furniture/"+idProduit) //Creation adresse URL page produit: concatenation URL API + Id produit
        .then(res => res.json())
        .then(data => {
            produit = data;
            var img = document.getElementById("imageProduit");
            img.src = `${produit.imageUrl}`;
            document.getElementById("nom").innerHTML = `${produit.name}`; 
            document.getElementById("prix").innerHTML = `${produit.price/100} €`;
            document.getElementById("description").innerHTML = `${produit.description}`;
            for (const varnish of data.varnish) {
                document.getElementById("choixcouleur").innerHTML += `
                <option value="${varnish}">${varnish}</option>
                `
            }
        }
    )
}

function boutonAjoutPanierPageProduit(){
    let commande={
        id: produit._id,
        name: produit.name,
        image: produit.imageUrl,
        price: produit.price,
        option: document.getElementById("choixcouleur").value,
    };
    panier.push(commande);
    let strPanierStock = JSON.stringify(panier);
    localStorage.setItem("panier", strPanierStock);
}

function recuperationProduitLocalStoragePourPagePanierEtCalculMontantTotalCommandePagePanier(){
    let i = 0;
    for(const commande of panier){
        total=total+commande.price/100;
        document.getElementById("table").innerHTML += `
            <tr>
                <td>
                    <img src="${commande.image}" class="imageProduitPanier" alt="image produit"/>
                </td>
                <td><span class="gras">${commande.name}</span></br>(${commande.option})</td>
                <td id="prix" class="gras">${commande.price/100} €</td>
                <td>
                    <button onclick="supprimeProduitPanier(${i})"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
        i = i+1;
    }
    document.getElementById("totalPanier").innerHTML = total +=`€`;
}

function boutonViderToutLePanierPagePanier(){
    localStorage.removeItem("panier");
    window.location.href = "index.html";
}

function supprimeProduitPanier(i){
    let strPanierDansStockage=localStorage.getItem("panier");
    if (strPanierDansStockage!=null){
        panier=JSON.parse(strPanierDansStockage)
    }
    panier.splice(i, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.reload();
}

function boutonValideCommandePagePanier(){
    event.preventDefault();
    let products = [];
    let contact = {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    let produitLS = JSON.parse(localStorage.getItem("panier"));
    produitLS.forEach(data_id=>{products.push(data_id.id)})
    console.log(products);
    const regName = /([a-zA-Z\s-éçïë])+/;
    const regAddress = /([a-zA-Z0-9\s-éçà])+/;
    const regEmail = /([a-zA-Z0-9\.-_@])+/;
    if(
        regName.test(contact.lastName)==false &&
        regName.test(contact.firstName)==false &&
        regName.test(contact.city)==false &&
        regAddress.test(contact.address)==false &&
        regEmail.test(contact.email)==false
        ){
            alert("Champ(s) invalide(s), merci de bien renseigner le formulaire");
            return false;
        } else {
        let donneesFormulaireCommande = JSON.stringify({
            contact,products
        });
    console.log(donneesFormulaireCommande);
    envoiCommandeEtDonneesFormulairePagePanierAuBackend(donneesFormulaireCommande);
    }
}

function envoiCommandeEtDonneesFormulairePagePanierAuBackend(donneesVide){//---requete POST
    fetch("http://localhost:3000/api/furniture/order", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: donneesVide
    })
    .then(response=>{
        return response.json();
    })
    .then(response=>{
        localStorage.setItem("orderId", JSON.stringify(response.orderId));
        localStorage.setItem("prixtotal", JSON.stringify(total));
        localStorage.removeItem("panier");
        window.location.replace("confirm.html");
        console.log(response);
    })
    .catch(error=>{
        console.log(error);
    });
}

function validationCommandeEtRemerciementsPageConfirmation(){
    let total = JSON.parse(localStorage.getItem("prixtotal"));
    let order = JSON.parse(localStorage.getItem("orderId"));
    let merci = document.querySelector(".remerciements");
    merci.innerHTML = `
    <p class="mt-2 text-center">Bonjour,</p>
    <p class="mx-3">Votre commande N° <span class="gras">${order}</span>, pour un montant total de <span class="gras">${total}</span> a bien été prise en compte.</p>
    <p class="mx-3">Celle-ci sera expédiée dans les plus brefs délais.</p>
    <p class="mx-3">Nous vous remercions pour vos achats et espérons vous revoir très vite sur notre site.</p>
    <p class="mx-3">L'équipe Orinoco</p>
    `;
    localStorage.clear();
}