import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function signup(){

    const [idCheck, setIdCheck] = useState('');
    const [copy, setCopy] = useState('Copy');
    
    const idRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        idRef.current.value = uuidv4();
    },[]);

    const changeId = () => {
        setCopy('Copy');
        idRef.current.value = uuidv4();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('http://192.168.15.5:5000/create',{
            method: 'POST',
            body: JSON.stringify({
                id: idRef.current.value,
                name: nameRef.current.value, 
                password: passwordRef.current.value}),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            console.log("In .then clause");
            if(data)
                window.location.href = "/";
            else{
                setIdCheck('Id is already in use');
            }
        })
        .catch(err => console.log("ERROR"));
    }

    const copyHandler = (e) => {
        idRef.current.select();
        document.execCommand('copy');
        setCopy('Copied!');
    }

    return (
        <Container>
        <Row className="justify-content-center" >
        <Col className="col-md-6 ">
            <Form className="mt-5" onSubmit={submitHandler}>
                <h1>Sign-up</h1> 
                    <Form.Group className="mt-5">
                        <Form.Label>
                            <h5>Choose Id</h5>
                        </Form.Label>
                        <Form.Control type="text" placeholder="unique-id" ref={idRef} required/>
                        <Button className="mt-2" onClick={copyHandler} variant="warning">{copy}</Button>         
                        <Form.Text>{idCheck}</Form.Text>
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
                        <Form.Text >Make sure you copy your id for login later on </Form.Text>
                    </Form.Group>
                    <Button type="submit">Sign-up</Button>
                    <Button className="ml-3 w-50" variant="success" onClick={changeId}>Change Id</Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )
}