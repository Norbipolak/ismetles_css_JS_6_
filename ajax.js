/*
Formpkból az adatokat, hogy ellenőrizzük, hogy megfelelő formátumuak-e 

async function addProduct(product) {
    try {
        const response = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        })
        const json = await response.json;
    } catch(err) {
        console.log(err);
    }
}

addProduct({
    "title":"iPhone 1000",
    "price": 3444,
    "description":"This is a very good Iphone"
});

Ilyen formában is át tudjuk adni a product-ot, amit kér ez a függvény, vagy csinálunk egy másik függvényt, ahol ugyanigy kidolgozzuk ezt 
a objektumot és ott hívjuk meg ezt az addProduct függvényt 

fontos, hogy a headers mindig egy objektumban legyen -> headers: {"content-type":"application/json"}
*/


