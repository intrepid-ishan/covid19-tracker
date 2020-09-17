import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ( {data, country} ) => {
    //react hooks
    const [dailyData, setDailyData] = useState([]);
    // console.log(country);
    //callback function
    //it will run after render method
    //####last
    useEffect(() => {

        //async function
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        }
        // const x = dailyData.map(({ confirmed }) => confirmed)
        // console.log('confirmed' + x);

        // console.log(dailyData);
        //calling it--> daily data is set
        fetchAPI();

    },[]);

    // console.log(data.confirmed,data.recovered,data.deaths);

    // data: [65, 59, 80, 81, 56, 55, 40] takes such array as argument
    // confirmed have  555,654,941,1434,2118,2927,5578,6166,8234,9927,12038,16787,19887,23898,27642,30801,34397,37130,40161,42768,44809,45228,60376,66894,69039,71233,73268,75146,75650,76210,76833,78586,78977,79542,80393,81370,82733,84106,86005,88383,90356,92933,95235,98023,101971,106004,109963,113844,118880,126546,132240,146672,157773,168954,183593,199419,218989,246905,276475,308790,342252,384404
    const lineChart = (
        dailyData.length ?
            (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        country
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                            ],
                            data:[data.confirmed.value,data.recovered.value,data.deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}

                /> 
                ): null 
            );



    return (
        <div className={styles.container}>
            {/* {lineChart} */}
            
            {country ? barChart : lineChart}
            {/* {country ? barChart : lineChart}  */}
        </div>
    )
}

export default Chart;