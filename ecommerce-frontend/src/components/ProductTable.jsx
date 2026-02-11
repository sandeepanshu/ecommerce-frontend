import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table
      width="100%"
      style={{
        marginTop: 20,
        borderCollapse: "collapse",
        background: "#fff"
      }}
    >
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}>MRP</th>
          <th style={thStyle}>Distributor Rate</th>
          <th style={thStyle}>Retailer Price</th>
          <th style={thStyle}>UOM</th>
          <th style={thStyle}>CRT</th>
          <th style={thStyle}>Price</th>
          <th style={thStyle}>Stock</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="10" style={{ textAlign: "center", padding: 20 }}>
              No Products Found
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product._id}>
              <td style={tdStyle}>{product.title}</td>
              <td style={tdStyle}>{product.category}</td>
              <td style={tdStyle}>₹{product.mrp}</td>
              <td style={tdStyle}>₹{product.distributorRate}</td>
              <td style={tdStyle}>₹{product.retailerPrice}</td>
              <td style={tdStyle}>
                {product.uom} {product.uomUnit}
              </td>
              <td style={tdStyle}>{product.crt}</td>
              <td style={tdStyle}>₹{product.price}</td>
              <td style={tdStyle}>{product.stock}</td>
              <td style={tdStyle}>
                <button
                  style={editBtn}
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  style={deleteBtn}
                  onClick={() => onDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const thStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};

const editBtn = {
  marginRight: 8,
  padding: "4px 8px",
  background: "#1677ff",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "4px 8px",
  background: "#ff4d4f",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

export default ProductTable;
