import React from 'react';
import {Link } from 'react-router-dom';

const Button = (props) => {
  if (props.url) {
    return (
      <Link to={props.url} className={`btn ${props.class}`}>
        {props.text}
      </Link>
    );
  }

  
};

export default Button;