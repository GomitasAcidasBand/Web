import { useEffect, useRef, useState } from "react";
// 1. Importas la imagen desde la carpeta media en src
import mainImage from "./media1/5.jpg";

const images = {
  // 2. Usas la variable directamente sin comillas
  main: mainImage,
  singer: "https://images.unsplash.com/photo-1775196220956-77fdbfca6100?auto=format&fit=crop&w=900&q=85",
  band: "https://images.unsplash.com/photo-1770571414030-65cd870919f2?auto=format&fit=crop&w=1000&q=85",
  guitar: "https://images.unsplash.com/photo-1787360504836-bea531d4f265?auto=format&fit=crop&w=900&q=85",
  pink: "https://images.unsplash.com/photo-1776099028245-6f21821c9cb0?auto=format&fit=crop&w=900&q=85",
  stage: "https://images.unsplash.com/photo-1785747759215-6b5394318147?auto=format&fit=crop&w=1000&q=85",
};

const portfolio = [
  {
    title: "Festival Ruido Rosa",
    place: "Santiago, Chile",
    date: "24 AGO 2024",
    type: "tocatas",
    image: images.main,
  },

const portfolio = [
  {
    title: "Festival Ruido Rosa",
    place: "Santiago, Chile",
    date: "24 AGO 2024",
    type: "tocatas",
    image: images.main,
  },
  {
    title: "Sesión medianoche",
    place: "Estudio 13",
    date: "09 JUL 2024",
    type: "backstage",
    image: images.guitar,
  },
  {
    title: "Club Saturno",
    place: "Valparaíso, Chile",
    date: "21 JUN 2024",
    type: "tocatas",
    image: images.singer,
  },
  {
    title: "Feria Chicas Ruidosas",
    place: "Centro Cultural",
    date: "18 MAY 2024",
    type: "eventos",
    image: images.pink,
  },
  {
    title: "Noche de lanzamiento",
    place: "Sala Metrónomo",
    date: "04 ABR 2024",
    type: "eventos",
    image: images.stage,
  },
  {
    title: "Antes del show",
    place: "Camerino 02",
    date: "15 MAR 2024",
    type: "backstage",
    image: images.band,
  },
];

const posts = [
  {
    date: "28.08.24",
    title: "Lo que pasó después de apagar las luces",
    text: "Fotos borrosas, delineador corrido y la playlist camino al hotel.",
  },
  {
    date: "16.08.24",
    title: "Hicimos una canción a las 3:00 AM",
    text: "Una nota de voz, cuatro cafés y un coro imposible de olvidar.",
  },
  {
    date: "02.08.24",
    title: "El carrete completo del verano rosa",
    text: "Las fotos que sí subimos y las que casi se quedan en la cámara.",
  },
];

function Icon({ name }: { name: "play" | "pause" | "prev" | "next" | "heart" | "mail" }) {
  const paths = {
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />,
    pause: <path d="M8 7h3v10H8zm5 0h3v10h-3z" fill="currentColor" />,
    prev: <path d="M8 7h2v10H8zm3 5 7-5v10l-7-5Z" fill="currentColor" />,
    next: <path d="M16 7h-2v10h2zm-3 5L6 7v10l7-5Z" fill="currentColor" />,
    heart: (
      <path
        d="M12 19s-7-4.1-7-9a4 4 0 0 1 7-2.3A4 4 0 0 1 19 10c0 4.9-7 9-7 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    ),
    mail: (
      <>
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="m5 7 7 6 7-6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    const update = () => setProgress((player.currentTime / (player.duration || 1)) * 100);
    const stop = () => setPlaying(false);
    player.addEventListener("timeupdate", update);
    player.addEventListener("ended", stop);
    return () => {
      player.removeEventListener("timeupdate", update);
      player.removeEventListener("ended", stop);
    };
  }, []);

  const toggle = async () => {
    if (!audio.current) return;
    if (playing) audio.current.pause();
    else await audio.current.play();
    setPlaying(!playing);
  };

  return (
    <section className="module music-module" id="musica">
      <audio
        ref={audio}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="metadata"
      />
      <h2 className="module-title">Las Furias Music Player</h2>
      <div className="music-screen">
        <p>NOW PLAYING:</p>
        <strong>Corazón de plástico</strong>
        <span>Las Furias / 2025</span>
      </div>
      <div
        className="mini-progress"
        onClick={(event) => {
          if (!audio.current?.duration) return;
          const rect = event.currentTarget.getBoundingClientRect();
          audio.current.currentTime =
            ((event.clientX - rect.left) / rect.width) * audio.current.duration;
        }}
      >
        <i style={{ width: `${progress}%` }} />
      </div>
      <div className="mini-controls">
        <button aria-label="Canción anterior">
          <Icon name="prev" />
        </button>
        <button
          className="main-control"
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <button aria-label="Canción siguiente">
          <Icon name="next" />
        </button>
        <span>{playing ? "01:06" : "00:00"} / 03:42</span>
      </div>
      <div className="equalizer" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} style={{ height: `${7 + ((index * 13) % 25)}px` }} />
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("todo");
  const visible = filter === "todo" ? portfolio : portfolio.filter((item) => item.type === filter);

  return (
    <section className="portfolio module" id="portafolio">
      <div className="module-title portfolio-title">
        <span>Portafolio de tocatas + eventos</span>
        <small>{visible.length} ÁLBUMES</small>
      </div>
      <div className="portfolio-intro">
        <div>
          <span className="blink-dot" /> NUESTRO ARCHIVO VISUAL
        </div>
        <p>
          Aquí puedes reemplazar las imágenes y guardar los mejores recuerdos de cada escenario,
          festival o evento.
        </p>
      </div>
      <div className="filters" aria-label="Filtros del portafolio">
        {["todo", "tocatas", "eventos", "backstage"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="portfolio-grid">
        {visible.map((item, index) => (
          <article className="event-card" key={item.title}>
            <div className="event-photo">
              <img src={item.image} alt={`${item.title}, ${item.place}`} />
              <span>VIEW_{String(index + 1).padStart(2, "0")}.JPG</span>
            </div>
            <div className="event-copy">
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.place}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [friend, setFriend] = useState(false);

  return (
    <div className="page-background">
      <div className="floating-shape shape-one">✦</div>
      <div className="floating-shape shape-two">♥</div>

      <div className="site-frame">
        <header className="top-header" id="inicio">
          <a href="#inicio" className="logo">
            <span className="logo-mark">LF</span>
            <span>
              lasfurias<small>una banda para las girls y los theys</small>
            </span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            MENU
          </button>
          <nav className={menuOpen ? "open" : ""}>
            <a href="#blog" onClick={() => setMenuOpen(false)}>
              BLOG
            </a>
            <a href="#musica" onClick={() => setMenuOpen(false)}>
              MÚSICA
            </a>
            <a href="#portafolio" onClick={() => setMenuOpen(false)}>
              PORTAFOLIO
            </a>
            <a href="#nosotras" onClick={() => setMenuOpen(false)}>
              NOSOTRAS
            </a>
          </nav>
        </header>

        <div className="category-strip">
          <span>POP RUIDOSO</span>
          <span>DIARIOS</span>
          <span>TOCATAS</span>
          <span>FOTOS</span>
          <span>AMISTAD</span>
          <span>GLITTER</span>
        </div>

        <main className="profile-layout">
          <aside className="sidebar">
            <section className="profile-card module">
              <h1>@lasfurias</h1>
              <div className="profile-photo">
                <img src={images.main} alt="Las integrantes de la banda cantando en vivo" />
                <span>ONLINE NOW!</span>
              </div>
              <div className="profile-facts">
                <p>
                  <b>Las Furias</b>
                  <br />
                  Ella / Ella / Ella / Ella
                </p>
                <p>Pop ruidoso & amistad</p>
                <p>Santiago, Chile</p>
                <p>Último login: hoy</p>
              </div>
            </section>

            <section className="mood-box module">
              <p>
                <b>Mood:</b> creativas XD
              </p>
              <div className="butterfly-card">
                <span>✦</span>
                <strong>
                  CHICAS
                  <br />
                  DEL INTERNET
                </strong>
                <span>✦</span>
              </div>
            </section>

            <section className="module contact-box">
              <h2 className="module-title">Contactar a Las Furias</h2>
              <div className="contact-grid">
                <button onClick={() => setFriend(!friend)}>
                  <Icon name="heart" />
                  {friend ? "Amigas!" : "Agregar"}
                </button>
                <a href="mailto:hola@lasfurias.com">
                  <Icon name="mail" />
                  Mensaje
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <b>IG</b> Instagram
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                  <b>TK</b> TikTok
                </a>
              </div>
            </section>

            <MusicPlayer />

            <section className="module next-shows">
              <h2 className="module-title">Próximas tocatas</h2>
              <div>
                <b>14.09</b>
                <span>Festival Ruidosa</span>
                <small>Santiago</small>
              </div>
              <div>
                <b>28.09</b>
                <span>Club Subterráneo</span>
                <small>Providencia</small>
              </div>
              <div>
                <b>12.10</b>
                <span>Feria En Órbita</span>
                <small>Valparaíso</small>
              </div>
            </section>
          </aside>

          <div className="main-column">
            <section className="login-bar module">
              <span>Member Login</span>
              <label>
                E-Mail
                <input value="fan@lasfurias.com" readOnly />
              </label>
              <label>
                Password
                <input value="********" readOnly />
              </label>
              <button>LOGIN</button>
            </section>

            <section className="hero-panel module">
              <div className="hero-art">
                <img src={images.singer} alt="Cantante de la banda durante una tocata" />
                <div className="star-field">✦ · ✧ · ✦</div>
              </div>
              <div className="hero-copy">
                <p>WELCOME TO OUR SPACE</p>
                <h2>
                  Quisiera que esto fuera <em>MySpace</em>
                </h2>
                <span>pero con más guitarras, más amigas y muchísimo más rosa.</span>
                <a href="#portafolio">VER NUESTROS RECUERDOS &gt;&gt;</a>
              </div>
            </section>

            <section className="top-finds module">
              <h2 className="module-title">Top Finds</h2>
              <div className="find-grid">
                {[
                  [images.pink, "ya parece"],
                  [images.main, "tocatas"],
                  [images.guitar, "canciones"],
                  [images.band, "amistad"],
                ].map(([image, label]) => (
                  <a href="#portafolio" key={label}>
                    <img src={image} alt="" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </section>

            <Portfolio />

            <section className="blog module" id="blog">
              <h2 className="module-title">
                Las Furias' Latest Blog Entries <small>[Subscribe to this Blog]</small>
              </h2>
              {posts.map((post) => (
                <article key={post.title}>
                  <time>{post.date}</time>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                  </div>
                  <a href="#blog">[leer más]</a>
                </article>
              ))}
            </section>

            <section className="about module" id="nosotras">
              <h2 className="module-title">Acerca de nosotras</h2>
              <div>
                <span className="huge-heart">♥</span>
                <p>
                  Somos amigas antes que banda. Hacemos canciones para escuchar con audífonos,
                  cantar muy fuerte y mandarle a tu ex. Este es nuestro pequeño rincón de internet.
                </p>
              </div>
            </section>
          </div>
        </main>

        <div className="moving-message">
          <div>
            NUEVA CANCIÓN DISPONIBLE · CORAZÓN DE PLÁSTICO · PRÓXIMA TOCATA 14.09 · NUEVA CANCIÓN
            DISPONIBLE · CORAZÓN DE PLÁSTICO · PRÓXIMA TOCATA 14.09 ·
          </div>
        </div>

        <footer>
          <b>lasfurias ★ online since 2021</b>
          <div>
            <a href="https://instagram.com">Instagram</a> · <a href="https://tiktok.com">TikTok</a>{" "}
            · <a href="https://youtube.com">YouTube</a> · <a href="https://spotify.com">Spotify</a>
          </div>
          <span>© 2025 LAS FURIAS — HECHO CON RUIDO Y AMISTAD</span>
        </footer>
      </div>
    </div>
  );
}
