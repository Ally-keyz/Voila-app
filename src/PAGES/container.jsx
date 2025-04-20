import React from 'react'
import { Outlet } from 'react-router-dom'
import Landing from './landing'


function Container() {
  return (
    <Landing>
        <Outlet />
    </Landing>
  )
}

export default Container