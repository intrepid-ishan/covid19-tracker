import React from 'react';

function PrintRows(props) {
    return (
        props.rows.map((row, i) => (
            <tr key={i}>
                <td >{i + 1}</td>
                <td>{row.countryName.toLocaleString()}</td>
                <td >{row.confirmed.toLocaleString()}</td>
                <td >{row.recovered.toLocaleString()}</td>
                <td >{row.deaths.toLocaleString()}</td>
            </tr>
        ))
    );
}

export default PrintRows;
