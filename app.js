let library = [
  {
    id: 0,
    title: 'The Catcher in The Rye',
    author: 'J.D. Salinger',
    pages: 234,
    haveRead: true,
    coverImage:
      'https://www.candlesbook.com/wp-content/uploads/book-cover-art-print-catcher.jpg',
  },
];

const STOCK_IMAGE =
  'https://images.pexels.com/photos/256161/pexels-photo-256161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

function Book(title, author, pages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.coverImage = coverImage;
  this.haveRead = haveRead;
}

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('modal-btn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// Select the submit button
const submit = document.getElementById('btn-submit');

// Select add book form
const form = document.getElementsByClassName('book-form')[0];

// container that will hold book list. Books will be appended here.
const container = document.getElementById('book-container');

// Gather books from local storage
let storedBooks = JSON.parse(localStorage.getItem('BookList')) || [];

// Load all booklist cards
for (let i = 0; i < storedBooks.length; i++) {
  generateCard(storedBooks[i]);
}

// create a new card when use submits new book
function generateCard(book) {
  let newCard = document.createElement('div');
  newCard.classList.add('card');

  let figure = document.createElement('figure');
  figure.classList.add('card__thumb');

  let img = document.createElement('img');
  img.classList.add('card__thumb');
  img.src = STOCK_IMAGE;
  figure.appendChild(img);

  let figcaption = document.createElement('figcaption');
  figcaption.classList.add('card__caption');

  let newTitle = document.createElement('h2');
  newTitle.classList.add('card__title');
  newTitle.innerText = book.title;

  let p = document.createElement('p');
  p.classList.add('card_snippet');
  p.innerText = book.author;
  let a = document.createElement('a');
  a.classList.add('card__button');
  figcaption.appendChild(newTitle);
  figcaption.appendChild(p);
  figcaption.appendChild(a);

  figure.appendChild(figcaption);
  newCard.appendChild(figure);
  container.appendChild(newCard);
}

// create new book object and append it to local storage
function addBookToLibrary(e) {
  e.preventDefault(); // stop form from submitting
  let book = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
    pages: document.getElementById('book-pages').value,
    haveRead: document.getElementById('have-read').checked,
  };
  library.push(book);
  console.log(book);
  form.reset();
  modal.style.display = 'none';

  generateCard(book);

  // save to LocalStorage
  storedBooks.push(book);
  localStorage.setItem('BookList', JSON.stringify(storedBooks));
}

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

form.addEventListener('submit', addBookToLibrary);
