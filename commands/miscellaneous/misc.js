const { RichEmbed } = require('discord.js');

// When bot receives 'ping', answers 'pong'
exports.ping = (message) => message.channel.send("PONG !")

// Counts from a specific number down to zero
exports.count = (message) => {
    const arg = message.content.split(' ')[1];
    if(typeof arg !== "undefined" && arg > 0 && arg <= 10)
        message.channel.send("ig-count " + (parseInt(arg) - 1));
}

// Sends a message to all the channels of the server
exports.spam = (message, conf) => {
    const mess = message.content.slice(conf.prefixlen + 4); 
    message.guild.channels.forEach((channel) => {
        if(channel.type == "text")
            channel.send(mess);
    })
}

// Sends a description of the mentionned user
exports.who = (message, users) => {

    var user = users.users.find((element) => {
        return element.id == message.mentions.users.first().id;
    });

    if(user){
        const embed = new RichEmbed()
        .setColor(0x00AE86)
        .setTitle('Who is ' + message.mentions.users.first().username + ' ?')
        .setDescription('Grade : ' + user.grade)
        .setThumbnail(message.mentions.users.first().avatarURL)
        .addField("Discord story",
        "Created at : " + message.mentions.users.first().createdAt)
        .addField("What about this server ?",
        "Registered at")


        message.channel.send(embed);
    }
    else{
        message.channel.send("User not registered");
    }
}