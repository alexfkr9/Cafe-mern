const {Router} = require('express');
const router = Router();

const controller = require('../controller/controller');


// User --Routers--------------------------------------------------

// GET request for all users
router.get('/api/user', controller.getUsers);

// GET request user by id
router.get('/api/user/:id', controller.getUserById);

// POST request for creating all users --jasonParser
router.post('/api/user', controller.createUser);

// DELETE request to Remove user by id
router.delete('/api/user/:id', controller.deleteUserById);

// PUT request to Edit user by id  --jasonParser
router.put('/api/user', controller.editUserById);


// Menu --Routers---------------------------------------------

// GET request for all menu
router.get('/api/menu', controller.getMenu);

// GET request menu by id
router.get('/api/menu/:id', controller.getMenuById);

// POST request for creating all menu
router.post('/api/menu', controller.uploadFile, controller.createMenu);


// DELETE request to Remove menu by id
router.delete('/api/menu/:id', controller.deleteMenuById);

// PUT request to Edit menu by id  --jasonParser
router.put('/api/menu', controller.editMenuById);


module.exports = router;