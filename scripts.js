/*  get our element */
const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = document.querySelector('.fullscreen-btn')
const current =  player.querySelector('.current');
const duration  =  player.querySelector('.duration');

/* build functions */
function togglePlay(){

    /* const method = video.paused ? 'play' : 'puase';
    video[method](); */
    if(video.paused) {
        video.play();
    } else {
        video.pause()
    }
}
// Detect press of spacebar, toggle play
function detectKeypress(e) {
	if (e.keyCode == 32) {
	  togglePlay();
	} else {
      return;
	}
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}


function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value   // this.name = playbackRate or volume
}


function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    
}

function currentTime() { 
    let curmins = Math.floor(video.currentTime / 60);
    let cursecs = Math.floor(video.currentTime - curmins * 60);
    let durmins = Math.floor(video.duration / 60);
    let dursecs = Math.floor(video.duration - durmins * 60);
    if(cursecs < 10){ cursecs = "0"+cursecs; }
    if(dursecs < 10){ dursecs = "0"+dursecs; }
    if(curmins < 10){ curmins = "0"+curmins; }
    if(durmins < 10){ durmins = "0"+durmins; }
    current.innerHTML = curmins+":"+cursecs;
    duration.innerHTML = durmins+":"+dursecs;
}

// Create fullscreen video button

function toggleFullscreen() {
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}

/* hook up the event listners*/

//1. puase and play
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
// Do these on time update

video.addEventListener('timeupdate', handleProgress) //progress Bar
video.addEventListener('timeupdate', currentTime);

toggle.addEventListener('click', togglePlay)

fullscreen.addEventListener('click', toggleFullscreen);

// Keypress (Play/Pause)
window.addEventListener('keydown', detectKeypress);

//2. skip
skipButtons.forEach(button => button.addEventListener('click', skip))

//3. Ranges
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

// progress bar scrub
let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mosemove', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
