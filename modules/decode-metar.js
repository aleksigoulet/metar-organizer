class MetarDecode {
    constructor() {
        this.input = '';
    }
    getVis(metarStr){ //function to get visibility as number
        //extract visibility string using regex//

        this.input = metarStr;
        let vis = undefined;

        try {

            const regex = /(?<!\d\d\dV\d\d\d )\b\s?\d?\s\d*\/?\d*SM/;
            vis = this.input.match(regex); //matches regex and stores in vis variable

            //check that vis is defined, otherwise return 0
            if(vis == undefined){
                return 0;
            }

            //access the regex matched value, trim and store as vis
            vis = vis[0].trim();
            

            //remove "SM" from vis
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
    
            return vis;

        } catch(error) {
            console.log(metarStr);
            console.log(vis);
            console.log(error);
        }


    }
    getAverageVis(arr) {
        let acc = 0;
        for(let i = 0; i < arr.length; i++) {
            let vis = this.getVis(arr[i].metar);
            acc += vis;
        }

        acc = acc/arr.length;

        return acc;
    }
}

// module.exports = MetarDecode;

export {MetarDecode};