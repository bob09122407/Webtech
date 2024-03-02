import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './adminpage.css';
import { BASE_URL } from '../../apiConfig';
function AdminPage() {
  const [createProduct, setCreateProduct] = useState({
    name: '',
    user: '',
    ratings:'',
    price: 0,
    description: '',
    category: '',
    images: {
      public_id: '',
      url: '',
    },
  });

  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');

    if (!isAuthenticated) {
      navigate('/adminlogin');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Fetch the list of products on component mount
    fetchProductList();
    // console.log(productList);
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/products`);
      console.log(response);
      setProductList(response.data.Products);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  const handleCreateInputChange = (e) => {
    const { id, value } = e.target;
    setCreateProduct({ ...createProduct, [id]: value });
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/product/new`, createProduct);
      console.log('Product created successfully:', response.data);

      // Reset form after successful submission
      setCreateProduct({
        name: '',
        price: 0,
        user: '',
        ratings:'',
        description: '',
        category: '',
        images: {
          public_id: '',
          url: '',
        },
      });

      // Refresh the product list
      fetchProductList();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/admin/product/${productId}`);
      console.log('Product deleted successfully:', response.data);

      // Refresh the product list
      fetchProductList();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="containerpage">
      <div className="btn-container">
        <button className="btn btn-create" onClick={() => handleCreateSubmit()}>
          Create Product
        </button>
      </div>

      <div className="product-form">
      <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={createProduct.name}
            onChange={handleCreateInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Product Price:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={createProduct.price}
            onChange={handleCreateInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ratings">Product Rating:</label>
          <input
            type="number"
            id="ratings"
            className="form-control"
            value={createProduct.ratings}
            onChange={handleCreateInputChange}
          />
        </div>
     
        <div className="form-group">
          <label htmlFor="description">Product Description:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={createProduct.description}
            onChange={handleCreateInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Product Category:</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={createProduct.category}
            onChange={handleCreateInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="public_id">Image Public ID:</label>
          <input
            type="text"
            id="public_id"
            className="form-control"
            value={createProduct.images.public_id}
            onChange={(e) =>
              setCreateProduct({
                ...createProduct,
                images: { ...createProduct.images, public_id: e.target.value },
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">Image URL:</label>
          <input
            type="text"
            id="url"
            className="form-control"
            value={createProduct.images.url}
            onChange={(e) =>
              setCreateProduct({
                ...createProduct,
                images: { ...createProduct.images, url: e.target.value },
              })
            }
          />
        </div>
        {/* Add other form fields as needed */}
        <button className="btn btn-submit" onClick={() => handleCreateSubmit()}>
          Create
        </button>
      </div>
    

      <div className="product-list">
        <h2>Delete Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
