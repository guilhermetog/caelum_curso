import React from 'react';
import {
    Switch, Route} from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/LoginPage'

const Roteamento = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="*" component={()=>(<div>Pagina 404</div>)}/>
        </Switch>
    )
}

export default Roteamento