////////////////
///Production///
////////////////

//Import necessary functions

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

        const conditions = decoder.getCond(data, 20);

        //display results to user
        document.getElementById('resultVis').innerHTML = `${conditions.total} days analyzed, ${conditions.ifr} days had an average of IFR visibility and ${conditions.vfr} days had an average of VFR visibility.`;

        document.getElementById('resultWind').innerHTML = `${conditions.total} days analyzed, ${conditions.windLess} days had average winds less than ${conditions.windThreshold} KTS and ${conditions.windMore} days had average winds greater than or equal to ${conditions.windThreshold} KTS.`;


    };

    reader.readAsText(input);
})

/////////////
///Testing///
/////////////

//Import necessary functions

// const MetarDecode = require('./modules/decode-metar.js');
// const csvToArray = require('./modules/csvToArray.js');
