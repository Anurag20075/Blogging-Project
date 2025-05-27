import React from 'react';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <h1>Blog Header</h1>
      <nav>
        <a href="/" style={{ marginRight: '10px' }}>Home</a>
        <a href="/login" style={{ marginRight: '10px' }}>Login</a>
        <a href="/register">Register</a>
        {/* Add other common links if desired */}
      </nav>
    </header>
  );
};

export default Header;
