import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LtImage from '../../components/Image/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Create(props) {
    const navigate = useNavigate();

    //State variables
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nit, setNit] = useState('');
    const [phone, setPhone] = useState('');

    //Set state values
    const changeName = (event) => {
        setName(event.target.value);
    };

    const changeAddress = (event) => {
        setAddress(event.target.value);
    };

    const changeNit = (event) => {
        setNit(event.target.value);
    };

    const changePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(false);
        } else {
            create();
        }
        setValidated(true);
    };

    const create = () => {
        const URL = '/api/business/';
        axios
            .post(props.value + URL, {
                name: name,
                address: address,
                nit: nit,
                phone: phone,
            })
            .then((res) => {
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <LtImage></LtImage>

            <h1 className="pb-5 pt-5 fs-2 fw-bold text-center">
                BUSINESS FORM
            </h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <label className="fw-bold pb-2">NIT</label>

                    <Form.Control
                        type="text"
                        value={nit}
                        onChange={changeNit}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a NIT.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <label className="fw-bold pb-2">BUSINESS NAME</label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={changeName}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a name.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <label className="fw-bold pb-2">ADDRESS</label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={changeAddress}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert an address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-5">
                    <label className="fw-bold pb-2">PHONE</label>
                    <Form.Control
                        type="number"
                        value={phone}
                        onChange={changePhone}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a phone.
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="pb-5">
                    <Button
                        type="submit"
                        variant="warning"
                        className="fw-bold w-50"
                    >
                        Create
                    </Button>
                    <Button
                        type="submit"
                        variant="dark"
                        className="fw-bold w-50"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
