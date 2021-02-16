import React, { useRef, useState } from 'react';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function signup(){

    const [emailCheck, setEmailCheck] = useState('');
    const [password, passwordCheck] = useState('');

    const history = useHistory();
    
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        if(passwordRef.current.value === confirmPasswordRef.current.value){

            fetch('http://192.168.15.5:5000/create',{
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current.value,
                name: nameRef.current.value, 
                password: passwordRef.current.value}),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            if(data)
                history.push("/login");
            else{
                setEmailCheck('Email is already in use');
            }
        })
        .catch(err => console.log("ERROR"));
    }
    else{
        passwordCheck("Password does not match");
    }
    }

    return (
        <Container>
        <Row className="justify-content-center" >
        <Col className="col-md-6 ">
            <Form className="mt-5" onSubmit={submitHandler}>
                <h1>Sign-up</h1> 
                    <Form.Group className="mt-5">
                        <Form.Label>
                            <h5>Enter Email</h5>
                        </Form.Label>
                        <Form.Control type="email" placeholder="email" ref={emailRef} required/>
                        <Form.Text style={{ color: "red"}}>{emailCheck}</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h5>Enter Name</h5>
                        </Form.Label>
                        <Form.Control type="text" placeholder="name" ref={nameRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h5>Enter Password</h5>
                        </Form.Label>
                        <Form.Control className="mb-2" type="password" placeholder="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <h5>Confirm Password</h5>
                        </Form.Label>
                        <Form.Control className="mb-2" type="password" placeholder="confirm password" ref={confirmPasswordRef} required/>
                        <Form.Text style={{ color: "red"}}>{password}</Form.Text>
                    </Form.Group>
                        <Button className="button w-25" variant="success" type="submit">Sign-up</Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )
    }