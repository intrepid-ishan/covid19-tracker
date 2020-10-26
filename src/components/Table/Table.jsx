import React from 'react';
import styles from './Table.module.css';

function Table({ data }) {
    console.log("Inside Table.jsx", data);
    let countries = data;
    console.log("countries 1", countries.length);

    return (
        <div className={styles.table}>
            {console.log("countries 2", countries.length)}
            {countries.map((country) => (console.log(country.countryName)))}
            {/* 
            <tr>
                    <td>Hello</td>
                    <td>
                        {console.log("okay")};
                    </td>
                </tr> 
            */}
        </div>
    );
}

export default Table;
