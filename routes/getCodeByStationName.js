var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds053156.mlab.com:53156/tice-keys


router.get('/', function(req, res, next) {
  var db = mongoose.connect('mongodb://sepiropht:azerty@ds053156.mlab.com:53156/tice-keys');
  var keyStationShema = mongoose.Schema({a: String, code: String, station: String})
  var keyStationModel = mongoose.model("tice-keys", keyStationShema);
    const query = keyStationModel.find({}, (err, stations) => {
        let arr = [];
        const obj = stations[0]._doc;
        for (k in obj) {
            if (obj[k].station === 'Agora')
                arr.push(obj[k])
        }
        res.send(arr);


    });
});

module.exports = router;
