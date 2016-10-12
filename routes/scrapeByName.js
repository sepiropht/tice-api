var express = require('express');
var router = express.Router();
var request = require('request');
//var formData = require('form-data');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let arrayForm = [];
    let arr = [];
    let id = 30000;
    let it = 0;

    for (let i = 401; i < 421; i++) {
        arrayForm.push({
            a: 'recherche_ligne',
            ligne_sens: i + '_A'
        })
        arrayForm.push({
            a: 'recherche_ligne',
            ligne_sens: i + '_B'
        })
    }
    const goSearch = formObj => {
        const finalUrl = 'http://www.bus-tice.com/se-deplacer/timeo-vos-horaires-en-temps-reel/';
        request.post({
            url: finalUrl,
            formData: formObj
        }, (err, response, html) => {
            const $ = cheerio.load(html);
            const input = $('#form_arrets input');
            const obj = {
                a: input[0].attribs.value,
                refs: input[1].attribs.value,
                sens: input[3].attribs.value,
                ligne: input[4].attribs.value,
                code: input[2].attribs.value
            }

            let i = 0;
            for (key in $('#list_refs option')) {
                if (i > 0) {
                    let station = $('#list_refs option')[key].hasOwnProperty('children')
                        ? $('#list_refs option')[key].children[0].data.trim().split("")
                        : "";
                    if (station.length !== 0) {
                        station.shift();
                        station.shift();
                        station.splice(-6);
                        station = station.join('');
                        arr.push(Object.assign({}, formObj, {

                            refs: $('#list_refs option')[key].attribs.value,
                            station: station.trim()
                        }))
                        console.log(arr[i]);
                        fs.writeFile('output1.json', JSON.stringify(Object.assign({}, formObj, {

                            refs: $('#list_refs option')[key].attribs.value,
                            station: station.trim()
                        })))
                    }

                }
                i++;
            }
            //res.send(html);
        })
    }
    async.eachSeries(arrayForm, function iteratee(item, callback) {
        goSearch(item);
        callback(false);
    })
    //

})

module.exports = router;
