const conf = require('../conf/config.json');
const confSaver = require("../conf");

exports.run = (client, message, args) => {
    var current = conf.wakeChannels.find((element) => {
        return element.serverId == message.guild.id;
    });

    if(current){
        current.channelId = message.channel.id;
    }
    else{
        conf.wakeChannels.push({"serverId": message.channel.guild.id, "channelId": message.channel.id});
    }

    confSaver.save(conf, "./conf/config.json");
}