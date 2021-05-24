const connection = require('./connection');

const orm = {
    selectAll: function (cb) {
        connection.query("SELECT * FROM favoriteBooks", function (err, data) {
            if (err) cb(err, null);
            cb(null,data);
        })
    },

    insertOne: function (workId, title, author, onSaleDate,  cb) {
        const sqlQuery = ` INSERT INTO favoriteBooks(workId, title, author, onSaleDate) VALUES('${workId}', '${title}', '${author}', '${onSaleDate}')`;
        connection.query(sqlQuery, function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    },

    checkExists: function (workId, cb) {
        const sqlQuery = `Select * from favoriteBooks where workId = ${workId}`;
        connection.query(sqlQuery, function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    },

    deleteOne: function(workId, cb){
        const sqlQuery = `DELETE FROM favoriteBooks WHERE workId = ${workId}`;
        connection.query(sqlQuery, function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    },

    updateOne: function (workId, author, title, onSaleDate, comment, cb) {
        const sqlQuery = `UPDATE favoriteBooks
SET title = 'ok', author = 'ok', onSaleDate = '2099', comment = 'ok3times'
Where workId = 2533 `;
        connection.query(sqlQuery, function (err, data) {
            if (err) {
                console.log('bad');
                cb(err, null);
            }else{
                console.log('good');
                cb(null, data);
            }

        });
    }
}



module.exports = orm;
