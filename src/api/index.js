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


export const fetchMoreDataAllCountries = async (countries) => {
    let modifiedDataArray = [];

    console.log("fetchMoreDataAllCountries: countries.length", countries.length);

    countries.map(async country => {
        const req = await axios.get(`${url}/countries/${country}`);

        const { data: { confirmed, deaths, recovered } } = req;
        let b = {
            countryName: country,
            confirmed: confirmed.value,
            recovered: deaths.value,
            deaths: recovered.value,
        };
        modifiedDataArray.push(b);
        // console.log(modifiedDataArray);
    });

    console.log("fetchMoreDataAllCountries: modifiedDataArray", modifiedDataArray.length);
    return modifiedDataArray;
};

