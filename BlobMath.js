!function() {
    const e = document.createElement("link");
    e.rel = "stylesheet", e.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css", document.head.appendChild(e);
    const t = document.createElement("style");
    t.innerHTML = `
        #Blob-Dash { position: fixed; top: 20px; right: 20px; width: 350px; background: #0d0417; color: white; border: 2px solid #a335ee; border-radius: 12px; font-family: 'Segoe UI', sans-serif; z-index: 9999; padding: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.7); user-select: none; }
        .calc-inp { background:#0f051c; border:1px solid #a335ee; color:#fff; font-size:11px; width:100%; border-radius:3px; padding:5px; margin-bottom:10px; outline:none; }
        .calc-btn { background:#a335ee; color:#fff; border:none; width:100%; font-size:12px; padding:10px; border-radius:3px; font-weight:bold; cursor:pointer; transition: 0.3s; }
        .calc-btn:hover { background:#bc66f5; box-shadow: 0 0 10px #a335ee; }
        .res-area { margin-top:15px; background:rgba(0,0,0,0.4); padding:10px; border-radius:5px; border:1px solid rgba(163,53,238,0.3); font-size:12px; line-height:1.6; }
        .stat-row { display:flex; justify-content:space-between; margin-bottom:4px; }
        .profit { color: #00ff88; }
        .loss { color: #ff4444; }
    `, document.head.appendChild(t);

    const gui = document.createElement("div");
    gui.id = "Blob-Dash";
    gui.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #a335ee; padding-bottom:5px;">
            <span style="font-weight:bold; color:#a335ee;"><i class="fas fa-calculator"></i> BLOB MATH</span>
            <i id="close-gui" class="fas fa-times" style="cursor:pointer; color:#ff4444;"></i>
        </div>
        <label style="font-size:10px; color:#aaa;">SELECT CAPSULE:</label>
        <select id="cap-sel" class="calc-inp"><option>Loading Data...</option></select>
        <button id="run-math" class="calc-btn">CALCULATE STATS</button>
        <div id="res-display" class="res-area">Waiting for selection...</div>
    `;
    document.body.appendChild(gui);

    let data = null;
    fetch("/data/trians").then(r => r.json()).then(r => {
        data = r;
        const sel = gui.querySelector("#cap-sel");
        sel.innerHTML = "";
        r.ValuesnCapsules.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.name;
            opt.innerText = c.name;
            sel.appendChild(opt);
        });
    });

    gui.querySelector("#run-math").onclick = () => {
        if (!data) return;
        const cap = data.ValuesnCapsules.find(c => c.name === gui.querySelector("#cap-sel").value);
        const mythic = cap.trians.reduce((p, c) => (p.sell > c.sell) ? p : c);
        
        const chance = parseFloat(mythic.chance) / 100;
        const avgOpens = Math.ceil(1 / chance);
        const openPrice = avgOpens * cap.value;
        const netPrice = mythic.sell - openPrice;
        const statusClass = netPrice >= 0 ? "profit" : "loss";

        gui.querySelector("#res-display").innerHTML = `
            <div style="text-align:center; color:#d199ff; font-weight:bold; margin-bottom:8px;">${mythic.name}</div>
            <div class="stat-row"><span>Average Opens:</span><b>${avgOpens.toLocaleString()}</b></div>
            <div class="stat-row"><span>Open Price:</span><b>${openPrice.toLocaleString()}</b></div>
            <div class="stat-row" style="border-top:1px solid #333; margin-top:5px; padding-top:5px;">
                <span>Net Price:</span>
                <b class="${statusClass}">${netPrice.toLocaleString()}</b>
            </div>
            <div style="font-size:9px; text-align:center; margin-top:5px; opacity:0.6;">
                Based on ${mythic.chance}% Drop Rate
            </div>
        `;
    };

    gui.querySelector("#close-gui").onclick = () => gui.remove();

    let drag = false, offs = [0, 0];
    gui.onmousedown = (e) => { if(e.target.tagName !== "SELECT") { drag = true; offs = [gui.offsetLeft - e.clientX, gui.offsetTop - e.clientY]; }};
    document.onmousemove = (e) => { if(drag) { gui.style.left = (e.clientX + offs[0]) + "px"; gui.style.top = (e.clientY + offs[1]) + "px"; }};
    document.onmouseup = () => drag = false;
}();
