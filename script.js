// Playing the songs is 1st task in JS

// Initializing variables :-
var songIndex = 0;
var currAudio = new Audio("songs/Bandeh_IndianOcean.mp3");
var masterPlay = document.getElementById("masterPlay"); 
// The play-button at bottom-center
var songProgressBar = document.getElementById("songProgressBar");
var playerGif = document.getElementById("player-gif");
var songItems = Array.from(document.getElementsByClassName("songItem"));
var currSongName = document.getElementsByClassName("current-song-name")[0];
var currSongCover = document.getElementsByClassName("current-song-cover")[0];
var currArtist = document.getElementsByClassName("current-artist")[0];
var currSongIndex = -1;
var playPauseText = document.getElementsByClassName("play-pause-text")[0];



// Array of song-objects
// Each song-object has 3 properties :-
// 1. songName
// 2. filePath
// 3. coverPath
var songs = [
    {songName: "Bandeh", artist: "Indian Ocean", duration:"7:48", filePath: "songs/Bandeh_IndianOcean.mp3", coverPath: "covers/Bandeh_IndianOcean.jpg"},
    {songName: "Krishna", artist:"Colonial Cousins", duration:"5:50", filePath: "songs/Krishna_ColonialCousins.mp3", coverPath: "covers/Krishna_ColonialCousins.jpg"},
    {songName: "O Sanam", artist:"Lucky Ali", duration:"3:43", filePath: "songs/OSanam_LuckyAli.mp3", coverPath: "covers/OSanam_LuckyAli.jpg"},
    {songName: "Dooba Dooba", artist: "Silk Route", duration:"5:01", filePath: "songs/DoobaDooba_SilkRoute.mp3", coverPath: "covers/DoobaDooba_SilkRoute.jpg"},
    {songName: "Aap Ki Dua", artist:"KK", duration:"4:18", filePath: "songs/AapKiDua_KK.mp3", coverPath: "covers/AapKiDua_KK.jpg"},
    {songName: "Bangalore Blues", artist:"Thermal And A Quarter", duration:"6:10", filePath: "songs/BangaloreBlues_TAAQ.mp3", coverPath: "covers/BangaloreBlues_TAAQ.jpg"},
    {songName: "Totial Manmotia", artist:"Rabbi Shergill", duration:"4:28", filePath: "songs/TotiaManmotia_RabbiShergill.mp3", coverPath: "covers/TotiaManmotia_RabbiShergill.jpg"},
    {songName: "The Prices", artist:"Soulmate", duration:"3:28", filePath: "songs/ThePrice_Soulmate.mp3", coverPath: "covers/ThePrice_Soulmate.jpg"},
    {songName: "Ghir Ghir", artist:"Advaita", duration:"5:05", filePath: "songs/GhirGhir_Advaita.mp3", coverPath: "covers/GhirGhir_Advaita.jpg"},
    {songName: "Dilnawaz", artist:"The Local Train", duration:"3:27", filePath: "songs/Dilnawaz_TLT.mp3", coverPath: "covers/Dilnawaz_TLT.jpg"},
    {songName: "Brown Man's Funk", artist:"The Revisit Project", duration:"3:26", filePath: "songs/BrownMansFunk_TRP.mp3", coverPath: "covers/BrownMansFunk_TRP.jpg"}
]

// Can also set cover-image, artist-name, and others for each song (in JS)

/*
songItems.forEach((song, i)=>{
    console.log(song, i);
    song.getElementsByTagName("img")[0].src = songs[i].coverPath;
    song.getElementsByClassName("artist-name")[0].innerText = songs[i].artist;
})
*/


// Listen to Events

// Handle Play/Pause clicks
masterPlay.addEventListener("click", ()=>{
    if(currAudio.paused || currAudio.currentTime<=0) {
        playPauseText.innerText = "Pause";
        // Either paused or not started playing
        currAudio.play();
        // Also Replace the play-icon to pause-icon (on webpage)
        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
        // Also start showing the gif
        playerGif.style.opacity = 1;
        // Also convert the play button of songItem --> pause.
        if(currSongIndex == -1) {
            // Means no song selected from above.. directly play button pressed
            currSongIndex = 0;
            // By default --> Bandeh will play
        }
        var idstr = currSongIndex.toString();
        var getBtn = document.getElementById(idstr);
        // console.log("idstr - ",idstr, getBtn);
        getBtn.classList.remove("fa-circle-play");
        getBtn.classList.add("fa-circle-pause");
    }
    else { // Pause the audio
        playPauseText.innerText = "Play";
        currAudio.pause();
        // Replace the pause-icon to play-icon
        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
        // Stop showing the gif
        playerGif.style.opacity = 0;
        makeAllPlayable();
    }
})

// Handle Progress-bar auto-change
currAudio.addEventListener("timeupdate", ()=>{
    // console.log("timeupdate");
    // Update progress-bar of song
    // Calculating percentage of audio played
    progress = parseInt((currAudio.currentTime * 100) / currAudio.duration);
    // console.log(progress);
    songProgressBar.value = progress;
})

// Handle Progress-bar custom-change
songProgressBar.addEventListener("change", ()=>{
    currAudio.currentTime = parseInt((songProgressBar.value * currAudio.duration) / 100);
})



