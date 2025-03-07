import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastify = (message, options) => {
    toast(message, options);
};

const handleClick = () => {
    toastify('success !', { type: 'success' });
};

export { toastify, handleClick };