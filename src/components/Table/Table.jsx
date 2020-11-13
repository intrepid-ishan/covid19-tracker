import React from 'react';
import styles from './Table.module.css';

function Table({ data }) {

    // console.log("Inside Table Component: tableData", data);
    // const arr = [1, 2, 3, 4];
    // arr.map((item) => (console.log(item)));
    // console.log("Inside Table Component: tableData", typeof (data));

    return (
        <div className={styles.table}>
            <tr>
                <td>Hello</td>
                <td>
                    {console.log("working")};
                    </td>
            </tr>
        </div >
    );
}

export default Table;
