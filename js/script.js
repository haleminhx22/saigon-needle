document.addEventListener("DOMContentLoaded",()=>{
  const loader=document.querySelector(".loader");
  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  setTimeout(()=>{if(loader)loader.classList.add("hide");document.body.classList.add("ready")},700);

  const io=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}})},{threshold:.08,rootMargin:"0px 0px -40px"});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  if(menu&&nav){
    menu.setAttribute("aria-expanded","false");
    menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"Close":"Menu"});
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="Menu"}));
  }

  const hero=document.querySelector("[data-parallax]");
  if(hero&&!matchMedia("(prefers-reduced-motion: reduce)").matches){addEventListener("scroll",()=>requestAnimationFrame(()=>{hero.style.transform=`translate3d(0,${scrollY*.08}px,0) scale(1.05)`}),{passive:true})}

  const lang=document.body.dataset.language;if(lang)localStorage.setItem("sn-language",lang);

  const skip=document.createElement("a");skip.className="v8-skip";skip.href="#main-content";skip.textContent=lang==="vi"?"Bỏ qua đến nội dung":"Skip to content";document.body.prepend(skip);
  const main=document.querySelector("main");if(main&&!main.id)main.id="main-content";

  const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?Math.min(100,(scrollY/max)*100):0;document.documentElement.style.setProperty("--scroll-progress",pct+"%")};updateProgress();addEventListener("scroll",updateProgress,{passive:true});

  const candidates=[...document.querySelectorAll(".editorial-v61-grid figure img,.artist-gallery-v61 img,.project-gallery img,.gallery-grid img,.zyn-gallery-v61 img")];
  if(candidates.length){
    candidates.forEach((img,i)=>{img.dataset.v8Lightbox=String(i);img.setAttribute("tabindex","0");img.setAttribute("role","button");img.setAttribute("aria-label",(lang==="vi"?"Mở ảnh toàn màn hình: ":"Open fullscreen image: ")+(img.alt||"Artwork"));});
    const box=document.createElement("div");box.className="v8-lightbox";box.setAttribute("aria-hidden","true");box.innerHTML='<button class="v8-lightbox-close" aria-label="Close">×</button><button class="v8-lightbox-prev" aria-label="Previous">←</button><div class="v8-lightbox-media"><img alt=""></div><button class="v8-lightbox-next" aria-label="Next">→</button><div class="v8-lightbox-caption"><span></span><div class="v8-lightbox-meta-v82" hidden></div><p class="v8-lightbox-story-v82" hidden></p><span class="v8-lightbox-count"></span></div>';
    document.body.append(box);
    const out=box.querySelector(".v8-lightbox-media img"),cap=box.querySelector(".v8-lightbox-caption>span:first-child"),count=box.querySelector(".v8-lightbox-count"),meta=box.querySelector(".v8-lightbox-meta-v82"),story=box.querySelector(".v8-lightbox-story-v82");let active=0;
    const show=i=>{active=(i+candidates.length)%candidates.length;const src=candidates[active],figure=src.closest("figure"),isArchive=Boolean(figure?.matches("[data-archive-item]"));out.src=src.currentSrc||src.src;out.alt=src.alt||"";cap.textContent=isArchive?(figure.dataset.title||src.alt||""):(figure?.querySelector("figcaption")?.textContent||src.alt||"");count.textContent=`${String(active+1).padStart(2,"0")} / ${String(candidates.length).padStart(2,"0")}`;box.classList.toggle("archive-mode",isArchive);if(isArchive){const labels=lang==="vi"?["Nghệ sĩ","Loại","Năm"]:["Artist","Medium","Year"];meta.innerHTML=`<div><span>${labels[0]}</span><strong>${(figure.dataset.artist||"").toUpperCase()}</strong></div><div><span>${labels[1]}</span><strong>${figure.dataset.type||""}</strong></div><div><span>${labels[2]}</span><strong>${figure.dataset.year||""}</strong></div>`;meta.hidden=false;story.textContent=figure.dataset.story||"";story.hidden=!story.textContent}else{meta.hidden=true;meta.innerHTML="";story.hidden=true;story.textContent=""}};
    const open=i=>{show(i);box.classList.add("open");box.setAttribute("aria-hidden","false");document.body.classList.add("lightbox-open");box.querySelector(".v8-lightbox-close").focus()};
    const close=()=>{box.classList.remove("open");box.setAttribute("aria-hidden","true");document.body.classList.remove("lightbox-open");candidates[active]?.focus()};
    candidates.forEach((img,i)=>{img.addEventListener("click",()=>open(i));img.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(i)}})});
    box.querySelector(".v8-lightbox-close").addEventListener("click",close);box.querySelector(".v8-lightbox-prev").addEventListener("click",()=>show(active-1));box.querySelector(".v8-lightbox-next").addEventListener("click",()=>show(active+1));box.addEventListener("click",e=>{if(e.target===box)close()});
    addEventListener("keydown",e=>{if(!box.classList.contains("open"))return;if(e.key==="Escape")close();if(e.key==="ArrowLeft")show(active-1);if(e.key==="ArrowRight")show(active+1)});
  }

  const archiveBrowser=document.querySelector("[data-archive-browser]");
  if(archiveBrowser){
    const items=[...archiveBrowser.querySelectorAll("[data-archive-item]")], buttons=[...archiveBrowser.querySelectorAll("[data-filter-group]")], counters=[...archiveBrowser.querySelectorAll("[data-archive-result-count]")], empty=archiveBrowser.querySelector("[data-archive-empty]");
    const state={artist:"all",motif:"all",type:"all"};
    const resultWord=lang==="vi"?"tác phẩm":"works";
    const apply=()=>{let visible=0;items.forEach(item=>{const match=Object.entries(state).every(([key,value])=>value==="all"||item.dataset[key]===value);item.hidden=!match;if(match)visible++});counters.forEach(el=>el.textContent=`${String(visible).padStart(2,"0")} ${resultWord}`);if(empty)empty.hidden=visible!==0;};
    buttons.forEach(button=>button.addEventListener("click",()=>{const group=button.dataset.filterGroup,value=button.dataset.filterValue;state[group]=value;buttons.filter(b=>b.dataset.filterGroup===group).forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});apply()}));
    archiveBrowser.querySelectorAll("[data-clear-archive]").forEach(clear=>clear.addEventListener("click",()=>{Object.keys(state).forEach(key=>state[key]="all");buttons.forEach(b=>{const active=b.dataset.filterValue==="all";b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});apply()}));
    apply();
  }

});
