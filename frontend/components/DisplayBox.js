import React from 'react';
import { Link } from 'react-router-dom';

const DisplayBox = ({ experiment }) => {
  return (
    <Link to={`/experiment/${experiment.id}`} className="box">
      <h3>{experiment.name}</h3>
      <h4>ID: {experiment.id}</h4>
      <p>{experiment.description}</p>
    </Link>
  );
};

export default DisplayBox;
