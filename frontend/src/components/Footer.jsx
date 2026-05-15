// components/Footer.jsx
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <FooterCol title="Asador Artesano">
          <li className="footer-brand-desc">
            Cocina de calidad, 100% artesanal
          </li>
        </FooterCol>

        <FooterCol title="Navegar">
          <FooterLink to="/">Inicio</FooterLink>
          <FooterLink to="/carta">Carta</FooterLink>
          <FooterLink to="/quienes-somos">Quiénes somos</FooterLink>
        </FooterCol>
        
        {/* 
        <FooterCol title="Mi cuenta">
          <FooterLink to="/login">Iniciar sesión</FooterLink>
          <FooterLink to="/registro">Registrarse</FooterLink>
          <FooterLink to="/pedidos">Mis pedidos</FooterLink>
          <FooterLink to="/favoritos">Favoritos</FooterLink>
        </FooterCol>*/}

        <FooterCol title="Contacto">
          <li className="footer-contact-item"> Calle Las Cañadillas 1, Tarazona de la Mancha</li>
          <li className="footer-contact-item"> +34 606 38 09 40</li>
        </FooterCol>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} Asador Artesano · Todos los derechos reservados
        </span>
        <span className="footer-dev">
          Desarrollado por Claudia Moraga Cruz
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="footer-col">
      <h4 className="footer-col-title">{title}</h4>
      <ul className="footer-col-list">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="footer-link">{children}</Link>
    </li>
  );
}