var express = require('express');
var router = express.Router();
var request = require('request');
//var formData = require('form-data');
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');


const extractFromHtml = (webPage) => {
    const $ = cheerio.load(webPage);
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
                return
                Object.assign({}, obj, {
                    refs: $('#list_refs option')[key].attribs.value,
                    station: station.trim()
                })
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
            ligne_sens: i + '_B'
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
          },5000)
      }, () => {
        console.log(salaud);
        console.log(webPageArray);
        const resultData = webPageArray.map(htmlPage =>{
          return extractFromHtml(htmlPage);
        })
        resultData.forEach(obj => {
          fs.writeFile('result.json', JSON.stringify(obj))
        })
        }
    )
    //

})

module.exports = router;