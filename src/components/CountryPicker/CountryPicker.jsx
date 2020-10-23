import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';


const CountryPicker = ({ handleCountryChange }) => {

    console.log("########   Inside CP Component  ########");
    const [fetchedCountries, setFetchedCountries] = useState([]);
    console.log("== 0:      CP useState      ==");

    //Here, useEffect will run only 1 time when component mounts
    //i.e useEffect will as soon as return statement is completed 
    useEffect(() => {
        const fetchAPI = async () => {
            console.log("== ** 2.1: CP useEffect Before Fetching Countries (stateWillUpdate) ** ==");
            setFetchedCountries(await fetchCountries());
            console.log("== ** 2.2:  CP useEffect After Fetching Countries  (stateUpdated)   ** ==");
        };
        fetchAPI();
    }, []);

    console.log("== 1:      CP Return        ==");
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {/* for each country create option and react rule is to have key */}
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;