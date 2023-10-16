import { FC } from "react";

import styles from './custom.table.module.css';
import CustomCheckbox from "../checkbox/custom.checkbox";
import { IPerson } from "../../store/models/IPerson";

interface ICustomTable {
    data: IPerson[];
}

const CustomTable: FC<ICustomTable> = (props) => {  
    return <>
        <table className={styles.customTable}>
            <thead>
                <tr>
                    <th className={`${styles.cellItem} ${styles.bodyTd}`}>#</th>
                    <th className={`${styles.cellItem} ${styles.bodyTd}`}>Id</th>
                    <th className={`${styles.cellItem} ${styles.bodyTd}`}>Full name</th>
                    <th className={`${styles.cellItem} ${styles.bodyTd}`}>Adress</th>
                    <th className={`${styles.cellItem} ${styles.bodyTd}`}>Phone</th>
                </tr>
            </thead>
            <tbody>
                { 
                    props.data.map((item) => {
                        return <>
                            <tr key={item.id} className={styles.bodyTr}>
                                <td className={styles.bodyTd}>
                                    <div className={styles.cellItem}>{item.id}</div>    
                                </td>
                                <td className={styles.bodyTd}>
                                    <div className={styles.cellItem}>{item.num}</div>
                                </td>
                                <td className={styles.bodyTd}>
                                    <div className={styles.cellItem}>{item.fullName}</div>    
                                </td>
                                <td className={styles.bodyTd}>
                                    <div className={styles.cellItem}>{item.adress}</div>    
                                </td>
                                <td className={styles.bodyTd}>
                                    <div className={styles.cellItem}>{item.phone}</div>    
                                </td>
                            </tr>
                        </>
                    })
                }
                
            </tbody>
        </table>
    </>
}

export default CustomTable;