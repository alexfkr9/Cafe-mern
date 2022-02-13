
const multer = require('multer'); // get file

// Accessing the path module
const path = require('path');

const { User, Menu } = require('../models/models.js');
let reqPath = path.join(__dirname, '../');
// const fs = require('fs'); // for local db
const menuLocDB = './menus.json';
const userLocDB = './users.json';

const sharp = require('../servises/crop.js');

// Users--
exports.getUsers = async function (req, res) {
  User.find({}, function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });

  // const content = await fs.readFileSync(userLocDB,"utf8");
  // const users = JSON.parse(content);
  // res.send(users);
};

exports.getUserById = async function (req, res) {
  const id = req.params.id;

  User.findOne({ _id: id }, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });

  // const content = await fs.readFileSync(userLocDB, "utf8");
  // const users = JSON.parse(content);
  // let user = null;
  // // находим в массиве пользователя по id
  // for(var i=0; i<users.length; i++){
  //     if(users[i].id==id){
  //         user = users[i];
  //         break;
  //     }
  // }
  // отправляем пользователя
  // if(user){
  //     res.send(user);
  // }
  // else{
  //     res.status(404).send();
  // }
};

exports.createUser = async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  if (!req.body) return console.log('<h5>user!</h5>');

  // const user =    {
  //                     _id: (Math.random() + 1).toString(36).substring(7),
  //                     name: req.body.name,
  //                     quantity: req.body.quantity
  //                 };

  // let data = await fs.readFileSync(userLocDB, "utf8");
  // let users = JSON.parse(data);
  // users.push(user);
  // data = JSON.stringify(users);

  // fs.writeFileSync(userLocDB, data);
  // // отправляем пользователя
  // res.send(data);

  const user = new User({ name: req.body.name, quantity: req.body.quantity });
  user.save(function (err) {
    if (err) return console.log(err);
    res.send(user);
  });
};

exports.deleteUserById = async function (req, res) {
  const id = req.params.id;
  User.findByIdAndDelete(id, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });

  // res.send(id);
  // let data = await fs.readFileSync(userLocDB, "utf8");
  // let users = JSON.parse(data);
  // let index = -1;
  // // находим индекс пользователя в массиве
  // for(var i=0; i < users.length; i++){
  //     if(users[i]._id==id){
  //         index=i;
  //         break;
  //     }
  // }
  // if(index > -1){
  //     // удаляем пользователя из массива по индексу
  //     const user = users.splice(index, 1)[0];
  //     data = JSON.stringify(users);
  //     fs.writeFileSync(userLocDB, data);
  //     // отправляем удаленного пользователя
  //     res.send(user);
  // }
  // else{
  //     res.status(404).send();
  // }
};

exports.editUserById = async function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;
  const userMeasure = req.body.measure;
  const newUser = { name: userName, age: userAge, measure: userMeasure };

  User.findOneAndUpdate(
    { _id: id },
    newUser,
    { new: true },
    function (err, user) {
      if (err) return console.log(err);
      res.send(user);
    }
  );
};

// Menu ----------------------------------------------------
exports.getMenu = async function (req, res) {
  // request to mongo.db
  Menu.find({}, function (err, menus) {
    if (err) return console.log(err);
    res.send(menus);
  });

  // const content = await fs.readFileSync(menuLocDB,"utf8");
  // const menus = JSON.parse(content);
  // res.send(menus);
};

exports.getMenuById = async function (req, res) {
  // const id = req.params.id; // получаем id
  // const content = await fs.readFileSync(menuLocDB, "utf8");
  // const menus = JSON.parse(content);
  // let menu = null;
  // // находим в массиве menu по id
  // for(var i=0; i<menus.length; i++){
  //     if(menus[i]._id==id){
  //         menu = menus[i];
  //         break;
  //     }
  // }

  // // отправляем menu
  // if(menu){
  //     res.send(menu);
  // }
  // else{
  //     res.status(404).send();
  // }

  const id = req.params.id;
  Menu.findOne({ _id: id }, function (err, menu) {
    if (err) return console.log(err);
    res.send(menu);
  });
};

// Upload form file from client -----------------------------------------

let multerPath = path.join(__dirname, '../');
const upload = multer({ dest: multerPath + 'public/image/uploads/' });
// const upload = multer({ dest: './public/image/uploads/' });

exports.uploadFile = upload.single('file');

exports.createMenu = async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  console.log(req.file, req.body, JSON.parse(req.body.form));

  const form = JSON.parse(req.body.form);

  let fileExt = path.parse(req.file.originalname).ext;
  let editFileName = reqPath + 'public/image/' + form.name + fileExt; 
  
  
  // edit menu's photo
  sharp.crop(req, editFileName);  

  // const menu =    {
  //                     _id: (Math.random() + 1).toString(36).substring(7),
  //                     name: form.name,
  //                     cost: form.cost,
  //                     measure: form.measure,
  //                     image: form.name + fileExt
  //                 };

  // let data = await fs.readFileSync(menuLocDB, "utf8");
  // let menus = JSON.parse(data);
  // menus.push(menu);
  // data = JSON.stringify(menus);

  //   // console.log("menus"); console.log(menus);
  //   // console.log("data"); console.log(data);
  // fs.writeFileSync(menuLocDB, data);
  // // отправляем пользователя
  // res.send(data);

  // with MongoDB

  const menuObj = {
    name: form.name,
    cost: form.cost,
    measure: form.measure,
    image: form.name + fileExt,
  };

  const menu = new Menu(menuObj);

  menu.save(function (err) {
    if (err) return console.log(err);
    res.send(menu);
  });
};

exports.deleteMenuById = async function (req, res) {
  // console.log(id);
  // let data = await fs.readFileSync(menuLocDB, "utf8");
  // let menus = JSON.parse(data);
  // let index = -1;
  // // находим индекс пользователя в массиве
  // for(var i=0; i < menus.length; i++){
  //     if(menus[i]._id==id){
  //         index=i;
  //         break;
  //     }
  // }
  // if(index > -1){
  //     // удаляем пользователя из массива по индексу
  //     const menu = menus.splice(index, 1)[0];
  //     data = JSON.stringify(menus);
  //     fs.writeFileSync(menuLocDB, data);
  //     // отправляем удаленного пользователя
  //     res.send(menu);
  // }
  // else{
  //     res.status(404).send();
  // }

  const id = req.params.id;
  Menu.findByIdAndDelete(id, function (err, menu) {
    if (err) return console.log(err);
    res.send(menu);
    console.log(menu);
  });
};

exports.editMenuById = async function (req, res) {
  // if(!req.body) return res.sendStatus(400);

  // const menuId = req.body._id;
  // console.log(req.body.name);
  // let menu = {
  //     _id: menuId,
  //     name: req.body.name,
  //     cost: req.body.cost,
  //     measure: req.body.measure
  // };

  // let data = await fs.readFileSync(menuLocDB, "utf8");
  // const menus = JSON.parse(data);

  // for(var i=0; i<menus.length; i++){
  //     if(menus[i]._id==menuId){
  //         menus[i] = menu;  console.log(menus[i].name)
  //         break;
  //     }
  // }
  // data = JSON.stringify(menus);
  // fs.writeFileSync(menuLocDB, data);
  // res.send("menus");

  const id = req.body._id;

  const newMenu = {
    name: req.body.name,
    cost: req.body.cost,
    measure: req.body.measure,
  };

  Menu.findOneAndUpdate(
    { _id: id },
    newMenu,
    { new: true },
    function (err, menu) {
      if (err) return console.log(err);
      res.send(menu);
    }
  );
};
