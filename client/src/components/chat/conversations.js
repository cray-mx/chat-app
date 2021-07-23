import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import {ConversationIdContext} from '../contexts/conversationIdContext';

function Conversations() {

    const {conversationSelectedId, setConversationSelectedId} = useContext(ConversationIdContext);

    const user = JSON.parse(localStorage.getItem('details'))
    return (
        <ListGroup variant="flush">
           {user.conversations ? user.conversations.map((conversation,index) => (
               <ListGroup.Item 
               key={index}
               action
               active={index === conversationSelectedId}
               onClick={() => setConversationSelectedId(index)}
               >
               {conversation.map(conv => conv.name).join(', ')}
               </ListGroup.Item>
           )) : null}
        </ListGroup>
    )
}

export default Conversations;
