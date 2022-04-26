const WebSocket = require('websocket').client;
const ws = new WebSocket();

module.exports = class{
    constructor(name){
        this.name = name;
    }
    send = function(text){
        ws.once('connect',function(f){
            f.sendUTF(JSON.stringify({
                name:this.name,
                msg:text
            }));
        })
    }
    connect = function(){
        ws.connect("ws://104.192.2.35:1999");
        ws.once('connect',function(f){
            f.sendUTF(JSON.stringify({
                name:this.name,
                msg:"joined :D"
            }));
        })
    }
    onMsg = function(callback){
        ws.once('connect',function(f){
            f.on('message',function(msg){
                try {
                    cmd = JSON.parse(msg);
                } catch (e) {
                    return;
                }
                callback(cmd.msg,cmd.name);
            })
        })
    }
}