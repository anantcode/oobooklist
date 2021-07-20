// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
    console.log(book);
};

UI.prototype.addBookToList = function (book) {
    console.log(book);
    const list = document.getElementById("book-list");

    //creatre a new tr element
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>
    `;

    list.appendChild(row);

    console.log(row);
};

UI.prototype.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
};

//Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
    console.log("test");

    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);

    //instatiate UI
    const ui = new UI();

    //Add book to list
    ui.addBookToList(book);
    ui.clearFields();

    e.preventDefault(); //to prevent the form from submitting.
});
