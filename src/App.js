import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    };

    handleCountryChange = async (country) => {
        console.log("$$$          start: HCC           $$$");
        const fetchedData = await fetchData(country);
        console.log("$$$   mid: HCC stateWillUpdate    $$$");
        this.setState({ data: fetchedData });
        console.log("$$$   mid: HCC stateWillUpdate    $$$");
        this.setState({ country: country });
        console.log("$$$          end: HCC             $$$");
    };

    async componentDidMount() {
        console.log("%%%        start: CDM          %%%");
        const fetchedData = await fetchData();
        console.log("%%%   mid: CDM stateWillUpdate %%%");
        this.setState({ data: fetchedData });
        console.log("%%%          end: CDM          %%%");
    }

    render() {
        console.log("!!!      App Component rendered      !!!");
        console.log("!!! Card, CP, Chart will be rendered !!!");
        return (
            <div className={styles.container}>

                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={this.state.data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={this.state.data} country={this.state.country} />

            </div>
        );
    }
}

export default App;