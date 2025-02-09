import React from 'react';
import ReactDOM from 'react-dom/client';
import {Bounce, ToastContainer} from "react-toastify";
import App from './App';
import { Provider } from "react-redux"
import { store } from "./Redux/store";

import './Assets/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <App/>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
    </Provider>
);
