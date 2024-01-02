import React, { useState, useEffect } from 'react';
import monitorData from './ty.json';

const App = () => {
  const MonitorCard = ({ title, content, price, reviewCount, pageLink, image }) => (
    <div className="card">
      <img src={image} alt={title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Price: {price.split(',')[0].replace(/\./g, '').replace(/\s*TL$/, '')}</p>
      <p>Reviews: {reviewCount}</p>
      <a href={`https://www.trendyol.com${pageLink}`} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    </div>
  );

  return (
    <div className="app">
      {monitorData.map((monitor, index) => (
        <MonitorCard key={index} {...monitor} />
      ))}
    </div>
  );
};

export default App;