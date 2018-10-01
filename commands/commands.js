var colors = require('../conf/colors.json')
var dbUtilities = require('../conf/database.js');


exports.run = async (client, message, args) => {

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