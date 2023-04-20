// Playing the songs is 1st task in JS

// Initializing variables :-
var songIndex = 0;
var currAudio = new Audio("songs/Bandeh_IndianOcean.mp3");
var masterPlay = document.getElementById("masterPlay"); 
// The play-button at bottom-center
var songProgressBar = document.getElementById("songProgressBar");
var volumeBar = document.getElementById("volumeBar");
var volumeValue = document.getElementById("volumeValue");
var playerGif = document.getElementById("player-gif");
var songItems = Array.from(document.getElementsByClassName("songItem"));
var currSongName = document.getElementsByClassName("current-song-name")[0];
var currSongCover = document.getElementsByClassName("current-song-cover")[0];
var currArtist = document.getElementsByClassName("current-artist")[0];
var currSongIndex = 0;
var playPauseText = document.getElementsByClassName("play-pause-text")[0];
var volumeIcon = document.getElementsByClassName("fa-volume-low")[0];
var isMute = 0;
var audioVolume = 1; // default
var volumeHoverText = document.getElementsByClassName("volume-btn")[0].getElementsByClassName("hover-btn-text")[0];



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
    {songName: "Totia Manmotia", artist:"Rabbi Shergill", duration:"4:28", filePath: "songs/TotiaManmotia_RabbiShergill.mp3", coverPath: "covers/TotiaManmotia_RabbiShergill.jpg"},
    {songName: "The Prices", artist:"Soulmate", duration:"3:28", filePath: "songs/ThePrice_Soulmate.mp3", coverPath: "covers/ThePrice_Soulmate.jpg"},
    {songName: "Ghir Ghir", artist:"Advaita", duration:"5:05", filePath: "songs/GhirGhir_Advaita.mp3", coverPath: "covers/GhirGhir_Advaita.jpg"},
    {songName: "Dilnawaz", artist:"The Local Train", duration:"3:27", filePath: "songs/Dilnawaz_TLT.mp3", coverPath: "covers/Dilnawaz_TLT.jpg"},
    {songName: "Brown Man's Funk", artist:"The Revisit Project", duration:"3:26", filePath: "songs/BrownMansFunk_TRP.mp3", coverPath: "covers/BrownMansFunk_TRP.jpg"}
]

// Can also set cover-image, artist-name, and others for each song (here)

/*
songItems.forEach((song, i)=>{
    console.log(song, i);
    song.getElementsByTagName("img")[0].src = songs[i].coverPath;
    song.getElementsByClassName("artist-name")[0].innerText = songs[i].artist;
})
*/


// Listen to Events

// Handle Play/Pause clicks

const playMusic = () => {
    playPauseText.innerText = "Pause";
    // Either paused or not started playing
    currAudio.src = songs[currSongIndex].filePath;
    // Also update the bottom song-info.
    //    (showing which song is playing currently)
    currSongName.innerText = songs[currSongIndex].songName;
    currSongCover.src = songs[currSongIndex].coverPath;
    currArtist.innerText = songs[currSongIndex].artist;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
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
    // Also updating song-duration below
    var currDuration = songs[currSongIndex].duration;
    var duration = document.getElementById("duration");
    duration.innerText = currDuration;
};

const pauseMusic = () => {
    playPauseText.innerText = "Play";
    currAudio.pause();
    // Replace the pause-icon to play-icon
    masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
    // Stop showing the gif
    playerGif.style.opacity = 0;
    makeAllPlayable();
};

// Adding music-control feature through master-play button clicks
masterPlay.addEventListener("click", ()=>{
    if(currAudio.paused || currAudio.currentTime<=0) {
        playMusic();
    }
    else { // Pause the audio
        pauseMusic();
    }
})

// Adding music-control feature through Space-bar
document.addEventListener("keydown", event => {
    if(event.code === "Space") {
        // Space-bar is pressed
        if(currAudio.paused || currAudio.currentTime<=0) {
            playMusic();
        }
        else { // Pause the audio
            pauseMusic();
        }
    }
 })


// Working on Progress-bar change

currAudio.addEventListener("timeupdate", (event) => {
    // There is a property of (event)-object as :-
    // srcElement
    //    -> currentTime (has duration played)
    //          (float value)
    //    -> duration (has total duration)
    var currTime = event.srcElement.currentTime;
    var duration = event.srcElement.duration;
    // console.log(currTime, duration);
    var percentValue = ((currTime / duration) * 100);
    var progress = document.getElementById("progress");
    progress.style.width = `${percentValue}%`;
    // Also update the currTime
    var currentTime = document.getElementById("current-time");
    currTime = parseInt(currTime);
    var minutes = parseInt(currTime / 60);
    var seconds = parseInt(currTime % 60);
    if(seconds < 10) {
        currentTime.innerText = `${minutes}:${0}${seconds}`;
    }
    else {
        currentTime.innerText = `${minutes}:${seconds}`;
    }
})


