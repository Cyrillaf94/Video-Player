const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const selector = document.querySelector('.player-speed');
const player = document.querySelector('.player');


// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}


function toggleplay() {
    if (video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }
    else {
        video.pause();
        showPlayIcon();
    }
}


// Progress Bar ---------------------------------- //

function updateProgressBar() {
    // Update Progress Bar Width
    progressBar.style.width = `${(video.currentTime / video.duration * 100)}%`;
    // Update Progress Time
    var minutes = Math.floor(video.currentTime / 60);
    var seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) { currentTime.textContent = `${minutes}:0${seconds} /` }
    else { currentTime.textContent = `${minutes}:${seconds} /` }
    // Update Duration
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration % 60);
    if (video.duration) {
        if (seconds < 10) { duration.textContent = `${minutes}:0${seconds}` }
        else { duration.textContent = `${minutes}:${seconds}` }
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    video.currentTime = video.duration * clickX / width;
    if (video.paused) {
        toggleplay();
    };
}

// Volume Controls --------------------------- //

function setVolumeIcon() {
    volumeIcon.className = '';
    if (video.volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }
    if (video.volume <= 0.7 && video.volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }
    else if (video.volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    }
    volumeBar.style.width = `${(video.volume * 100)}%`;
};

function updateVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Round volume
    if (volume > 0.9) {
        volume = 1
    }
    if (volume < 0.1) {
        volume = 0;
    };
    // Set volume and format 
    video.volume = volume;
    setVolumeIcon();
}

let lastVolume = 1;

function muteUnmute() {

    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        setVolumeIcon();
    }
    else {
        video.volume = lastVolume;
        setVolumeIcon();
    }
}


// Change Playback Speed -------------------- //

function playback() {
    video.playbackRate = selector.value;
}

// Fullscreen ------------------------------- //


/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = player;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

let fullscreenOpen = false;

function fullscreen() {
    if (fullscreenOpen) {
        closeFullscreen();
        fullscreenOpen = false;
        video.classList.remove('video-fullscreen');
    } else {
    openFullscreen();
    fullscreenOpen = true;
    video.classList.add('video-fullscreen');
}
}



playBtn.addEventListener('click', toggleplay);
video.addEventListener('click', toggleplay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('canplay', updateProgressBar);
progressRange.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', updateVolume);
volumeIcon.addEventListener('click', muteUnmute);
selector.addEventListener('change', playback);
fullscreenBtn.addEventListener('click', fullscreen);