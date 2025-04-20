import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LayOut from './LayOut'
import './index.css'
import Home from './PAGES/home'
import React from 'react'
import Landing from './PAGES/landing'
import Container from './PAGES/container'
import HomeD from './PAGES/HomeD'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayOut />}>
      <Route path='/' element={<Home />} />
      <Route path='home' element={<Container />} >
      <Route path='' element={<HomeD />}/>
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
