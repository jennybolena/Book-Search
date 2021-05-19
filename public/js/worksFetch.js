function fetchWorks(searchInput){
    (async () => {
        const rawResponse = await fetch('https://reststop.randomhouse.com/resources/works?search=' + searchInput, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if(rawResponse.status == 200){
            const content = await rawResponse.json();

            console.log(content.work);
        }

    })();

}

