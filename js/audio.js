const TRACKS = ['assets/dereje.mp3', 'assets/dereje2.MP3'];

export function createAudio() {
  const audio = document.createElement('audio');
  audio.loop = true;
  audio.volume = 1.0;
  audio.crossOrigin = 'anonymous';

  function selectRandomTrack() {
    const path = TRACKS[Math.floor(Math.random() * TRACKS.length)];
    audio.src = path;
    return path;
  }

  function play() {
    return audio.play().catch(() => false);
  }

  function pause() {
    audio.pause();
  }

  function toggleMute() {
    audio.muted = !audio.muted;
    return audio.muted;
  }

  function isMuted() {
    return audio.muted;
  }

  function currentLabel() {
    return audio.src.includes('dereje2') ? 'Track 2' : 'Track 1';
  }

  selectRandomTrack();

  return {
    element: audio,
    selectRandomTrack,
    play,
    pause,
    toggleMute,
    isMuted,
    currentLabel,
    get src() {
      return audio.src;
    }
  };
}
