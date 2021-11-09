import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import {
  FooterStyled,
  FooterUnorderedListStyled,
  FooterListStyled,
  FooterIconStyled,
} from './Footer.styles';

const Footer = () => {
  return (
    <FooterStyled>
      <Row>
        <Col xs={12} md={6}>
          <FooterUnorderedListStyled>
            <FooterListStyled className='pt-3'>
              Built with ❤️ for 🍦🍦
            </FooterListStyled>
            <FooterListStyled>
              දිරිගැන්වීමට ස්තුතියි, නදුන්. මම ඔබට සුභ පතනවා!
            </FooterListStyled>
          </FooterUnorderedListStyled>
        </Col>
        <Col xs={12} md={6}>
          <FooterUnorderedListStyled>
            <FooterListStyled className='pt-3'>Contact Me:</FooterListStyled>
            <FooterListStyled>
              <FooterIconStyled>
                <a
                  href='https://github.com/Paddlepop25/mern-robots'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaGithub />
                </a>
                <a
                  href='https://www.linkedin.com/in/lindahsu007/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedin />
                </a>
                <a
                  href='https://www.instagram.com/shecodeshsucodes/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagramSquare />
                </a>
              </FooterIconStyled>
            </FooterListStyled>
          </FooterUnorderedListStyled>
        </Col>
      </Row>
    </FooterStyled>
  );
};

export default Footer;
