const {Router} = require('express');
const router = Router();

const services = require('../services/services');


// User --Routers--------------------------------------------------

// GET request for all users
router.get('/api/user', services.getUsers);

// GET request user by id
router.get('/api/user/:id', services.getUserById);

// POST request for creating all users --jasonParser
router.post('/api/user', services.createUser);

// DELETE request to Remove user by id
router.delete('/api/user/:id', services.deleteUserById);

// PUT request to Edit user by id  --jasonParser
router.put('/api/user', services.editUserById);


// Menu --Routers---------------------------------------------

// GET request for all users
router.get('/api/menu', services.getMenu);

// GET request user by id
router.get('/api/menu/:id', services.getMenuById);

// POST request for creating all users
router.post('/api/menu', services.uploadFile, services.createMenu);


// DELETE request to Remove user by id
router.delete('/api/menu/:id', services.deleteMenuById);

// PUT request to Edit user by id  --jasonParser
router.put('/api/menu', services.editMenuById);


module.exports = router;