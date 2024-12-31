import React from 'react'

const HeaderComponent = () => {
  return (
        <div>
        <header>
            <nav className='navbar navbar-light bg-light'>
                <a className='navbar-brand' href="#">Employee Management System</a>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <a className='nav-link active' href="/employees">Employees</a>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent