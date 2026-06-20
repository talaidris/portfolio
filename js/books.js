// ---------- Books (TXT Reader) ----------
var BOOKS_LIST = [
    { id: 'alice', title: "Alice's Adventures in Wonderland", file: 'alice.txt' },
    { id: 'dracula', title: 'Dracula', file: 'dracula.txt' },
    { id: 'pride', title: 'Pride and Prejudice', file: 'pride.txt' },
    { id: 'metamorphosis', title: 'The Metamorphosis', file: 'meta.txt' }
];
var BOOKS_PROGRESS_KEY = 'booksProgress';
var currentBookId = null;

function loadBooks() {
    var listContainer = document.getElementById('booksList');
    var readerContainer = document.getElementById('booksReader');
    if (listContainer) listContainer.style.display = 'block';
    if (readerContainer) readerContainer.style.display = 'none';

    var progress = JSON.parse(localStorage.getItem(BOOKS_PROGRESS_KEY) || '{}');
    if (listContainer) listContainer.innerHTML = '';

    BOOKS_LIST.forEach(function (book) {
        var item = document.createElement('div');
        item.className = 'book-item';

        var titleSpan = document.createElement('span');
        titleSpan.className = 'book-item-title';
        titleSpan.textContent = book.title;

        var progSpan = document.createElement('span');
        progSpan.className = 'book-item-progress';
        var saved = progress[book.id] || 0;
        progSpan.textContent = saved > 0 ? Math.round(saved) + '% read' : 'Not started';

        item.appendChild(titleSpan);
        item.appendChild(progSpan);

        item.addEventListener('click', function () {
            openBook(book.id);
        });

        listContainer.appendChild(item);
    });
}

function openBook(bookId) {
    var book = BOOKS_LIST.find(function (b) { return b.id === bookId; });
    if (!book) {
        console.error('Book not found:', bookId);
        return;
    }

    var listContainer = document.getElementById('booksList');
    var readerContainer = document.getElementById('booksReader');
    var contentDiv = document.getElementById('booksContent');
    var titleEl = document.getElementById('booksTitle');

    if (listContainer) listContainer.style.display = 'none';
    if (readerContainer) readerContainer.style.display = 'flex';
    if (titleEl) titleEl.textContent = book.title;

    contentDiv.innerHTML = 'Loading...';
    contentDiv.style.height = '100%';
    contentDiv.style.overflow = 'auto';
    contentDiv.style.whiteSpace = 'pre-wrap';
    contentDiv.style.fontFamily = 'serif';
    contentDiv.style.fontSize = '1rem';
    contentDiv.style.lineHeight = '1.8';
    contentDiv.style.padding = '20px';

    var bookUrl = 'books/' + book.file;
    currentBookId = book.id;

    fetch(bookUrl)
        .then(function (response) {
            if (!response.ok) throw new Error('File not found');
            return response.text();
        })
        .then(function (text) {
            contentDiv.textContent = text;

            // Restore scroll position (percentage)
            var progress = JSON.parse(localStorage.getItem(BOOKS_PROGRESS_KEY) || '{}');
            var savedPos = progress[book.id] || 0;
            if (savedPos > 0 && contentDiv.scrollHeight > contentDiv.clientHeight) {
                var scrollTarget = (savedPos / 100) * (contentDiv.scrollHeight - contentDiv.clientHeight);
                contentDiv.scrollTop = scrollTarget;
            }

            // Save progress on scroll
            contentDiv.onscroll = function () {
                var maxScroll = this.scrollHeight - this.clientHeight;
                if (maxScroll > 0) {
                    var pct = (this.scrollTop / maxScroll) * 100;
                    var prog = JSON.parse(localStorage.getItem(BOOKS_PROGRESS_KEY) || '{}');
                    prog[book.id] = pct;
                    localStorage.setItem(BOOKS_PROGRESS_KEY, JSON.stringify(prog));
                }
            };
        })
        .catch(function (err) {
            console.error('Error loading book:', err);
            contentDiv.innerHTML = 'Error loading book. Please make sure the file exists in the /books/ folder.';
        });

    // Back button
    var backBtn = document.getElementById('booksBackBtn');
    if (backBtn) {
        backBtn.onclick = function () {
            if (readerContainer) readerContainer.style.display = 'none';
            if (listContainer) listContainer.style.display = 'block';
            loadBooks(); // refresh the list to update progress
        };
    }
}

window.loadBooks = loadBooks;