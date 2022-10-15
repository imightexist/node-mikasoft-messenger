const WebSocket = require('websocket').client;
const ws = new WebSocket();

module.exports = class {
    constructor() {
        //this.name = name;
        this.name = "how else do i declare a variable???";
        this.connected = false;
    }
    send = function (text) {
        ws.once('connect', function (f) {
            f.sendUTF(JSON.stringify({
                name: this.name,
                msg: text
            }));
        })
    }
    connect = function (n) {
        ws.connect("ws://collabhost.computernewb.com/mikasoft/chat/");
        ws.once('connect', function (cool) {
            cool.sendUTF(JSON.stringify({
                msg: "joined :D",
                name: n
            }));
            this.name = n;
            this.connected = true;
        })
        
    }
    onMsg = function (callback) {
        ws.once('connect',function(f){
            let name = this.name;
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
                let sendshit = function(text){
                    f.sendUTF(JSON.stringify({
                        name: name,
                        msg: text
                    }));
                }
                if (!(msg.utf8Data.startsWith("user "))){
                    let cmd = JSON.parse(msg.utf8Data);
                    callback(cmd.msg,cmd.name,sendshit);
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
