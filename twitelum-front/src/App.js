import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
    constructor(){
        super()
        
        this.state = {
            novoTweet: '',
            tweets: []
        }

        this.adicionarTweet = this.adicionarTweet.bind(this)
    }

    adicionarTweet(evento){
        evento.preventDefault()

        this.setState({tweets: [this.state.novoTweet ,...this.state.tweets]})
    }

    render() {
        return (
            <Fragment>
            <Cabecalho>
                <NavMenu usuario="@omariosouto" />
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
                        {this.state.tweets.map((tweet,indice)=> <Tweet key={indice} texto={tweet}/>)}
                            
                        </div>
                    </Widget>
                </Dashboard>
            </div>
            </Fragment>
        );
    }
}

export default App;
