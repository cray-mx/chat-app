import React, { useState, useEffect, useContext } from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import io from 'socket.io-client';
import {ConversationIdContext} from '../contexts/conversationIdContext';
import {Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const endpoint = 'http://192.168.15.5:5000/';
const socket = io(endpoint);

function openConversations() {

    let user = JSON.parse(localStorage.getItem('details'));

    const {conversationSelectedId} = useContext(ConversationIdContext);

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [conversations, setConversations] = useState([]);
    const [msgConversations, setMsgConversations] = useState([]);
    const [showMessages, setShowMessages] = useState(false);

    useEffect(() => {    
        socket.on('server-msg', msgObject => {
            user.messages.push({
                sender: msgObject.sender,
                senderEmail: msgObject.senderEmail,
                message: msgObject.message,         
            });
            setMessages([...user.messages]);
            localStorage.setItem('details', JSON.stringify(user));
            setMsgConversations([...msgObject.conversations, {
                name: msgObject.sender,
                email: msgObject.senderEmail
            }]);  
        });
        user.messages = []
        localStorage.setItem('details', JSON.stringify(user));
        const msgObject = {
            senderEmail: user.email
        };
        socket.emit('join', msgObject);
    },[]);

    useEffect(() => {
        if(conversations.length>0 && msgConversations.length>0){
            console.log(conversations);
            console.log(msgConversations);
            if(JSON.stringify(conversations) === JSON.stringify(msgConversations))
                setShowMessages(true);
        }
    }, [conversations, msgConversations]);

    const submitMessage = (e) => {
        e.preventDefault();
        const msgObject = {
            message: text,
            sender: user.name,
            senderEmail: user.email,
            conversations: [...user.conversations[conversationSelectedId]]
        };
        socket.emit('client-msg', msgObject);
        setConversations([...user.conversations[conversationSelectedId], {
        name: user.name,
        email: user.email
        }]);
        setText('');
  }

  const conversationsMain = [...user.conversations[conversationSelectedId]];

    return (
        <div className="d-flex flex-column flex-grow-1">
           <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {conversationsMain.map(conversation => {
                       user.messages.map((messageObject,index) => {
                                if(messageObject.senderEmail === conversation.email){
                                    return (
                                    <div key={index}>
                                        {messageObject.message}
                                    </div>
                                )}       
                            })
                        })
                   }
                </div>
           </div>
           <Form onSubmit={submitMessage}>
               <Form.Group className="m-2">
                   <InputGroup>
                        <Form.Control
                        as="textarea"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{height: '75px', resize:'none',borderTopLeftRadius:'20px'}}
                        className="msg-box"
                         />
                         <InputGroup.Append>
                             <Button 
                             variant="contained" 
                             color="primary"  
                             type="submit"
                             endIcon={<SendIcon />}
                             >
                             Send
                             </Button>
                         </InputGroup.Append>
                   </InputGroup>
               </Form.Group>
           </Form>
        </div>
    )
}

export default openConversations;
