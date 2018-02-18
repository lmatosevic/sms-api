var net = require('net');

function SMSClient() {
    this.client = new net.Socket();
}

SMSClient.prototype.connect = function (port, host) {
    this.client.connect(port, host, function () {
        console.log("SMS client connected to " + host + ":" + port);
    });
    this.client.on('error', function (err) {
        console.error("SMS client error: " + err);
    });
    this.client.on('close', function () {
        console.log("SMS client closed");
    });
};

SMSClient.prototype.check = function (cb) {
    var checkCmd = Buffer.from([49, 4]);
    this.client.write(checkCmd);
    this.client.once('data', cb);
};

SMSClient.prototype.sendSMS = function (to, message, cb) {
    var buffers = [Buffer.from([50, 0]), Buffer.from(to, 'ascii'), Buffer.from([0]), Buffer.from(message, 'ascii'), Buffer.from([4])];
    var sendCmd = Buffer.concat(buffers);
    this.client.write(sendCmd);
    this.client.once('data', cb);
};

module.exports = new SMSClient();