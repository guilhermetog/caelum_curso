import React, { Component } from 'react'
import './navMenu.css'

class NavMenu extends Component {
    logoff = () =>{
        localStorage.removeItem('TOKEN')
    }
    render() {
        return (
            <nav className="navMenu">
                <ul className="navMenu__lista">
                <li className="navMenu__item">
                    <a className="navMenu__link">
                        Bem vindo(a): <br />
                        <strong>@{ this.props.usuario }</strong>
                    </a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" href="">Página Inicial</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link">Hashtags</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" onClick={this.logoff}>Logout</a>
                </li>
                </ul>
            </nav>
        )
    }
}

export default NavMenu