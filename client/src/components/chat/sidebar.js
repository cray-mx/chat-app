import React, {useState} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap';
import Conversations from './conversations';
import Contacts from './contacts';
import NewContactModal from './newContactModal';
import NewConversationModal from './newConversationModal';

function Sidebar() {
    const data = JSON.parse(localStorage.getItem('details'));
    const [activeKey, setActiveKey] = useState('conversations');
    const conversationsOpen = activeKey === 'conversations';
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div style={{width:'300px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey='conversations'>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='contacts'>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey='conversations'>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey='contacts'>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small font-weight-bold" style={{fontSize: '12px'}}>
                    Your Email: <span className="text-muted">{data.email}</span>
                </div>
                <Button className="rounded-0" variant="success" onClick={() => setModalOpen(true)}>
                    New {conversationsOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal} style={{color:"black"}}>
                {conversationsOpen ? 
                    <NewConversationModal closeModal={closeModal} /> : 
                    <NewContactModal closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
}

export default Sidebar;
