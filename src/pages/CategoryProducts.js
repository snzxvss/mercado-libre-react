import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/global-style.css';
import Sidebar from '../components/SideBar';
import ProductTable from '../components/ProductTable';

const CategoryProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  const { category_id } = useParams();

  const categoryIds = useMemo(() => category_id ? category_id.split(',') : [], [category_id]);

  const handleNext = () => {
    const newOffset = offset + limit;
    if (newOffset < totalItems) {
      setOffset(newOffset);
      localStorage.setItem('currentOffset', newOffset.toString());
      localStorage.setItem('lastCategory', category_id);
    }
  };
  
  const handlePrevious = () => {
    const newOffset = Math.max(0, offset - limit);
    setOffset(newOffset);
    localStorage.setItem('currentOffset', newOffset.toString());
    localStorage.setItem('lastCategory', category_id);
  };

  useEffect(() => {
    setLoading(true);
    const lastCategory = localStorage.getItem('lastCategory');
    if (category_id !== lastCategory) {
      setOffset(0);
      localStorage.removeItem('currentOffset');
    } else {
      const savedOffset = parseInt(localStorage.getItem('currentOffset'), 10);
      if (!isNaN(savedOffset)) {
        setOffset(savedOffset);
      }
    }
    fetch('https://api.mercadolibre.com/sites/MLA/search?seller_id=179571326')
      .then(response => response.json())
      .then(data => {
        const allFilteredProducts = data.results.filter(product => categoryIds.includes(product.category_id));
        const productsToShow = allFilteredProducts.slice(offset, offset + limit);
        setFilteredProducts(productsToShow);
        setTotalItems(allFilteredProducts.length);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [categoryIds, offset, category_id]);

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
          products={filteredProducts}
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

export default CategoryProducts;