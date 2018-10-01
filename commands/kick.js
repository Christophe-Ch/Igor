var colors = require('../conf/colors.json')

exports.run = (client, message, args) => {
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