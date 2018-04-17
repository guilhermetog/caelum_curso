import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';


import Roteamento from './routes'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


//Redux
import store from './store'
import {Provider} from 'react-redux'

//Roteador
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Roteamento/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));



registerServiceWorker();
