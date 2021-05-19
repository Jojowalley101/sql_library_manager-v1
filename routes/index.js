//import Book from '../models';

var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/books")
  //res.render('index', {title: 'Express'});
});


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)

    } catch (error) {
      res.status(500).send(error);

    }
  }
}

// /* GET book listing. */
router.get('/books', asyncHandler(async (req, res) => {
  const dataBook = await Book.findAll();
  res.render("index", { book: dataBook, title: "My Awesome Book" });
  // }).catch(function (error) {
  //   res.send(500, error);
}));

// // // /* POST create book. */
router.post('/', asyncHandler(async (req, res) => {
  await Book.create(req.body);
    res.redirect("/books" + book.id);
    res.render("views/new", { book: Book.build(req.body), errors: error.errors, title: "New Book" });
}));

// // // /* Create a new book form. */
router.get('/new', asyncHandler(async (req, res) => {
  res.render("views/new", { book: {}, title: "New Book" });
}));

// // // /* Edit book form. */
router.get("/:id/edit", asyncHandler(async (req, res) => {
  await Book.findById(req.params.id);
    if (book) {
      res.render("views/edit", { book: book, title: "Edit Book" });
    } else {
      res.send(404);
    }
}));


// // // /* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  await Book.findById(req.params.id);
    if (book) {
      res.render("books/delete", { book: book, title: "Delete book" });
    } else {
      res.send(404);
    }
}));


// // /* GET individual book. */
router.get("/:id", asyncHandler(async (req, res) => {
  await Book.findById(req.params.id);
    if (book) {
      res.render("views/show", { book: book, title: book.title });
    } else {
      res.send(404);
    }
}));

// // /* PUT update book. */
router.put("/:id", asyncHandler(async (req, res) => {
  await Book.findById(req.params.id)
    if (book) {
      return book.update(req.body);
    } else {
      res.send(404);
    }
  
    res.redirect("/books/" + book.id);
  
    if (error.name === "SequelizeValidationError") {
      var book = Book.build(req.body);
      book.id = req.params.id;
      res.render("views/edit", { book: book, errors: error.errors, title: "Edit book" })
    } else {
      throw error;
    }
}));

// // /* DELETE individual book. */
router.delete("/:id", asyncHandler(async (req, res) => {
  await Book.findById(req.params.id);
    if (book) {
      return book.destroy();
    } else {
      res.send(404);
    }
    res.redirect("/books");
}));

// /* GET books listing. */
// router.get('/', function (req, res, next) {
//   Book.findAll({ order: [["createdAt", "DESC"]] }).then(function (users) {
//     res.render("users/index", { users: users, title: "My Awesome Book" });
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

// // // /* POST create user. */
// router.post('/', function (req, res, next) {
//   Book.create(req.body).then(function (user) {
//     res.redirect("/users/" + user.id);
//   }).catch(function (error) {
//     if (error.name === "SequelizeValidationError") {
//       res.render("users/new", { user: Book.build(req.body), errors: error.errors, title: "New Book" })
//     } else {
//       throw error;
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
//   ;
// });

// // // /* Create a new user form. */
// router.get('/new', function (req, res, next) {
//   res.render("users/new", { user: {}, title: "New Book" });
// });

// // // /* Edit user form. */
// router.get("/:id/edit", function (req, res, next) {
//   Book.findById(req.params.id).then(function (user) {
//     if (user) {
//       res.render("users/edit", { user: user, title: "Edit Book" });
//     } else {
//       res.send(404);
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
//  });


// // // /* Delete user form. */
// router.get("/:id/delete", function (req, res, next) {
//   Book.findById(req.params.id).then(function (user) {
//     if (user) {
//       res.render("users/delete", { user: user, title: "Delete user" });
//     } else {
//       res.send(404);
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });


// // /* GET individual user. */
// router.get("/:id", function (req, res, next) {
//   Book.findById(req.params.id).then(function (user) {
//     if (user) {
//       res.render("users/show", { user: user, title: user.title });
//     } else {
//       res.send(404);
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

// // /* PUT update user. */
// router.put("/:id", function (req, res, next) {
//   Book.findById(req.params.id).then(function (user) {
//     if (user) {
//       return user.update(req.body);
//     } else {
//       res.send(404);
//     }
//   }).then(function (user) {
//     res.redirect("/users/" + user.id);
//   }).catch(function (error) {
//     if (error.name === "SequelizeValidationError") {
//       var user = Book.build(req.body);
//       user.id = req.params.id;
//       res.render("users/edit", { user: user, errors: error.errors, title: "Edit user" })
//     } else {
//       throw error;
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

// // /* DELETE individual user. */
// router.delete("/:id", function (req, res, next) {
//   Book.findById(req.params.id).then(function (user) {
//     if (user) {
//       return user.destroy();
//     } else {
//       res.send(404);
//     }
//   }).then(function () {
//     res.redirect("/users");
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });


module.exports = router;






