var colors = require('../conf/colors.json');
var dbUtilities = require('../conf/database.js');

exports.run = async (client, message, args) => {

    var user = message.mentions.users.first();
    var member = message.guild.members.get(user.id);

    var query = await dbUtilities.execute("CALL getUser(\"" + user.id + "\", \"" + message.guild.id + "\")");

    if (query[0].length > 0) {
        var userDetails = query[0][0];

        var playing = member.presence.game != null ? member.presence.game.name : "Nope :innocent:";
        var registeredAt = user.registeredAt != null ? (new Date(userDetails.registeredAt)).toLocaleDateString("en-EN") : "You won't ever know...";
        var status;

        switch(user.presence.status){
            case 'online':
                status = "Up and running! :ok_hand:";
                break;
            case 'idle':
                status = "Be right back! :back:"
                break;
            case 'dnd':
                status = "Shhhhht! :crescent_moon:"
                break;
            case 'offline':
                status = "Not here... :mobile_phone_off:"
                break;
        }
        
        const content = {
            color: parseInt(colors.info, 16),
            title: ":sparkles: __Add me to your server !__",
            url: "https://discordapp.com/oauth2/authorize?client_id=484450144679362590&scope=bot",
            thumbnail: {
                url: user.avatarURL
            },
            description: "Wanna know some things about " + user.username + "?\nThere you go!",
            fields: [
                {
                    name: "\u200b",
                    value: "__**Everything you wanna know about him!**__"
                },
                {
                    name: "**Nickname:**",
                    value: user.username,
                    inline: true
                },
                {
                    name: "**Highest role:**",
                    value: member.highestRole.name,
                    inline: true
                },
                {
                    name: "**Playing?**",
                    value: playing
                },
                {
                    name: "**Status:**",
                    value: status,
                    inline: true
                },
                {
                    name: "**Registered the:**",
                    value: (new Date(user.createdAt)).toLocaleDateString("en-EN"),
                    inline: true
                },
                {
                    name: "\u200b",
                    value: "__**What about this server?**__"
                },
                {
                    name: "**Joined us the:**",
                    value: registeredAt,
                    inline: true
                },
                {
                    name: "**Rank:**",
                    value: userDetails.grade,
                    inline: true
                }
            ],
            footer: {
                "text": "Igor - ⓒ 2018 | Made with 💛 & Javascript"
            }
        };

        message.channel.send({ embed: content });
    }
    else {
        message.channel.send({ embed: { color: parseInt(colors.danger, 16), description: "I don't know this user, sorry... :poop:" } });
    }

}