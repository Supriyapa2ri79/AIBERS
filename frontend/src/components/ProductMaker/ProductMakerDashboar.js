import React, { useState, useEffect } from "react";
import "./ProductMakerDashboard.css";

function ProductMakerDashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: "",
    product_code: "",
    roi: ""
  });
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetch("/api/products", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [jwt]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (form.product_name && form.product_code && form.roi) {
      fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
        body: JSON.stringify(form),
      })
      .then(res => res.json())
      .then(newProduct => {
        setProducts([...products, newProduct]);
        setForm({ product_name: "", product_code: "", roi: "" });
      });
    } else {
      alert("All fields required!");
    }
  };

  return (
    <div className="product-dashboard">
      <header>
        <h2>Maker Product Dashboard</h2>
        <div>
          Logged in as: <b>{user.username}</b> [{user.role}]
        </div>
      </header>
      <main>
        <section>
          <h3>Add New Product</h3>
          <input
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <input
            name="product_code"
            value={form.product_code}
            onChange={handleChange}
            placeholder="Product Code"
          />
          <input
            name="roi"
            value={form.roi}
            onChange={handleChange}
            placeholder="ROI"
            type="number"
          />
          <button onClick={handleCreate}>Add Product</button>
        </section>
        <section>
          <h3>My Products</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Code</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(p => p.maker === user.username)
                .map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.product_name}</td>
                    <td>{prod.product_code}</td>
                    <td>{prod.roi}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default ProductMakerDashboard;
