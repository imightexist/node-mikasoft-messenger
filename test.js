const msg = require('./index.js');
const bot = new msg("muffin");

bot.connect();
bot.send('test');
bot.onMsg(function(msg){
    console.log(msg)
})