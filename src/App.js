import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/image.png';

class App extends React.Component {

    //we dont wanna mess up by sending data in all direction
    //so therefore getting response of api in App.js and sending
    //to components through App.js, alternatively we could have tried
    //to send data directly to Components
    state = {
        data : {},
        country : '',
    }
    
    handleCountryChange = async (country) =>{
        //fetch the data
        //set the state
        const fetchedData = await fetchData(country);
        this.setState({ data : fetchedData });
        this.setState({country: country});
    }
    
    //componentDidMount called after render
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData });
    }
    
    render(){
        return (

            <div className={styles.container}>

            <img className={styles.image} src={coronaImage} alt="COVID-19" />
            <Cards data={this.state.data}/> 
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            {/* after render in chart component it will call useeffect */}
            <Chart data={this.state.data} country={this.state.country}/>
            
            </div>
        )
    }

}

export default App;