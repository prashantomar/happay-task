import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <Navbar />
            <div className='main-container'>
            <Outlet />
            </div>
            
        </>

    )
}

export default Dashboard