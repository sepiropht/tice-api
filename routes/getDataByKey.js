var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var stationCode = require('./stationCode');

router.get('/', function(req, res, next) {


    stationCode.forEach(station => {
        //goSearch(form)
        console.log(station);
    })
    const goSearch = formObj => {
        const finalUrl = 'http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/';
        request.post({
            url: finalUrl,
            formData: formObj
        }, (err, response) => {
            console.log(response);
            //res.send(response);
            const arr = response.body.split(' ');
            const index = arr.indexOf('({refs:');
            let data = [];
            arr.forEach((item, i) => {

                if (i >= index && i < index + 4) {
                    data.push(item)
                }
                if (i === index + 2) {
                    return;
                }
            })
            let finalJson = [];
            let final;
            const tempArray = data.join(' ').split('');
            tempArray.shift();
            console.log(tempArray);
            tempArray.forEach((char, i) => {
                finalJson.push(char);
                if (char === '}') {
                    final = [...finalJson];
                    return;
                }
            })
            console.log(final.join(''));

        })
    }

})

module.exports = router;
