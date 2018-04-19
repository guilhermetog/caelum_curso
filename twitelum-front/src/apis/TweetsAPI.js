export const carrega = () =>{
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
                .then((respostaDoServer)=>{
                    if(!respostaDoServer.ok){
                        throw new Error()
                    }
                    return respostaDoServer.json()
                })
                .then((tweetsDoServidor)=>{
                    dispatch({type:'CARREGA_TWEETS', tweets: tweetsDoServidor})
                })
                .catch((erro)=>{})
    }
}

export const adiciona = (novoTweet) =>{
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        {
            method: 'POST',
            body: JSON.stringify({conteudo: novoTweet})
        })
        .then((respostaDoServer)=>{
            return respostaDoServer.json()
        })
        .then((tweetDoServer)=>{
            dispatch({type: 'ADICIONA_TWEET', tweet: tweetDoServer})

            dispatch({type: 'ADD_NOTIFICACAO', notificacao: 'Tweet adicionado com sucesso!'})
            setTimeout(()=>{dispatch({type: 'REMOVE_NOTIFICACAO'})}, 2000)
        })
    }
}

export const remove = (tweet) =>{
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${tweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
            method: 'DELETE'
        })
        .then((respostaDoServer)=>{
            return respostaDoServer.json()
        }).then((tweetDoServer)=>{
            dispatch({type: 'REMOVE_TWEET', id: tweet})
            dispatch({type: 'REMOVE_TWEET_ATIVO'})

            dispatch({type: 'ADD_NOTIFICACAO', notificacao: 'Tweet removido com sucesso!'})
            setTimeout(()=>{dispatch({type: 'REMOVE_NOTIFICACAO'})}, 2000)
        })
    }
}

export const like = (tweetID, liker) =>{
    return (dispatch) =>{
        fetch(`http://localhost:3001/tweets/${tweetID}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {method: 'POST'})
        .then(resposta => resposta.json())
        .then(resposta => {
            dispatch({type: 'LIKE', tweetID, liker: resposta.liker})
        })
    }
}