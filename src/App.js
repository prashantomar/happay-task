import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import NotFound from './pages/NotFound';
import { loadList } from './app/reducers/productsSlice';
import { useDispatch } from 'react-redux';
import products from './products.json'
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();

  const draftData = JSON.parse(localStorage.getItem('productsList')) || []
  console.log(draftData)
  const  dataToSent = draftData.length ? draftData : products.map(e=>({...e,quantity:0}))
  useEffect(() => {
    dispatch(loadList(dataToSent))

  })


  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} >
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" component={<NotFound />} />
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
