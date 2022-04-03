import LtImage from './components/Image/Image';
import { Container, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'styled-components';

export default function App() {
    const [business, setBusiness] = useState([]);

    const showData = () => {
        axios
            .get('/api/business')
            .then((res) => {
                setBusiness(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        showData();
    }, []);

    const columns = [
        { name: 'id', selector: (row) => row.id },
        { name: 'Name', selector: (row) => row.name },
        {
            name: 'Actions',
            selector: (row) => [
                <Link to={'/edit/' + row.id} key={'edit' + row.id} id={row.id}>
                    <Button variant="warning" className="fw-bold">
                        <BsFillPencilFill></BsFillPencilFill>
                    </Button>
                </Link>,

                ' ',

                <Button
                    variant="danger"
                    className="fw-bold"
                    key={'delete' + row.id}
                >
                    <BsFillTrashFill></BsFillTrashFill>
                </Button>,
            ],
        },
    ];

    return (
        <Container>
            <LtImage></LtImage>
            <div className="pt-5">
                <Link to="/create">
                    <Button variant="warning" className="fw-bold">
                        Create Business
                    </Button>
                </Link>
                ,
            </div>
            <div className="pt-5">
                <DataTable
                    columns={columns}
                    data={business}
                    pagination
                ></DataTable>
            </div>
        </Container>
    );
}
