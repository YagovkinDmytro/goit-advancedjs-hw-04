import{i as n,S as m,a as g}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const d=document.querySelector(".search-form"),f=document.querySelector(".gallery"),p=document.querySelector(".load-more");d.addEventListener("submit",b);p.addEventListener("click",v);let u,c=1;async function b(a){if(a.preventDefault(),u=a.target.elements.searchQuery.value.trim(),!u)return n.error({title:"Error",message:"Please type your search image",position:"topRight",timeout:3e3});const t=await y(u),o=t.hits;if(t.hits.length===0)return n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:2e3});n.success({title:"OK",message:`Hooray! We found ${t.totalHits} images.`,position:"topRight",timeout:2e3}),f.innerHTML=h(o),new m(".gallery a",{captionsData:"alt",captionDelay:250}),t.totalHits>40&&(p.style.visibility="visible"),c=1}async function y(a,t=1){const o="https://pixabay.com/api/?",i="42224356-31537d6cd2f97832aeb8b3ce8",e=a,r=new URLSearchParams({key:i,q:`${e}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40});return await g.get(`${o}${r}`).then(l=>l.data)}function h(a){return a.map(({webformatURL:t,largeImageURL:o,tags:i,likes:e,views:r,comments:s,downloads:l})=>`<a href="${o}"><div class="photo-card">
    <img class="small-picture" src="${t}" alt="${i}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <b>${e}</b>
        </p>
            <p class="info-item">
            <b>Views</b>
            <b>${r}</b>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <b>${s}</b>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <b>${l}</b>
        </p>
    </div>
</div></a>
    `).join("")}async function v(){c+=1;const a=d.elements.searchQuery.value,t=await y(a,c),o=t.hits;f.insertAdjacentHTML("beforeend",h(o)),new m(".gallery a",{captionsData:"alt",captionDelay:250});const i=Number(t.totalHits)/40;c>=i&&(p.style.visibility="hidden",d.reset(),n.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3}))}
//# sourceMappingURL=commonHelpers.js.map
