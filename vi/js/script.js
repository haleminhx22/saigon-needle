document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.querySelector(".loader");
  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  setTimeout(()=>{loader.classList.add("hide");document.body.classList.add("ready")},1500);

  const io=new IntersectionObserver((entries,obs)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})
  },{threshold:.1,rootMargin:"0px 0px -60px"});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  menu.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const hero=document.querySelector("[data-parallax]");
  if(hero&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    addEventListener("scroll",()=>requestAnimationFrame(()=>{
      hero.style.transform=`translate3d(0,${scrollY*.08}px,0) scale(1.05)`;
    }),{passive:true});
  }
});
localStorage.setItem('sn-language','vi');
