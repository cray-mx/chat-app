import React from 'react';
import {ListGroup} from 'react-bootstrap';

function contacts() {

    const data = JSON.parse(localStorage.getItem('details'));
    return (
        <ListGroup variant="flush">
           {data.contacts.map((contact,i) => (
               <ListGroup.Item key={i} className="contact-names">
               {contact.name}
               <p style={{fontFamily: 'Roboto'}}>{contact.email}</p>
               </ListGroup.Item>
           ))}
        </ListGroup>
    )
}

export default contacts
