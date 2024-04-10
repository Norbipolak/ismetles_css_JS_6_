/*
Van egy get késérünk és meg szeretnénk jeleníteni a dolgokat, amiket kapunk onnan ebben a posts-holder-ben 

Get all posts
-> 
fetch('https://dummyjson.com/posts')
.then(res => res.json())
.then(console.log);

const postsDiv = document.querySelector("#posts-holder");

async function getPosts() {
    const response = await fetch("https://dummyjson/posts");
    const json = await response.json();
    console.log(json);
};

getPosts();
Meghívjuk a függvényt és megnézzük, hogy mit kaptunk vissza a console.log(json)-ra 

Object
    limit: 30
    posts: (30) [{...}, {...}, {...}, {...}]
        0: 
            body: "Hi mother had always taught him not to answer to strangers"
            id: 1
            reactions: 2
            tags: ["history", "american", "crime"]
                0: "history"
                1: "american"
                2: "crime"
            title: "His mother had always taught him"
            userId: 9 
    skip: 0
    total: 150 
    [[Prototype]]: Object 

Itt posts-ban  található az a 30 darab, amire a limit vonatkozik 

Egymás alatt megjelenítjük ezeket a post-okat majd 

Ez a HTML szerkezet, ami alapján csináljuk 
    <div class="container">
        <h1>Posts</h1>
        <div id="posts-holder">
            <div class="post">
                <h3>Title</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At nulla, 
                    recusandae incidunt voluptates enim eum velit fugit in corporis laborum 
                    molestiae animi quibusdam? Eveniet deleniti consequatur dolore ullam ab doloremque.
                </p>
                <div class="tags">
                    <div class="tag">asddgs</div>
                    <div class="tag">asddgs</div>
                </div>
            </div>
        </div>
    </div>

async function getPosts() {
    const response = await fetch("https://dummyjson.com/posts")
    const json = await response.json();

    for(const post of json.posts){
        const div = document.createElement("div");
        div.classList.add("post");
        const p = document.createElement("p");
        p.innerText = post.body;
        const title = document.createElement("h3");
        title.innerText = post.title;
        const tags = document.createElement("div");
        tags.classList.add("tags");

        Van itt egy olyanunk, hogy post.tag, ami egy tömb, tehát ezen a tömbön végig kell menni!!!!

        for(const tag of post.tags) {
            const t = document.createElement("div");
            t.innerText = tag;
            t.classList.add("tag")
            tags.appendChild(t);
        }

        div.appendChild(p);
        div.appendChild(title);
        div.appendChild(tags);

        postDiv.appendChild(div);


    }
}

1. csináltunk egy div-et, amit lementettünk id alapján
2. megszereztük az adatokat egy get kéréssel
    visszakaptunk egy json-t, aminek van egy olyanja, hogy posts(itt található amit mi meg szeretnénk jeleníteni)
3. ezen végigmegyünk egy for of-val (const post of json.posts)
4. Majd ebben megcsináljuk a html szerkezetet (de előtte megcsináltuk html, hogy hogyan fog kinézni)
    createElement-vel megcsináljuk a tag-okat 
    ha van class-ja, akkor classList.add 
    azt pedig, hogy mit szeretnénk benne megjeleníteni -> innerText
    appendChild-val meg beletesszük egymásba a dolgokat, fontos, hogy a végén abba is appendChild-oljunk, amit lementettünk az elején!!!

Fontos, hogyha visszakapunk egy tömböt vagy objektumot, akkor végig kell menni rajta, ugy mint az elején a json.posts-okon és abban kell 
megcsinálni a szerkezetet a createElement-vel, itt pl. a tags-re gondolok, ami egy tömb és végigmentünk rajta for(const tag of post.tags)
itt pl. az innerText az maga a tag lesz


*/