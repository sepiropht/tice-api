var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var async = require('async');
var stationCode = require('./stationCode');

router.get('/', function(req, res, next) {
    const webPageArray = [];

    const extractFromHtml = (webPage, arr, indexObj) => {

        const index = webPage.indexOf('({refs:');
        if (index === -1) {
            return;
        }
        let data = [];
        webPage.forEach((item, i) => {

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
        //console.log(tempArray);
        tempArray.forEach((char, i) => {
            finalJson.push(char);
            if (char === '}') {
                final = [...finalJson];
                return;
            }
        })
        let merdier = final.join('');
        merdier = merdier.split(' ');
        let refs = merdier[1].split('');
         refs.shift();
         refs.pop();
         refs.pop();
         let ran = merdier[3].split('');
         ran.pop();
        arr.push(Object.assign({}, stationCode[indexObj], {a: 'refresh', refs: refs.join(''), ran: ran.join('')} ));
    }

    let salaud = [];
    async.eachSeries(stationCode, function iteratee(item, callback) {
        setTimeout(() => {
            goSearch(item);
            salaud.push(item);
            callback(false);
        }, 5000)
    }, () => {
        console.log(salaud);
        console.log(webPageArray.length);
        let resultData = [];
        webPageArray.forEach((htmlPage, i) => {
            extractFromHtml(htmlPage, resultData, i);
        })
        resultData.forEach(obj => {
            fs.appendFile('../result1.json', JSON.stringify(obj) + '\n', (err, data) => {
                console.log("c'est finie!");
            })
        })
    })

    const goSearch = formObj => {
        const finalUrl = 'http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/';
        request.post({
            url: finalUrl,
            formData: {
                a: formObj.a,
                code: formObj.code
            }
        }, (err, response) => {
            //console.log(response);
            webPageArray.push(response.body.split(' '));
            //res.send(response);
        })
    }

})

module.exports = router;
