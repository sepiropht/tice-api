var express = require('express');
var router = express.Router();
var request = require('request');
//var formData = require('form-data');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let arrayForm = [];
    let id = 30000;
    let it = 0;
    let obj = {};
    fs.readFile('401.txt', {
        encoding: 'utf8'
    }, (err, data) => {
        console.log(data);
        let arr1 = []
        arr1 = data.split('\n');
        console.log(arr1);
        arr1.forEach((line) => {
            line.split(' ').forEach((word, i, currentLine) => {
                if (!isNaN(word)) {
                    let form = {
                        '_id': id++,
                        'a': 'recherche_code',
                        'code': word
                    }
                    if (i === 0) {
                        currentLine.splice(0, 1);
                        form.station = currentLine.join(' ');
                    } else if (i === currentLine.length - 1) {
                        currentLine.splice(-1, 1);
                        form.station = currentLine.join(' ');
                    }
                    it++; 
                    obj[it] = form;

                }
            })
        })
        fs.writeFile('output.json', JSON.stringify(obj))
    })
    arrayForm.forEach(form => {
        //goSearch(form);
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
