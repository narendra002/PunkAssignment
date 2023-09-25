// src/main.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filterBeer = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="text-center py-4">
        <h1 className="text-3xl font-semibold">Punk Beers</h1>
        <input
          type="text"
          className="mt-4 p-2 w-full rounded-md border border-gray-300"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filterBeer.map((beer) => (
          <div
            key={beer.id}
            className="bg-white rounded-md shadow-md p-4 flex flex-col"
          >
            <img
              src={beer.image_url}
              alt={beer.name}
              className="h-48 object-contain mb-2 "
            />
            <h2 className="text-lg font-semibold">{beer.name}</h2>
            <p className="text-gray-500 mt-2">{beer.tagline}</p>
            <p className="mt-2">
              <strong>ABV:</strong> {beer.abv}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
