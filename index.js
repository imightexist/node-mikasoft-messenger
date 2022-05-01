const WebSocket = require('websocket').client;
const ws = new WebSocket();

module.exports = class {
    constructor() {
        //this.name = name;
        this.f = "how else do i declare a variable???";
    }
    send = function (text) {
        ws.once('connect', function (f) {
            f.sendUTF(JSON.stringify({
                name: this.f,
                msg: text
            }));
        })
    }
    connect = function (n) {
        ws.connect("ws://104.192.2.35:1999");
        ws.once('connect', function (cool) {
            cool.sendUTF(JSON.stringify({
                msg: "joined :D",
                name: n
            }));
            this.f = n;
        })
    }
    onMsg = function (callback) {
        
        ws.once('connect',function(f){
            f.on('message',function(msg){
                //console.log(msg.utf8Data);
                /*
                try {
                    cmd = JSON.parse(msg.utf8Data);
                    console.log(cmd);
                } catch (e) {
                    //console.log(e);
                    return;
                }
                */
                if (!(msg.utf8Data.startsWith("user "))){
                    let cmd = JSON.parse(msg.utf8Data);
                    callback(cmd.msg,cmd.name);
                }
            })
        })
        
       /*
        this.f.on('message', function (msg) {
            try {
                cmd = JSON.parse(msg);
            } catch (e) {
                return;
            }
            callback(cmd.msg, cmd.name);
        })
        */
    }
}