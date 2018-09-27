const { RichEmbed } = require('discord.js');
var dbUtilities = require('../../conf/database.js');
var colors = require('../../conf/colors.json')

// When bot receives 'ping', answers 'pong'
exports.ping = (message) => message.channel.send({embed: {
    color: parseInt(colors.success),
    description: "PONG !"
}});

// Sends a message to all the channels of the server
exports.spam = (message, conf) => {
    const mess = message.content.slice(conf.prefixlen + 4); 
    message.guild.channels.forEach((channel) => {
        if(channel.type == "text")
            channel.send({embed: {
                color: parseInt(colors.info),
                description: mess
            }});
    })
}

// Sends a description of the mentionned user
exports.who = async (message) => {

    var query = await dbUtilities.execute("SELECT * FROM users_servers_grades WHERE id_user = " + message.mentions.users.first().id + " AND id_server = " + message.guild.id);

    if(query.length == 1){
        var user = query[0];

        const embed = new RichEmbed()
        .setColor(colors.info)
        .setTitle('Who is ' + message.mentions.users.first().username + ' ?')
        .setDescription('Grade : ' + user.id_grade)
        .setThumbnail(message.mentions.users.first().avatarURL)
        .addField("Discord story",
        "Created at : " + message.mentions.users.first().createdAt)
        .addField("What about this server ?",
        "Registered the : " + user.registeredAt);


        message.channel.send(embed);
    }
    else{
        message.channel.send({embed: {color: parseInt(colors.danger, 16), description: "I don't know this user, sorry... :poop:"}});
    }
}

exports.help = async (message) => {

    var query = await dbUtilities.execute("SELECT description FROM commands WHERE id = " + message.content.split(' ')[1]);

    if(query.length == 1){
        message.channel.send({embed: {
            color: parseInt(colors.info, 16), 
            title: message.content.split(' ')[1], 
            description: query[0].description
        }});
    }
    else{
        message.channel.send({embed: {
            color: parseInt(colors.danger, 16), 
            description: "Woops..! It seems that this command doesn't exist... :poop:"
        }});
    }
    
}