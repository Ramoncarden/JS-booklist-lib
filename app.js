let library = JSON.parse(localStorage.getItem('BookList')) || [];

const STOCK_IMAGE =
  'https://images.pexels.com/photos/256161/pexels-photo-256161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

function Book(title, author, pages, haveRead) {
  this.id = index;
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

const markAsRead = document.querySelectorAll('.card-button');

const totalBooks = document.getElementById('total-books');

const completedBooks = document.getElementById('completed-books');

const totalPages = document.getElementById('total-pages');

let countBooks = () => {
  if (!library.length) return 0;
  else if (library.length === 1) {
    return 1;
  } else {
    return library.length - 1;
  }
};

// Gather books from local storage
// let storedBooks = ;

// Load all booklist cards
function render() {
  for (let i = 0; i < library.length; i++) {
    generateCard(library[i]);
    getLibraryStats();
  }
}

function getLibraryStats() {
  totalBooks.innerText = library.length;
  completedBooks.innerText = countCompletedBooks();
  totalPages.innerText = countTotalPagesRead();
}

function countCompletedBooks() {
  let count = 0;
  for (let item of library) {
    if (item.haveRead) count += 1;
  }
  return count;
}

function countTotalPagesRead() {
  let count = 0;
  for (let item of library) {
    count += Number(item.pages);
  }
  return count;
}

// create a new card when use submits new book
function generateCard(book) {
  let newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('data-index', library.indexOf(book));

  let figure = document.createElement('figure');
  figure.classList.add('card-thumb');

  let img = document.createElement('img');
  img.classList.add('card-image');
  img.src = STOCK_IMAGE;
  figure.appendChild(img);

  let figcaption = document.createElement('figcaption');
  figcaption.classList.add('card-caption');

  let newTitle = document.createElement('h2');
  newTitle.classList.add('card-title');
  newTitle.innerText = book.title;

  let p = document.createElement('p');
  p.classList.add('card-snippet');
  p.innerText = book.author;

  let readBtn = document.createElement('button');
  readBtn.classList.add('card-button');
  if (book.haveRead) {
    readBtn.classList.add('card-button-read');
    readBtn.innerText = 'Status: Read';
  } else {
    readBtn.innerText = 'Mark as Read';
  }

  let trashBtn = document.createElement('button');
  trashBtn.classList.add('trash');
  trashBtn.innerText = 'DEL';

  figcaption.appendChild(newTitle);
  figcaption.appendChild(p);
  figcaption.appendChild(readBtn);
  figcaption.appendChild(trashBtn);
  figure.appendChild(figcaption);
  newCard.appendChild(figure);
  container.appendChild(newCard);

  trashBtn.addEventListener('click', function (e) {
    if (e.target.classList.contains('trash')) {
      library.splice(library.indexOf(book), 1);
      e.target.parentNode.parentNode.parentNode.remove();
    }
    localStorage.setItem('BookList', JSON.stringify(library));
    getLibraryStats();
  });

  readBtn.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-button-read')) {
      e.target.classList.remove('card-button-read');
      e.target.innerText = 'MARK AS READ';
    } else {
      e.target.classList.add('card-button-read');
      e.target.innerText = 'Status: Read 🗸';
    }
    book.haveRead = !book.haveRead;
    localStorage.setItem('BookList', JSON.stringify(library));
    getLibraryStats();
  });
  getLibraryStats();
}

// create new book object and append it to local storage
function addBookToLibrary(e) {
  e.preventDefault(); // stop form from submitting
  let book = {
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
    pages: document.getElementById('book-pages').value,
    haveRead: document.getElementById('have-read').checked,
    toggleHaveRead: function () {
      this.haveRead = !this.haveRead;
    },
  };

  library.push(book);

  console.log(book);
  form.reset();
  modal.style.display = 'none';

  generateCard(book);

  // save to LocalStorage
  localStorage.setItem('BookList', JSON.stringify(library));
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

render();
