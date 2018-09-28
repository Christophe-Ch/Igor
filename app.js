// Database
var dbUtilities = require('./conf/database.js');

// Command files
let user_management = require('./commands/management/user_management');
let bot_management = require('./commands/management/bot_management');
let misc = require('./commands/miscellaneous/misc');

// Discord
const { Client } = require('discord.js');

// File system
const fs = require("fs");

// Configuration
let conf = JSON.parse(fs.readFileSync("./conf/config.json", "utf8"));
var colors = require('./conf/colors.json');

const client = new Client();

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

    var command = message.content.substr(conf.prefixlen).split(' ')[0];

    var query = await dbUtilities.canExecute(message.author.id, message.guild.id, command);

    if(query){
        switch(command){

            case 'commands':
                user_management.commands(message);
                break;

            case 'h':
            case 'help':
                misc.help(message);
                break;

            case 'or':
                misc.or(message, conf.prefix);
                break;
            
            case 'nextUpdate':
                bot_management.nextUpdate(message, conf);
                break;

            case 'register':
                user_management.register(message);
                break;

            case 'who':
                misc.who(message);
                break;

            case 'ping':
                misc.ping(message);
                break;

            case 'avatar':
                user_management.avatar(message);
                break;

            case 'spam':
                misc.spam(message, conf);
                break;

            case 'kick':
                user_management.kick(message);
                break;

            case 'setWake':
                bot_management.setWake(message, conf);
                break;

            case 'grant':
                bot_management.grant(message);
                break;

            case 'prefix':
                bot_management.prefix(message, conf);
                break;
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