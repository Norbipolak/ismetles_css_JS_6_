const commentsDiv = document.querySelector("#comments");

async function getComments() {
    const response = await fetch("https://dummyjson.com/comments");
    const json = await response.json();
    console.log(json);

    for(const comment of json.comments) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        const grid2Div = document.createElement("div");
        grid2Div.classList.add("grid-2");
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");
        const idDiv = document.createElement("div");
        idDiv.innerText = comment.id;
        const p = document.createElement("p");
        p.innerText = comment.body;

        //user, username
        boxDiv.appendChild(idDiv);
        boxDiv.appendChild(p);
        grid2Div.appendChild(boxDiv);
        commentDiv.appendChild(grid2Div);

        commentsDiv.appendChild(commentDiv);
    }
}

/*
Iterate through an object
const myObject = {a: 1, b: 2, c: 3};

Object.values(myObject).forEach(value => {
  console.log(value);
});
*/

getComments();