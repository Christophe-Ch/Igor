var colors = require('../conf/colors.json')
var dbUtilities = require('../conf/database.js');

exports.run = async (client, message, args) => {
    
    if(!isNaN(args[1]) && parseInt(args[1]) < 3 && parseInt(args[1]) >= 0){
        
        await dbUtilities.execute("CALL setRank(" + message.mentions.users.first().id + ", " + message.guild.id + ", " + args[1] + ")");
            
        return message.channel.send({embed: {
            color: parseInt(colors.success, 16), 
            title: "Lil' promotion !",
            description: message.mentions.users.first().username + " promoted to rank " + args[1] + "! :tada:"
        }});
    }

    message.channel.send({embed: {
        color: parseInt(color.success, 16),
        description: "Woops, something went wrong... :poop:"
    }})

}