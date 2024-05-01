import React from 'react';
import '../css/button.css';

export const Button = (props) => {
  return (
    <button className={`button
      ${props.operation ? 'operation' : ''}
      ${props.double ? 'double' : ''}
      ${props.triple ? 'triple' : ''}`}  // Adiciona classes dinamicamente com base nas propriedades do botão
      onClick={e => props.click && props.click(props.label)}>
      {props.label}
    </button>
  );
};

