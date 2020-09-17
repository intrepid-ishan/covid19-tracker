import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try {

        let changeableUrl = url;

        if (country) {
            changeableUrl = `${url}/countries/${country}`;
        }

        const { data } = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) =>
            ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            })
        );
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        const newdata = countries.map((eachCountry) => eachCountry.name);
        return newdata;
    } catch (error) {
        console.log(error);
    }
}




/*
import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//single key value pair returned
export const fetchData = async ( country ) => {
    try {

        let changeableUrl = url;

        if(country){
            changeableUrl = `${url}/countries/${country}`;
        }

        const { data } = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate,
        }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

//here object of data returned

// ######### after using map modifiedData contains new object values
    //     Array(164)
    // [0 … 99]
    // 0:
    // confirmed: 555
    // date: "2020-01-22"
    // deaths: 17
    // __proto__: Object
    // 1: {confirmed: 654, deaths: 18, date: "2020-01-23"}
    // 2: {confirmed: 941, deaths: 26, date: "2020-01-24"}
    // 3: {confirmed: 1434, deaths: 42, date: "2020-01-25"}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        // console.log(data);

        //loops over
        const modifiedData = data.map((dailyData) =>
            ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            })
        );
        // console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}


// simple array of countries returned
// (188) ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentin
export const fetchCountries = async() => {
    try{
        const { data : { countries } } = await axios.get(`${url}/countries`);

        const newdata = countries.map((eachCountry) => eachCountry.name);
        // console.log(countries);

        // const newdata = countries.map((w) =>
        //     ({
        //         x: w.name,
        //         y: w.iso2,
        //         z: w.iso3,
        //     })
        // );
        // console.log(newdata);

        // console.log(newdata)
        return newdata;
    } catch(error) {
        console.log(error);
    }
}

*/