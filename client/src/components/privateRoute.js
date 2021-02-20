import React, {useContext}from 'react';
import { Route , Redirect} from 'react-router-dom';
import { UserContext } from './contexts/userContext';

function privateRoute({component: Component, ...rest}) {

    const {user} = useContext(UserContext);

    return (
        <Route {...rest} render={props => {
            return user || localStorage.getItem('details') ? <Component /> : <Redirect to="/login" />
            }
        }/>
    )
}

export default privateRoute;
