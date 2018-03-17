var express = require('express'),
    bodyParser = require('body-parser'),
    orm = require('orm'),
    config = require('../resources/config'),
    client = require('./smsclient/sms-client'),
    basicAuth = require('express-basic-auth'),
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

app.use(basicAuth({
    authorizer: function (username, password) {
        return username === "admin" && password === "secret";
    },
    unauthorizedResponse: function (req) {
        return {error: req.auth ? ("Credentials rejected") : "No credentials provided"}
    }
}));

var smsRoutes = require('./route/sms-route');
smsRoutes(app);

app.use(function (req, res) {
    res.status(404).send({error: "This URL was not found on this server."})
});

client.connect(config.smsclient.port, config.smsclient.host, config.smsclient.reconnectDelay);

var server = app.listen(config.api.port, config.api.host, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Running at http://" + host + ":" + port)
});