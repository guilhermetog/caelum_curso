import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal';

class App extends Component {
    constructor(){
        super()
        
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }

        this.adicionarTweet = this.adicionarTweet.bind(this)
        this.removerTweet = this.removerTweet.bind(this)
    }

    componentDidMount(){
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then((respostaDoServer)=>{
            if(!respostaDoServer.ok){
                throw new Error()
            }
            return respostaDoServer.json()
        })
        .then((tweets)=>{
            this.setState({tweets: tweets})
        })
        .catch((erro)=>{})
    }

    adicionarTweet(evento){
        evento.preventDefault()

        const novoTweet = this.state.novoTweet

        if(novoTweet){
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
                method: 'POST',
                body: JSON.stringify({conteudo: novoTweet})
            })
            .then((respostaDoServer)=>{
                return respostaDoServer.json()
            })
            .then((tweetDoServer)=>{
                this.setState({tweets: [tweetDoServer,...this.state.tweets]})
                this.setState({novoTweet: ''})
            })
        }
    }

    removerTweet(tweet){
        fetch(`http://localhost:3001/tweets/${tweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
            method: 'DELETE'
        })
        .then((respostaDoServer)=>{
            if(respostaDoServer.ok){
              this.setState({tweets: this.state.tweets.filter(t => t._id !== tweet)})
            }
        })
    }

    abreModalparaTweet = (event, IDTweetSelecionado) => {

        console.log(event.target)
        if(event.target.closest('.tweet__footer')){
            return false
        }

        this.setState({
            tweetAtivo: this.state.tweets.find(tweet => tweet._id === IDTweetSelecionado)
        })
    }

    fechaModal = () => {
        this.setState({
            tweetAtivo: {}
        })
    }

    render() {
        return (
            <Fragment>
            <Cabecalho>
                <NavMenu usuario={localStorage.getItem('login')} />
            </Cabecalho>
            <div className="container">
                <Dashboard>
                    <Widget>
                        <form className="novoTweet" onSubmit={this.adicionarTweet}>
                            <div className="novoTweet__editorArea">
                                <span className={`novoTweet__status 
                                                ${this.state.novoTweet.length > 140
                                                ? 'novoTweet__status--invalido' :'' }`}>
                                                {this.state.novoTweet.length}/140
                                </span>
                                <textarea 
                                    className="novoTweet__editor" 
                                    placeholder="O que está acontecendo?"
                                    value={this.state.novoTweet}
                                    onChange={(event)=> this.setState({novoTweet: event.target.value})}></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="novoTweet__envia"
                                disabled={this.state.novoTweet.length > 140}>Tweetar</button>
                        </form>
                    </Widget>
                    <Widget>
                        <TrendsArea />
                    </Widget>
                </Dashboard>
                <Dashboard posicao="centro">
                    <Widget>
                        <div className="tweetsArea">
                            {this.state.tweets.map((tweet)=> 
                                <Tweet key={tweet._id} 
                                       tweetInfo={tweet} 
                                       removeHandler={(event)=>this.removerTweet(tweet._id)}
                                       abreModalHandler={(event) => this.abreModalparaTweet(event, tweet._id)}/>
                            )}
                            {this.state.tweets.length === 0?
                                'Compartilhe seus pensamentos!':''
                            }                          
                        </div>
                    </Widget>
                    <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
                        <Widget>
                            <Tweet key={this.state.tweetAtivo._id} 
                                   tweetInfo={this.state.tweetAtivo}
                                   tweetInModal = {true}
                                   removeHandler={(event)=>this.removerTweet(this.state.tweetAtivo._id)}/>
                        </Widget>
                    </Modal>
                </Dashboard>
            </div>
            </Fragment>
        );
    }
}

export default App;
