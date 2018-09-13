// Database
var dbUtilities = require('./conf/database.js');

// Command files
let user_management = require('./commands/management/user_management');
let bot_management = require('./commands/management/bot_management');
let misc = require('./commands/miscellaneous/misc');

const { Client } = require('discord.js');

const fs = require("fs");

let conf = JSON.parse(fs.readFileSync("./conf/config.json", "utf8"));
let commands = JSON.parse(fs.readFileSync("./conf/commands.json", "utf8"));

const client = new Client();

// Triggers when the bot starts
client.on("ready", () => {
    console.log("I am ready!");
    client.user.setActivity("doing some stuff bro");

    // Database
    dbUtilities.configure(fs);

    // Wake message
    client.guilds.forEach(async (guild) => {
        await dbUtilities.execute("CALL addServer(\"" + guild.id + "\")")

        var wakeChannel = conf.wakeChannels.find((element) => {
            return element.serverId == guild.id;
        });
        if(wakeChannel){
            var channel = guild.channels.find((element) => {
                return element.id == wakeChannel.channelId;
            });

            if(channel){
                channel.send("Hello world ! :D");
            }
            else{
                console.log("Invalid wake channel for server " + guild.name + " (" + guild.id + ")");
            }
        }
        else{
            console.log("No wake channel has been registered for server " + guild.name + " (" + guild.id + ")");
        }
    })

    
});

// Triggers when the bot receives a message
client.on("message", async (message) => {
    if(!message.content.startsWith(conf.prefix)) return;

    var command = message.content.substr(conf.prefixlen).split(' ')[0];

    var query = await dbUtilities.canExecute(message.author.id, message.guild.id, command);

    if(query){

        switch(command){

            case 'ping':
                misc.ping(message);
                break;
    
            case 'count':
                misc.count(message);
                break;
    
            case 'avatar':
                user_management.avatar(message);
                break;
    
            case 'kick':
                user_management.kick(message);
                break;
    
            case 'prefix':
                bot_management.prefix(message, conf);
                break;
    
            case 'spam':
                misc.spam(message, conf);
                break;
    
            case 'who':
                misc.who(message, users);
                break;
    
            case 'register':
               user_management.register(message);

            case 'setWake':
                bot_management.setWake(message, conf);
                break;

            case 'nextUpdate':
                bot_management.nextUpdate(message, conf);
                break;

            case 'help':
                misc.help(message);
                break;

            case 'grant':
                bot_management.grant(message);
                break;
        }
    }
    else{
        message.channel.send("You don't have the right to execute this command or it doesn't exist... :poop:");
    }

    
});

client.login(conf.token);