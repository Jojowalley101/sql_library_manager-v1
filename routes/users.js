var express = require('express');
var router = express.Router();
var Book = require("../models").Book;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// /* GET articles listing. */
router.get('/', function (req, res, next) {
  Book.findAll({ order: [["createdAt", "DESC"]] }).then(function (users) {
    res.render("users/index", { users: users, title: "My Awesome Book" });
  }).catch(function (error) {
    res.send(500, error);
  });
});

// /* POST create book. */
router.post('/', function (req, res, next) {
  Book.create(req.body).then(function (book) {
    res.redirect("/books/" + book.id);
  }).catch(function (error) {
    if (error.name === "SequelizeValidationError") {
      res.render("books/new", { book: Book.build(req.body), errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }
  }).catch(function (error) {
    res.send(500, error);
  });
  ;
});

// /* Create a new book form. */
router.get('/new', function (req, res, next) {
  res.render("books/new", { book: {}, title: "New Book" });
});

// /* Edit book form. */
router.get("/:id/edit", function (req, res, next) {
  Book.findById(req.params.id).then(function (book) {
    if (book) {
      res.render("articles/edit", { book: book, title: "Edit Book" });
    } else {
      res.send(404);
    }
  }).catch(function (error) {
    res.send(500, error);
  });
});


// /* Delete article form. */
// router.get("/:id/delete", function (req, res, next) {
//   Article.findById(req.params.id).then(function (article) {
//     if (article) {
//       res.render("articles/delete", { article: article, title: "Delete Article" });
//     } else {
//       res.send(404);
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });


// /* GET individual article. */
// router.get("/:id", function (req, res, next) {
//   Article.findById(req.params.id).then(function (article) {
//     if (article) {
//       res.render("articles/show", { article: article, title: article.title });
//     } else {
//       res.send(404);
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

// /* PUT update article. */
// router.put("/:id", function (req, res, next) {
//   Article.findById(req.params.id).then(function (article) {
//     if (article) {
//       return article.update(req.body);
//     } else {
//       res.send(404);
//     }
//   }).then(function (article) {
//     res.redirect("/articles/" + article.id);
//   }).catch(function (error) {
//     if (error.name === "SequelizeValidationError") {
//       var article = Article.build(req.body);
//       article.id = req.params.id;
//       res.render("articles/edit", { article: article, errors: error.errors, title: "Edit Article" })
//     } else {
//       throw error;
//     }
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

// /* DELETE individual article. */
// router.delete("/:id", function (req, res, next) {
//   Article.findById(req.params.id).then(function (article) {
//     if (article) {
//       return article.destroy();
//     } else {
//       res.send(404);
//     }
//   }).then(function () {
//     res.redirect("/articles");
//   }).catch(function (error) {
//     res.send(500, error);
//   });
// });

module.exports = router;
