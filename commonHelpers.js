import{S as b,i as n,a as v}from"./assets/vendor-527658dd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u=document.querySelector(".search-form"),p=document.querySelector(".gallery"),c=document.querySelector(".load-more");u.addEventListener("submit",L);u.addEventListener("input",S);c.addEventListener("click",P);let d,l=1;const f=new b(".gallery a",{captionsData:"alt",captionDelay:250});async function L(o){if(o.preventDefault(),p.innerHTML="",c.style.visibility="hidden",d=o.target.elements.searchQuery.value.trim(),!d)return n.error({title:"Error",message:"Please type your search image",position:"topRight",timeout:3e3});const r=await m(d),{hits:s,totalHits:i}=r.data;if(s.length===0)return n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:2e3});n.success({title:"OK",message:`Hooray! We found ${i} images.`,position:"topRight",timeout:2e3}),h(s),f.refresh(),i>40?c.style.visibility="visible":n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3}),l=1}async function m(o,r=1){const s="https://pixabay.com/api/?",i="42224356-31537d6cd2f97832aeb8b3ce8",e=o,t=new URLSearchParams({key:i,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40});return await v.get(`${s}${t}`)}function h(o){const r=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:t,views:a,comments:y,downloads:g})=>`<a href="${i}"><div class="photo-card">
    <img class="small-picture" src="${s}" alt="${e}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <b>${t}</b>
        </p>
            <p class="info-item">
            <b>Views</b>
            <b>${a}</b>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <b>${y}</b>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <b>${g}</b>
        </p>
    </div>
</div></a>
    `).join("");p.insertAdjacentHTML("beforeend",r)}async function P(){l+=1;const o=u.elements.searchQuery.value,r=await m(o,l),{hits:s,totalHits:i}=r.data;h(s),f.refresh();const e=Math.ceil(i/40);l===e&&(c.style.visibility="hidden",u.reset(),n.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3}))}function S(){p.innerHTML="",c.style.visibility="hidden"}
//# sourceMappingURL=commonHelpers.js.map
