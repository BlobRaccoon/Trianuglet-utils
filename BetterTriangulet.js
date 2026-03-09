// ==UserScript==
// @name         Better triangulet
// @namespace    SixPackNinja & Blob_raccoon
// @match        https://tri.pengpowers.xyz/posts
// @run-at       document-start
// @grant        none
// @description  Beta version to fix posts (Userscript can be used with tampermonkey and other userscript injectors)
// @version      1.6
// ==/UserScript==
!function(){"use strict";window.printres=function(e){let t=Object.entries(e.posts);t.length>100&&(t=t.slice(-100));const n=e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");for(let e=t.length-1;e>=0;e--){const s=t[e][1],i=t[e][0];fetch("/api/finduser",{method:"POST",headers:{Accept:"application/json",authorization:triangulet.tokenraw,"Content-Type":"application/json"},body:JSON.stringify({id:`${s.user}`})}).then((e=>e.json())).then((t=>{let o=s.likes.includes(triangulet.userdata.id)?"red":"white",l=s.likes.length;const a=s.title.includes("<"),c=s.body.includes("<"),r=document.createElement("div");r.style.color="#fff",r.classList.add("postbackground"),r.id=i,r.innerHTML=`\n                    <h1>${a?"":n(s.title)}</h1>\n                    <text class="usertextpost">Author:\n                        <a style="color:#CAE4F1" href="/stats?id=${n(s.user)}">${n(t.username)}</a>\n                    </text><br>\n                    <i id="${i}1" style="color: ${o};font-size:25px" onclick="like('${i}')" class="fas fa-heart"></i>\n                    <text class="${i}" style="font-size:25px"> ${l}</text>\n                    <p>${c?"":n(s.body)}</p>\n                `;let d=document.getElementsByClassName("explaination");d[0]&&d[0].appendChild(r),0===e&&"function"==typeof stopLoading&&stopLoading()}))}};setInterval((()=>{const e=document.getElementById("loading");e&&e.remove()}),100)}();
