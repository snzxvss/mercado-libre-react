import React from 'react';

const ProductTable = ({ products, loading, offset, limit }) => {

  const hasSingleProduct = products.length === 1;

  let emptyRows = 0;
  if (products.length === 1) {
    emptyRows = 2;
  } else if (products.length === 2) {
    emptyRows = 1; 
  }

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Producto Id</th>
            <th>Nombre producto</th>
            <th>Precio</th>
            <th>Enlace</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>

          {hasSingleProduct && (
            <tr style={{ fontWeight: 'bold' }}>
              <td>{products[0].id}</td>
              <td>{products[0].title}</td>
              <td>${products[0].price}</td>
              <td><a href={products[0].permalink}>Ver producto</a></td>
              <td><img src={products[0].thumbnail} alt={products[0].title} className="product-image" /></td>
            </tr>
          )}

          {emptyRows > 0 && (
            Array.from({ length: emptyRows }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))
          )}
          {loading && (
            Array.from({ length: limit }).map((_, index) => (
              <tr key={`skeleton-${index}`}>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
              </tr>
            ))
          )}
          {!loading && !hasSingleProduct && (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td><a class="link" href={product.permalink}>Ver producto</a></td>
                <td><img src={product.thumbnail} alt={product.title} className="product-image" /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
