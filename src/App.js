import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import Navbar from './layout/Navbar';
import app from './firebase/firebase';
import './index.css';
import './App.css';

// Events Pages
import Revenue from './financials/revenue';
import Overview from './financials/overview';
import Costs from './financials/cost';

import AddProduct from './products/add';
import ProductsCatalog from './products/view';
import SpecificProduct from './products/spec/pid';

import AddReport from './employees/report/eid'
import EmployeeCatalog from './employees/view'

import Land from './home/land';
import Home from './home/home';
import Cost from './financials/cost';



const Creds = 


function App() {

  const [auth, setAuth] = useState(Creds)
  
  onAuthStateChanged(getAuth(app), user => {
    if(user) {
      setAuth(Creds)
    } else {
      setAuth(Newbie)
    }
  })

  return (
    <RouterProvider router={auth} />
  )
}

export default App;
