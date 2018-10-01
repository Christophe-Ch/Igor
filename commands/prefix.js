const confSaver = require("./conf");
const colors = require('../conf/colors.json');
const conf = require('../conf/config.json');

exports.run = (client, message, args) => {
    
    if(args.length > 0){
        if(typeof args[0] !== "undefined" && args[0].length <= 3 && args[0].length > 0){
            conf.prefix = args[0];
            conf.prefixlen = args[0].length + 1;
    
            confSaver.save(conf, "./conf/config.json");
    
            message.channel.send({embed: {
                color: parseInt(colors.success, 16),
                description: "New prefix : " + args[0]
            }});
        }
    }

}