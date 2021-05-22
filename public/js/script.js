function fetchWorks(searchInput){
    (async () => {
        const rawResponse = await fetch('https://reststop.randomhouse.com/resources/works?search=' + searchInput, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const content = await rawResponse.json();
        createHtmlContent(content);

    })();

}

function createHtmlContent(content) {
    let booksElement = document.getElementById('books-of-search');
    booksElement.innerHTML = " ";
    let allWorks = content.work;
    for(let singleWork of  allWorks){
        let author = singleWork.authorweb.toLowerCase();
        let bookTitle = singleWork.titleSubtitleAuth;
        bookTitle = bookTitle.substring(0, bookTitle.lastIndexOf(':'));
        let workId = singleWork.workid;
        let onSaleDate = singleWork.onsaledate.split('-')[0];

        author = authorToLowerCase(author);

        booksElement.innerHTML += '<article class="searched-book" id="workId" data-id="workId" data-title="bookTitle">' +
            '<p class="book-title-author">' + bookTitle + '<span> by </span>' + author + '</p>' +
            '<p class="extra-book-info"><strong>WorkId: </strong>' + workId + '<span></span> <strong>Release Date: </strong>' + onSaleDate +  '</p>'+
            '<button class="save-book-btn" onclick="addBookToFav()"><i class="fas fa-star"></i></button>' +
            '  </article>'
        ;



    }
}

function authorToLowerCase(author) {
   let words = author.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

   return words.join(" ");
}


function addBookToFav(){
    let data = {workId: 11121211, bookTitle: 'myBook', author: 'auth', onSaleDate: '22-06-1999' };

        fetch('/add' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => console.log(data));


        console.log(  '1');
}
