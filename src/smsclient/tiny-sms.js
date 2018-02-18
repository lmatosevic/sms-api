module.exports.checkCmd = function () {
    return Buffer.from([49, 4]);
};

module.exports.sendCmd = function (to, message) {
    return [Buffer.from([50, 0]),
        Buffer.from(to, 'ascii'),
        Buffer.from([0]),
        Buffer.from(message, 'ascii'),
        Buffer.from([4])];
};