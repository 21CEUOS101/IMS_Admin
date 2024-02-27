import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from './components/ui/toaster';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
        <Toaster />
    </>
);