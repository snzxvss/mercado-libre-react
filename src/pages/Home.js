import React, { useState, useEffect } from 'react';
import '../assets/styles/global-style.css';
import Sidebar from '../components/SideBar';
import ProductTable from '../components/ProductTable';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.results);
        setTotalItems(data.results.length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [offset]);

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    setOffset(Math.min(totalItems - limit, offset + limit));
  };

  return (
    <div className="full-container">
      <div className="header">
        <h1>Cliente CS3</h1>
      </div>
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <ProductTable
          products={products}
          loading={loading}
          offset={offset}
          limit={limit}
        />
        <div className="pagination">
          {`${offset + 1}-${Math.min(offset + limit, totalItems)} de ${totalItems}`}
          <button onClick={handlePrevious} disabled={offset === 0}>&lt;</button>
          <button onClick={handleNext} disabled={offset + limit >= totalItems}>&gt;</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
