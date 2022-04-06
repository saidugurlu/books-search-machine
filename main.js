import "./style.scss";
const urlEn = "https://gutendex.com/books?languages=en";
const urlDe = "https://gutendex.com/books?languages=de";
const urlFr = "https://gutendex.com/books?languages=fr";

const appElem = document.querySelector("#app");
const filter = document.querySelector("#filter");
const searchBook = document.querySelector("#searchBook");

appElem.innerHTML;
let books = [];

appElem.innerHTML = `<div class='tetrominos'>
<div class='tetromino box1'></div>
<div class='tetromino box2'></div>
<div class='tetromino box3'></div>
<div class='tetromino box4'></div>
</div>`;

// fetch
(async () => {
  const responseDe = await fetch(urlDe);
  const responseEn = await fetch(urlEn);
  const responseFr = await fetch(urlFr);

  const booksDe = await responseDe.json();
  const booksEn = await responseEn.json();
  const booksFr = await responseFr.json();
  books = [...booksDe.results, ...booksEn.results, ...booksFr.results];

  appElem.innerHTML = `<div class="container">
  <ul>
      ${books
        .map((book) => {
          if (book.authors.length !== 0) {
            return `<li class="bookList">
            <span><a target="_blank" href="${book.formats["application/pdf"]}"><img style="width: 10rem; height: 15rem" src="${book.formats["image/jpeg"]}" alt="Book's image"></a></span>
            <span  class="items">${book.title}</span>
            <span class="items"><strong> ${book.authors[0]["name"]}</strong></span>
            </li>`;
          }
        })
        .join("")} 
    
  </ul>
  </div>
`;
})();

// Filter items-----------------------------------------------------------------------
// filter.addEventListener("keyup", filterBooks);

// function filterBooks(e) {
//   const filterValue = e.target.value.toLowerCase();
//   const listItems = document.querySelectorAll(".items");
//   listItems.forEach(function (listItem) {
//     const text = listItem.textContent.toLowerCase();
//     if (text.indexOf(filterValue) === -1) {
//       //not find
//       listItem.parentElement.setAttribute("style", "display:none !important");
//     } else {
//       listItem.parentElement.setAttribute("style", "display:flex");
//     }
//   });
//   e.preventDefault();
// }
 

// Suchen nach ein Buch
// filtern wir das Buch aus Books aus der
// wenn es zutritt dann drücken wir es in appElem.innerHTML aus
searchBook.addEventListener("click", () => {
  return books.map((book) => {
    // console.log(book.authors);
    // console.log(filter.value);
    let author = book.authors.length > 0 ? book.authors[0].name : "no author";
    if (book.title.includes(filter.value) || author.includes(filter.value)) {
      // console.log(book.name);
      return book;
    } else {
      console.log("no name");
    }
  });
});
