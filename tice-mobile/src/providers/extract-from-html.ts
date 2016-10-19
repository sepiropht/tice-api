import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ExtractFromHtml provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ExtractFromHtml {

  constructor() {
    console.log('Hello ExtractFromHtml Provider');
  }
  get(webPage) {
    console.log(webPage);
    const extractFromHtml = (webPage) => {

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
        return Object.assign({},  {a: 'refresh', refs: refs.join(''), ran: ran.join('')} );
    }
  }
}
