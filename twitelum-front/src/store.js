import {createStore, applyMiddleware, combineReducers} from 'redux'
import Thunk from 'redux-thunk'

function tweetsReducer(state = {lista: [], tweetAtivo: {}}, action = {}){

    if(action.type === 'CARREGA_TWEETS'){
        return {
                ...state,
                 lista: action.tweets
        }
    }

    if(action.type === 'ADICIONA_TWEET'){
        return {
            ...state,
            lista: [action.tweet, ...state.lista]
        }
    }

    if(action.type === 'REMOVE_TWEET'){
        const listaDeTweets =  state.lista.filter(tweet => tweet._id !== action.id)
        return {
            ...state,
            lista: listaDeTweets
        }
    }

    if(action.type === 'ADICIONA_TWEET_ATIVO'){
        const tweet = state.lista.find(tweet => tweet._id === action.tweet)
        return {
            ...state,
            tweetAtivo: tweet
        }
    }

    if(action.type === 'REMOVE_TWEET_ATIVO'){
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if(action.type === 'LIKE'){
        const novaLista = state.lista.map(tweet => {
            if(tweet._id === action.tweetID){
                const {likeado, totalLikes} = tweet
                tweet.likeado = !likeado
                tweet.totalLikes = !likeado ? totalLikes + 1 : totalLikes - 1
            }
            return tweet
        })

        return {
            ...state,
            lista: novaLista
        }
    }

    return state
}

function notificacaoReducer(state='', action={}){
    if(action.type === 'ADD_NOTIFICACAO'){
        state = action.notificacao
    }

    if(action.type === 'REMOVE_NOTIFICACAO'){
        state = ''
    }

    return state
}

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacaoReducer}), 
    applyMiddleware(Thunk)
)

export default store