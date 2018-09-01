const { Attachment } = require('discord.js');
const confSaver = require("./conf");

/* Kicks a specific user
Works only if the user that triggered the command has the permission
and if the target can be kicked */
exports.kick = (message) => {
    const kicked = message.mentions.users.first();
    if(kicked){
        const member = message.guild.member(kicked);
        if(member){
            member.kick("Igor is always right")
            .catch(() => message.channel.send("That user is too strong for me..."));
        }
    }
    else{
        message.channel.send("You have to mention the user to kick :confused:");
    }
}

// Sends back the avatar of the author
exports.avatar = (message) => message.channel.send(new Attachment(message.author.avatarURL.toString()));

exports.register = (message, users) => {
    users.users.push({"id": message.author.id, "grade": "2", "server": message.guild.id});
    confSaver.save(users, "./conf/users.json")
}