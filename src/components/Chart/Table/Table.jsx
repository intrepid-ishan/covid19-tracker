import React, { useState, useEffect, useRef } from 'react';
import PrintRows from './PrintRows/PrintRows';
import styles from './Table.module.css';

function Table({ data }) {

    const [rows, setRows] = useState([]);
    let flagConfirmed = useRef(true);
    let flagRecovered = useRef(true);
    let flagDeaths = useRef(true);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const sortConfirmed = () => {
        if (flagConfirmed.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.confirmed - a.confirmed;
            });
            flagConfirmed.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.confirmed - b.confirmed;
            });
            flagConfirmed.current = true;
            setRows(mirrorRows);
        }
    };

    const sortRecovered = () => {
        if (flagRecovered.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.recovered - a.recovered;
            });
            flagRecovered.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.recovered - b.recovered;
            });
            flagRecovered.current = true;
            setRows(mirrorRows);
        }
    };

    const sortDeaths = () => {
        if (flagDeaths.current) {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return b.deaths - a.deaths;
            });
            flagDeaths.current = false;
            setRows(mirrorRows);
        } else {
            const mirrorRows = [...rows];
            mirrorRows.sort((a, b) => {
                return a.deaths - b.deaths;
            });
            flagDeaths.current = true;
            setRows(mirrorRows);
        }
    };

    return (
        <div className={styles.table}>
            <tr>
                <th className={styles.srNo}>Sr. No</th>
                <th className={styles.country}>Country Name</th>
                <th className={styles.infected} onClick={sortConfirmed}>Infected</th>
                <th className={styles.recovered} onClick={sortRecovered}>Recovered</th>
                <th className={styles.deaths} onClick={sortDeaths}>Deaths</th>
            </tr>
            <PrintRows rows={rows} />
        </div >
    );
}

export default Table;
