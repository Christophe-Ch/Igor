const fs = require("fs");

exports.save = (conf, path) => {
    fs.writeFile(path, JSON.stringify(conf), (err) => {
        if (err) console.error(err)
    });
}