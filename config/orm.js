const connection = require('./connection');

const orm = {
    selectAll: function (cb) {
        connection.query("SELECT * FROM favoriteBooks", function (err, data) {
            if (err) cb(err, null);
            cb(null,data);
        })
    },

    selectAllFilter: function (searchInput, cb) {
        const sqlQuery = `select workId from favoriteBooks
                    where title  Like '%${searchInput}%' or author  Like '%${searchInput}%'`;
        connection.query(sqlQuery, function (err, data) {
            if (err) cb(err, null);
            cb(null,data);
        })
    }
    ,

    selectAllReverseFilter: function (searchInput, cb) {
        const sqlQuery = `select workId from favoriteBooks
                    where title NOT Like '%${searchInput}%' AND author  NOT Like '%${searchInput}%'`;
        connection.query(sqlQuery, function (err, data) {
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
        const sqlQuery = `UPDATE favoriteBooks SET title = '${title}', author = '${author}', onSaleDate = '${onSaleDate}', comment = '${comment}'
                            WHERE workId = ${workId}`;
        connection.query(sqlQuery, function (err, data) {
            if (err) {
                cb(err, null);
            }else{
                cb(null, data);
            }

        });
    }
}



module.exports = orm;
