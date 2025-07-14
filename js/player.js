  const btn   = document.getElementById('musicToggle');
  const audio = document.getElementById('player');

  let playlist = [];
  let current  = 0;

  /* Load playlist.json */
  fetch('/js/playlist.json')
    .then(res => res.json())
    .then(data => {
      playlist = data;
      if (playlist.length) {
        audio.src  = playlist[0];        // preload first track
        btn.removeAttribute('disabled'); // enable button
      }
    })
    .catch(err => console.error('Playlist load error:', err));

  /* play current track helper */
  function playTrack(i) {
    current           = i % playlist.length;
    audio.src         = playlist[current];
    audio.currentTime = 0;
    audio.play();
  }

  /* Button click: toggle play / pause & rewind */
  btn.addEventListener('click', () => {
    if (!playlist.length) return;        // safety
    if (audio.paused) {
      playTrack(current);
    } else {
      audio.pause();
      current++;
      audio.currentTime = 0;
    }
  });

  /* Auto‑advance when a track ends */
  audio.addEventListener('ended', () => {
    if (playlist.length)
      playTrack(current + 1);
  });
