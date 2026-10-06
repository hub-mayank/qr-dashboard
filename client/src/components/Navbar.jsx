import React from 'react'

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="8" />
          <path d="M7 7h7v7H7zM18 7h7v7h-7zM7 18h7v7H7zM18 18h3v3h-3zM22 22h3v3h-3zM18 24h2v1h-2z" />
        </svg>
        <span className="brand-name">QR Dashboard</span>
      </div>
    </header>
  )
}

export default Navbar
