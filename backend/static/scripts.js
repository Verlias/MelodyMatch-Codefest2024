// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to handle button clicks
    function handleButtonClick(buttonId) {
        document.getElementById("buttonClicked").value = buttonId;
        // Hide/show input based on button clicked
        if (buttonId === "GenreFiltering") {
            document.getElementById("inputSection").style.display = "block";
            document.getElementById("submitForm").innerText = "Submit";
        } else {
            document.getElementById("inputSection").style.display = "none";
        }
    }


    // Function to handle button clicks
    // Function to handle button clicks
function handleButtonClick(buttonId) {
    document.getElementById("buttonClicked").value = buttonId;
    // Hide/show input and buttons based on button clicked
    if (buttonId === "GenreFiltering") {
        document.getElementById("inputSection").style.display = "block";
        document.getElementById("getSimilarTracksButton").style.display = "none";
        document.getElementById("getAudioTracksButton").style.display = "block";
        document.getElementById("submitForm").innerText = "Submit";
    } else if (buttonId === "CombinedAlgo") {
        document.getElementById("inputSection").style.display = "none";
        document.getElementById("getSimilarTracksButton").style.display = "block";
        document.getElementById("getAudioTracksButton").style.display = "none";
        document.getElementById("submitForm").innerText = "Submit";
    } else {
        document.getElementById("inputSection").style.display = "none";
        document.getElementById("getSimilarTracksButton").style.display = "none";
        document.getElementById("getAudioTracksButton").style.display = "block";
    }
}

    // Add event listeners to the buttons
    document.getElementById("GenreFiltering").addEventListener("click", function() {
        handleButtonClick("GenreFiltering");
    });

    document.getElementById("CombinedAlgo").addEventListener("click", function() {
        handleButtonClick("CombinedAlgo");
    });

    // Function to send request to /similar_tracks route
    document.getElementById("getSimilarTracksButton").addEventListener("click", async function() {
        try {
            const response = await fetch("/similar_tracks", {
                method: "GET"
            });
            const data = await response.json();
            const similarTracksHtml = data.similarTracks.map(track => `<p>${track[0]} - Track ID: ${track[1]}</p>`).join('');
            document.getElementById("resultContainer").innerHTML = similarTracksHtml;
        } catch (error) {
            console.error("Error:", error);
        }
    });

    // Function to send request to /audio_tracks route
    document.getElementById("getAudioTracksButton").addEventListener("click", async function() {
        try {
            const response = await fetch("/audio_tracks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    input: document.getElementById("inputText").value,
                    buttonClicked: document.getElementById("buttonClicked").value
                })
            });
            const data = await response.json();
            const audioTracksHtml = data.similarTracks.map(track => `<p>${track[0]} - Track ID: ${track[1]}</p>`).join('');
            document.getElementById("resultContainer").innerHTML = audioTracksHtml;
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
