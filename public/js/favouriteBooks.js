
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
    })
}

