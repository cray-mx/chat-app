import React, { useRef, useState, useContext} from 'react';
import { Container, Form, Button, Row, Col, Modal} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from './contexts/userContext';

export default function Login() {

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [show, setShow] = useState(false);
    const {setUser} = useContext(UserContext);

    const submitHandler = (e) => {  
       e.preventDefault();
        fetch('http://192.168.15.5:5000/login',{
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value}),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setUser(data.name);
                if(!localStorage.getItem('details') || JSON.parse(localStorage.getItem('details')) !== data)
                    localStorage.setItem('details', JSON.stringify(data));
                history.push("/");
            }
            else{
                setShow(true);
            }
        })
        .catch(err => "Error");
    }

    const onSignup = (e) => {
        e.preventDefault();
        history.push('/sign-up');
    }

    const handleClose = () => setShow(false);

    return (
        <Container fluid>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="modaltitle">Permission Denied</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalbody">Invalid Credentials</Modal.Body>
                <Modal.Footer>
                <Button variant="info" onClick={handleClose}>
                    Try Again
                </Button>
                </Modal.Footer>
            </Modal>
            <Row className="justify-content-center">
                <Col className="col-md-4 ">
                    <Form className="mt-5" onSubmit={submitHandler}>
                        <h1 style={{textAlign: "center", color:"rgb(194, 188, 188)"}}>Login</h1> 
                        <Form.Group className="mt-5">
                            <Form.Label>
                                <h5>Enter Email</h5>
                            </Form.Label>
                            <Form.Control type="email" placeholder="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <h5>Enter password</h5>
                            </Form.Label>
                            <Form.Control type="password" placeholder="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button type="submit" >Login</Button>
                        <Button className="ml-3 w-50" variant="success" onClick={onSignup}>Sign up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
