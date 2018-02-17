var client = require('../smsclient/sms-client');

exports.check = function (req, res) {
    client.check(function (data) {
        res.end("CHECK RESULT: " + data);
    });
};

exports.sendFromParams = function (req, res) {
    client.sendSMS(req.params["msisdn"], req.params["message"], function (data) {
        res.end("SEND RESULT: " + data);
    });
};

exports.send = function (req, res) {
    res.end("Sent from json");
};