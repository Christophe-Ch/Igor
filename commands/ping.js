var colors = require('../conf/colors.json');

exports.run = (client, message, args) => message.channel.send({
    embed: {
        color: parseInt(colors.success, 16),
        description: "PONG !"
    }
});