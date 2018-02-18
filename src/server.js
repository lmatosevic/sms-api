var express = require('express'),
    bodyParser = require('body-parser'),
    orm = require('orm'),
    config = require('../resource/config'),
    client = require('./smsclient/sms-client'),
    app = express();

app.use(orm.express(config.db.driver + "://" + config.db.username + ":" + config.db.password + "@" + config.db.host + "/" +
    config.db.database + "?" + config.db.args, {
    define: function (db, models, next) {
        // models.user = db.define("user", { ... });
        next();
    }
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var commandRoutes = require('./route/command-route');
commandRoutes(app);

app.use(function(req, res) {
    res.status(404).send({error: "This URL was not found on this server."})
});

client.connect(config.smsclient.port, config.smsclient.host);

var server = app.listen(config.api.port, config.api.host, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running at http://" + host + ":" + port)
});