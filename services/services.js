const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const jsonParser = express.json();

const Schema = mongoose.Schema;

require('dotenv').config();
 
const sharp = require('sharp');   // crop img    
const multer  = require('multer') // get file 

// Accessing the path module
const path = require("path");


const fs = require("fs"); // for local db
const menuLocDB = "./menus.json";
const userLocDB = "./users.json";

const userScheme = new Schema({
                    name: String,                    
                    quantity: Array,
                    },
                    {versionKey: false});
const User = mongoose.model("user", userScheme);

const menuScheme = new Schema({name: String, age: Number, measure: String}, {versionKey: false});
const Menu = mongoose.model("menu", menuScheme);
 
app.use(express.static(__dirname + "/public/image/"));


// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    console.log("production");
    app.use(express.static(path.join(__dirname, './client/build')))    
}


 // User ------------------------------------------------s--
exports.getUsers = function(req, res){        
    // User.find({}, function(err, users){ 
    //     if(err) return console.log(err);
    //     res.send(users)
    // });

    const content = fs.readFileSync(userLocDB,"utf8");
    const users = JSON.parse(content);
    res.send(users);
};
 
exports.getUserById = function(req, res){         
    const id = req.params.id;

    // User.findOne({_id: id}, function(err, user){          
    //     if(err) return console.log(err);
    //     res.send(user);
    // });

    const content = fs.readFileSync(userLocDB, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }

};
    
exports.createUser = function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
    if(!req.body) return console.log("<h5>user!!!!!!!!!!!!!!!!!!!!!!!</h5>");    
    
    const user =    {  
                        _id: (Math.random() + 1).toString(36).substring(7),
                        name: req.body.name,
                        quantity: req.body.quantity
                    };
       
    let data = fs.readFileSync(userLocDB, "utf8");
    let users = JSON.parse(data);      
    users.push(user);
    data = JSON.stringify(users);     
      
    fs.writeFileSync(userLocDB, data);
    // отправляем пользователя
    res.send(data);
    

    // const user = new User({name: userName, quantity: userQuantity });
    // user.save(function(err){
    //     if(err) return console.log(err);
    //     res.send(user);
    // });

    
};
     
exports.deleteUserById = function(req, res){         
    const id = req.params.id;
    // User.findByIdAndDelete(id, function(err, user){                
    //     if(err) return console.log(err);
    //     res.send(user);        
    // });
    res.send(id);
    let data = fs.readFileSync(userLocDB, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < users.length; i++){
        if(users[i]._id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync(userLocDB, data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }

};
    
exports.editUserById = function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const userMeasure = req.body.measure;
    const newUser = {name: userName, age: userAge, measure: userMeasure};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
};


// Menu ----------------------------------------------------
exports.getMenu = function(req, res){
      // request to mongo.db  
    // Menu.find({}, function(err, menus){ 
    //     if(err) return console.log(err);
    //     res.send(menus)
    // });

    const content = fs.readFileSync(menuLocDB,"utf8");
    const menus = JSON.parse(content);
    res.send(menus);

};
 

exports.getMenuById = function(req, res){

    const id = req.params.id; // получаем id
    const content = fs.readFileSync(menuLocDB, "utf8");
    const users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(var i=0; i<users.length; i++){
        if(users[i]._id==id){
            user = users[i];
            break;
        }
    }
    
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }    
         
    // const id = req.params.id;
    // Menu.findOne({_id: id}, function(err, menu){
          
    //     if(err) return console.log(err);
    //     res.send(menu);
    // });
};



     
    // Upload form file from client -----------------------------------------

let multerPath = path.join(__dirname, '../');    
const upload = multer({ dest: multerPath + 'public/image/uploads/' });
// const upload = multer({ dest: './public/image/uploads/' });
exports.uploadFile = upload.single('file');

exports.createMenu = async (req, res) => {
   
    if(!req.body) return res.sendStatus(400);

   console.log(req.file, req.body, JSON.parse(req.body.form));

    const form = JSON.parse(req.body.form);

    let fileExt = path.parse(req.file.originalname).ext;
    
    let reqPath = path.join(__dirname, '../'); //It goes 1 folders or directories back from given __dirname.
    let editFileName =  reqPath + 'public/image/' + form.name + fileExt;

    // edit user's photo
   sharp(req.file.path)                  
                    .resize(50)
                    .toBuffer()
                    .then( data => {                        
                        fs.writeFileSync(editFileName, data);                        
                    })
                    .then( () => {
                        delFile = reqPath + 'public/image/uploads/' + req.file.filename;
                        fs.unlink(delFile, function (err) {
                            if (err) throw err;
                                console.log(`Initial file "${req.file.originalname}" is deleted!`);
                        });
                    })                    
                    .catch( err => {
                        console.log(err);
                    });

    const user =    {  
                        _id: (Math.random() + 1).toString(36).substring(7),
                        name: form.name,
                        cost: form.cost,
                        measure: form.measure,
                        image: form.name + fileExt
                    };
       
    let data = fs.readFileSync(menuLocDB, "utf8");
    let users = JSON.parse(data);      
    users.push(user);
    data = JSON.stringify(users);
     
      // console.log("users"); console.log(users);
      // console.log("data"); console.log(data);
    fs.writeFileSync(menuLocDB, data);
    // отправляем пользователя
    res.send(data); 

    // with MongoDB
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const userMeasure = req.body.measure;
    // const menu = new Menu({name: userName, age: userAge, measure: userMeasure});
        
    // menu.save(function(err){
    //     if(err) return console.log(err);
    //     res.send(menu);
    // });

};



     
exports.deleteMenuById = function(req, res){
         
    const id = req.params.id;
    console.log(id);
    let data = fs.readFileSync(menuLocDB, "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < users.length; i++){
        if(users[i]._id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync(menuLocDB, data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }

    // Menu.findByIdAndDelete(id, function(err, menu){
                
    //     if(err) return console.log(err);
    //     res.send(menu);
    // });
};

 



exports.editMenuById = function(req, res){
         
    if(!req.body) return res.sendStatus(400);

    const userId = req.body._id;
    console.log(req.body.name);
    let user = {
        _id: userId,
        name: req.body.name,
        cost: req.body.cost,
        measure: req.body.measure
    };

    let data = fs.readFileSync(menuLocDB, "utf8");
    const users = JSON.parse(data);
    
    for(var i=0; i<users.length; i++){
        if(users[i]._id==userId){
            users[i] = user;  console.log(users[i].name)          
            break;
        }       
    }    
    data = JSON.stringify(users);
    fs.writeFileSync(menuLocDB, data);
    res.send("users");
    // const id = req.body.id;
    // const userName = req.body.name;
    // const userAge = req.body.age;
    // const userMeasure = req.body.measure;
    // const newMenu = {name: userName, age: userAge, measure: userMeasure};
     
    // Menu.findOneAndUpdate({_id: id}, newMenu, {new: true}, function(err, user){
    //     if(err) return console.log(err); 
    //     res.send(menu);
    // });
};
