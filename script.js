// Global library array to store book objects
const myLibrary = [];


function Book(title, author, pages, read_status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// Get DOM elements
const bookContainer = document.querySelector('.book-container');
const addBookBtn = document.querySelector('.btn_add');
const addBookDialog = document.querySelector('.add_book_dialog');
const addBookDialogForm = document.getElementById('add_book_dialog_form');

// Open the dialog when the "+ Add Book" button is clicked
addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

// Handle form submission to add a new book
addBookDialogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;

  // Default new books to "not read" (false)
  const newBook = new Book(title, author, pages, false);
  myLibrary.push(newBook);

  displayLibrary();

  addBookDialogForm.reset();
  addBookDialog.close();
});

// Function to display the library on the page
function displayLibrary() {
  bookContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('book_card');
    card.dataset.index = index;

    const readBtnClass = book.read_status ? 'btn-read' : 'btn-not-read';
    const readBtnText = book.read_status ? 'Read' : 'Not read';

    card.innerHTML = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <button class="toggle-read btn ${readBtnClass}" data-index="${index}">
        ${readBtnText}
      </button>
      <button class="btn remove-book" data-index="${index}">Remove Book</button>
    `;

    bookContainer.appendChild(card);
  });
}

// Event delegation for toggling read status and removing books
bookContainer.addEventListener('click', (e) => {
  const target = e.target;
  const index = target.dataset.index;

  // Remove book functionality
  if (target.classList.contains('remove-book')) {
    myLibrary.splice(index, 1);
    displayLibrary();
  }
  // Toggle read status functionality
  else if (target.classList.contains('toggle-read')) {
    // Toggle the book's read_status property
    myLibrary[index].read_status = !myLibrary[index].read_status;
    displayLibrary();
  }
});
