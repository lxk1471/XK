(() => {
 const header = document.querySelector('header');
 const links = [...document.querySelectorAll('nav[aria-label="內容索引"] a')];
 const sections = links.map(link => ({link, section: document.getElementById(link.hash.slice(1))})).filter(item => item.section);
 if (!header || !sections.length) return;
 let frame = 0;
 function update() {
  frame = 0;
  const height = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--nav', `${height}px`);
  let current = null;
  const readingLine = height + Math.min(180, (window.innerHeight - height) * .3);
  for (const item of sections) {
   if (item.section.getBoundingClientRect().top <= readingLine) current = item;
  }
  for (const item of sections) {
   const active = item === current;
   item.link.classList.toggle('is-current', active);
   if (active) item.link.setAttribute('aria-current','location');
   else item.link.removeAttribute('aria-current');
  }
 }
 function schedule() { if (!frame) frame = requestAnimationFrame(update); }
 window.addEventListener('scroll', schedule, {passive:true});
 window.addEventListener('resize', schedule, {passive:true});
 window.addEventListener('hashchange', schedule);
 if (window.ResizeObserver) new ResizeObserver(schedule).observe(header);
 if (document.fonts) document.fonts.ready.then(schedule);
 window.addEventListener("pageshow", schedule);
 window.addEventListener('load', schedule);
 update();
})();