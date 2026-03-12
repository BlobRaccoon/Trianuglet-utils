/* * MIT License
 * Copyright (c) 2026 Blob_raccoon
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(async()=>{const C="Blob chat",E=(t)=>t?.toString().replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[m])||"";if(!document.querySelector('link[href*="font-awesome"]')){const f=document.createElement("link");f.rel="stylesheet";f.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";document.head.appendChild(f)}const g=document.createElement("div");g.style="position:fixed;top:100px;right:20px;width:340px;height:450px;background:#2b2d31;color:#fff;font-family:sans-serif;border-radius:12px;display:flex;flex-direction:column;z-index:2000001;box-shadow:0 10px 25px #000;border:1px solid #5865f2;overflow:hidden";const h=document.createElement("div");h.style="padding:12px;background:#1e1f22;font-weight:bold;font-size:14px;cursor:grab;display:flex;justify-content:space-between;align-items:center;user-select:none";h.innerHTML=`<span><i class="fas fa-ghost"></i> ${C}</span><i class="fas fa-times" id="bc-close" style="cursor:pointer;padding:5px"></i>`;const m=document.createElement("div");m.style="flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:12px;background:#313338";const i=document.createElement("input");i.placeholder="Message...";i.style="margin:10px;padding:10px;background:#404249;border:none;outline:none;color:#fff;border-radius:5px";g.append(h,m,i);document.body.appendChild(g);const btn=document.getElementById("bc-close");btn.onmousedown=(e)=>e.stopPropagation();btn.onclick=()=>g.remove();let x=0,y=0,x1=0,y1=0;h.onmousedown=(e)=>{if(e.target===btn)return;e.preventDefault();x1=e.clientX;y1=e.clientY;document.onmouseup=()=>{document.onmouseup=null;document.onmousemove=null};document.onmousemove=(e)=>{x=x1-e.clientX;y=y1-e.clientY;x1=e.clientX;y1=e.clientY;g.style.top=(g.offsetTop-y)+"px";g.style.left=(g.offsetLeft-x)+"px"}};const l=(u,t,p,r,s=false)=>{const d=document.createElement("div");d.style="display:flex;gap:8px";d.innerHTML=`<img src="${p}" width="35" height="35" style="border-radius:4px"><div style="flex:1"><div style="font-size:12px"><strong style="color:${s?'#5865f2':'#CAE4F1'}">${E(u)}</strong> <span style="color:#999;font-size:10px">[${E(r)}]</span></div><div style="color:#dcddde;font-size:13px;word-break:break-all">${E(t)}</div></div>`;m.appendChild(d);m.scrollTop=m.scrollHeight};const connect=()=>{if(typeof triangulet==='undefined'||!triangulet.tokenraw||!triangulet.userdata)return setTimeout(connect,500);const s=new WebSocket("wss://tri.pengpowers.xyz/socket.io/?EIO=4&transport=websocket");s.onmessage=(e)=>{const r=e.data;if(r==="2")return s.send("3");if(r.startsWith("0"))return s.send(`40${JSON.stringify({token:triangulet.tokenraw})}`);if(r.startsWith("42")){try{const[ev,da]=JSON.parse(r.slice(2));if(ev===C)l(da.user.username,da.message,da.user.pfp,da.user.role)}catch(err){console.error(err)}}};s.onclose=()=>setTimeout(connect,3000);i.onkeydown=(e)=>{if(e.key==="Enter"&&i.value.trim()){const u=triangulet.userdata;s.send(`42${JSON.stringify([C,{message:i.value.trim(),user:{username:u.username,pfp:u.pfp,role:u.role},time:Date.now()}])}`);l(u.username,i.value.trim(),u.pfp,u.role,true);i.value=""}}};connect()})();
