function fetchWorks(searchInput){

    if(searchInput == ''){
        return;
    }
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
    let lastWorkId;
    let allWorks = content.work;
    for(let singleWork of  allWorks){
        let author = singleWork.authorweb.toLowerCase();
        let bookTitle = singleWork.titleSubtitleAuth;

        let workId = singleWork.workid;
        let onSaleDate = singleWork.onsaledate.split('-')[0];

        author = authorToLowerCase(author);

        let article = document.createElement('article');
        article.setAttribute('class', 'searched-book');
        article.setAttribute('id', 'article-' + workId);

        let p1 = document.createElement('p');
        p1.innerHTML = '<p class="book-title-author">' + bookTitle + '<span> by </span>' + author + '</p>';
        let p2 = document.createElement('p');
        p2.innerHTML = '<p class="extra-book-info"><strong>WorkId: </strong>' + workId + '<span></span> <strong>Release Date: </strong>' + onSaleDate +  '</p>'

        let btn = document.createElement('button');
        btn.setAttribute('class', 'save-book-btn');
        btn.setAttribute('id', workId + '-btn');
        btn.innerHTML = 'Add to<i class="fas fa-star"></i> favourite';
        btn.addEventListener('click', function (){
            addBookToFav(workId, bookTitle, author, onSaleDate);
        });

        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(btn);
        booksElement.appendChild(article);

        lastWorkId = workId;
    }
}

function authorToLowerCase(author) {
   let words = author.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

   return words.join(" ");
}


function prepareForFetch(event, searchInput){
    let keyCode = event.which || event.keyCode;
    if(keyCode !== 13) return;
    fetchWorks(searchInput);
}

function addBookToFav(workId, bookTitle, author, onSaleDate){
    let data = {workId: workId, bookTitle: bookTitle, author: author, onSaleDate: onSaleDate };

        fetch('/add' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok){
                throw Error(response.statusText);
            }
           return  response.json()
        })
            .then(data =>{
                let message = data.message;
                let code = data.code;
                if (code === 1){
                    swal({
                            title: "Book added!",
                            text: "Press REMOVE, to remove book from favorites!",
                            showCancelButton: true,
                            confirmButtonColor: "#E3210B",
                            confirmButtonText: "REMOVE",
                            cancelButtonText: "KEEP",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function(inputValue){
                            //Use the "Strict Equality Comparison" to accept the user's input "false" as string)
                            if (inputValue===true){
                                 fetch('/delete/' + workId, {
                                     method: 'DELETE',
                                     headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json'
                                     }
                                }).then(response =>{
                                     if (!response.ok){
                                         throw Error(response.statusText);
                                     }
                                    return response.json();
                                 }).then(data =>{
                                      swal(data.message,
                                            '',
                                            'success'
                                      );
                                 }).catch(err=>{
                                     console.log(err);
                                     swal('Error, please try later!',
                                         '',
                                         'error'
                                     );
                                 });
                            }else{
                                swal(data.message,
                                    '',
                                    'success'
                                );
                            }
                        });
                }else if (code === 2) {
                    swal(message,
                        '',
                        'info'
                    );
                }
            }).catch(err=>{
                console.log(err);
                swal('Error, please try later!',
                    '',
                    'error'
                );
        });
}