// Adding transitions to song-progress-bar & volume-bar (same transitions)

songProgressBar.addEventListener("mouseenter", ()=>{
    var progress = document.getElementById("progress");
    progress.style.backgroundColor = "rgb(46,193,0)";
})

songProgressBar.addEventListener("mouseout", ()=>{
    var progress = document.getElementById("progress");
    progress.style.backgroundColor = "rgb(183,183,183)";
})

volumeBar.addEventListener("mouseenter", ()=>{
    var progress = document.getElementById("volumeValue");
    progress.style.backgroundColor = "rgb(46,193,0)";
})

volumeBar.addEventListener("mouseout", ()=>{
    var progress = document.getElementById("volumeValue");
    progress.style.backgroundColor = "rgb(183,183,183)";
})


// Handle Progress-bar custom-change

songProgressBar.addEventListener("click", (event)=>{
    // console.log(event);
    // (event)-object has following properties :-
    //    srcElement.clientWidth  -->  total width of bar
    //    offsetX  -->  the width (from left-->) at which it is clicked
    var totalLen = event.srcElement.clientWidth;
    var targetLen = event.offsetX;
    var percentValue = ((targetLen / totalLen) * 100);
    // We need this percent-value in seconds (of the total duration of song)
    var totalDuration = currAudio.duration;
    var targetDuration = ((percentValue*totalDuration) / 100);
    console.log(percentValue, targetDuration);
    currAudio.currentTime = targetDuration;
    // Also update the currTime
    var currentTime = document.getElementById("current-time");
    currTime = parseInt(targetDuration);
    var minutes = parseInt(targetDuration / 60);
    var seconds = parseInt(targetDuration % 60);
    if(seconds < 10) {
        currentTime.innerText = `${minutes}:${0}${seconds}`;
    }
    else {
        currentTime.innerText = `${minutes}:${seconds}`;
    }
    // Also update the width of progress-bar
    var progress = document.getElementById("progress");
    progress.style.width = `${percentValue}%`;
})


// Make all Buttons playable
// If pause button, resets.
// And if play button, nothing will happen.

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
        if(currSongIndex != index) {
            e.target.classList.replace("fa-circle-play", "fa-circle-pause");
            // Set the current-song index
            currSongIndex = index;
            // Below function automatically plays the song.
            playMusic();
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
    // Now, the previous song should come randomly if shuffle is on.
    // And, if loop-one is on, current song should start playing again.
    // And, if loop-all is there, previous song should play.
    //     --> Just change the way indices are changing.
    if(loopIndex == 0) {
        // loop-off
        if(shuffleIndex == 0) {
            // shuffle-off (just go to next song)
            if(currSongIndex == 0) {
                currSongIndex = 10;
            }
            else {
                currSongIndex = ((currSongIndex-1) % 11);
            }
        }
        else {
            // shuffle-on (go to random song)
            var newIndex = Math.floor((Math.random()*11));
            // Random no. between [0-10]
            currSongIndex = newIndex;
        }
    }
    else if(loopIndex == 1) { 
        // start next-audio
        if(currSongIndex == 0) {
            currSongIndex = 10;
        }
        else {
            currSongIndex = ((currSongIndex-1) % 11);
        }
    }
    else {
        // start current-audio from beginning
        // Nothing to do.
    }
    // Also set current time to 0
    currAudio.currentTime = 0;
    playMusic();
})



// Working on Next Button

var nextBtn = document.getElementsByClassName("next-btn")[0];

nextBtn.addEventListener("click", ()=>{
    // Just changing the way, next song id determined.
    //   --> Based on loop-button & shuffle-button (less priority)
    if(loopIndex == 0) {
        // loop-off
        if(shuffleIndex == 0) {
            // shuffle-off (just go to next song)
            currSongIndex = ((currSongIndex+1) % 11);
        }
        else {
            // shuffle-on (go to random song)
            var newIndex = Math.floor((Math.random()*11));
            // Random no. between [0-10]
            currSongIndex = newIndex;
        }
    }
    else if(loopIndex == 1) { 
        // start next-audio
        currSongIndex = ((currSongIndex+1) % 11);
    }
    else {
        // start current-audio from beginning
        // Nothing to do.
    }
    // Also set current time to 0
    currAudio.currentTime = 0;
    playMusic();
})



// Writing loop-song-feature

var loopIndex = 0; // default value
// loopIndex :-
//    0 -> loop-off  ,  1 -> loop-all  ,  2 -> loop-all
//         (default)

var loopBtn = document.getElementsByClassName("loop-btn")[0];
var loopImage = loopBtn.getElementsByClassName("loop-image")[0];
var loopTextEle = loopBtn.getElementsByClassName("hover-btn-text")[0];

