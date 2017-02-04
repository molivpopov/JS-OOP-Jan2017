/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks(value) {
			if (value === undefined) {
				return books;
			}
			if (value.category !== undefined) {		
				return books.filter(x => x.category === value.category);
			};

			if (value.author !== undefined) {
				return books.filter(x => x.author === value.author);
			};
		}

		function addBook(book) {
			validateNames(book.category);
			validateAuthor(book.author);
			validateNames(book.title);
			validateISBN(book.isbn);

			if (books.some(x => x.title === book.title)) {
				throw 'title exist';
			}
			if (books.some(x => x.isbn === book.isbn)) {
				throw 'ISBN exist';
			}

			if (!categories.some(x => x === book.category)) {
				categories.push(book.category);
			}
			book.ID = books.length + 1;
			books.push(book);
			return book;
		}
		function validateNames(value) {
			if (value.length < 2 || value.length > 100) {
				throw 'Inavlide name length';
			};
			// not clear what symbols are included
			var mathes = value.match(/[a-zA-Z0-9!,. #]/g);
			if (value.length !== mathes.length) {
				throw 'wrong name';
			};
			return true;
		}
		function validateISBN(value) {
			if (value.length !== 10 && value.length !== 13) {
				throw 'Invalide length of ISBN';
			};
			var mathes = value.match(/[0-9]/g);
			if (value.length !== mathes.length) {
				throw 'This is not real ISBN';
			};
			return true;
		}
		function validateAuthor(value) {
			var author = value.replace(/ +/g, ' ');
			if (typeof (author) !== 'string' || author.length < 1) {
				throw 'Not valide author name';
			}
			return true;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
