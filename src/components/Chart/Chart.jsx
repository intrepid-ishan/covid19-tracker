import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Pie, Polar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

const Chart = ({ data, country }) => {

    const [dailyData, setDailyData] = useState([]);
    const [chartName, setChartName] = useState('pieChart');

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        };
        fetchAPI();
    }, []);

    const lineData = {
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
    };
    const lineChart = dailyData.length ? (<Line data={lineData} />) : null;

    const barData = {
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
            label: 'People',
            backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)',
            ],
            data: [data?.confirmed?.value, data?.recovered?.value, data?.deaths?.value]
        }]
    };
    const barOption = {
        legend: { display: false },
        title: { display: true, text: "Current situation" }
    };
    const barChart = data ? (<Bar data={barData} options={barOption} />) : null;

    const pieData = {
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
            data: [data?.confirmed?.value, data?.recovered?.value, data?.deaths?.value],
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ],
            hoverBackgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)']
        }]
    };
    const pieChart = data?.confirmed ? (<Pie data={pieData} />) : null;

    const polarData = {
        datasets: [{
            data: [data?.confirmed?.value, data?.recovered?.value, data?.deaths?.value],
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ],
            label: 'My dataset'
        }],
        labels: ['Infected', 'Recovered', 'Deaths']
    };
    const polarChart = data?.confirmed ? (<Polar data={polarData} />) : null;

    const handleChartChange = (name) => {
        setChartName(name);
    };

    return (

        <div className={styles.container}>
            <div className={styles.radio}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" row onChange={(e) => handleChartChange(e.target.value)} >

                        <FormControlLabel disabled={country ? true : false} value="lineChart" control={<Radio />} label="Line Chart" />
                        <FormControlLabel value="barChart" control={<Radio />} label="Bar Chart" />
                        <FormControlLabel value="polarChart" control={<Radio />} label="Polar Chart" />
                        <FormControlLabel value="pieChart" control={<Radio />} checked={!chartName.localeCompare("pieChart")} label="Pie Chart" />

                    </RadioGroup>
                </FormControl>
            </div>
            { chartName.localeCompare("lineChart") ? null : (country ? null : lineChart)}
            { chartName.localeCompare("barChart") ? null : barChart}
            { chartName.localeCompare("pieChart") ? null : pieChart}
            { chartName.localeCompare("polarChart") ? null : polarChart}
        </div>
    );
};

export default Chart;