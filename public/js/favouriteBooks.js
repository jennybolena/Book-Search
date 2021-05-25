let timer = 500;

function deleteBook(workId) {
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

        let deletedElement = document.getElementById('my-fav-book-' + workId);
        deletedElement.style.display = 'none';
    }).catch(err=>{
        console.log(err);
        swal('Error, please try later!',
            '',
            'error'
        );
    });
}

function goToEdit(workId) {
    window.location.href ="favourites/edit/" + workId;
}


function getFilteredBooks(searchInput) {

    clearTimeout(timer);


    timer = setTimeout(() => {
        let inputEmpty = false;
        if (searchInput == ''){
            searchInput = 'ok';
            inputEmpty = true;
        }

        fetch('/getFavouriteFilter/' + searchInput, {
            method: 'GET',
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
            fetch('/getFavouriteReverseFilter/' + searchInput, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res =>{
                if (!res.ok){
                    throw Error(res.statusText);
                }
                return res.json();
            }).then(data_ =>{

                let myData_ = data_.data;
                for (let singleData_ of myData_ ){
                    if (inputEmpty){
                        document.getElementById('my-fav-book-' + singleData_.workId).style.display = 'block';
                    }else {
                        document.getElementById('my-fav-book-' + singleData_.workId).style.display = 'none';
                    }

                }
            }).catch(error=>{
                console.log(error);
                swal('Error, please try later!',
                    '',
                    'error'
                );
            });
            let myData = data.data;
            for (let singleData of myData ){
                document.getElementById('my-fav-book-' + singleData.workId).style.display = 'block';
            }

        }).catch(err=>{
            console.log(err);
            swal('Error, please try later!',
                '',
                'error'
            );
        });
    }, 500);

}
