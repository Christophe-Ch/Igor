var colors = require('../conf/colors.json');
var conf = require('../conf/config.json');

exports.run = (client, message, args) => {

    const content = {
        color: parseInt(colors.info, 16),
        title: ":sparkles: __Add me to your server !__",
        url: "https://discordapp.com/oauth2/authorize?client_id=484450144679362590&scope=bot",
        description: "Wanna know some things about me?\nThere you go!",
        fields: [
            {
                name: "\u200b",
                value: "__**Everything you wanna know about me!**__"
            },
            {
                name: ":baby: My name is Igor...",
                value: "... and my creator is [Christophe CHICHMANIAN](https://www.christophech.com) (aka Hyxotis)!"
              },
              {
                name: ":wrench: Why do I exist?",
                value: "I have some basic (and generic) commands but maybe one day I'll have my own special purpose!"
              },
              {
                name: "\u200b",
                value: "__**:computer: How to use me?**__"
              },
              {
                name: "```" + conf.prefix + "-<command>```",
                value: "If you want to know what commands you can use, just type... ```" + conf.prefix + "-commands```"
              }
        ],
        footer: {
            "text": "Igor - ⓒ 2018 | Made with 💛 & Javascript"
        }
    };

    message.channel.send({embed: content});

}