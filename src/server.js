var express = require('express'),
    bodyParser = require('body-parser'),
    orm = require('orm'),
    dbConfig = require('../resource/db-config'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(orm.express(dbConfig.driver + "://" + dbConfig.username + ":" + dbConfig.password + "@" + dbConfig.host + "/" +
    dbConfig.database + "?" + dbConfig.args, {
    define: function (db, models, next) {
        // models.user = db.define("user", { ... });
        next();
    }
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var commandRoutes = require('./route/command-route');
commandRoutes(app);

app.listen(port);

console.log("Server started on: http://localhost:" + port);