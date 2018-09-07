exports.configure = (mysql, fs) => {
    var dbconf = JSON.parse(fs.readFileSync("./conf/dbconf.json", "utf8"));

    var con = mysql.createConnection({
        host: dbconf.host,
        user: dbconf.user,
        password: dbconf.password
    });

    con.connect((err) => {
        if(err) throw err;
        console.log("Database ready");
    })

    con.query("USE discord");

    return con;
}

exports.canExecute = (database, message) => {
    
}