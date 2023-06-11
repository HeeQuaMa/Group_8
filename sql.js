var sql = require("mssql");

function executeSQL(strSQl, cb) {
    // config for your database
    var config = {
        user: 'sa',
        password: '123',
        server: 'ASUS\\ASUS',
        database: 'DoAnWeb',
        options: {
            encrypt: false,
            trustedConnection: true,
        },
    };
    // connect to your database
    sql.connect(config, function (err, db) {
        //console.log(db);
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(strSQl, function (err, recordset) {
            if (err) console.log(err)
            cb(recordset);
        });

    });
}

function executeSQLSync(strSQl) {
    // config for your database
    var config = {
        user: 'sa',
        password: '123',
        server: 'ASUS\\ASUS',
        database: 'DoAnWeb',
        options: {
            encrypt: false,
            trustedConnection: true,
        },
    };

    var connectSQL = new Promise((resolve, reject) => {
        sql.connect(config, function (err, db) {
            //console.log(db);
            if (err) reject(err);
            // create Request object
            var request = new sql.Request();
            request.query(strSQl, function (err, recordset) {
                if (err) reject(err)
                resolve(recordset);
            });
            // query to the database and get the records
        });
    });

    return connectSQL;


}

module.exports = {
    executeSQL: executeSQL,
    executeSQLSync: executeSQLSync
}




