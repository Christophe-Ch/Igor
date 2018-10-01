var colors = require('../conf/colors.json')
var conf = require('../conf/config.json');

exports.run = (client, message, args) => message.channel.send({embed: {
    color: parseInt(colors.info, 16), 
    title: "What's coming next ?", 
    description: conf.incoming
}});