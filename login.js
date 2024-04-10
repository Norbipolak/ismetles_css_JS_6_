/*
Ezt fogjuk itt csinálni, így néz ki a dummyjson.com-on login auth néven 

fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: 'kminchelle',
    password: '0lelplR',
    expiresInMins: 30, // optional, defaults to 60
  })
})
.then(res => res.json())
.then(console.log);

Megcsináljuk a login.html-et is 

Megcsináltuk a html szerkezetet 
->
    <form>
        <h3>Felhasználónév</h3>
        <input type="text" id="userName">

        <h3>Jelszó</h3>
        <input type="text" id="pass">

        <button id="login">Bejeletnkezés</button>
    </form>

Lementjük az id-val rendelkező dolgokat 
const userNameInput = document.querySelector("#userName");
const passInput = document.querySelector("#pass");
const loginBtn = document.querySelector("#login");

Azért mentjük lesz ezt ilyen formában, hogy loginBtn, mert akkor nincsen névütközés ha van szeretnénk csinálni mondjuk egy login függvényt 

loginBtn.addEventListener("click", function() {
    const userName = userNameInput.value;
    const pass = passInput.value;
});

ez a function ez lehet egy asnyc arrow function, nem egy névetelen sima function
"click", function()
helyett 
"click", asnyc ()=>

loginBtn.addEventListener("click", async (e)=> {
    e.preventDefault();
    const userName = userNameInput.value;
    const pass = passInput.value;

    const loginObj = {
        userName,
        pass
    }

    const response = await fetch("https://dummyjson.com/auth/login", {
        method:"POST", 
        headers:{"content-type":"application/json"},
        body:JSON.stringify(loginObj)
    })

    const json = await response.json(); 

});

1. Csináltunk egy eventListener-t, arra gombra, amit lementettünk 
2. egy változóban ebben az eventListener-ben elmentettük a passInput és a userNameInput értékét -> const userName = userNameInput.value
3. csinálunk egy szokásos response-ot és ott fontos, hogy melyik endpoint-ot szólítjuk meg, ezért kell, hogy ez a function nem csak 
egy sima névtelen finction legyen, hanem egy async arrow function!!!!
4. ennek a fetch-nek van egy második paramétere, ide adjuk meg, hogy milyen a metódus meg hogy milyen müveletet szeretnénk végrehajtani
pl. post, patch, put, delete stb. de egy sima get-kérésnél nem kell ez a második paraméter, ami ugye egy objektum lesz ebben!!!!
5. body-ban pedig létre kell hozni egy json stringet, ami tartalmazza a username-t meg a password-ot 
ahogy a dummyjson.com-os példában is van 
-> 
body: JSON.stringify({
    
    username: 'kminchelle',
    password: '0lelplR',
    expiresInMins: 30, // optional, defaults to 60
  })
6. csinálunk egy objektumot a response-os rész felett -> const loginObj 
Ha itt csináljuk meg az objektumot akkor ugy veszi, hogy a userName:UserName, tehét a kulcsunk az lesz, hogy userName az első 
a második pedig a userName-nek az értéke, amit ugye lementettünk és az meg a input mezőnek az értéke lesz!!!!!!
szóval ezt az egészet ezt nem kell így kiírni, hanem magától tudja 
tehát ez a kettő az teljesen ugyanaz lesz 
->
const loginObj = {
    userName:userName,
    pass:pass
}
meg ez 
-> 
const loginObj = {
    userName,
    pass
}
és akkor ha ezt megadjuk, ezt az objektumot a body-ban, nem úgy mint a példában, hogy ott dolgozta ki ezt a objektumot, hanem ezt mi kivül 
és megadtuk a body-nak JSON.stringify-ban -> JSON.stringify(loginObj)
7. legvégén pedig a szokásos const json = await response.json();

Fontos, mivel ez form-ban van a html-ben, ezért ha beírjuk a dolgokat a username-et meg a pssword-ot, akkor automatikusan újra 
fog töktödni az oldal!!!!!! 
ezért kell az e.preventDefault();
*********************************************************
valamiért nem lehet megcsinálni, pedig beírtuk ugyanazokat a credentials-okat, amik meg vannak adva a példában 
és jó is a kód, mert a console.log(loginObj);
->
{userName: 'kminchelle', pass: '0lelplR'}
    userName: "kminchelle"
    pass: "0lelplR"
    [[Prototype]]: Object

amugy meg azt írja ki, hogy POST https://dummyjson.com/auth/login 400 Bad ...
{message: 'Invalid credentials'}

Mi van akkor ha kapunk egy 400-as kódot mint most, mivel JSON Api-val dolgozunk, ezért ideális esetben, szóval valamilyen 
hibastátuszkód esetében is JSON kapunk vissza!!!!!!
Így ez a reponse.json(); ez mindig megtörténik 
-> 
és amennyiben a response.ok az true abban az esetben azt mondjuk, hogy sikeres bejelentjezés 
Amennyiben viszont ez a válasz nem true, abban az esetben pedig kiírjuk a hibát 
-> 
if(response.ok) {
    console.log("Sikeres bejelentkezés!");
} else {
    ide pedig, amit majd csinálunk html-ben 
}

Szóval a html-ben a form felett csináltunk egy div-et messages id-val, amit majd ide querySelector-val lementünk 
    <div id="messages"></div>
    <form>

const messagesDiv = document.querySelector("#messages");

és ha a response.ok az true volt akkor ennek a messages-nek az innerHTML-je az lesz, hogy sikeres bejelentkezés 
ha pedig nem volt jó akkor kiírjuk a json.messages-t vele!!!!!!!
és akkor így a böngészőben is látjuk, hogy sikeres volt-e a bejelentkezés, ha nem akkor meg kiírjuk amit a json-ban visszakapunk 
message-t 

if(response.ok) {
    messagesDiv.innerHTML = "Sikeres bejelentkezés!";
} else {
    messagesDiv.innerHTML = json.message;
}

És akkor mivel nem tudtuk megcsinálni ezért kiírja a böngészőben, hogy invalid credentials a két input mező felé!!!!!!
-> 
egész kód 

const userNameInput = document.querySelector("#userName");
const passInput = document.querySelector("#pass");
const loginBtn = document.querySelector("#login");
const messagesDiv = document.querySelector("#messages");

loginBtn.addEventListener("click", async (e)=> {
e.preventDefault();
const userName = userNameInput.value;
const pass = passInput.value; 

const loginObj = {
    userName,
    pass
};

const response = await fetch("https://dummyjson.com/auth-login", {
    method: "POST",
    headers: {"content-type":"application/json"},
    body: JSON.stringify(loginObj)
});

const json = await response.json();

console.log(response.status);

if(response.ok) {
    messagesDiv.innerHTML = "Sikeres bejelentkezés!";
} else {
    messagesDiv.innerHTML = json.message;
}
});

Kaptunk itt egy olyan statuszkódot, hogy 400 a console.log(response.status)-ra 
És ha nem 200-as statuszkódot kapunk, akkor a response.ok az false értéket kap és akkor innen tudjuk, hogy valamilyen hiba történt 
vagy szerver vagy klienshiba (még 100 meg a 300-as statuszokat is elfogadja, csak a 400-as meg 500-asakat nem, mert azok hibát jeleznek)

És akkor ha beírunk bármit is a input mezőkben akkor mindig azt fogja kiírni felölre, hogy invalid credentials
****************************************************************************************************************************
van egy olyan dummyjson-ben, hogy get current auth user 
->
fetch('https://dummyjson.com/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer  YOUR_TOKEN_HERE ', 
}, 
})
.then(res => res.json())
.then(console.log);

és ez azért jó nekünk, mert a headers-ben kapunk egy authorization fejlécet 
ez egy olyan azonosító lesz egy olyan kódsor, ami ahhoz szükséges, hogy tovaábbi müveletek végezzünk el 

async function getToken() {
    const response = await fetch("https://dummyjson.com/auth/me");

    for(const header of response.headers) {
    console.log(header);
}
};

Itt pont ne a json kell, van a headers-ünk 
-> 
for(const header of response.headers) {
    console.log(header);
}
így lesz jó- mert ez egy get kérésnek kell lennie 
-> 
async function getToken() {
    const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
            'Authorisation': 'Bearer Your Token is here'
        }

        const json = await response.json();
        console.log(json);
    });
}
};

Nem lesz jó, mert ezt kaptunk vissza a console.log(json)-ra
-> 
GET https://dummyjson.com/auth/me 401
{name: 'JsonWebTokenError', message: 'Invalid/Expired Token!'}
    message: "Invalid/Expired Token!"
    name: "JsonWebTokenError"
    [[Prototype]]: Object

Itt most nem tudjuk, hogy milyen token-t kell küldeni, mert erre vonatkozóan nem adtak instrukciókat, csak azt, hogy 
Bearer Your Token is here 

de ez megint egy másik hibakód 401-es, tehát ez is egy kliens hiba, mint az elöző 400-as

Ez azért van így mert magánál az Api-nál nem nagyon mondják meg, hogy mi legyen a token-ünk, amit elküldünk a részükre!!

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Itt ennél az lenne a lényeg, hogy a headers-ben el kellene küldenünk egy token-t, amit korábban megkaptunk 
Ennek az a lényege ennek a token küldözgetésnek, hogy lekérünk a szervertől egy token-t és csak akkor kapjuk meg alapból ha van 
rá jógosultságunk, mondjuk be vagyunk jelentkezve!!!
Így müködik az online bankolásnál is!!!
És ezt a tokent küldjük vissza, amikor bármilyen müveletet szeretnénk végrehajtani és ez azért jó, mert nem tudják meghamiaítani 
a kérésünket, tehát nem tudnak a mi nevünkben csinálni valamit, csak ide most nekünk valamilyen token kódot kellene írnunk, amiről 
nem tudjuk, hogy mi, mert a dokumentáció nem adja meg számunkra  
********************************************************************************************************************
Megcsináljuk a dummyjson-nak a post-os részét!!!!
*/