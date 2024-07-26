import React from 'react';
import ReactDOM from 'react-dom';
import {env} from './constants/common';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import configureStore from "./store";
import { setCurrentUser } from './Actions/loginActions'
import { Provider } from "react-redux";
import { ActionCableProvider } from 'react-actioncable-provider';
import * as serviceWorker from './serviceWorker';
import jwtdecode from 'jwt-decode';
import "react-datepicker/dist/react-datepicker.css";



const store = configureStore();
if(localStorage.accessToken) {
    store.dispatch(setCurrentUser(jwtdecode(localStorage.accessToken)))
}

ReactDOM.render(
    <ActionCableProvider url={env.REACT_APP_CABLE_URL}>
		<BrowserRouter>
	        <Provider store={configureStore()}>    
	            <App />
	        </Provider>
        </BrowserRouter>
    </ActionCableProvider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
