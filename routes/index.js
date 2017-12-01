var express = require('express');
var router = express.Router();
var moment = require('moment');
const dateFormat = 'MMM D, YYYY';

/* GET home page. */
router.get('/:timestamp', function (req, res, next) {
    const timestamp = req.params['timestamp'];
    const body = {"unix": null, "natural": null};
    if (isNumeric(timestamp)) {
        body.unix = timestamp;
        body.natural = toNatural(timestamp);
    } else {
        body.unix = toUnix(timestamp);
        body.natural = timestamp;
    }
    res.send(body);
});

module.exports = router;

function toNatural(value) {
    return moment.unix(value).format(dateFormat);
}

function toUnix(value) {
    const date = moment(value, dateFormat);
    return date.unix();
}

function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
