const NeDB = require('nedb');
const path = require('path');

var database = new NeDB({
    filename: path.resolve('src', 'database', 'db'),
    autoload: false,
    timestampData: true
});

database.loadDatabase(function (err) {
    if(err) console.log(err);
    database.ensureIndex({ expireAfterSeconds: 0, fieldName: 'expirationDate' }, function (err2) {
        if(err2) console.log(err2);
    });
});

module.exports = database;