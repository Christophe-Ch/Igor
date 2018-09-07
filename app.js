// Command files
let user_management = require('./commands/management/user_management');
let bot_management = require('./commands/management/bot_management');
let misc = require('./commands/miscellaneous/misc');

const { Client } = require('discord.js');

const mysql = require("mysql");
const fs = require("fs");

let conf = JSON.parse(fs.readFileSync("./conf/config.json", "utf8"));
let commands = JSON.parse(fs.readFileSync("./conf/commands.json", "utf8"));
let users = JSON.parse(fs.readFileSync("./conf/users.json", "utf8"));

const client = new Client();

let database;

// Triggers when the bot starts
client.on("ready", () => {
    console.log("I am ready!");
    client.user.setActivity("doing some stuff bro");

    // Database
    var dbconf = require('./conf/database.js');
    database = dbconf.configure(mysql, fs);
    
    // Wake message
    client.guilds.forEach((guild) => {
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
client.on("message", (message) => {
    if(!message.content.startsWith(conf.prefix)) return;

    var command = commands.commands.find((element) => {
        return element.name == message.content.substr(conf.prefixlen).split(' ')[0];
    });

    var user = users.users.find((element) => {
        return element.id == message.author.id && element.server == message.guild.id;
    });

    if(!user){
        user = {"id": message.author.id, "grade":"3"};
    }

    if(command && parseInt(command.grade) >= parseInt(user.grade)){
        command = message.content.substr(conf.prefixlen).split(' ')[0];
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
    
            case 'grant':
                bot_management.grant(message, users);
                break;
    
            case 'who':
                misc.who(message, users);
                break;
    
            case 'register':
                if(user.grade == "3")
                    user_management.register(message, users);
                else
                    message.channel.send('You are already registered :confused:');
                break;

            case 'setWake':
                bot_management.setWake(message, conf);
                break;

            case 'nextUpdate':
                bot_management.nextUpdate(message, conf);
                break;
        }
    }
    else{
        message.channel.send("You don't have the right to execute this command or it doesn't exist... :poop:");
    }

    
});

client.login(conf.token);