const path = require('path');

const sharp = require('sharp'); // crop img

const fs = require('fs'); // for local db

let reqPath = path.join(__dirname, '../');

module.exports.crop = (req, editFileName) => {        

        // edit menu's photo   
        sharp(req.file.path)
        .resize(100)
        .toBuffer()
        .then((data) => {
        fs.writeFileSync(editFileName, data);
        })
        .then(() => {
        delFile = reqPath + 'public/image/uploads/' + req.file.filename;
        fs.unlink(delFile, function (err) {
            if (err) throw err;
            console.log(`Initial file "${req.file.originalname}" is deleted!`);
        });
        })
        .catch((err) => {
        console.log(err);
        })
       
}
