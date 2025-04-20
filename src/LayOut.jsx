import React from 'react'
import { Outlet } from 'react-router-dom'

function LayOut() {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default LayOut