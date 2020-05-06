import React                          from 'react';
import ReactDOM                       from 'react-dom';
import reducer                        from './reducers';
import './index.css';
import MessagesIndex                  from "./components/messages_index";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools}          from 'redux-devtools-extension';
import {Provider}                     from 'react-redux';
import thunk                          from "redux-thunk";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker             from './serviceWorker';

import Container  from '@material-ui/core/Container';
import AppBar     from '@material-ui/core/AppBar';
import Toolbar    from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const middleware = [thunk];
const enhancer   = process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : applyMiddleware(...middleware);
const store      = createStore(
    reducer,
    enhancer
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Chatroom
                    </Typography>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={MessagesIndex}/>
                <Route exact path="/messages" component={MessagesIndex}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
