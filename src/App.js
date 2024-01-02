import React, { useState, useEffect } from 'react';
import monitorData from './ty.json';

const App = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const comparePrices = (a, b) => {
    const priceA = parseFloat(a.price.split(',')[0].replace(/\./g, '').replace(/\s*TL$/, ''));
    const priceB = parseFloat(b.price.split(',')[0].replace(/\./g, '').replace(/\s*TL$/, ''));
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  };

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

  const filteredMonitors = monitorData
    .filter((monitor) => {
      const monitorPrice = parseFloat(monitor.price.split(',')[0].replace(/\./g, '').replace(/\s*TL$/, ''));
      const min = minPrice === '' ? Number.MIN_SAFE_INTEGER : parseFloat(minPrice);
      const max = maxPrice === '' ? Number.MAX_SAFE_INTEGER : parseFloat(maxPrice);
      return monitorPrice >= min && monitorPrice <= max;
    })
    .sort(comparePrices);

  return (
    <div className="app">
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input type="text" id="minPrice" value={minPrice} onChange={handleMinPriceChange} />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="text" id="maxPrice" value={maxPrice} onChange={handleMaxPriceChange} />
      </div>
      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {filteredMonitors.map((monitor, index) => (
        <MonitorCard key={index} {...monitor} />
      ))}
    </div>
  );
};

export default App;