function fetchWorks(searchInput){
    (async () => {
        const rawResponse = await fetch('https://reststop.randomhouse.com/resources/works?search=' + searchInput, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

            const content = await rawResponse.json();
            console.log(content);
            return content.work;
    })();

}
