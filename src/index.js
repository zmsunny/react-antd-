import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'
import './modules/config'
import 'antd/dist/antd.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store = {store} >
        <Router/>
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