// Make all Buttons playable
// If pause button, resets.
// And if play button, nothing will happen.
//    (it will just keep playing).

const makeAllPlayable = ()=>{
    Array.from(document.getElementsByClassName("songItem-play")).forEach((btn)=>{
        btn.classList.remove("fa-circle-pause");
        btn.classList.add("fa-circle-play");
    })
}

// Play songs by upper-play button

songItemPlayBtns = document.getElementsByClassName("songItem-play");
Array.from(songItemPlayBtns).forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        var index = parseInt(e.target.id);
        if(currSongIndex == -1) {
            currSongIndex = 0; // initialize
        }
        if(currSongIndex != index) {
            // Just change the song.
            // And start playing it.
            // Change the song & play it
            // console.log(e.target);
            // Just verifying if right-button is working.
            // First reset all buttons to play.
            makeAllPlayable();
            playPauseText.innerText = "Pause";
            e.target.classList.replace("fa-circle-play", "fa-circle-pause");
            // Replaced the play -> pause button
            // Also set the song to play

            // We have to just convert this hard code to the corresponding song.
            var index = parseInt(e.target.id);
            currAudio.src = songs[index].filePath;
            // Also update currSongIndex variable
            currSongIndex = index;
            // Also update the bottom song-info.
            //    (showing which song is playing currently)
            currSongName.innerText = songs[index].songName;
            currSongCover.src = songs[index].coverPath;
            currArtist.innerText = songs[index].artist;
            // Also change the bottom play-pause buttons accordingly
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            // Also set current time to 0
            currAudio.currentTime = 0;
            currAudio.play();
            // Also start showing the gif
            playerGif.style.opacity = 1;
        }
        else { // A same-song click
            if(currAudio.paused || currAudio.currentTime<=0) { // Play the song
                currAudio.play();
                // Change the icons required
                masterPlay.classList.remove("fa-circle-play");
                masterPlay.classList.add("fa-circle-pause");
                // Change the opacity of gif to 1
                playerGif.style.opacity = 1;
                e.target.classList.replace("fa-circle-play", "fa-circle-pause");
            }
            else { // Pause the song
                currAudio.pause();
                // Change the icons required
                masterPlay.classList.remove("fa-circle-pause");
                masterPlay.classList.add("fa-circle-play");
                // Change the opacity of gif to 1
                playerGif.style.opacity = 0;
                e.target.classList.replace("fa-circle-pause", "fa-circle-play");
            }
        }

        
    })
})


// Display the on-hover text of lower controls-buttons
var controlBtns = document.getElementsByClassName("controls");

Array.from(controlBtns).forEach((btn)=>{
    // The on-hover text is :-
    var text = btn.getElementsByClassName("hover-btn-text")[0];

    btn.addEventListener("mouseover", function(){
        text.style.opacity = 0.8;
    });
    
    btn.addEventListener("mouseout", function(){
        text.style.opacity = 0;
    })
})


// Working on Previous Button

var prevBtn = document.getElementsByClassName("previous-btn")[0];

prevBtn.addEventListener("click", ()=>{
    if(currSongIndex == -1) {
        currSongIndex = 0; // first initialize
    }
    if(currSongIndex == 0) {
        currSongIndex = 10;
    }
    else {
        currSongIndex = ((currSongIndex - 1) % 11);
    }
    currAudio.src = songs[currSongIndex].filePath;
    // Also update the bottom song-info.
    //    (showing which song is playing currently)
    currSongName.innerText = songs[currSongIndex].songName;
    currSongCover.src = songs[currSongIndex].coverPath;
    currArtist.innerText = songs[currSongIndex].artist;
    // Also change the bottom play-pause buttons accordingly
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    // Also set current time to 0
    currAudio.currentTime = 0;
    currAudio.play();
    // Also start showing the gif
    playerGif.style.opacity = 1;
    // Reset all buttons to play
    makeAllPlayable();
    // Now set the songItem-button to pause
    var idstr = currSongIndex.toString();
    var targetBtn = document.getElementById(idstr);
    targetBtn.classList.remove("fa-circle-play");
    targetBtn.classList.add("fa-circle-pause");
})



// Working on Next Button

var nextBtn = document.getElementsByClassName("next-btn")[0];

nextBtn.addEventListener("click", ()=>{
    if(currSongIndex == -1) {
        currSongIndex = 0; // first initialize
    }
    currSongIndex = ((currSongIndex + 1) % 11);
    currAudio.src = songs[currSongIndex].filePath;
    // Also update the bottom song-info.
    //    (showing which song is playing currently)
    currSongName.innerText = songs[currSongIndex].songName;
    currSongCover.src = songs[currSongIndex].coverPath;
    currArtist.innerText = songs[currSongIndex].artist;
    // Also change the bottom play-pause buttons accordingly
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    // Also set current time to 0
    currAudio.currentTime = 0;
    currAudio.play();
    // Also start showing the gif
    playerGif.style.opacity = 1;
    // Reset all buttons to play
    makeAllPlayable();
    // Now set the songItem-button to pause
    var idstr = currSongIndex.toString();
    var targetBtn = document.getElementById(idstr);
    targetBtn.classList.remove("fa-circle-play");
    targetBtn.classList.add("fa-circle-pause");
})