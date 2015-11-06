// PROJECT LAPSE BEHAVIORS
// ================
(function(){

  // grab elements
  var video = document.querySelector('[data-role="player"]');
  var playerControls = document.querySelector('[data-role="player-controls"]');
  var overlay = document.querySelector('[data-role="player-overlay"]');
  var overlayIcon = document.querySelector('[data-role="player-overlay-icon"]');
  var playButton = document.querySelector('[data-role="player-play"]');
  var closePlayerButton = document.querySelector('[data-role="player-close"]');
  var playerScrub = document.querySelector('[data-role="player-scrub"]');
  var playerTime = document.querySelector('[data-role="player-time"]');
  var playerMax = document.querySelector('[data-role="player-max"]');
  var siteMapCover = document.querySelector('[data-role="site-map-cover"]');

  var hasTouch = ('ontouchstart' in window) || (('DocumentTouch' in window) && document instanceof window.DocumentTouch);
  var touchdown = hasTouch ? 'ontouchstart' : 'onmousedown';
  var touchoff = hasTouch ? 'ontouchend' : 'onmouseup';

  if (document.fullscreenEnabled || 
    document.webkitFullscreenEnabled || 
    document.msFullscreenEnabled ||
    document.mozFullScreenEnabled) {
    playerMax.style.display = "block";
  }

  function showHTML5Controls(){
    if(hasTouch){
      video.setAttribute('controls', true);
      playerControls.style.display = "none";

    }
  }

  function showOverlay(show){
    if(show){
      overlay.setAttribute('aria-hidden', 'false');
      overlayIcon.setAttribute('aria-hidden', 'false');
    }

    else {
      overlay.setAttribute('aria-hidden', 'true');
      overlayIcon.setAttribute('aria-hidden', 'true');
    }
  }

  function showPlaying(show){
    if(show){
      playButton.setAttribute('data-playing', true);
      playButton.querySelectorAll('svg')[0].setAttribute('aria-hidden', true);
      playButton.querySelectorAll('svg')[1].setAttribute('aria-hidden', false);
    }

    else {
      playButton.setAttribute('data-playing', false);
      playButton.querySelectorAll('svg')[1].setAttribute('aria-hidden', true);
      playButton.querySelectorAll('svg')[0].setAttribute('aria-hidden', false);
    }
  }

  function closeVideo(){
    showOverlay(true);
    vide.pause();
    showPlay(true);
  }

  // add click action
 function playButtonClick(){

    if(!video.paused){
      video.pause();
      showPlaying(false);
      showOverlay(false);
    }
    else {
      video.play();
      showPlaying(true);
      showOverlay(false);
    }
  }

  playButton.onclick = playButtonClick;
  overlay.onclick = playButtonClick;
  video.onclick = playButtonClick;

  closePlayerButton.onclick = function(){
    video.pause();
    showOverlay(true);
    showPlaying(false);
  };

  playerMax.onclick = function() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  };


  playerScrub.oninput = function(){
    
    // Calculate the new time
    var time = video.duration * (this.value / 100);

    // Update the video time
    video.currentTime = time;
  };

  playerScrub[touchdown] = function(){

    if(!video.paused){
      video.setAttribute('was-playing', true);
    }
    video.pause();
  };

  playerScrub[touchoff] = function(){
    if(video.getAttribute('was-playing')){
      video.play();
      video.removeAttribute('was-playing');
    }
  };

  video.ontimeupdate = function() {
    // calculate the slider value
    var value = (100 / video.duration) * video.currentTime;

    // update the slider value
    playerScrub.value = value;

    // update time
    playerTime.textContent = "Day " + Math.max(1, Math.ceil(video.currentTime));
  };

  video.onended = function(){
    //playerScrub.value = 0;
    showPlaying(false);
  };

  siteMapCover.onclick = function(){
    this.style.pointerEvents = 'none';
  };

  siteMapCover.parentNode.onmouseleave = function(){
    this.querySelector('div').style.pointerEvents = 'auto';
  };

  showHTML5Controls();



})();