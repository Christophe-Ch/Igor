const confSaver = require("./conf");

var colors = require('../../conf/colors.json')
var dbUtilities = require('../../conf/database.js');

// Changes the prefix that triggers the bot
exports.prefix = (message, conf) => {
    const arg = message.content.split(' ')[1];
    if(typeof arg !== "undefined" && arg.length <= 3 && arg.length > 0){
        conf.prefix = arg;
        conf.prefixlen = arg.length + 1;

        confSaver.save(conf, "./conf/config.json");

        message.channel.send({embed: {
            color: parseInt(colors.success, 16),
            description: "New prefix : " + arg
        }});
    }
}

// Adds a new granted user
exports.grant = async (message) => {
    var rank = message.content.split(' ')[2];
    if(!isNaN(rank) && parseInt(rank) < 3 && parseInt(rank) >= 0){
        
        await dbUtilities.execute("CALL setRank(" + message.mentions.users.first().id + ", " + message.guild.id + ", " + rank + ")");
            
        return message.channel.send({embed: {
            color: parseInt(colors.success, 16), 
            title: "Lil' promotion !",
            description: message.mentions.users.first().username + " promoted to rank " + rank + "! :tada:"
        }});
    }

    message.channel.send({embed: {
        color: parseInt(color.success, 16),
        description: "Woops, something went wrong... :poop:"
    }})
}

exports.setWake = (message, conf) => {
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

exports.nextUpdate = (message, conf) => message.channel.send({embed: {
    color: parseInt(colors.info, 16), 
    title: "What's coming next ?", 
    description: conf.incoming
}});