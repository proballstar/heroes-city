import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import Navbar from './layout/Navbar';
import app from './firebase/firebase';
import './index.css';
import './App.css';

// Events Pages
import CreateEvents from './events/create';
import ViewEvents from './events/read';
import SpecificEvent from './events/spec/eid';

import CreatePost from './posts/create';
import ViewPost from './posts/view';
import SpecificPost from './posts/spec/pid';

import Land from './home/land';
import Home from './home/home';

const Newbie = createBrowserRouter([
  {
    path: '/',
    element: (
      <Land />
    ),
  },
]);

const Creds = createBrowserRouter([
  {
    path: '/events/add',
    element: ( 
      <CreateEvents />
    ),
  },
  {
    path: '/events/read',
    element: ( 
      <ViewEvents />
    ),
  },
  {
    path: '/events/spec/:eid',
    element: ( 
      <SpecificEvent />
    ),
  },
  {
    path: '/posts/create',
    element: ( 
      <CreatePost />
    ),
  },
  {
    path: '/posts/read',
    element: ( 
      <ViewPost />
    ),
  },
  {
    path: '/posts/spec/:pid',
    element: ( 
      <SpecificPost />
    ),
  },  
  {
    path: '/',
    element: (
      <Home />
    ),
  }
]);


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
