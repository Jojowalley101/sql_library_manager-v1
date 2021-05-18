//import Book from '../models';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/users")
  //res.render('index', {title: 'Express'});
});


// /* GET users listing. */
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






