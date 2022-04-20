// let metar = 'SPECI CYTZ 190039Z AUTO 07016G22KT 1 1/4SM -RA OVC004 02/01 A2990 RMK SLP128='

// let metar = 'METAR CYHD 192000Z AUTO 320/05KT 2 1/16SM CLR 02/M10 A3012 RMK SLP225='

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

module.exports = result;

// console.log(result.getVis(metar));
