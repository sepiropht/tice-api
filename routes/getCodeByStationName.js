var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds053156.mlab.com:53156/tice-keys
var db = mongoose.connect('mongodb://sepiropht:azerty@ds053156.mlab.com:53156/tice-keys');
var keyStationShema = mongoose.Schema({a: String, code: String, station: String})
var keyStationModel = mongoose.model("tice-keys", keyStationShema);
/* GET home page. */
router.get('/', function(req, res, next) {
    keyStationModel.find({}, (err, station) => {
        res.send(station);
        console.log(station);
    })
});

module.exports = router;
