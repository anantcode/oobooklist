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

UI.prototype.showAlert = function (message, className) {
    // create a div (for banner)
    const div = document.createElement("div");
    // Add classses
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 2000);
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

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields", "error");
    } else {
        //Add book to list
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert("Added!", "success");
    }

    e.preventDefault(); //to prevent the form from submitting.
});
