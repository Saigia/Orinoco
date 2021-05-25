function testFetch(){
    fetch("http://localhost:3000/api/furniture")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for(const produit of data){
            document.querySelector("main").innerHTML += produit.name +"<br>";
        }
    })
}