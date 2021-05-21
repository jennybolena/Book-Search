var express = require('express');
var router = express.Router();


router.get('/', (req,res) =>{

   res.render('home', {
       title: 'Books Search',
       content: 'Search books bae on different criteria',
       style: 'home.css',
       jsFunc : 'js/worksFetch.js',
       books:[{
           titleWeb: 'The Secrets of Handlebars',
           authorWeb: 'JB',
           workId: 123,
           isbn: 123456789
       },
           {
               titleWeb: 'The Secrets of Handlebars',
               authorWeb: 'JB',
               workId: 123,
               isbn: 123456789
           }
           ]
   });
});

router.get('/favourites', (req,res) =>{
    res.render('favouriteBooks', {
        title: 'Favourite Books',
        content: 'See your favourite books',
        style: 'favouriteBooks.css',
        favBooks:[{
            titleWeb: 'The Secrets of Handlebars',
            authorWeb: 'JB',
            workId: 123,
            onSaleDate: '2015',
            isbn: 123456789
        }]
    },
    );
});

router.get('/favourites/edit', (req,res) =>{
    res.render('bookEdit', {
        title: 'Edit Book',
        content: 'Edit your selected book',
        style: 'bookEdit.css'
    });
});

router.post('/add', (req,res)=>{
    console.log('ok');
    let x = req.body.name;
    res.json({data: x});
    res.end();
});

module.exports = router;
