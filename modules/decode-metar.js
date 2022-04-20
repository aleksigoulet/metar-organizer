class MetarDecode {
    constructor(arr) {
        this.input = arr;
        this.daysArr = [];
    }
    getVis(metarStr){ //function to get visibility as number
        //extract visibility string using regex//

        // this.input = metarStr;
        let vis = undefined;

        try {
            const regex = /(?<!\d\d\dV\d\d\d )\b\s?\d?\s\d*\/?\d*SM/;    
            vis = metarStr.match(regex); //matches regex and stores in vis variable

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
    getAverageVis(arr) { //function to get average vis of an array of metar objects
        let acc = 0;
        for(let i = 0; i < arr.length; i++) {
            let vis = this.getVis(arr[i].metar);
            acc += vis;
        }

        acc = acc/arr.length;

        return acc;
    }
    getDaysArr(arr){ //function to create 2D array separating metar objects into days
        let singleDay = [];
        let days =[];
        let date = '';

        //traverse input array an push into days
        for(let i = arr.length - 1; i >= 0; i--) {
            //set date of current element
            const currentDate = arr[i].valid.substring(0, 10);

            //set date currently being worked with
            if(!date){
                date = currentDate;
            }

            //push days that correspond to the same date into array. unshift used to keep days ordered chronologically
            if(date === currentDate && i != 0){
                singleDay.unshift(arr[i]);
            } else if(date === currentDate && i == 0) {
                singleDay.unshift(arr[i]);
                days.unshift(singleDay);
            } else { //unshift day array into output array
                days.unshift(singleDay);

                //reset variables to start a new day and go back to same entry
                singleDay = [];
                date = '';
                i++;
            }
        }

        return days;
    }
    getCond(arr){ //function to get days of IFR vs days VFR, takes array of metars and returns object with IFR and VFR property

        const dayArr = this.getDaysArr(arr);

        let totalDays = dayArr.length;
        let ifrDays = 0;
        let vfrDays = 0;

        dayArr.forEach(el => {
            const avgVis = this.getAverageVis(el);
            if(avgVis <= 3){
                ifrDays++;
            } else {
                vfrDays++;
            }
        });

        return {total: totalDays, ifr: ifrDays, vfr: vfrDays};

    }
}



// module.exports = MetarDecode;

export {MetarDecode};