import React from 'react';
import '../css/button.css';

export const Button = (props) => {
  return (
    <button className='button' onClick={()=>console.log(props.label)}>{props.label}</button>
  );
};

