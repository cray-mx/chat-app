import React from 'react';

export default function chat() {

    return (
        <div>
            <h2>Welcome {localStorage.getItem('name')}</h2> 
        </div>
    )
}
