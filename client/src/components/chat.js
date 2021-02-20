import React from 'react';
import Sidebar from './chat/sidebar';

export default function Chat() {

    return (
        <div className="chat">
            <div className="d-flex" style={{height: '100vh'}}>
                <Sidebar />
            </div>
        </div> 
    )
}
