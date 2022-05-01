const msg = require('./index.js');
const bot = new msg();

bot.connect('name here');
bot.send('bot has started');
bot.onMsg(function(msg,sender,send){
  if (msg.startsWith('!say ')){
    console.log(msg.replaceAll('!say ',''));
    send(msg.replaceAll('!say ',''));
  }
  //console.log(msg);
});