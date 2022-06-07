import React from 'react';
import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import LoginPage from './features/home/LoginPage';
import PrivateRoute from './app/PrivateRoute';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
        <Container>
            <PrivateRoute exact path='/' component={App} />
            <Route path='/login' component={LoginPage} />
        </Container>
    </BrowserRouter>
    , document.getElementById('root'));