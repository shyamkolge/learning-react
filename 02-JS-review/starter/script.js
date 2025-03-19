const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// // Destructureing ;
// let book = getBook(3);
// book;

// const { title, author, genres, pages } = book;

// const [primaryGe, seond] = book.genres;

// // Spread Operator
// const newGeners = [...genres, "epic fantecy"];

// const updatedBook = { ...book, moviePublicationDate: "13-30-18" };
// updatedBook;

// // Tempate Literals
// const summary = `The Book titile is ${title} and the author is ${author}.`;
// summary;

// // Ternary Opearator :
// const result = pages > 1000 ? "Book is too big to read " : "book is small";
// result;

// // Arrow Functions

// const greet = (name) => {
//   return `Hello ${name}`;
// };

// const greeing = greet("Shyam");
// greeing;

// // Short - curcuiting :

// // Option chaining
// const getTotalReviewCount = (book) => {
//   const goodReviewCount = book.reviews.goodreads.reviewsCount;
//   const librarything = book.reviews.librarything?.reviewsCount ?? 0;

//   return goodReviewCount + librarything;
// };

// const totoalReviews = getTotalReviewCount(book);
// totoalReviews;

// // Map Method
// const books = getBooks();

// const tittleArray = books.map((itmes) => itmes.title);
// tittleArray;

// // Returning an object
// const eessential = books.map((book) => {
//   return {
//     tittle: book.title,
//     author: book.author,
//   };
// });
// eessential;

// const ages = [32, 33, 16, 40];
// const result = ages.filter(checkAdult);

// function checkAdult(age) {
//   return age >= 18;
// }

// ages;
// result;

// const totalPages = books.reduce((acc, book) => acc + book.pages, 0);

// totalPages;

// // Soring aray

// const arr = [1, 89, 3, 35, 10, 8];

// const sorted = arr.slice().sort((a, b) => a - b);

// sorted;
// arr;

// let books = getBooks();
// books;

// // Add new Object to book
// const newBook = {
//   id: 6,
//   title: "Automic Habits",
//   publicationDate: "2014-03-12",
//   author: "James Clear",
//   genres: ["self-help", "adventure", "fiction", "novels", "literature"],
//   hasMovieAdaptation: false,
//   pages: 306,
//   translations: {
//     spanish: "El señor de los anillos",
//     chinese: "魔戒",
//     french: "Le Seigneur des anneaux",
//   },
//   reviews: {
//     goodreads: { rating: 4.52, ratingsCount: 630994, reviewsCount: 13417 },
//     librarything: { rating: 4.53, ratingsCount: 47166, reviewsCount: 452 },
//   },
// };

// const newBooks = [...books, newBook];
// newBooks;

// // Deleting a book
// const booksAfterDelete = newBooks.filter((book) => book.id !== 3);
// booksAfterDelete;

// // Updating a book
// const booksAfterUpdated = booksAfterDelete.map((book) =>
//   book.id === 2 ? { ...book, pages: 200 } : book
// );

// booksAfterUpdated;
// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// const respo = await fetch("https://jsonplaceholder.typicode.com/todos/");
// const dataofTod = await respo.json();
// console.log(dataofTod);

const getTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await res.json();

  return data;
};

// console.log(await getTodos());
const todos = await getTodos();
console.log(todos);

console.log("ehtes");
