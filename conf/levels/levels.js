const dbUtilities = require('../database.js');
const levels = require('./levels.json');
const colors = require('../colors.json');

exports.giveXp = async (message, amount) => {

    var query = await dbUtilities.execute("SELECT xp FROM users WHERE id = " + message.author.id);
    var previous = query[0].xp;

    await dbUtilities.execute("CALL giveXp(" + message.author.id + ", " + amount + ")");

    query = await dbUtilities.execute("SELECT xp FROM users WHERE id = " + message.author.id);

    if(query){
        var level = levels.levels.find(level => (level.xp === query[0].xp || (previous < level.xp && level.xp < query[0].xp)));
        if(level){
            message.reply({embed: {
                color: parseInt(colors.success, 16),
                title: "Level up !",
                description: "You've been promoted to rank **" + level.name + "** !\n" + level.description
            }})
        }
    }
}

exports.getLevel = async (userId) => {

    var query = await dbUtilities.execute("SELECT xp FROM users WHERE id = " + userId);

    if(query){
        for(let i = 0; i < levels.levels.length; i++) {
            if(levels.levels[i].xp > query[0].xp){
                return levels.levels[i - 1];
            }
            else if(levels.levels[i].xp == query[0].xp) {
                return levels.levels[i];
            }
        }
    }
    else {
        return false;
    }
}

exports.getNextLevel = async (userId) => {

    var query = await dbUtilities.execute("SELECT xp FROM users WHERE id = " + userId);

    if(query){
        for(let i = 0; i < levels.levels.length; i++) {
            if(levels.levels[i].xp > query[0].xp){
                return levels.levels[i];
            }
            else if(levels.levels[i].xp == query[0].xp) {
                return levels.levels[i + 1];
            }
        }
    }
    else {
        return false;
    }
}