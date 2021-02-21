import React, {useState, useContext, useEffect} from 'react';
import OpenConversations from './chat/openConversations';
import Sidebar from './chat/sidebar';
import { ConversationIdContext } from './contexts/conversationIdContext';
import { UserContext } from './contexts/userContext';

export default function Chat() {

    const [conversationSelectedId, setConversationSelectedId] = useState(0);

    const {setUser} = useContext(UserContext);

    const data = JSON.parse(localStorage.getItem('details'));

    useEffect(() => {
        fetch('http://192.168.15.5:5000/getData', {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
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
            localStorage.setItem('details', val);
            console.log(val);
            setUser(val);
        }})
        .catch(err => console.log("Error in fetching latest info"));
    }, []);

    return (
        <ConversationIdContext.Provider value={{conversationSelectedId, setConversationSelectedId}}>
            <div className="chat">
                <div className="d-flex" style={{height: '100vh'}}>
                    <Sidebar />
                    <OpenConversations />
                </div>
            </div>
        </ConversationIdContext.Provider>
    )
}
