import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/LoginPage'

function estaValidado(){
    if(window.localStorage.getItem('TOKEN')){
        return true
    }
    return false
}

class PrivateRoute extends Component{
    render(){
        if(estaValidado()){
            return(
                <Route {...this.props}/>
            )
        }
        return (
            <Redirect to='/login'/>
        )
    }
}

const Roteamento = () => {
    return(
        <Switch>
            <PrivateRoute path="/" exact component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="*" component={()=>(<div>Pagina 404</div>)}/>
        </Switch>
    )
}

export default Roteamento