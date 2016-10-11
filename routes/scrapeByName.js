var express = require('express');
var router = express.Router();
var request = require('request');
//var formData = require('form-data');
var fs = require('fs');
var cheerio = require('cheerio');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let arrayForm = [];
    let id = 30000;
    let it = 0;
    let form = {
        a: 'recherche_ligne',
        ligne_sens: '405_A'
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
            let arr = [];
            let i = 0;
            for (key in $('#list_refs option')){
                if ( i > 0) {
                  let station =$('#list_refs option')[key].hasOwnProperty('children')? $('#list_refs option')[key].children[0].data.trim().split(""): "";
                  if(station.length !== 0) {
                    station.shift();
                    station.shift();
                    station.splice(-6);
                    station = station.join('');
                    arr.push(Object.assign({}, form, {

                        refs: $('#list_refs option')[key].attribs.value,
                        station: station.trim()
                    }))
                  }


              }
              i++;
            }

            res.send(html);
        })
    }
  
    goSearch(form);

})

module.exports = router;
