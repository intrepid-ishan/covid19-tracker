import React, { useState, useEffect } from 'react';
import { fetchDailyData, fetchCustomData, fetchCountries } from '../../api';
import { Line, Bar, Pie, Polar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import Table from './Table/Table.jsx';

const Chart = ({ data, country }) => {

    const [dailyData, setDailyData] = useState([]);
    const [chartName, setChartName] = useState('pieChart');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        };
        fetchAPI();
    }, []);


    const lineData = {
        labels: dailyData?.map(({ date }) => date),
        datasets: [{
            data: dailyData?.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
        }, {
            data: dailyData?.map(({ deaths }) => deaths),
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

    const handleChartChange = async (name) => {
        if (name.localeCompare("table")) {
            setChartName(name);
        } else {
            const countries = await fetchCountries();
            fetchCustomData(countries)
                .then((result) => {
                    console.log("result", result); //190 - 😀
                    setTableData(result);
                })
                .catch(() => {
                    console.log("error");
                });
            setChartName(name);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.radio}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" row  >
                        <FormControlLabel disabled={country ? true : false} value="lineChart" control={<Radio />} label="Line Chart" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel value="barChart" control={<Radio />} label="Bar Chart" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel value="polarChart" control={<Radio />} label="Polar Chart" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel value="pieChart" control={<Radio />} label="Pie Chart" onChange={(e) => handleChartChange(e.target.value)} />
                        <FormControlLabel disabled={country ? true : false} value="table" control={<Radio />} label="Table" onChange={(e) => handleChartChange(e.target.value)} />
                    </RadioGroup>
                </FormControl>
            </div>
            { chartName.localeCompare("lineChart") ? null : (country ? null : lineChart)}
            { chartName.localeCompare("barChart") ? null : barChart}
            { chartName.localeCompare("pieChart") ? null : pieChart}
            { chartName.localeCompare("polarChart") ? null : polarChart}
            { chartName.localeCompare("table") ? null : <Table data={tableData} />}
        </div>
    );
};

export default Chart;