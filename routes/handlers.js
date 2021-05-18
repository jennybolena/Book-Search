var express = require('express');
var router = express.Router();


router.get('/', (req,res) =>{
   res.render('home', {
       title: 'Books Search',
       content: 'Search books bae on different criteria',
       style: 'home.css'
   });
});

router.get('/favourites', (req,res) =>{
    res.render('favouriteBooks', {
        title: 'Favourite Books',
        content: 'See your favourite books',
        style: 'favouriteBooks.css',
        favBooks:[{
            bookId: 123,
            author: 'JB',
            name: 'The Secretes of Handlebars'
        }]
    });
});

router.get('/favourites/edit', (req,res) =>{
    res.render('bookEdit', {
        title: 'Edit Book',
        content: 'Edit your selected book',
        style: 'bookEdit.css'
    });
});

module.exports = router;
