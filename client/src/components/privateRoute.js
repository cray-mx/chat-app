import React, {useContext}from 'react';
import { Route , Redirect} from 'react-router-dom';
import { UserContext } from './userContext';

function privateRoute({component: Component, ...rest}) {

    const {user} = useContext(UserContext);

    return (
        <Route {...rest} render={props => {
            return user || localStorage.getItem('name') ? <Component /> : <Redirect to="/login" />
            }
        }/>
    )
}

export default privateRoute;
