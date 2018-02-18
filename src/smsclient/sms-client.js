var net = require('net');
var tinySms = require('./tiny-sms');

function SMSClient() {
    this.client = null;
    this.connected = false;
    this.reconnectTask = null;
}

SMSClient.prototype.connect = function (port, host) {
    this.client = new net.Socket();
    this.connected = false;
    this.client.connect(port, host, function () {
        console.log("SMS client connected to " + host + ":" + port);
        this.connected = true;
        if (this.reconnectTask) {
            clearInterval(this.reconnectTask);
            this.reconnectTask = null;
        }
    }.bind(this));
    this.client.on('error', function (err) {
        console.error("SMS client error: " + err);
    });
    this.client.on('close', function () {
        if (this.connected) {
            console.log("SMS client closed");
        }
        this.connected = false;
        if (!this.reconnectTask) {
            this.reconnectTask = setInterval(function () {
                this.connect(port, host);
            }.bind(this), 5000);
        }
    }.bind(this));
};

SMSClient.prototype.check = function (cb, err) {
    if (!this.connected) {
        err({code: 503, msg: "Service unavailable"});
        return;
    }
    this.client.write(tinySms.checkCmd());
    this.client.once('data', cb);
};

SMSClient.prototype.sendSMS = function (to, message, cb, err) {
    if (!this.connected) {
        err({code: 503, msg: "Service unavailable"});
        return;
    }
    var sendCmd = Buffer.concat(tinySms.sendCmd(to, message));
    this.client.write(sendCmd);
    this.client.once('data', cb);
};

module.exports = new SMSClient();