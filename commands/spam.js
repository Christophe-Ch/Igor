var colors = require('../conf/colors.json');

exports.run = (client, message, args) => {
    message.guild.channels.forEach((channel) => {
        if (channel.type == "text")
            channel.send({
                embed: {
                    color: parseInt(colors.info, 16),
                    description: args.join(' ')
                }
            });
    })
}