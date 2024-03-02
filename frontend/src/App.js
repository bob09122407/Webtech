import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './component/Home/Home';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/footer';
import UserOptions from './component/layout/Header/UserOptions';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import ContactPage from './component/Contact/contact';
import LoginForm from './component/adminLogin/adminlogin';
import AdminHomePage from './component/AdminPage/adminpage';

function ProtectedRoute({ isAdmin, component: Component, ...rest }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return null; // or any loading indicator if desired
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === true && user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
}

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute component={Shipping} />} />
        <Route exact path="/order/confirm" element={<ProtectedRoute component={ConfirmOrder} />} />
     
       
        <Route exact path="/adminlogin" element={<LoginForm/>}/>
      <Route exact path="/adminpage" element={<AdminHomePage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
