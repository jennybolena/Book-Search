
function updateData(workId){
    let author = document.getElementById('book-author').value;
    let title = document.getElementById('book-title').value;
    let onSaleDate = document.getElementById('book-on-sale-date').value;
    let comment = document.getElementById('book-user-comment').innerText;
    console.log(comment);
    let myData = {workId: workId, author: author, title: title, onSaleDate: onSaleDate, comment: comment};
    fetch('/editBookInfo', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
    }).then(response =>{
        console.log(response.statusText);
        if (!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
    }).then(data =>{
        swal({
            title: data.message,
            showConfirmButton: false
            }
        );
        setTimeout(()=>{ window.location.href = "/favourites"; }, 1000);
    }).catch(err=>{
        console.log(err);
        swal('Error, please try later!',
            '',
            'error'
        );
    })

}

function discardChanges() {
    window.location.href = "/favourites";
}
