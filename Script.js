async function searchAnime() {
    let query = document.getElementById("searchBox").value;
    let resultsDiv = document.getElementById("results");
    
    resultsDiv.innerHTML = "<p>Searching...</p>";

    try {
        let response = await fetch(`https://api.consumet.org/anime/gogoanime/${query}`);
        let data = await response.json();

        resultsDiv.innerHTML = ""; 

        data.results.forEach(anime => {
            let animeCard = `
                <div>
                    <h3>${anime.title}</h3>
                    <img src="${anime.image}" width="150">
                    <p><a href="${anime.url}" target="_blank">Watch Now</a></p>
                </div>
                <hr>
            `;
            resultsDiv.innerHTML += animeCard;
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p>Sorry, no results found.</p>";
        console.error("Error fetching data:", error);
    }
}
