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
    }
}

module.exports = orm;
