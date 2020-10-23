import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data, country }) => {

    console.log("######## Inside Chart Component ########");
    const [dailyData, setDailyData] = useState([]);
    console.log("== 0:     Chart useState    ==");

    //Here, useEffect will run only 1 time when component mounts
    //i.e useEffect will as soon as return statement is completed 
    useEffect(() => {
        console.log("== ** 2.1: Chart useEffect Before Fetching DailyData (stateWillUpdate) ** ==");
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        };
        console.log("== ** 2.2:  Chart useEffect After Fetching DailyData  (stateUpdated)   ** ==");
        fetchAPI();
    }, []);

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
                            data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}` }
                    }}

                />
            ) : null
    );


    console.log("== 1:    Chart Return       ==");
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;