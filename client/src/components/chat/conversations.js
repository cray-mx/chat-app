import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function Conversations() {

    const [conversationSelectedId, setConversationSelectedId] = useState(0);

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

export default Conversations
