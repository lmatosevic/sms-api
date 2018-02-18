var client = require('../smsclient/sms-client');

exports.check = function (req, res) {
    client.check(function (data) {
        res.json({result: data.toString().trim()});
    }, function (err) {
        res.status(err.code).json({error: err.msg});
    });
};

exports.sendFromParams = function (req, res) {
    client.sendSMS(req.params["to"], req.params["message"], function (data) {
        res.json({result: data.toString().trim()});
    }, function (err) {
        res.status(err.code).json({error: err.msg});
    });
};

exports.send = function (req, res) {
    client.sendSMS(req.body.to, req.body.message, function (data) {
        res.json({result: data.toString().trim()});
    }, function (err) {
        res.status(err.code).json({error: err.msg});
    });
};