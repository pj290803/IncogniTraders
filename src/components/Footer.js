import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__info">
          <h4>Contact Us</h4>
          <p>Email: IncogniTraders@example.com</p>
          <p>Phone: 020 3000 4000</p>
        </div>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2023 IncogniTraders.com. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;