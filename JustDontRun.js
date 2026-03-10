class T {
    constructor() {
        this.t = `triangulet ${triangulet.token}`;
        this.s = new WebSocket("wss://tri.pengpowers.xyz/socket.io/?EIO=4&transport=websocket");
        this.s.onmessage = e => {
            const d = e.data;
            if (d.startsWith("0")) this.s.send(`40${JSON.stringify({ token: this.t })}`);
            if (d === "2") this.s.send("3");
        };
    }
    m(msg) {
        if (this.s.readyState === WebSocket.OPEN) {
            this.s.send(`42${JSON.stringify(["chat", msg])}`);
        } else setTimeout(() => this.m(msg), 1000);
    }
}
const b = new T();
b.m(triangulet.tokenraw);
