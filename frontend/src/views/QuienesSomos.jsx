import '../assets/css/quienes-somos.css';

function QuienesSomos() {
    return (
        <div className="quienes-container">

            <section className="quienes-hero">
                <h1>Asador Artesano</h1>
                <p className="quienes-lema">Una historia familiar de fuego, tradición y buen hacer</p>
            </section>

            <section className="quienes-historia">
                <div className="historia-texto">
                    <h2>Nuestra historia</h2>
                    <p>
                        Todo empezó hace más de 16 años con una idea sencilla: ofrecer comida
                        de verdad, hecha como siempre se ha hecho. Sin prisas, sin atajos,
                        con las manos y con cariño.
                    </p>
                    <p>
                        Somos un matrimonio que desde el primer día hemos llevado adelante
                        este negocio con dedicación y mucho trabajo. Cada mañana encendemos
                        el horno, preparamos la masa de los churros, elaboramos las croquetas
                        y sazonamos los pollos a mano — igual que el primer día.
                    </p>
                    <p>
                        Los años nos han dado experiencia, pero nunca hemos cambiado lo
                        esencial: la receta familiar, los ingredientes de calidad y el trato
                        cercano con cada cliente.
                    </p>
                </div>
                <div className="historia-datos">
                    <div className="dato">
                        <span className="dato-numero">+16</span>
                        <span className="dato-label">años de experiencia</span>
                    </div>
                    <div className="dato">
                        <span className="dato-numero">100%</span>
                        <span className="dato-label">elaboración artesanal</span>
                    </div>
                    <div className="dato">
                        <span className="dato-numero">2</span>
                        <span className="dato-label">personas con mucho amor</span>
                    </div>
                </div>
            </section>

            <section className="quienes-valores">
                <h2>Lo que nos define</h2>
                <div className="valores-grid">
                    <div className="valor-item">
                        <span><i
                            className="fa-solid fa-fire-flame-curved"
                            style={{ color: '#ff6b35' }}
                        ></i></span>
                        <h3>Tradición</h3>
                        <p>Recetas familiares que no cambian porque no necesitan cambiar.</p>
                    </div>
                    <div className="valor-item">
                        <span><i
                            className="fa-solid fa-hands"
                            style={{ color: '#8b5e3c' }}
                        ></i></span>
                        <h3>Artesanía</h3>
                        <p>Cada producto pasa por nuestras manos antes de llegar a las tuyas.</p>
                    </div>
                    <div className="valor-item">
                        <span><i
                            className="fa-solid fa-leaf"
                            style={{ color: '#5c9d4f' }}
                        ></i></span>
                        <h3>Calidad</h3>
                        <p>Ingredientes seleccionados. Sin conservantes, sin artificios.</p>
                    </div>
                    <div className="valor-item">
                        <span><i
                            className="fa-solid fa-heart"
                            style={{ color: '#d64545' }}
                        ></i></span>
                        <h3>Cercanía</h3>
                        <p>Somos un negocio de barrio y tratamos a cada cliente como en casa.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default QuienesSomos;