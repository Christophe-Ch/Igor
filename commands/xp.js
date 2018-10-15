const colors = require('../conf/colors.json')
const dbUtilities = require('../conf/database.js');
const progressBar = require('../modules/progresbar.js');
const levels = require('../conf/levels/levels.js');

exports.run = async (client, message, args) => {
    
    var query = await dbUtilities.execute("SELECT xp FROM users WHERE id = " + message.author.id);

    var current = await levels.getLevel(message.author.id);
    var next = await levels.getNextLevel(message.author.id);

    if(query){
        message.reply({embed: {
            color: parseInt(colors.info, 16),
            description: "You have **" + query[0].xp + " xp** ! :sparkles:\n" + progressBar.progressbar(current.xp, next.xp, query[0].xp, ':sparkles:', ':x:') + "\n**" + (next.xp - query[0].xp) + " xp** until next level!"
        }});
    }
    else{
        message.channel.send({embed: {
            color: parseInt(colors.warning, 16),
            description: "Something went wrong... :poop:"
        }});
    }

}