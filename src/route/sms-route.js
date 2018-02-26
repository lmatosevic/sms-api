module.exports = function (app) {
    var smsController = require('../controller/sms-controller');

    app.route('/sms/check')
        .get(smsController.check);

    app.route('/sms/send/:to/:message')
        .get(smsController.sendFromParams);

    app.route('/sms/send')
        .post(smsController.send);
};