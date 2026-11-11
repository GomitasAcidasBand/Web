
import { useEffect, useRef, useState } from "react";
// Imágenes
import mainPortada from "./media1/4.jpg";
import main1 from "./media1/1.jpg";
import logo1 from "./media1/5.png";
import logo2 from "./media1/2.png";

// Canciones del EP "Dulces Sueños" desde src/canciones/
import cancion1 from "./canciones/despertar.mp3";
import cancion2 from "./canciones/mariposas.mp3";
import cancion3 from "./canciones/novolveras.mp3";
import cancion4 from "./canciones/tragicoamor.mp3";

const images = {
  main: mainPortada,
  singer: main1,
  band: logo1,
  guitar: logo2,
};

const epTracks = [
  { number: "01", title: "Despertar", duration: "03:42", file: cancion1 },
  { number: "02", title: "Mariposas", duration: "03:15", file: cancion2 },
  { number: "03", title: "No Volverás", duration: "02:50", file: cancion3 },
  { number: "04", title: "Trágico Amor", duration: "03:30", file: cancion4 },
];

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
    image: images.band,
  },
  {
    title: "Noche de lanzamiento",
    place: "Sala Metrónomo",
    date: "04 ABR 2024",
    type: "eventos",
    image: images.singer,
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
  const [progress, setProgress] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const activeTrack = epTracks[currentTrackIndex];

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
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      await audio.current.play();
      setPlaying(true);
    }
  };

  const changeTrack = async (index: number) => {
    setCurrentTrackIndex(index);
    setPlaying(true);
    setTimeout(async () => {
      if (audio.current) {
        await audio.current.play();
      }
    }, 100);
  };

  return (
    <section className="module music-module" id="musica">
      <audio
        ref={audio}
        src={activeTrack.file}
        preload="metadata"
      />
      <h2 className="module-title">EP "Dulces Sueños"</h2>
      <div className="music-screen">
        <p>NOW PLAYING ({activeTrack.number}/04):</p>
        <strong>{activeTrack.title}</strong>
        <span>Gomitas Ácidas / 2026</span>
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
        <button 
          aria-label="Canción anterior"
          onClick={() => {
            const prevIndex = (currentTrackIndex - 1 + epTracks.length) % epTracks.length;
            changeTrack(prevIndex);
          }}
        >
          <Icon name="prev" />
        </button>
        <button
          className="main-control"
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <button 
          aria-label="Canción siguiente"
          onClick={() => {
            const nextIndex = (currentTrackIndex + 1) % epTracks.length;
            changeTrack(nextIndex);
          }}
        >
          <Icon name="next" />
        </button>
        <span>{activeTrack.duration}</span>
      </div>
      <div className="equalizer" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} style={{ height: `${7 + ((index * 13) % 25)}px` }} />
        ))}
      </div>
    </section>
  );
}

function EpSection({ onSelectTrack }: { onSelectTrack: (index: number) => void }) {
  return (
    <section className="module ep-section" id="ep-dulces-suenos">
      <h2 className="module-title">✦ Tracklist: EP "Dulces Sueños" (2026) ✦</h2>
      <div className="ep-container" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {epTracks.map((track, index) => (
          <div
            key={track.number}
            onClick={() => onSelectTrack(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              background: "#fff0f5",
              border: "1px dashed #ffb6c1",
              borderRadius: "4px",
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          >
            <div>
              <span style={{ color: "#d1498c", fontWeight: "bold", marginRight: "12px" }}>
                {track.number}.
              </span>
              <span style={{ color: "#333", fontWeight: "600" }}>{track.title}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "12px", color: "#777" }}>{track.duration}</span>
              <span style={{ fontSize: "12px", background: "#ff69b4", color: "#fff", padding: "2px 8px", borderRadius: "4px" }}>
                ♪ Reproducir
              </span>
            </div>
          </div>
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

  // Función para conectar el listado con el reproductor principal
  const handleSelectTrack = (index: number) => {
    const musicModule = document.getElementById("musica");
    if (musicModule) {
      musicModule.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-background">
      <div className="floating-shape shape-one">✦</div>
      <div className="floating-shape shape-two">♥</div>

      <div className="site-frame">
        <header className="top-header" id="inicio">
          <a href="#inicio" className="logo">
            <span className="logo-mark">LF</span>
            <span>
              Gomitas Ácidas<small>power trío de mujeres</small>
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
              <h1>@gomitasacidasband</h1>
              <div className="profile-photo">
                <img src={images.main} alt="Las integrantes de la banda cantando en vivo" />
                <span> Escucha dulces sueños!! ♡ </span>
              </div>
              <div className="profile-facts">
                <p>Gomitas Ácidas</p>
                <p>Indie pop, dream pop, noise</p>
                <p>Valparaíso, Chile</p>
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
              <h2 className="module-title">Contactar a Gomitas Ácidas</h2>
              <div className="contact-grid">
                <button onClick={() => setFriend(!friend)}>
                  <Icon name="heart" />
                  {friend ? "Amigas!" : "Agregar"}
                </button>
                <a href="mailto:gomitasacidasband@gmail.com">
                  <Icon name="mail" />
                  Mensaje
                </a>
                <a href="https://www.instagram.com/gomitasacidasband/" target="_blank" rel="noreferrer">
                  <b>IG</b> Instagram
                </a>
                <a href="https://open.spotify.com/intl-es/artist/6q7wZHn3kDxlRLOADXM2Qt" target="_blank" rel="noreferrer">
                  <b>TK</b> Spotify
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
                <input value="gomitasacidasband@gmail.com" readOnly />
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
                <p>BIENVENIDES A NUESTRA WEB </p>
                <h2>
                  Un blog de  <em>Música</em>
                </h2>
                <span>.fotos borrosas y canciones tristes pero rosa jej</span>
                <a href="#portafolio">VER NUESTROS RECUERDOS &gt;&gt;</a>
              </div>
            </section>

            {/* Apartado con el listado de las 4 canciones del EP */}
            <EpSection onSelectTrack={handleSelectTrack} />

            <section className="top-finds module">
              <h2 className="module-title">Top Finds</h2>
              <div className="find-grid">
                {[
                  [images.band, "ya parece"],
                  [images.main, "tocatas"],
                  [images.guitar, "canciones"],
                  [images.singer, "amistad"],
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
                Gomitas Ácidas' Latest Blog Entries
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
                  EDITAR ESTO JEJEJEJE
                </p>
              </div>
            </section>
          </div>
        </main>

        <moving-message>
          <div>
            NUEVA EP DISPONIBLE · DULCES SUEÑOS · PRÓXIMA TOCATA 20.12 · NUEVA EP
            DISPONIBLE · DULCES SUEÑOS · PRÓXIMA TOCATA 20.12 ·
          </div>
        </moving-message>

        <footer>
          <b>Gomitas Ácidas ★ online since 2026</b>
          <div>
            <a href="https://www.instagram.com/gomitasacidasband/">Instagram</a> · <a href="https://www.tiktok.com/@gomitasacidasband">TikTok</a>{" "}
            · <a href="https://music.youtube.com/channel/UCKvMjhecKcWIOYxsQrPjhhQ">YouTube Music</a> · <a href="https://open.spotify.com/intl-es/artist/6q7wZHn3kDxlRLOADXM2Qt">Spotify</a>
          </div>
          <span>© 2026 GOMITAS ÁCIDAS — HECHO CON CARIÑO </span>
        </footer>
      </div>
    </div>
  );
}
