const express = require('express');
const router = express.Router();

// const users = require('./users');
const auth = require('./auth');
const todo = require('./todo');

// router.use(users);
router.use(auth);
router.use(todo);

// router.get('/', (req, res) => {
//     res.render('index.ejs');
// })

module.exports = router;