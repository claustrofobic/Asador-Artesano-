import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/inicio.css';

function Inicio() {
    const { token } = useAuth();

    return (
        <div className="inicio-container">

            {/* Hero */}
            <section className="hero">
                <div className="hero-texto">
                    <p className="hero-subtitulo">Desde 2008 · Cocina familiar</p>
                    <h1>Hecho con fuego<br />y cariño</h1>
                    <p className="hero-descripcion">
                        Pollos asados, croquetas caseras, churros artesanales y chocolate a la taza.
                        Todo elaborado a mano, con ingredientes de calidad y una receta familiar
                        que llevamos perfeccionando más de 16 años.
                    </p>
                    <Link to={token ? '/carta' : '/login'} className="btn-hero">
                        Haz tu pedido ahora
                    </Link>
                </div>
                <div className="hero-imagen">
                    <div className="hero-placeholder">🍗</div>
                </div>
            </section>

            {/* Destacado */}
            <section className="destacados">
                <h2>Nuestros productos</h2>
                <p className="destacados-subtitulo">
                    Elaboración artesanal · Ingredientes de calidad · Recetas de siempre
                </p>
                <div className="destacados-grid">
                    <div className="tarjeta-destacado">
                        <div className="tarjeta-icono">🍗</div>
                        <h3>Pollos Asados</h3>
                        <p>
                            Asados al horno y sazonados a mano con nuestra receta familiar secreta.
                            Crujientes por fuera, jugosos por dentro.
                        </p>
                        <span className="desde">Desde 6,50 €</span>
                    </div>
                    <div className="tarjeta-destacado tarjeta-destacada-principal">
                        <div className="tarjeta-icono">⭐</div>
                        <span className="badge-estrella">Nuestra estrella</span>
                        <h3>Croquetas Caseras</h3>
                        <p>
                            100% caseras, elaboradas a mano todos los días. Bechamel cremosa,
                            rebozado crujiente. Una vez que las pruebas, no hay vuelta atrás.
                        </p>
                        <span className="desde">6 unidades · 6,00 €</span>
                    </div>
                    <div className="tarjeta-destacado">
                        <div className="tarjeta-icono">🍩</div>
                        <h3>Churros y Chocolate</h3>
                        <p>
                            Masa elaborada a mano cada mañana. Churros recién hechos acompañados
                            de nuestro chocolate artesanal cocinado al momento.
                        </p>
                        <span className="desde">Desde 3,50 €</span>
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="por-que">
                <h2>¿Por qué elegirnos?</h2>
                <div className="por-que-grid">
                    <div className="por-que-item">
                        <span>🤲</span>
                        <h4>Todo a mano</h4>
                        <p>Cada producto se elabora manualmente, sin atajos ni ingredientes procesados.</p>
                    </div>
                    <div className="por-que-item">
                        <span>👨‍👩‍👧</span>
                        <h4>Empresa familiar</h4>
                        <p>Somos un matrimonio que lleva más de 16 años volcado en este oficio con pasión.</p>
                    </div>
                    <div className="por-que-item">
                        <span>🌿</span>
                        <h4>Ingredientes de calidad</h4>
                        <p>Seleccionamos los mejores ingredientes para que cada bocado valga la pena.</p>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="cta-final">
                <h2>¿Te apetece algo rico?</h2>
                <p>Haz tu pedido online y recógelo cuando quieras.</p>
                <Link to={token ? '/carta' : '/login'} className="btn-hero">
                    Ver la carta completa
                </Link>
            </section>

        </div>
    );
}

export default Inicio;