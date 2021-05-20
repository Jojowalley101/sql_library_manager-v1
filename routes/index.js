//import Book from '../models';
//similar to the "post create book thing...for all below."
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

// // // /* Create a new book form. */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("new", { book: {}, title: "New Book" });
}));

// // // /* POST create book. */
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books");
  }
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new", { book: book, errors: error.errors, title: "New Book" });
    } else {
      throw error;
    }

}}));

// // /* GET individual book. */
router.get("/books/:id", asyncHandler(async (req, res) => {
  try {
    const bookSingleID = await Book.findOne({where: {id: req.params.id}});
    //console.log(req.params.id);
    res.render("edit", { book: bookSingleID, title: bookSingleID.title });
  } catch (error) {
      const errorNotFound = new Error('Error, page not found');
      errorNotFound.status = 404;
      console.log(errorNotFound.status, errorNotFound.message);
      next(errorNotFound);
  }
}));
/**
 * Error handling for 404 errors and 500 errors
 */
router.get('/error', (req, res, next) => {
  const errorServer = new Error('Server error');
  errorServer.status = 500;
  console.log(errorServer.status, errorServer.message);
  next(errorServer);
});

router.use((errors, req, res, next) => {
  res.locals.error = errors;
  res.status(errors.status || 404);

  if (errors.status === 500) {
    res.render('errors', {errors});
  } else {
    res.render('error', {error});
  }
});

// // /* POST update book. */
router.post("/books/:id", asyncHandler(async (req, res) => {
  let updateBook;
  try {
    updateBook = await Book.findByPk(req.params.id);
    await updateBook.update(req.body);
    res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new", { book: book, errors: error.errors, title: "New Book" });
    } else {
      throw error;
    }
  }
    // if (error.name === "SequelizeValidationError") {
    //   var book = Book.build(req.body);
    //   book.id = req.params.id;
    //   res.render("edit", { book: book, errors: error.errors, title: "Edit book" })
    // } else {
    //   throw error;
    // }
}));

// // /* DELETE individual book. */
router.post("/books/:id/delete", asyncHandler(async (req, res) => {
  try {
    const bookDeleteIndividual = await Book.findByPk(req.params.id);
    await bookDeleteIndividual.destroy();
    res.redirect("/books");
    //console.log(req.params.id);
    //res.render("edit", { book: bookDeleteIndividual, title: bookDeleteIndividual.title });
  } catch (error) {
    throw error;
  }
}));


// // // /* Edit book form. */
// router.get("/books/:id/edit", asyncHandler(async (req, res) => {
//   try {
//   //const bookByIdFinder = await Book.findOne({where: { id: req.params.id}});
//   console.log(req.params.id);
//   //res.render("edit", { book: bookByIdFinder, title: "Edit Book" });
// } catch (error) {
//     throw error;
// }

// }));


// // // /* Delete book form. */
// router.get("/books/:id/delete", asyncHandler(async (req, res) => {
//   try {
//     const bookDelete = await Book.findOne({ where: { id: req.params.id } });
//     //console.log(req.params.id);
//     res.render("delete", { book: bookDelete, title: bookDelete.title });
//   } catch (error) {
//     throw error;

//   }
// }));








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






