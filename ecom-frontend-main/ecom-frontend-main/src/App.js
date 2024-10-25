import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductTable from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import AllProducts from './components/AllProducts';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/categories" element={<ProductTable />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/productlist" element={<AllProducts />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
