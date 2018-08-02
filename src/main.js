import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import './common/theme.less';
import App from './routes/app';

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
),  document.getElementById('app'));