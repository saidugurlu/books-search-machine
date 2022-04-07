import "./style.scss";
const urlEn = "https://gutendex.com/books?languages=en";
const urlDe = "https://gutendex.com/books?languages=de";
const urlFr = "https://gutendex.com/books?languages=fr";
const appElem = document.querySelector("#app");
appElem.innerHTML = `<div class='tetrominos'>
<div class='tetromino box1'></div>
<div class='tetromino box2'></div>
<div class='tetromino box3'></div>
<div class='tetromino box4'></div>
</div>`;
appElem.innerHTML;
let books = [];

setTimeout(() => {
  (async () => {
    // fetch
    const responseDe = await fetch(urlDe);
    const responseEn = await fetch(urlEn);
    const responseFr = await fetch(urlFr);

    const booksDe = await responseDe.json();
    const booksEn = await responseEn.json();
    const booksFr = await responseFr.json();

    // console.log(booksDe);
    // console.log(booksEn);
    books = [...booksDe.results, ...booksEn.results, ...booksFr.results];
    //console.log("allBooks", books);
    appElem.innerHTML = ` <div class="container">
  <ul>
      ${books
        .map((book) => {
          // console.log(book.authors);
          if (book.authors.length !== 0) {
            return `<li class="bookList">
            <span><a target="_blank" href="${book.formats["application/pdf"]}"><img style="width: 10rem; height: 15rem" src="${book.formats["image/jpeg"]}" alt="Book's image"></a></span>
            <span  class="items">${book.title}</span>
            <span  ><strong> ${book.authors[0]["name"]}</strong></span>
            </li>`;
          }
        })
        .join("")} 
    
  </ul>
  </div>
`;
  })();
}, 1000);

// Filter items-----------------------------------------------------------------------
const filter = document.querySelector("#filter");

filter.addEventListener("keyup", filterBooks);
function filterBooks(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".items");
  console.log("said", listItems);

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    // console.log(text);
    if (text.indexOf(filterValue) === -1) {
      //not find
      listItem.parentElement.setAttribute("style", "display:none !important");
    } else {
      listItem.parentElement.setAttribute("style", "display:flex");
    }
  });
  e.preventDefault();
}
// Suchen nach ein Buch
// filtern wir das Buch aus Books aus der
// wenn es zutritt dann drücken wir es in appElem.innerHTML aus
// const searchBook = document.querySelector("#searchBook");
// searchBook.addEventListener("click", () => {
//   return books.map((book) => {
//     // console.log(book.authors);
//     // console.log(filter.value);
//     let author = book.authors.length > 0 ? book.authors[0].name : "no author";
//     if (book.title.includes(filter.value) || author.includes(filter.value)) {
//       // console.log(book.name);
//       return book;
//     } else {
//       console.log("no name");
//     }
//   });
// });
