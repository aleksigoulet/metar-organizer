let metar = 'SPECI CYTZ 190039Z AUTO 07016G22KT 9SM -RA OVC004 02/01 A2990 RMK SLP128='

metar = metar.split(' ');

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
    getVis: function(metarStr){
        this.input = metarStr;
        this.input = this.input.split(' ');
        return this.input[5];
    }
}

module.exports = result;