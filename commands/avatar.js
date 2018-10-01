const { RichEmbed } = require('discord.js');
const colors = require('../conf/colors.json')

exports.run = (client, message, args) => {
    var embed = new RichEmbed()
    .setColor(colors.info)
    .setImage(message.author.avatarURL.toString().split('?')[0]);

    message.channel.send(embed);
}