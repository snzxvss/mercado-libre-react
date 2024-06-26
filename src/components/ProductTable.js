import React from 'react';

const ProductTable = ({ products, loading, offset, limit }) => {
  // Verifica si hay un solo producto
  const hasSingleProduct = products.length === 1;

  // Calcula cuántas filas de espacios en blanco se necesitan para llenar la tabla
  let emptyRows = 0;
  if (products.length === 1) {
    emptyRows = 2; // Si hay un solo producto, se agregan 2 espacios en blanco
  } else if (products.length === 2) {
    emptyRows = 1; // Si hay dos productos, se agrega 1 espacio en blanco
  }

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Producto Id</th>
            <th>Nombre producto</th>
            <th>Precio</th>
            <th>Mercado</th>
            <th>Enlace</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderiza primero el producto único si existe */}
          {hasSingleProduct && (
            <tr style={{ fontWeight: 'bold' }}>
              <td>{products[0].id}</td>
              <td>{products[0].title}</td>
              <td>${products[0].price}</td>
              <td>Mercadolibre</td>
              <td><a href={products[0].permalink}>Ver producto</a></td>
              <td><img src={products[0].thumbnail} alt={products[0].title} className="product-image" /></td>
            </tr>
          )}

          {/* Renderiza espacios en blanco según la cantidad de productos */}
          {emptyRows > 0 && (
            Array.from({ length: emptyRows }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))
          )}

          {/* Renderiza los productos con skeleton durante la carga */}
          {loading && (
            Array.from({ length: limit }).map((_, index) => (
              <tr key={`skeleton-${index}`}>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
                <td className="skeleton-cell-container"><div className="skeleton-cell"></div></td>
              </tr>
            ))
          )}

          {/* Renderiza los productos reales cuando no está cargando */}
          {!loading && !hasSingleProduct && (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>Mercadolibre</td>
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
