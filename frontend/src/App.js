import LtImage from './components/Image/Image';
import { Container, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'styled-components';

export default function App(props) {
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const [business, setBusiness] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const showData = () => {
        axios
            .get(props.value + '/api/business')
            .then((res) => {
                setBusiness(res.data);
            })
            .catch((err) => console.log(err));
    };

    const remove = (id) => {
        axios
            .delete(props.value + '/api/business/' + id)
            .then((res) => {
                showData();
                handleClose();
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
                <Link to={'/edit/' + row.id} key={'edit' + row.id}>
                    <Button
                        variant="warning"
                        className="fw-bold"
                        value={row.id}
                    >
                        <BsFillPencilFill></BsFillPencilFill>
                    </Button>
                </Link>,

                ' ',

                <Button
                    variant="danger"
                    className="fw-bold"
                    key={'delete' + row.id}
                    value={row.id}
                    onClick={() => {
                        handleShow();
                        setId(row.id);
                    }}
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Are you sure you want to delete this business?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="fw-bold"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        className="fw-bold"
                        variant="warning"
                        onClick={() => {
                            remove(id);
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
