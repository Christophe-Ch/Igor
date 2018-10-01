const { Attachment, RichEmbed } = require('discord.js');
const confSaver = require("../conf");

var colors = require('../../conf/colors.json')
var dbUtilities = require('../../conf/database.js');

/* Kicks a specific user
Works only if the user that triggered the command has the permission
and if the target can be kicked */
exports.kick = (message) => {
    const kicked = message.mentions.users.first();
    if(kicked){
        const member = message.guild.member(kicked);
        if(member){
            member.kick("Igor is always right")
            .catch(() => message.channel.send({embed: {
                color: parseInt(colors.danger, 16), 
                description: "That user is too strong for me..."
            }}));
        }
    }
    else{
        message.channel.send({embed: {
            color: parseInt(colors.danger, 16), 
            description: "You have to mention the user to kick :confused:"
        }});
    }
}

// Sends back the avatar of the author
exports.avatar = (message) => {
    var embed = new RichEmbed()
    .setColor(colors.info)
    .setImage(message.author.avatarURL.toString().split('?')[0]);

    message.channel.send(embed);
}

exports.register = async (message) => {
    
    var query = await dbUtilities.execute("SELECT addUser(\"" + message.author.id + "\",\"" + message.guild.id + "\") AS result");

    if(query != false && query[0].result){
        message.channel.send({embed: {
            color: parseInt(colors.success, 16),
            description: message.author.username + " joined us ! :tada:"
        }});
    }
    else{
        message.channel.send({embed: {
            color: parseInt(colors.warning, 16),
            description: "You are already registered... :confused:"
        }});
    }
}

exports.commands = async (message) => {

    var availableQuery = await dbUtilities.execute("SELECT availableCommands(\"" + message.author.id + "\", \"" + message.guild.id + "\") AS commands");

    if(availableQuery != false){
        
        const content = {
            embed: {
                color: parseInt(colors.info, 16),
                title: "Here are all the commands you can execute:",
                fields: []
            }
        }

        var commands = availableQuery[0].commands.split(',');

        for(var i = 0; i < commands.length; i++){
            var query = await dbUtilities.execute("SELECT description FROM commands WHERE id = \"" + commands[i] + "\"");
            content.embed.fields.push({
                name: commands[i],
                value: query[0].description
            });
        }

        return message.author.send(content)
            .then(() => {
                if(message.channel != "dm"){
                    message.reply({embed: {
                        color: parseInt(colors.success, 16),
                        description: "Go check your DMs!"
                    }})
                }
            })
            .catch(error => {
                message.reply({embed: {
                    color: parseInt(colors.danger, 16),
                    description: "Something went wrong... :poop:"
                }});
                console.log("ERROR: 'commands' command failed to send reply to " + message.author.username);
            });
    }

    message.channel.send({embed: {
        color: parseInt(colors.danger, 16),
        description: "Something went wrong... :poop:"
    }})
    
}