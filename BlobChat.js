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
(async()=>{const A="https://tri.pengpowers.xyz",S="wss://tri.pengpowers.xyz/socket.io/?EIO=4&transport=websocket";let t=localStorage.token||"";if(!t.startsWith("triangulet"))t="triangulet "+t;let u={};try{const r=await fetch(A+"/data/user",{headers:{authorization:t}});u=await r.json()}catch{}const g=document.createElement("div");g.style="position:fixed;bottom:0;right:0;width:360px;height:480px;background:#313338;color:#fff;font-family:gg sans,Segoe UI,Helvetica,Arial,sans-serif;border-radius:8px 0 0 0;display:flex;flex-direction:column;z-index:999999;box-shadow:0 0 20px rgba(0,0,0,.6)";const h=document.createElement("div");h.textContent="# dev-chat";h.style="padding:12px;background:#2b2d31;font-weight:600;border-bottom:1px solid #1e1f22";const m=document.createElement("div");m.style="flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;font-size:14px";const i=document.createElement("input");i.placeholder="Message #dev-chat";i.style="border:none;outline:none;padding:12px;background:#383a40;color:#fff;font-size:14px";g.appendChild(h);g.appendChild(m);g.appendChild(i);document.body.appendChild(g);const s=new WebSocket(S);function l(a,b){const d=document.createElement("div");d.style="display:flex;gap:6px;align-items:flex-start";const n=document.createElement("span");n.textContent=a;n.style="color:#949ba4;font-weight:500";const x=document.createElement("span");x.textContent=b;d.appendChild(n);d.appendChild(x);m.appendChild(d);m.scrollTop=m.scrollHeight}s.onmessage=e=>{const r=e.data;if(r==="2"){s.send("3");return}if(r.startsWith("0")){s.send("40"+JSON.stringify({token:t}));return}if(r.startsWith("50")){try{const p=JSON.parse(r.slice(2));if(p.type==="devchat")l(p.user,p.message)}catch{}}};i.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const v=i.value.trim();if(!v)return;const p={type:"devchat",message:v,user:u.username||"dev",id:u.id||0,time:Date.now()};s.send("50"+JSON.stringify(p));l("You",v);i.value=""})})();
