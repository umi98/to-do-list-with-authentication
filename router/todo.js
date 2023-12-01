const express = require('express');
const router = express.Router();
const controller = require('../app/controller');
const { auth } = require('../utils/jwt');

router.get('/todo', auth, controller.todo.get);
router.get('/todo/:id', auth, controller.todo.getById);
router.post('/todo', auth, controller.todo.insert);
router.put('/todo/:id', auth, controller.todo.update);
router.delete('/todo/:id', auth, controller.todo.drop);

module.exports = router;