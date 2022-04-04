import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Create from './containers/Create/Create';
import Update from './containers/Update/Update';
const BASE_URL = process.env.REACT_APP_API_URL;
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App value={BASE_URL} />} />
                <Route
                    path="/create"
                    element={<Create value={BASE_URL} />}
                ></Route>
                <Route
                    path="/edit/:id"
                    element={<Update value={BASE_URL} />}
                ></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
