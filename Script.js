document.getElementById("searchButton").addEventListener("click", searchAnime);

async function searchAnime() {
    let query = document.getElementById("searchBox").value.trim();
    let resultsDiv = document.getElementById("results");

    if (query === "") {
        resultsDiv.innerHTML = "<p>⚠ Please enter an anime name.</p>";
        return;
    }

    resultsDiv.innerHTML = "<p>🔍 Searching for '" + query + "'...</p>";

    try {
        let response = await fetch(`https://api.consumet.org/anime/gogoanime/${query}`);
        let data = await response.json();

        if (!data.results || data.results.length === 0) {
            resultsDiv.innerHTML = "<p>❌ No results found. Try another keyword.</p>";
            return;
        }

        resultsDiv.innerHTML = ""; 

        data.results.forEach(anime => {
            let animeCard = `
                <div>
                    <h3>${anime.title}</h3>
                    <img src="${anime.image}" width="150">
                    <p><button onclick="playVideo('${anime.id}')">▶ Watch Now</button></p>
                </div>
                <hr>
            `;
            resultsDiv.innerHTML += animeCard;
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p>❌ Error fetching data. Please try again later.</p>";
        console.error("API Fetch Error:", error);
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
            alert("❌ No video available for this anime.");
        }
    } catch (error) {
        console.error("Video Fetch Error:", error);
        alert("❌ Failed to load video.");
    }
}

function closePlayer() {
    document.getElementById("videoPlayer").style.display = "none";
    document.getElementById("player").src = "";
}

