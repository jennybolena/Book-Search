var express = require('express');
var router = express.Router();

const orm = require('../config/orm')


router.get('/', (req,res) =>{

   res.render('home', {
       title: 'Books Search',
       content: 'Search books bae on different criteria',
       style: 'home.css',
       jsFunc : 'js/home.js'
   });
});

router.get('/favourites', (req,res) =>{
    orm.selectAll(function (err, data) {
        if(err){
            return res.status(501).json({
                message: 'Error, please try later.',
                code: 0
            });
        };
        res.render('favouriteBooks', {
                title: 'Favourite Books',
                content: 'See your favourite books',
                style: 'favouriteBooks.css',
                jsFunc : 'js/favouriteBooks.js',
                favBooks: data
            },
        );
    });

});

router.get('/favourites/edit', (req,res) =>{
    res.render('bookEdit', {
        title: 'Edit Book',
        content: 'Edit your selected book',
        style: 'bookEdit.css'
    });
});

router.post('/add', (req,res)=>{
    const workId = req.body.workId;
    const title = req.body.bookTitle;
    const author = req.body.author;
    const date_ = req.body.onSaleDate;

    orm.checkExists(workId, function (err, data) {
        if (err){
            return res.status(501).json({
                message: 'Error, please try later.',
                code: 0
            });
        };

      if(data.length === 0){
          orm.insertOne(workId, title, author , date_, function (error, data_) {
              if (error){
                  return res.json({
                      message: 'Error, please try later.',
                      code: 0
                  });
              }

              res.json({
                  message: 'The book has been added to favorites!',
                  code: 1,
                  data : data_});
              res.end();
          });
      } else{
          res.json({
              'message' : 'The book already exists to favorites!',
              code : 2
          });

          res.end();
      }
    });
});

router.delete('/delete/:workId', (req, res)=>{

   const workId  = req.params.workId;
   orm.deleteOne(workId, function (error, data) {
       if (error){
           return res.json({
               message: 'Error, please try later.',
               code: 0
           });
       }

       res.json({
           message: 'Book was deleted!',
           code: 1,
           data: data
       });
       res.end();
   });
});

module.exports = router;
