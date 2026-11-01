(() => {
const audio = document.getElementById('site-bgm');
const button = document.getElementById('music-toggle');
if (!audio || !button) return;
let enabled = true, frame = 0, generation = 0, blocked = false;
try { enabled = localStorage.getItem('portfolio-music') !== 'off'; } catch {}
const videos = [...document.querySelectorAll('video')];
const videoPlaying = () => videos.some(v => !v.paused && !v.ended);
const label = button.querySelector('span');
function draw() {
 label.textContent = !enabled ? '音樂：關' : blocked ? '開啟音樂' : videoPlaying() ? '音樂：暫停' : '音樂：開';
 button.setAttribute('aria-pressed', String(enabled && !blocked));
 button.title = 'Reverie · Scott Buckley';
}
function stop() { generation++; cancelAnimationFrame(frame); audio.pause(); audio.volume = 0; }
async function start() {
 if (!enabled || videoPlaying() || document.hidden) return;
 const token = ++generation;
 cancelAnimationFrame(frame); audio.volume = 0;
 try {
  await audio.play();
  if (token !== generation) return;
  blocked = false; draw();
  const began = performance.now();
  function fade(now) {
   if (token !== generation) return;
   audio.volume = .15 * Math.min(1, (now - began) / 1800);
   if (now - began < 1800) frame = requestAnimationFrame(fade);
  }
  frame = requestAnimationFrame(fade);
 } catch { if (token === generation) { blocked = true; draw(); } }
}
button.addEventListener('click', () => {
 enabled = blocked || !enabled; blocked = false;
 try { localStorage.setItem('portfolio-music', enabled ? 'on' : 'off'); } catch {}
 if (enabled) start(); else stop();
 draw();
});
videos.forEach(video => {
 video.addEventListener('play', () => { stop(); draw(); });
 ['pause','ended'].forEach(event => video.addEventListener(event, () => { if (!videoPlaying()) start(); draw(); }));
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
window.addEventListener('pagehide', stop);
audio.addEventListener('error', () => { stop(); blocked = true; draw(); label.textContent = '音樂載入失敗・重試'; });
draw(); if (enabled) start();
})();