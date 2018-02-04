module.exports = function (app) {
    var commandController = require('../controller/command-controller');

    app.route('/check')
        .get(commandController.check);

    app.route('/send')
        .post(commandController.send);
};