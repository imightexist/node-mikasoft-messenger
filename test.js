const msg = require('./index.js');
const bot = new msg();

bot.connect('muffin');
bot.send('test');
bot.send('test');
bot.onMsg(function(msg){
    console.log(msg)
});