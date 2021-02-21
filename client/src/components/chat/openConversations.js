import React, { useRef, useState, useEffect, useContext } from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import io from 'socket.io-client';
import {ConversationIdContext} from '../contexts/conversationIdContext';

const endpoint = 'http://192.168.15.5:5000/';
const socket = io(endpoint);

function openConversations() {

    const user = JSON.parse(localStorage.getItem('details'));

    const {conversationSelectedId} = useContext(ConversationIdContext);

    const [text, setText] = useState('');
    const chatRef = useRef();

    useEffect(() => {    
        socket.on('server-msg', msgObject => {
            console.log(msgObject.message + " sent by " + msgObject.sender);
            console.log(msgObject.senderEmail);
        });
         const msgObject = {
            senderEmail: user.email
        };
        socket.emit('join', msgObject);
    },[]);

    const submitMessage = (e) => {
        e.preventDefault();
        const msgObject = {
            message: chatRef.current.value,
            sender: user.name,
            senderEmail: user.email,
            conversations: user.conversations[conversationSelectedId]
        };
        socket.emit('client-msg', msgObject);
  }
  
    return (
        <div className="d-flex flex-column flex-grow-1">
           <div className="flex-grow-1 overflow-auto">
                Messages
           </div>
           <Form onSubmit={submitMessage}>
               <Form.Group className="m-2">
                   <InputGroup>
                        <Form.Control 
                        as="textarea"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{height: '75px', resize:'none',}}
                        ref={chatRef}
                        className="msg-box"
                         />
                         <InputGroup.Append>
                             <Button variant="primary" type="submit">Send</Button>
                         </InputGroup.Append>
                   </InputGroup>
               </Form.Group>
           </Form>
        </div>
    )
}

export default openConversations;
