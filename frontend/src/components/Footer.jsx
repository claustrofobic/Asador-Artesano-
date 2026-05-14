// components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: '#3d2010',
      color: '#f5ede0',
      fontFamily: "'Crimson Text', serif",
      padding: '2.5rem 2rem 1.2rem',
    }}>
      

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'rgba(245,237,224,0.45)', fontStyle: 'italic' }}>
          © {new Date().getFullYear()} Asador Artesano · Todos los derechos reservados
        </span>
        <span style={{ fontSize: '0.78rem', color: 'rgba(245,237,224,0.35)', letterSpacing: '0.05em' }}>
          Desarrollado por Claudia Moraga Cruz
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#c8a06a',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: '0 0 0.7rem',
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li style={{ marginBottom: '0.35rem' }}>
      <Link to={to} style={{ color: 'rgba(245,237,224,0.75)', fontSize: '0.95rem', textDecoration: 'none' }}
        onMouseEnter={e => e.target.style.color = '#f5ede0'}
        onMouseLeave={e => e.target.style.color = 'rgba(245,237,224,0.75)'}
      >
        {children}
      </Link>
    </li>
  );
}