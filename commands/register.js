const colors = require('../conf/colors.json')
const dbUtilities = require('../conf/database.js');

exports.run = async (client, message, args) => {
    
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