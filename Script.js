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
                    <p><a href="#" onclick="playVideo('${anime.id}')">Watch Now</a></p>
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

async function playVideo(animeId) {
    let videoDiv = document.getElementById("videoPlayer");
    let player = document.getElementById("player");

    try {
        let response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${animeId}`);
        let data = await response.json();

        if (data.sources && data.sources.length > 0) {
            player.src = data.sources[0].url;
            videoDiv.style.display = "block";
        } else {
            alert("No video available for this anime.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        alert("Failed to load video.");
    }
}

function closePlayer() {
    document.getElementById("videoPlayer").style.display = "none";
    document.getElementById("player").src = "";
}

