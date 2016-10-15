var express = require('express');
var router = express.Router();
var request = require('request');
//var formData = require('form-data');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

const extractFromHtml = (webPage, arr) => {
    const $ = cheerio.load(webPage);
    let i = 0;
    for (key in $('#list_refs option')) {
        if (i > 0) {
            let station = $('#list_refs option')[key].hasOwnProperty('children')
                ? $('#list_refs option')[key].children[0].data.trim().split("")
                : "";
            if (station.length !== 0) {
                station.shift();
                station.shift();
                let code = station.splice(-6);
                code.shift();
                code.pop();
                code = code.join('');
                station = station.join('');
                arr.push(Object.assign({}, {
                    a: 'recherche_code',
                    code: code,
                    station: station.trim()
                }))
            }
        }
        i++;
    }
}

router.get('/', function(req, res, next) {
    let arrayForm = [];
    const arr = [];
    let it = 0;
    const webPageArray = [];
    for (let i = 401; i < 421; i++) {

        arrayForm.push({
            a: 'recherche_ligne',
            ligne_sens: i + '_A'
        })
        arrayForm.push({
            a: 'recherche_ligne',
            ligne_sens: i + '_R'
        })
    }
    const goSearch = formObj => {
        const finalUrl = 'http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/';
        request.post({
            url: finalUrl,
            formData: formObj
        }, (err, response, html) => {

            webPageArray.push(html);
        })
    }

    let salaud = [];
    async.eachSeries(arrayForm, function iteratee(item, callback) {
        //let currentItem = item
        setTimeout(() => {
            goSearch(item);
            salaud.push(item);
            callback(false);
        }, 5000)
    }, () => {
        console.log(salaud);
        console.log(webPageArray);
        let resultData = [];
        webPageArray.forEach(htmlPage => {
            extractFromHtml(htmlPage, resultData);
        })
        resultData.forEach(obj => {
            fs.appendFile('../result.json', JSON.stringify(obj) + '\n', (err,data) => {
              console.log("c'est finie!");
            })
        })
    })
    //

})

module.exports = router;
