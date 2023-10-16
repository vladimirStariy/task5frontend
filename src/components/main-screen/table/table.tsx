import { FC } from 'react';

import Table from 'react-bootstrap/Table';
import { IPerson } from '../../../store/models/IPerson';

interface ITableProps {
    data: IPerson[];
}

const CustomTable: FC<ITableProps> = (props) => {
    return <Table>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Identificator</th>
                    <th>Full name</th>
                    <th>Adress</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((person) => {
                        return <>
                            <tr>
                                <td>{person.num}</td>
                                <td>{person.id}</td>
                                <td>{person.fullName}</td>
                                <td>{person.adress}</td>
                                <td>{person.phone}</td>
                            </tr>
                        </>
                    })
                }
            </tbody>
        </Table>
    </Table>
}

export default CustomTable;