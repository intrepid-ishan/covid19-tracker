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

export const fetchCustomData = async (countries) => {

    const filteredCountries = countries.filter(country => country !== "Gambia");

    return new Promise((resolve, reject) => {//start promise

        const myPromises = filteredCountries.map(async country => {
            const req = await axios.get(`${url}/countries/${country}`);
            const { data: { confirmed, deaths, recovered } } = req;
            return {
                countryName: country,
                confirmed: confirmed.value,
                recovered: deaths.value,
                deaths: recovered.value,
            };
        });

        const result = Promise.all(myPromises);
        resolve(result);

    });//end promise
};
