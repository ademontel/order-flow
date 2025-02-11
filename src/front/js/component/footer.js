import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto align-items-center">
      <div className="text-center">
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