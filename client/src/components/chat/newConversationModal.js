import React, {useState, useContext} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {UserContext} from '../contexts/userContext';

export default function NewConversationModal({closeModal}) {

  const data = JSON.parse(localStorage.getItem('details'));

  const [selectedContacts, setSelectedContacts] = useState([]);

  const {setUser} = useContext(UserContext);

  const checkboxChangeHandler = (contact) => {
      setSelectedContacts(prevSelectedContacts => {
        const prevSelectedContactEmails = prevSelectedContacts.map(contact => contact.email)
        if(prevSelectedContactEmails.includes(contact.email)){
          return prevSelectedContacts.filter(prevContact => prevContact.email !== contact.email)
        }
        else
          return [...prevSelectedContacts, contact];
      })
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
      let a = JSON.stringify(data.conversations);
      let b = JSON.stringify(selectedContacts);
      let c = a.indexOf(b);
      if(c === -1){
        data.conversations = [...data.conversations, selectedContacts];
        if(selectedContacts.length>0){

          fetch('http://192.168.15.5:5000/createConversation',{
            method: 'POST',
            body: JSON.stringify({
                conversation: {
                    conversations: data.conversations,
                    email: data.email
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
          })
          .then(res => res.json())
          .then(data => {
            const val = JSON.stringify(data);
            localStorage.setItem('details', val);
            setUser(val);
            setSelectedContacts([]);
            closeModal();
          })
          .catch(err => console.log("Error in creating conversation"));
        }
      }
  }

    return (
      <div>
        <Modal.Header closeButton>
          Create Conversation
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submitHandler}>
              {data.contacts.map(contact => (
                <Form.Group controlId={contact.email} key={contact.email}>
                    <Form.Check 
                      type="checkbox"
                      label={contact.name}
                      value={selectedContacts.includes(contact.email)}
                      onChange={() => checkboxChangeHandler(contact)}
                    />
                </Form.Group>
              ))}
              <Button variant="success" type="submit">Create</Button>
            </Form>
          </Modal.Body>
        </div>
    )
}
