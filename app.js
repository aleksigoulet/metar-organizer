// let metar = 'SPECI CYTZ 190039Z AUTO 07016G22KT 1 1/4SM -RA OVC004 02/01 A2990 RMK SLP128='



// metar = metar.split(' ');

// console.log(metar[5]);

// let button = document.getElementById("submitButton");

// // document.getElementById('result').innerHTML = "TEST"
// let input = '';

// button.addEventListener('click', (ev)=>{
//     ev.preventDefault();
//     // console.log('test');
//     // console.log(document.getElementById('metarInput').value)
//     input = document.getElementById('metarInput').value;
//     input = input.split(' ');
//     document.getElementById('result').innerHTML = input[5];
// })








////////////////
///Production///
////////////////


//Import necessary functions
// const MetarDecode = require('./modules/decode-metar.js');
// const csvToArray = require('./modules/csvToArray.js');

import { MetarDecode } from "./modules/decode-metar.js";
import { csvToArray } from "./modules/csvToArray.js";

const decoder = new MetarDecode();

//create variables to store html form elements
const csvSubmit = document.getElementById('csvSubmit');
const csvFile = document.getElementById('csvFile');


//Add event listener to handle file submission:
csvSubmit.addEventListener('submit', ev => {
    ev.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (ev) {
        //create array of objects with file entries
        const text = ev.target.result;
        const data = csvToArray(text);
        if(data[data.length-1].metar == undefined){
            data.pop();
        }
        console.log(data);
        //check that we are getting correct vis
        const value = decoder.getVis(data[1].metar);
        console.log(value);
        //check average vis for entire period
        const vis = decoder.getAverageVis(data)
        console.log(`The average visibility over the period was ${vis}`);
        document.getElementById('result').innerHTML = `The average visibility over the period was ${vis} SM`;
    };

    reader.readAsText(input);
})







/////////////
///Testing///
/////////////


let result = {
    input: '',
    getVis: function(metarStr){ //function to get visibility as number
        //extract visibility string using regex//
        this.input = metarStr;

        const regex = /(?<!\d\d\dV\d\d\d )\b\s?\d?\s\d*\/?\d*SM/;
        let vis = this.input.match(regex)[0].trim(); //matches regex, trims string and stores in vis variable

        //remove SM from vis
        vis = vis.slice(0, -2);

        //Create array with two parts of number
        vis = vis.split(' ');

        if(vis.length > 1){
            //convert to decimal number string and remove 0
            vis[vis.length - 1] = vis[vis.length - 1].split('/').reduce((a, c) => a/c);
            vis[vis.length - 1] = vis[vis.length - 1].toString().slice(1);

            vis = vis[0].concat(vis[1]);
        } else {
            vis = vis[0].split('/').reduce((a, c) => a/c);
        }

        vis = parseFloat(vis);

        return vis
    }
}


// let metar = 'CYTZ 100700Z AUTO 29009KT 240V300 9SM OVC040 02/M01 A2979 RMK WX MISG VIS MISG PCPN MISG SLP094'

// const MetarDecode = require('./modules/decode-metar.js');


// // module.exports = result;

// const bugFix = new MetarDecode();

// console.log(bugFix.getVis(metar));

// console.log(result.getVis(metar));


