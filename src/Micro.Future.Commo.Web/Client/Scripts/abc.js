import React from 'react';
import ReactDOM from 'react-dom'; 
import Sample from './Sample';

window.onload=()=>{
    ReactDOM.render(<Sample />,document.querySelector('#app'));
};