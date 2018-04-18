import {createStore, applyMiddleware} from 'redux'
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
        const novoestado =  state.lista.filter(tweet => tweet._id !== action.id)
        return {
            ...state,
            lista: novoestado
        }
    }

    return state
}

const store = createStore(
    tweetsReducer, 
    applyMiddleware(Thunk)
)

export default store