import axios from 'axios';
import async from 'async';

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
        };
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
};


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
};

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        const newdata = countries.map((eachCountry) => eachCountry.name);
        return newdata;
    } catch (error) {
        console.log(error);
    }
};

// ===========================================================================================

export const fetchMoreDataAllCountries = async (countries) => {

    let modifiedDataArray = [];

    for (var i = 0; i < countries.length; i++) {
        axios.get(`${url}/countries/${countries[i]}`).then(response => {
            const { data: { confirmed, deaths, recovered } } = response;
            modifiedDataArray.push({
                countryName: countries[i],
                confirmed: confirmed.value,
                recovered: deaths.value,
                deaths: recovered.value,
            });
        });
    }

    console.log("2:49", modifiedDataArray.length);
    return modifiedDataArray;

    // await Promise.all(countries.map(country => {
    //     axios.get(`${url}/countries/${country}`).then(response => {
    //         const { data: { confirmed, deaths, recovered } } = response;
    //         modifiedDataArray.push({
    //             countryName: country,
    //             confirmed: confirmed.value,
    //             recovered: deaths.value,
    //             deaths: recovered.value,
    //         });
    //     });
    // }));
};

// ===========================================================================================

// export const fetchMoreDataAllCountries = async (countries) => {
//     // try {
//     // let modifiedDataArray = [
//     //     { countryName: "Afghanistan", confirmed: 40768, recovered: 1511, deaths: 34023 },
//     //     { countryName: "Albania", confirmed: 18858, recovered: 473, deaths: 10548 },
//     //     { countryName: "Algeria", confirmed: 55880, recovered: 1907, deaths: 38932 },
//     //     { countryName: "Andorra", confirmed: 4038, recovered: 69, deaths: 2729 }
//     // ];
//     // console.log(modifiedDataArray.length);
//     // async.eachSeries(countries, async (country, callback) => {
//     //     console.log(country);
//     //     const req = await axios.get(`${url}/countries/${country}`);
//     //     // console.log(req);
//     //     const { data: { confirmed, deaths, recovered } } = req;
//     //     let b = {
//     //         countryName: country,
//     //         confirmed: confirmed.value,
//     //         recovered: deaths.value,
//     //         deaths: recovered.value,
//     //     };
//     //     modifiedDataArray.push(b);
//     //     count = count + 1;
//     //     // callback();
//     // }, () => {
//     //     console.log(count);
//     //     console.log("12:35========", modifiedDataArray);
//     //     console.log("12:35 after========", modifiedDataArray.length);
//     // });
//     // countries.map(async (eachCountry) => {

//     // });
//     // } catch (error) {
//     //     console.log(error);
//     // }
//     let modifiedDataArray = [], count = 0;
//     console.log(countries.length);
//     countries.map(async country => {
//         const req = await axios.get(`${url}/countries/${country}`);
//         const { data: { confirmed, deaths, recovered } } = req;
//         let b = {
//             countryName: country,
//             confirmed: confirmed.value,
//             recovered: deaths.value,
//             deaths: recovered.value,
//         };
//         modifiedDataArray.push(b);
//         // console.log(modifiedDataArray);
//     });
//     return modifiedDataArray;
// };


// ===========================================================================================

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