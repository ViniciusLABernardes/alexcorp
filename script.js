function getCookie(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),a=0;a<n.length;a++){for(var o=n[a];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""}function isMobileVersion(){return window.innerWidth<=1024}function updateTopRightDisplay(){var e=document.getElementById("topRight"),t=document.getElementById("topRightMobile"),n=document.getElementById("topRightLogedPc"),a=document.getElementById("topRightLogedMobile"),o=getCookie("userLoggedIn"),s=isMobileVersion();"true"===o?(e.style.display="none",t.style.display="none",n.style.display=s?"none":"flex",a.style.display=s?"flex":"none"):(e.style.display=s?"none":"flex",t.style.display=s?"flex":"none",n.style.display="none",a.style.display="none")}function logout(){document.cookie="userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",document.cookie="username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",showLoadingModal(),setTimeout((function(){window.location.href="index.html"}),2e3)}window.addEventListener("resize",updateTopRightDisplay),document.addEventListener("DOMContentLoaded",(function(){updateTopRightDisplay();var e=document.body.classList.contains("index-page"),t=getCookie("userLoggedIn");if(e||"true"===t){if("true"===t){var n=getCookie("username");document.querySelector(".nickname").textContent=n;var a=document.querySelector(".nickname2");a&&(a.textContent=n);var o=document.querySelector(".nickname3");o&&(o.textContent=n);var s=document.querySelector(".nicknameForum");s&&(s.textContent=n),document.querySelector(".buttonOut").addEventListener("click",(function(){logout()})),document.querySelector(".resources .options .buttonOut").addEventListener("click",(function(){logout()})),carregarHistoricoMensagens(n)}}else showModalWithVideo("Entre no site oficial para desfrutar de todas as funcionalidades.","Visite o site oficial","https://seusiteoficial.com")})),document.addEventListener("DOMContentLoaded",(function(){showModal2("Esta versão é apenas uma amostra, entre no site oficial para desfrutar de todas as funcionalidades:","assets/images/demo.mp4","Alexcorp","https://seusiteoficial.com")}));let lastScrollPosition=0;const header=document.getElementById("header-site"),currentPage=window.location.pathname,pagesWithVisibleHeader=["/login.html","/cadastro.html","/perfil.html"],isPageWithVisibleHeader=pagesWithVisibleHeader.includes(currentPage);function showLoadingModal(){document.getElementById("loading-modal").style.display="block"}function hideLoadingModal(){document.getElementById("loading-modal").style.display="none"}function showModal(e){const t=document.getElementById("modal");document.getElementById("modal-text").textContent=e,t.style.display="block",window.onclick=function(e){var t=document.getElementById("modal");e.target===t&&(t.style.display="none")};document.getElementById("modal-close").onclick=function(){t.style.display="none"}}function showModal2(e,t,n,a){const o=document.getElementById("modal2"),s=document.getElementById("modal-text2"),c=document.getElementById("video-container2"),i=document.getElementById("link-container2");c.innerHTML="",i.innerHTML="";const r=document.createElement("p");if(r.textContent=e,s.appendChild(r),t){const e=document.createElement("video");e.style.width="80%",e.controls=!0,e.src=t,c.appendChild(e)}if(n&&a){const e=document.createElement("a");e.style.color="#fff",e.textContent=n,e.href=a,i.appendChild(e)}o.style.display="block",window.onclick=function(e){e.target===o&&(o.style.display="none")};document.getElementById("modal-close2").onclick=function(){o.style.display="none"}}isPageWithVisibleHeader||window.addEventListener("scroll",(()=>{const e=window.pageYOffset;e>lastScrollPosition?header.classList.add("header-hidden"):header.classList.remove("header-hidden"),lastScrollPosition=e}));var cards=document.querySelectorAll(".card");cards.forEach((function(e){e.classList.remove("active")})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".card");e.forEach((function(t){t.addEventListener("click",(function(){t.classList.add("active"),e.forEach((function(e){e!==t&&e.classList.remove("active")}))}))}))})),document.addEventListener("click",(function(e){var t=document.querySelector(".card.active");t&&!t.contains(e.target)&&t.classList.remove("active")}));const baki=document.querySelector(".bakiFirst"),scrollTrigger=document.querySelector(".scroll-trigger"),triggerHeight=0;window.addEventListener("scroll",(()=>{if(isMobileVersion())baki.classList.remove("active");else{const e=window.scrollY;e>=scrollTrigger.offsetTop-window.innerHeight+0&&e?baki.classList.add("active"):baki.classList.remove("active")}}));const yujiro=document.querySelector(".yujiro"),yujiro2=document.querySelector(".yujiro2"),scrollTrigger2=document.querySelector(".scroll-trigger2"),triggerHeight2=20;function updateVisibility(){isMobileVersion()?(yujiro.style.display="none",yujiro2.style.display="block"):(yujiro.style.display="block",yujiro2.style.display="none"),loadImagesBasedOnVisibility()}function loadImagesBasedOnVisibility(){document.querySelectorAll(".characterImage[data-src]").forEach((e=>{isElementInViewport(e)&&(e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src"))}))}function isElementInViewport(e){const t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}window.addEventListener("resize",updateVisibility),window.addEventListener("load",(()=>{updateVisibility(),window.addEventListener("scroll",(()=>{if(isMobileVersion())yujiro.classList.remove("active2");else{window.scrollY>=scrollTrigger2.offsetTop-window.innerHeight+20?yujiro.classList.add("active2"):yujiro.classList.remove("active2")}loadImagesBasedOnVisibility()}))}));const character3=document.querySelector(".character3"),scrollTrigger3=document.querySelector(".scroll-trigger3"),triggerHeight3=20;function chooseRandomCharacters(e){const t=["baki hanma","bleach","demon slayer","hunter x hunter","naruto","one punch man","tokyo ghoul"];for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}const n=[];for(const a of t){const t=e[a].characters;if(t&&t.length>0){const e=t[Math.floor(Math.random()*t.length)];n.push({anime:a,name:e.name,image:e.image})}}return n}function updatePageContent(e){const t=chooseRandomCharacters(e);for(let e=0;e<t.length;e++){const n=t[e],a=document.querySelector(`[data-character-section="character${e+1}"]`);if(a){const e=a.querySelector(".top"),t=a.querySelector(".bottom"),o=a.querySelector(".animeName"),s=a.querySelector(".characterImage"),c=a.querySelector(".yujiro2");e&&(e.textContent=n.name),t&&(t.textContent=n.name),o&&(o.innerHTML=`<span>Anime: </span><strong>${n.anime}</strong>`),s&&(s.src=n.image),c&&(c.src=n.image)}}}function carregarDestaqueAnime(){fetch("utils/destaqueAnime.json").then((e=>e.json())).then((e=>{const t=e[Math.floor(Math.random()*e.length)],n=document.getElementById("animeTitleSection").querySelector("h2");n.textContent=t.name,n.style.display="none";document.querySelector(".anime_logoHighlighted").src=t.logo;document.querySelector(".highlightedGif").src=t.gif;document.querySelector(".topiclinks").href="animePage.html?animeName="+encodeURIComponent(t.name)})).catch((e=>{}))}function getUrlParameter(e){e=e.replace(/[[]/,"\\[").replace(/[]]/,"\\]");var t=new RegExp("[?&]"+e+"=([^&#]*)").exec(window.location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))}window.addEventListener("scroll",(()=>{if(isMobileVersion())character3.classList.remove("active3");else{window.scrollY>=scrollTrigger3.offsetTop-window.innerHeight+20?character3.classList.add("active3"):character3.classList.remove("active3")}})),fetch("utils/animeData.json").then((e=>e.json())).then((e=>{updatePageContent(e)})).catch((e=>{})),carregarDestaqueAnime(),setInterval(carregarDestaqueAnime,864e5);var animeName=getUrlParameter("animeName");function loadAnimeData(e){fetch("utils/animeData.json").then((e=>e.json())).then((t=>{const n=t[e];if(n){document.getElementById("animeNameTop").textContent=e,document.getElementById("animeNameBottom").textContent=e,document.getElementById("charNameTop").textContent=n.characters[0].name,document.getElementById("charNameBottom").textContent=n.characters[0].name,document.getElementById("image1").src=n.characters[0].image,document.getElementById("firstGif").src=n.characters[0].gif,document.getElementById("strenght").textContent=n.characters[0].strenght,document.getElementById("speed").textContent=n.characters[0].speed,document.getElementById("skills").textContent=n.characters[0].skills,document.getElementById("charNameTop2").textContent=n.characters[1].name,document.getElementById("charNameBottom2").textContent=n.characters[1].name,document.getElementById("image2").src=n.characters[1].image,document.getElementById("secGif").src=n.characters[1].gif,document.getElementById("strenght2").textContent=n.characters[1].strenght,document.getElementById("speed2").textContent=n.characters[1].speed,document.getElementById("skills2").textContent=n.characters[1].skills,document.getElementById("charNameTop3").textContent=n.characters[2].name,document.getElementById("charNameBottom3").textContent=n.characters[2].name,document.getElementById("image3").src=n.characters[2].image,document.getElementById("thirdGif").src=n.characters[2].gif,document.getElementById("strenght3").textContent=n.characters[2].strenght,document.getElementById("speed3").textContent=n.characters[2].speed,document.getElementById("skills3").textContent=n.characters[2].skills;const t=n.characters[0].strenght,a=n.characters[0].speed;document.getElementById("strenght").style.width=`${t}%`;document.getElementById("speed").style.width=`${a}%`;const o=n.characters[1].strenght,s=n.characters[1].speed;document.getElementById("strenght2").style.width=`${o}%`;document.getElementById("speed2").style.width=`${s}%`;const c=n.characters[2].strenght,i=n.characters[2].speed;document.getElementById("strenght3").style.width=`${c}%`;document.getElementById("speed3").style.width=`${i}%`}}))}function carregarMensagens(e){fetch("api/mensagens.php?animeName="+e).then((e=>e.json())).then((e=>{const t=document.querySelector(".area-mensagens");t.innerHTML="",e.forEach((e=>{const n=criarMensagem(e);t.prepend(n)}))})).catch((e=>{}))}function criarMensagem(e){const t=document.createElement("div");t.className="nova-mensagem";const n=document.createElement("div");n.className="info-usuario";const a=document.createElement("img");a.src=e.user_profile_pic,a.alt="foto do usuario",n.appendChild(a);const o=document.createElement("div");o.className="nome-usuario",o.textContent=e.user_name,n.appendChild(o),t.appendChild(n);const s=document.createElement("div");s.className="mensagem-usuario",s.textContent=e.message_text,s.style.width="400px",s.style.whiteSpace="pre-line",t.appendChild(s);const c=document.createElement("div");c.className="curtir",c.setAttribute("data-message-id",e.Id);const i=document.createElement("div");i.className="curtir",i.setAttribute("data-message-id",e.Id),i.setAttribute("data-liked",getLikeState(e.Id)?"true":"false"),i.onclick=()=>curtirMensagem(i);const r=document.createElement("img");r.src=getLikeState(e.Id)?"assets/images/heartSelected.png":"assets/images/heart.png",r.alt="Curtir";const d=document.createElement("span");if(d.className="curtir-count",d.textContent=e.likes,i.appendChild(r),i.appendChild(d),c.appendChild(i),t.appendChild(c),e.user_name===getCookie("username")){const n=document.createElement("div");n.className="lixeira",n.setAttribute("data-message-id",e.Id),n.innerHTML=`<img src="assets/images/trash.png" alt="Excluir mensagem" data-message-id="${e.Id}" onclick="deletarMensagem(this)"/>`,t.appendChild(n)}if(e.created_at){const n=document.createElement("div");n.className="data-mensagem",n.textContent=e.created_at,t.appendChild(n)}return t}function deletarMensagem(e){const t=e.getAttribute("data-message-id");fetch(`api/mensagens.php?Id=${t}`,{method:"DELETE"}).then((e=>{e.ok&&(showModal("Mensagem excluída com sucesso!"),setTimeout((()=>{window.location.reload()}),1e3),carregarMensagens(userLoggedIn))})).catch((e=>{}))}function curtirMensagem(e){if("true"!==getCookie("userLoggedIn"))return void showModal2("Entre no site oficial para desfrutar de todas as funcionalidades:","assets/images/demo.mp4","Alexcorp","https://seusiteoficial.com");const t=e.getAttribute("data-message-id"),n=e.getAttribute("data-liked"),a=e.querySelector("img"),o=e.querySelector(".curtir-count");"false"===n?fetch(`api/historico.php?messageId=${t}`,{method:"PUT"}).then((n=>{n.ok&&(e.setAttribute("data-liked","true"),a.src="assets/images/heartSelected.png",o.textContent=parseInt(o.textContent)+1,saveLikeState(t,!0))})).catch((e=>{})):fetch(`api/historico.php?messageId=${t}`,{method:"DELETE"}).then((n=>{n.ok&&(e.setAttribute("data-liked","false"),a.src="assets/images/heart.png",o.textContent=parseInt(o.textContent)-1,saveLikeState(t,!1))})).catch((e=>{}))}function saveLikeState(e,t){const n=getCookie("username");n&&localStorage.setItem(`like_state_${n}_${e}`,t?"1":"0")}function getLikeState(e){const t=getCookie("username");if(t){return"1"===localStorage.getItem(`like_state_${t}_${e}`)}return!1}function carregarHistoricoMensagens(e){const t=document.querySelector(".area-mensagens-historico");t.innerHTML="",fetch(`api/historico.php?userName=${e}`,{method:"GET"}).then((e=>e.json())).then((e=>{e.forEach((e=>{const n=criarMensagem(e);t.appendChild(n)}))})).catch((e=>{}))}function carregarMensagensMaisCurtidas(e){fetch(`api/mensagensMaisCurtidas.php?animeName=${e}&mostLiked=true`).then((e=>e.json())).then((e=>{const t=document.querySelector(".area-mensagens-mais-curtidas");t.innerHTML="",e.forEach((e=>{const n=criarMensagem(e);t.appendChild(n)}))})).catch((e=>{}))}animeName&&(document.getElementById("animeNameTop").textContent=animeName,document.getElementById("animeNameBottom").textContent=animeName,loadAnimeData(animeName)),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".userMessageArea button"),t=document.querySelector(".userMessageArea .message"),n=document.querySelector(".nicknameForum"),a=document.querySelector("#animeNameTop").textContent,o=document.querySelector("#animeNameBottom").textContent;e.addEventListener("click",(function(e){e.preventDefault();if("true"===getCookie("userLoggedIn")){const e=document.querySelector(".userProfilePicForum").src,s=n.textContent,c=t.value,i=new FormData;i.append("animeName",a||o),i.append("nickname",s),i.append("message",c),i.append("userProfilePicForum",e),fetch("api/mensagens.php",{method:"POST",body:i}).then((e=>e.text())).then((e=>{showModal("Mensagem enviada com sucesso!"),t.value="",carregarMensagens(a||o)})).catch((e=>{}))}else showModal("Faça login para poder enviar mensagens.")})),carregarMensagens(a||o)})),document.addEventListener("DOMContentLoaded",(function(){carregarMensagensMaisCurtidas()}));