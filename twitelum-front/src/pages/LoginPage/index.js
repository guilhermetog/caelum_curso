import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {
    constructor(){
        super()
        this.state = {
            erroMsg: ''
        }

        this.enviarLogin = this.enviarLogin.bind(this)
    }

    enviarLogin(event) {
        event.preventDefault()
        const login = this.inputLogin.value
        const senha = this.inputSenha.value

        const infosDoUsuario = {
            login: login,
            senha
        }

        fetch("http://localhost:3001/login",{
            method: 'POST',
            body: JSON.stringify(infosDoUsuario),
        },)
        .then((respostaDoServer) => { 
            if(!respostaDoServer.ok){
                this.setState({erro: true})
            }else{
                this.setState({erro: false})
            }
            return respostaDoServer.json()
        })
        .then((respostaPronta)=>{
            if(this.state.erro){
                this.setState({erroMsg: respostaPronta.message})
            }
            else{
                localStorage.setItem("TOKEN", respostaPronta.token)
                localStorage.setItem("login",login)
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.enviarLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input className="loginPage__input" 
                                        type="text" 
                                        id="login" 
                                        ref={(inputLogin)=>{this.inputLogin = inputLogin}}            
                                        name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input className="loginPage__input" 
                                        type="password" 
                                        id="senha" 
                                        ref={(inputSenha)=>{this.inputSenha = inputSenha}}
                                        name="senha"/>
                            </div>
                            {this.state.erro? <div className="loginPage__errorBox">
                                {this.state.erroMsg}
                             </div>:''}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage