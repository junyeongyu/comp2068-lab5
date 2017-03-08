"use strict";
let express = require('express');
let router = express.Router();

// link to your existing Account model
let Account = require('../models/account');

// auth check
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next(); // user is logged, so call the next function
   }
   res.redirect('/'); // not logged in so redirect to home
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
  Account.find(function(err, users) {
    if (err) {
      console.log(err);
      res.end(err);
      return;
    }
    
    // no error so send the books to the index view
    res.render('users/index', {
      users: users,
      title: 'User List',
      user: req.user
    });
  });
});

module.exports = router;
