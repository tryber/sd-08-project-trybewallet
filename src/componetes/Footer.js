import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const urlInstagram = 'https://www.instagram.com/maarceelasoouza/?hl=pt-br';
  const logoInstagram = 'https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png';
  const urlTwitter = 'https://twitter.com/MARCELA40843256';
  const logoTwitter = 'https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-2-1.png';
  const urlGithub = 'https://github.com/MarcelaSouza1995';
  const logoGithub = 'https://image.flaticon.com/icons/png/512/25/25231.png';
  const urlLinkedin = 'https://www.linkedin.com/in/marcela-souza-834696153/';
  const logoLinkedin = 'https://image.flaticon.com/icons/png/512/174/174857.png';
  const urlWpp = 'https://api.whatsapp.com/send?phone=5531997804875&text=Marcela%20Souza';
  const logoWpp = 'https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1-1.png';
  return (
    <div className="footer">
      <span className="texto-footer">
        Desenvolvido por Marcela Souza estudande
        de desenvolvimento de software da Trybe!
      </span>
      <div className="box">
        <a href={ urlInstagram } target="_blank" rel="noreferrer">
          <img src={ logoInstagram } alt="logo instagram" className="logo" />
        </a>
        <a href={ urlTwitter } target="_blank" rel="noreferrer">
          <img src={ logoTwitter } alt="logo twitter" className="logo" />
        </a>
        <a href={ urlGithub } target="_blank" rel="noreferrer">
          <img src={ logoGithub } alt="logo github" className="logo" />
        </a>
        <a href={ urlLinkedin } target="_blank" rel="noreferrer">
          <img src={ logoLinkedin } alt="logo linkedin" className="logo" />
        </a>
        <a href={ urlWpp } target="_blank" rel="noreferrer">
          <img src={ logoWpp } alt="logo whatsapp" className="logo" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