loopBtn.addEventListener("click", ()=>{
    if(loopIndex == 0) { // loop-off --> loop-all
        loopIndex = 1; // keep updating
        // Update the loop-all icon
        loopImage.src = "icons/loop-all2.png";
        // Update the text
        loopTextEle.innerText = "Repeat one";
        // And, the main thing.. start playing all songs in loop.
    }
    else if(loopIndex == 1) { // loop-all --> loop-one
        loopIndex = 2;
        // Update the loop-all icon
        loopImage.src = "icons/loop-one2.png";
        // Update the text
        loopTextEle.innerText = "Disable repeat";
        // And, the main thing.. start playing current song in loop.
    }
    else {  // loopIndex = 2  ..  loop-one --> loop-off
        loopIndex = 0;
        // Update the loop-all icon
        loopImage.src = "icons/loop-off.png";
        // Update the text
        loopTextEle.innerText = "Enable repeat";
        // And, the main thing.. stop playing current song after it ends.
    }
})


// Writing Shuffle-songs feature

var shuffleIndex = 0;
// shuffleIndex :-
//    0 -> shuffle-off  ,  1 -> shuffle-on
//         (default)

var shuffleBtn = document.getElementsByClassName("shuffle-btn")[0];
var shuffleImage = shuffleBtn.getElementsByClassName("shuffle-image")[0];
var shuffleTextEle = shuffleBtn.getElementsByClassName("hover-btn-text")[0];

shuffleBtn.addEventListener("click", ()=>{
    if(shuffleIndex == 0) { // shuffle off --> on
        shuffleIndex = 1; // update index
        // Update to shuffle-on icon
        shuffleImage.src = "icons/shuffle-on2.png";
        // Update the hover-text
        shuffleTextEle.innerText = "Disable shuffle";
        // And, the main thing.. now onwards play song randomly from collection.
    }
    else { // shuffle on --> of
        shuffleIndex = 0; // update index
        // Update to shuffle-on icon
        shuffleImage.src = "icons/shuffle-off.png";
        // Update the hover-text
        shuffleTextEle.innerText = "Enable shuffle";
        // And, the main thing.. now onwards play next song in the order.
    }
})


// Loop > Shuffle  (on priority)
// So, shuffle will only work, when loop is off

// Add event on currAudio ending.

currAudio.addEventListener("ended", ()=>{
    if(loopIndex == 0) {
        // loop-off
        if(shuffleIndex == 0) {
            // shuffle-off (just go to next song)
            currSongIndex = ((currSongIndex+1) % 11);
        }
        else {
            // shuffle-on (go to random song)
            var newIndex = Math.floor((Math.random()*11));
            // Random no. between [0-10]
            currSongIndex = newIndex;
        }
    }
    else if(loopIndex == 1) { 
        // start next-audio
        currSongIndex = ((currSongIndex+1) % 11);
    }
    else {
        // start current-audio from beginning
        // Nothing to do.
    }
    playMusic();
})


// Working on Volume-controller

// Custom-change volume of audio playing (similar to song-progress-bar)

volumeBar.addEventListener("click", (event)=>{
    // (event)-object has following properties :-
    //    srcElement.clientWidth  -->  total width of bar
    //    offsetX  -->  the width (from left-->) at which it is clicked
    var totalLen = event.srcElement.clientWidth;
    var targetLen = event.offsetX;
    var percentValue = ((targetLen / totalLen) * 100);
    // Set the volume of audio, to this percent of total-volume.
    var totalVolume = audioVolume;
    var newVolume = (percentValue / 100);
    currAudio.volume = newVolume;
    // Also set width of volumeValue
    volumeValue.style.width = `${percentValue}%`;
    // Also update audioVolume
    audioVolume = newVolume;
    // If mute, then also unmute.
    if(isMute == 1) {
        isMute = 0;
        // Change the volume-icon color
        volumeIcon.style.color = "lightgray";
        // Also change hover text
        volumeHoverText.innerText = "Mute";
    }
})

// Mute <-> Unmute

volumeIcon.addEventListener("click", ()=>{
    if(isMute == 0) { // mute the audio
        isMute = 1;
        volumeIcon.style.color = "gray";
        currAudio.volume = 0; // but don't alter audioVolume
        // It keeps the old-volume saved.
        //    --> When unmuted, switch to this value
        // Also change the hover text.
        volumeHoverText.innerText = "Unmute";
        // Also change volumeValue
        var percentValue = 0;
        volumeValue.style.width = `${percentValue}%`;
    }
    else { // unmute the audio (with old value)
        isMute = 0; // So we can mute it again (if required)
        currAudio.volume = audioVolume;
        volumeIcon.style.color = "lightgray";
        // Also change hover text
        volumeHoverText.innerText = "Mute";
        // Also change volumeValue
        var percentValue = (audioVolume * 100);
        volumeValue.style.width = `${percentValue}%`;
    }
});