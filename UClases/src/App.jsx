import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './components/routing/Routing';
import AuthProvider from '../src/auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <Routing />
        </AuthProvider>
    </React.StrictMode>,
);
