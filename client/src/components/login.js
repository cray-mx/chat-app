import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function Login() {

    const idRef = useRef();
    const passRef = useRef();

    const [text, setText] = useState('');

    const submitHandler = (e) => {  
       e.preventDefault();
        
    }

    const newIdHandler = () => {
        idRef.current.value = uuidv4();
    }

    const onSignup = (e) => {
        e.preventDefault();
        window.location = '/sign-up';
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col className="col-md-4 ">
                    <Form className="mt-5" onSubmit={submitHandler}>
                        <h1>Login</h1> 
                        <Form.Group className="mt-5">
                            <Form.Label>
                                <h5>Enter Id</h5>
                            </Form.Label>
                            <Form.Control type="text" placeholder="unique-id" ref={idRef} required/>
                            <Form.Text>
                                {text}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                <h5>Enter password</h5>
                            </Form.Label>
                            <Form.Control type="password" placeholder="password" ref={passRef} required/>
                        </Form.Group>
                        <Button type="submit">Login</Button>
                        <Button className="ml-3 w-50" variant="success" onClick={onSignup}>Sign up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
