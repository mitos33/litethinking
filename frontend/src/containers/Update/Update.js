import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import LtImage from '../../components/Image/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Update() {
    //Se obtiene el parametro id de la URL
    const { id } = useParams();

    //Variable que se usa para redireccionar
    const navigate = useNavigate();

    //Variables de estado
    const [validated, setValidated] = useState(false);
    const [businessId, setBusinessId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nit, setNit] = useState('');
    const [phone, setPhone] = useState('');

    //Setters de las variables de estado
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

    //Valida que los datos ingresados sean correctos
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(false);
        } else {
            patch();
        }
        setValidated(true);
    };

    //Query para obtener los datos de la empresa
    const get = () => {
        const URL = '/api/business/' + id + '/';
        axios
            .get(URL, {})
            .then((res) => {
                setBusinessId(id);
                setName(res.data.name);
                setAddress(res.data.address);
                setNit(res.data.nit);
                setPhone(res.data.phone);
            })
            .catch((err) => {
                navigate('/');
            });
    };

    //Query para actualizar los datos de la empresa
    const patch = () => {
        const URL = '/api/business/' + businessId + '/';

        axios
            .patch(URL, {
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

    //Llame el metodo get al renderizar la página
    useEffect(() => {
        get();
    }, []);

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
                        type="text"
                        value={phone}
                        onChange={changePhone}
                        required
                        pattern="[1-9]{1}[0-9]{9}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please insert a phone.
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="row">
                    <div className="pb-5">
                        <Button
                            type="submit"
                            variant="warning"
                            className="fw-bold w-50"
                        >
                            Update
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
                    <div clasName="pb-5"></div>
                </div>
            </Form>
        </Container>
    );
}
