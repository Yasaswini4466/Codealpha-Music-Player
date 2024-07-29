document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const trackImage = document.getElementById('track-image');
    const trackName = document.getElementById('track-name');
    const artistName = document.getElementById('artist-name');
    const movieName = document.getElementById('movie-name');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const songList = document.getElementById('song-list');
    let songIndex = 0;
    const songs = Array.from(songList.getElementsByTagName('li'));
    function loadSong(index) {
        const song = songs[index];
        const src = song.getAttribute('data-src');
        const img = song.getAttribute('data-img');
        const [name, artist] = song.textContent.split(' - ');
        audio.src = src;
        trackImage.src = img;
        trackName.textContent = name || 'Track Name';
        artistName.textContent = artist || 'Artist Name';
        movieName.textContent = ''; 
        audio.play();
        playPauseBtn.innerHTML = '&#10074;&#10074;'; 
    }
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '&#10074;&#10074;'; 
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '&#9654;'; 
        }
    }
    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex);
    }
    function prevSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
    }
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    });
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });
    songList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            songIndex = songs.indexOf(e.target);
            loadSong(songIndex);
        }
    });
    loadSong(songIndex);
});
