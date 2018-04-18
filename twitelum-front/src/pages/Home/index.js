import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetPadrao'
import Modal from '../../components/Modal'
import * as TweetsAPI from '../../apis/TweetsAPI'

class Home extends Component {
    constructor(){
        super()
        
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }

        this.adicionarTweet = this.adicionarTweet.bind(this)
    }

    componentWillMount(){
        TweetsAPI.carrega()
        this.context.store.subscribe(()=>{
            this.setState({
                tweets : this.context.store.getState(),
                novoTweet: ''
            })
        })
    }

    componentDidMount(){
        this.context.store.dispatch(TweetsAPI.carrega())
    }

    adicionarTweet(evento){
        evento.preventDefault()

        const novoTweet = this.state.novoTweet
        this.context.store.dispatch(TweetsAPI.adiciona(novoTweet))
    }

    abreModalparaTweet = (event, IDTweetSelecionado) => {
        if(event.target.closest('.tweet__footer')){
            return false
        }

        this.setState({
            tweetAtivo: this.state.tweets.find(tweet => tweet._id === IDTweetSelecionado)
        })
    }

    fechaModal = (event) => {
        event.target.closest('.tweet') ||
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

Home.contextTypes = {
    store: PropTypes.object.isRequired
}

export default Home;
