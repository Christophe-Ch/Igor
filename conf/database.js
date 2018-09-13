var util = require('util');
const mysql = require("mysql");
var database;

exports.configure = (fs) => {
    var dbconf = JSON.parse(fs.readFileSync("./conf/dbconf.json", "utf8"));

    var pool = mysql.createPool({
        host: dbconf.host,
        user: dbconf.user,
        password: dbconf.password,
        database: "discord"
    });

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
        return
    })

    pool.query = util.promisify(pool.query);

    database = pool;
}

exports.canExecute = async (userId, serverId, command) => {

    try {
        var result = await database.query("SELECT availableCommands(\"" + userId + "\", \"" + serverId + "\") AS commands");
    } catch (error) {
        throw new Error(error);
    }
        
    var commands = result[0].commands.split(',');

    for(let i = 0; i < commands.length; i++){
        if(commands[i] == command){
            return true;
        }
    }

    return false;

}

exports.execute = async (command) => {
    try{
        var query = await database.query(command);
        return query;
    }
    catch (error){
        return false;
    }
}