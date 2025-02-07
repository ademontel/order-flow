import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">
          Desarrollado por{' '}
          <a href="https://github.com/ademontel" target="_blank" rel="noopener noreferrer">
            github.com/ademontel
          </a>{' '}
          | Licencia MIT
        </span>
      </div>
    </footer>
  );
};

export default Footer;