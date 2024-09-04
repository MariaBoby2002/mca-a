let booklist = [];
let currentPage = 1;
let itemsPerPage = 5;

const fetchBooksButton = document.querySelector('#fetchbooks');
const mainContainer = document.querySelector('#books-container');
const paginationContainer = document.querySelector('#pagination-container');
const searchingInput = document.querySelector('#search');
const sortingItem = document.querySelector('#sorting');

fetchBooksButton.addEventListener('click', async () => {
    try {
        const response = await fetch('https://mariaboby2002.github.io/Books/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        booklist = data.books; // Adjust the property name if needed based on the API response
        displayBooks();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});


function displayBooks() {
    mainContainer.innerHTML = "";
    let filteredBooks = booklist.filter(book => book.title.toLowerCase().includes(searchingInput.value.toLowerCase()));

    if (sortingItem.value === 'asc') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    }

    let paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    for (let i = 0; i < paginatedBooks.length; i++) {
        let bookimg = document.createElement('img');
        bookimg.src = paginatedBooks[i].book_image;
        bookimg.height = 100;
        bookimg.width = 100;

        let title = document.createElement('div');
        title.textContent = `Title: ${paginatedBooks[i].title}`;

        let author = document.createElement('div');
        author.textContent = `Author: ${paginatedBooks[i].author}`;

        let description = document.createElement('div');
        description.textContent = `Description: ${paginatedBooks[i].description}`;

        let container = document.createElement('div');
        container.className = 'book-container';
        container.appendChild(bookimg);
        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(description);
        mainContainer.appendChild(container);
    }

    displayPagination(filteredBooks.length);
}

searchingInput.addEventListener('input', () => {
    currentPage = 1;
    displayBooks();
});

sortingItem.addEventListener('change', () => {
    displayBooks();
});

function displayPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayBooks();
        });
        paginationContainer.appendChild(pageButton);
    }
}
