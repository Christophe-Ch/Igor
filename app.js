// Database
var dbUtilities = require('./conf/database.js');

// Command files
let user_management = require('./commands/management/user_management');
let bot_management = require('./commands/management/bot_management');

// Discord
const Discord = require('discord.js');
const client = new Discord.Client();


// File system
const fs = require("fs");

// Configuration
let conf = require("./conf/config.json");
var colors = require('./conf/colors.json');

// Triggers when the bot starts
client.on("ready", () => {
    client.user.setActivity("doing some stuff bro");

    // Database
    dbUtilities.configure(fs);

    // Wake message
    if(conf.wakeMessageEnabled){
        client.guilds.forEach(async (guild) => {
            var wakeChannel = conf.wakeChannels.find((element) => {
                return element.serverId == guild.id;
            });
            if(wakeChannel){
                var channel = guild.channels.find((element) => {
                    return element.id == wakeChannel.channelId;
                });
    
                if(channel){
                    channel.send({embed: {color: parseInt(colors.info, 16), description: "Hello world ! :D"}});
                }
                else{
                    console.log("Invalid wake channel for server " + guild.name + " (" + guild.id + ")");
                }
            }
            else{
                console.log("No wake channel has been registered for server " + guild.name + " (" + guild.id + ")");
            }
        })
    }

    console.log("I am ready!");
});

// Triggers when the bot joins a new server
client.on("guildCreate", async (guild) => {
    await dbUtilities.execute("CALL addServer(\"" + guild.id + "\")");
    console.log("Just joined a new server !");
});

// Triggers when the bot receives a message
client.on("message", async (message) => {
    if(!message.content.startsWith(conf.prefix)) return;
    if(message.author.bot) return;

    const args = message.content.slice(conf.prefixlen).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    var query = await dbUtilities.canExecute(message.author.id, message.guild.id, command);

    if(query){
        try{
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        }
        catch (err){
            console.error(err);
            message.channel.send({embed: { 
                color: parseInt(colors.danger, 16), 
                description: "Something wrong happened... :poop:"
            }});
        }
    }
    else{
        message.channel.send({embed: { 
            color: parseInt(colors.danger, 16), 
            description: "You don't have the right to execute this command or it doesn't exist... :poop:"
        }});
    }
    
});

client.login(conf.token);