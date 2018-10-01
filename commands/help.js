var dbUtilities = require('../conf/database.js');
var colors = require('../conf/colors.json')

exports.run = async (client, message, args) => {

    var query = await dbUtilities.execute("SELECT description FROM commands WHERE id = \"" + args[0] + "\"");

    if (query.length == 1) {
        message.channel.send({
            embed: {
                color: parseInt(colors.info, 16),
                title: message.content.split(' ')[1],
                description: query[0].description
            }
        });
    }
    else {
        message.channel.send({
            embed: {
                color: parseInt(colors.danger, 16),
                description: "Woops..! It seems that this command doesn't exist... :poop:"
            }
        });
    }

}