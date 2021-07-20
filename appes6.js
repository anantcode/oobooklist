class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    constructor() {}

    addBookToList(book) {
        console.log("Book added!");
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
    }

    deleteBook(target) {
        if (target.className === "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
        console.log("fields cleared!");
    }

    showAlert(message, className) {
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
    }
}

// Local storage class
class Store {
    constructor() {}

    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach((book) => {
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook() {}
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

document.getElementById("book-form").addEventListener("submit", function (e) {
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
        Store.addBook(book);
        ui.clearFields();
        ui.showAlert("Added!", "success");
    }

    e.preventDefault(); //to prevent the form from submitting.
});

//event listener for delete book
document.getElementById("book-list").addEventListener("click", function (e) {
    console.log(e.target);
    const ui = new UI();

    ui.deleteBook(e.target);

    // show message
    ui.showAlert("Book removed", "success");

    e.preventDefault();
});
