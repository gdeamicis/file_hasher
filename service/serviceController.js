var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var store = require('store');
var fs = require('fs');

router.post('/', function (req, res) {
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256');
    hash.setEncoding('hex');

    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var fileHash;

        // saving file on ./Files directory
        var writeStream = fs.createWriteStream('./Files/' + files.upload.name);

        var fd = fs.createReadStream(files.upload.path);

        fd.pipe(hash);

        fd.pipe(writeStream);

        fd.on('data', ( => {
            // show "progress" on console
            console.log('.');
        });

        fd.on('end', () => {
            hash.end();
            fileHash = hash.read();

            // handle collisions
            var collision = store.get(fileHash);

            if(collision) {
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.end('File already present on file system!\n\n');
            } else {
                
                store.set(fileHash, writeStream.path);
    
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.write('received upload:\n\n');
                res.end(util.inspect({ fields: fields, files: files, fileHash: fileHash }));
            }

        });

    });

    return;
});

router.get('/', function (req, res) {
    var fileHash = req.query.hash;

    var fileDir = store.get(fileHash);

    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<a href="' + fileDir + '" download> File to download </a>'
    );
})

module.exports = router;