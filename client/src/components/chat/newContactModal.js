import React , {useContext, useRef, useState}from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {UserContext} from '../contexts/userContext';

export default function NewContactModal({ closeModal }) {

    const emailRef = useRef();
    const nameRef = useRef();

    const [contactValid, setContactValid] = useState('');

    const {setUser} = useContext(UserContext);

    const data = JSON.parse(localStorage.getItem('details'));

    const submitHandler = (e) => {
        e.preventDefault();
        fetch('http://192.168.15.5:5000/createContact', {
            method: 'POST',
            body: JSON.stringify({
                contact: {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    myEmail: data.email
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            if(data){
            const val = JSON.stringify(data);
            localStorage.setItem('details',val);
            setUser(val);
            closeModal();
            }else{
                setContactValid('Contact does not exist OR is already added to contacts');
            }
        })
        .catch(err => console.log("Error Could not reacived updated contacts"));
    }

    return (
        <div>
             <Modal.Header closeButton>
                Create Contact
             </Modal.Header>
             <Modal.Body>
                 <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required/>
                    </Form.Group>
                    <Button variant="success" type="submit">Create</Button>
                    <p className="pt-2" style={{color:"red"}}>{contactValid}</p>
                 </Form>
             </Modal.Body>
        </div>
    )
}
