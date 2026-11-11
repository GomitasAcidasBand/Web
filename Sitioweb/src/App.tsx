import { useEffect, useRef, useState } from "react";
// Imágenes
import mainPortada from "./media1/4.jpg";
import main1 from "./media1/1.jpg";
import logo1 from "./media1/5.png";
import logo2 from "./media1/2.png";
import cd from "./media1/Cd.png";
import cd1 from "./media1/Cd1.png";
import cd2 from "./media1/Cd2.png";
import cd3 from "./media1/Cd3.png";

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

  cd: cd,
  cd1: cd1,
  cd2: cd2,
  cd3: cd3,
};

const epTracks = [
  {
    number: "01",
    title: "No volverás",
    duration: "02:50",
    file: cancion3,
    lyrics: "Te miro, intento comprender que no regresarás.\nTe pienso todo el tiempo pero sé que ya no volverás.\n\nYo solo quiero escapar de esta mierda de soledad,\ny quizás, encontrar la respuesta a esta casualidad.\n\nNo entiendo lo que siento, pero sé que ya no te quiero más.\nPretendo romper el juego en el que tú no sabías amar.\n\nYo solo quiero escapar de esta mierda de soledad,\ny quizás, encontrar la respuesta a esta casualidad."
  },
  {
    number: "02",
    title: "Despertar",
    duration: "03:42",
    file: cancion1,
    lyrics: "Comienzo a despertar de este sueño mortal\ny cuando me levanto puedo ver lo linda que estás.\n\nDifícil es volver a ser como era antes,\nque cuando te veía sonreía y estaba bien."
  },
  {
    number: "03",
    title: "Mariposas",
    duration: "03:15",
    file: cancion2,
    lyrics: "Tú, y tus ojos me cautivan me hacen ver\nque el amor no tendría que doler.\n\nY pasa el tiempo y aún te quiero,\nlas mariposas vuelan,\nlas mariposas vuelan.\n\nOtra vez, otra vez."
  },
  {
    number: "04",
    title: "Trágico amor",
    duration: "03:30",
    file: cancion4,
    lyrics: "Podríamos volver a intentarlo más.\nY al final, no bastaría.\n\nY tal vez, no odiemos más,\ny tal vez, nos dañemos más.\n\nMe asfixia, este trágico amor.\nTrágico amor, trágico - trágico amor.\n\nNos odiemos más y tal vez,\nnos dañemos más.\n\nTrágico amor."
  },
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

// Listas limpias de imágenes para cada producto de Merch
const merchItems = [
  {
    label: "CD'S",
    images: [images.cd, images.cd1, images.cd2, images.cd3],
  },
  {
    label: "Poleras",
    images: [images.singer, images.band, images.main],
  },
  {
    label: "Posters",
    images: [images.band, images.main], 
  },
  {
    label: "Encendedores",
    images: [images.guitar, images.singer], 
  },
  {
    label: "Ositos con chapitas",
    images: [images.main, images.band], 
  },
  {
    label: "Chapitas",
    images: [images.singer, images.guitar], 
  },
  {
    label: "Stickers",
    images: [images.band, images.main, images.singer], 
  },
];

function Icon({ name }: { name: "play" | "pause" | "prev" | "next" | "heart" | "mail" }) {
  const paths = {
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />,
    pause: <path d="M8 7h3v10H8zm5 0h3v10h-3z" fill="currentColor" />,
    prev: <path d="M8 7h2v10H8zm3 5 7-5v10l-7-5Z" fill="currentColor" />,
    next: <path d="M16 7h-2v10h2zm-3 5L6 7v10l7-5Z" fill="currentColor" />,
    heart: (
      <path d="M12 19s-7-4.1-7-9a4 4 0 0 1 7-2.3A4 4 0 0 1 19 10c0 4.9-7 9-7 9Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    ),
    mail: (
      <>
        <rect x="4" y="6" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" />
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

function MusicPlayer({ currentTrackIndex, setPlayingParent, playingParent, onTrackEnd, refAudio, onPrev, onNext }: any) {
  const [progress, setProgress] = useState(0);
  const activeTrack = epTracks[currentTrackIndex];

  useEffect(() => {
    const player = refAudio.current;
    if (!player) return;

    const update = () => setProgress((player.currentTime / (player.duration || 1)) * 100);
    const handleEnded = () => {
      onTrackEnd();
    };

    player.addEventListener("timeupdate", update);
    player.addEventListener("ended", handleEnded);

    return () => {
      player.removeEventListener("timeupdate", update);
      player.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  const toggle = async () => {
    if (!refAudio.current) return;
    if (playingParent) {
      refAudio.current.pause();
      setPlayingParent(false);
    } else {
      await refAudio.current.play();
      setPlayingParent(true);
    }
  };

  return (
    <section className="module music-module" id="musica">
      <audio ref={refAudio} src={activeTrack.file} preload="metadata" />
      <h2 className="module-title">EP "Dulces Sueños"</h2>
      <div className="music-screen">
        <p>NOW PLAYING ({activeTrack.number}/04):</p>
        <strong>{activeTrack.title}</strong>
        <span>Gomitas Ácidas / 2026</span>
      </div>
      <div
        className="mini-progress"
        onClick={(event) => {
          if (!refAudio.current?.duration) return;
          const rect = event.currentTarget.getBoundingClientRect();
          refAudio.current.currentTime = ((event.clientX - rect.left) / rect.width) * refAudio.current.duration;
        }}
      >
        <i style={{ width: `${progress}%` }} />
      </div>
      <div className="mini-controls">
        <button aria-label="Canción anterior" onClick={onPrev}>
          <Icon name="prev" />
        </button>
        <button className="main-control" onClick={toggle} aria-label={playingParent ? "Pausar" : "Reproducir"}>
          <Icon name={playingParent ? "pause" : "play"} />
        </button>
        <button aria-label="Canción siguiente" onClick={onNext}>
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
  const [selectedLyricsIndex, setSelectedLyricsIndex] = useState<number | null>(null);

  return (
    <section className="module ep-section" id="ep-dulces-suenos">
      <h2 className="module-title">✦ Tracklist: EP "Dulces Sueños" (2026) ✦</h2>
      <div className="ep-container" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {epTracks.map((track, index) => (
          <div
            key={track.number}
            style={{
              padding: "12px 15px",
              background: "#fff0f5",
              border: "1px dashed #ffb6c1",
              borderRadius: "6px",
              fontFamily: "monospace",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                onClick={() => onSelectTrack(index)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", flex: 1 }}
              >
                <span style={{ color: "#d1498c", fontWeight: "bold", marginRight: "12px" }}>
                  {track.number}.
                </span>
                <span style={{ color: "#333", fontWeight: "600" }}>{track.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", color: "#777" }}>{track.duration}</span>
                <button
                  onClick={() => setSelectedLyricsIndex(selectedLyricsIndex === index ? null : index)}
                  style={{
                    fontSize: "11px",
                    background: "#ffb6c1",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {selectedLyricsIndex === index ? "Ocultar" : "Letra ✍️"}
                </button>
                <button
                  onClick={() => onSelectTrack(index)}
                  style={{
                    fontSize: "11px",
                    background: "#ff69b4",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ♪ Play
                </button>
              </div>
            </div>

            {selectedLyricsIndex === index && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  background: "#ffffff",
                  border: "1px solid #ff69b4",
                  borderRadius: "4px",
                  whiteSpace: "pre-line",
                  fontSize: "13px",
                  color: "#444",
                  fontStyle: "italic",
                }}
              >
                {track.lyrics}
              </div>
            )}
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
          Aquí puedes reemplazar las imágenes y guardar los mejores recuerdos de cada escenario, festival o evento.
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

// Componente para manejar el carrusel de cada tarjeta de Merch
function MerchCard({ item }: { item: { label: string; images: string[] } }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", background: "#fff", border: "1px solid #ffb6c1", borderRadius: "6px", padding: "8px" }}>
      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {item.images.length > 1 && (
          <button
            onClick={handlePrev}
            style={{ position: "absolute", left: "2px", zIndex: 5, background: "rgba(255,105,180,0.8)", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Anterior"
          >
            ◀
          </button>
        )}

        <img src={item.images[currentIndex]} alt={item.label} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />

        {item.images.length > 1 && (
          <button
            onClick={handleNext}
            style={{ position: "absolute", right: "2px", zIndex: 5, background: "rgba(255,105,180,0.8)", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Siguiente"
          >
            ▶
          </button>
        )}
      </div>
      <span style={{ marginTop: "6px", fontSize: "13px", fontWeight: "bold", color: "#d1498c" }}>{item.label}</span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [friend, setFriend] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playingParent, setPlayingParent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSelectTrack = async (index: number) => {
    setCurrentTrackIndex(index);
    setPlayingParent(true);
    setTimeout(async () => {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    }, 100);
  };

  const handleTrackEnd = async () => {
    const nextIndex = (currentTrackIndex + 1) % epTracks.length;
    setCurrentTrackIndex(nextIndex);
    setPlayingParent(true);
    setTimeout(async () => {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    }, 100);
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % epTracks.length;
    handleSelectTrack(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + epTracks.length) % epTracks.length;
    handleSelectTrack(prevIndex);
  };

  const handleWhatsAppJoke = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("¡Jaja, WhatsApp no es posible! 🚫📱\n\nEscríbenos por Instagram o mándanos un correo a nuestro Gmail para hablar con el power trío ♡");
  };

  return (
    <div className="page-background">
      <div className="floating-shape shape-one">✦</div>
      <div className="floating-shape shape-two">♥</div>

      <div className="site-frame">
        <header className="top-header" id="inicio">
          <a href="#inicio" className="logo" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ width: "105px", height: "105px", borderRadius: "50%", overflow: "hidden", border: "2px solid #ff69b4", flexShrink: "0", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
              <img 
                src={logoPersonalizado} 
                alt="Logo Gomitas Ácidas" 
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", padding: "4px" }} 
              />
            </div>
            <span style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}> 
              <span style={{ fontSize: "2.1rem", fontWeight: "bold", lineHeight: "1.1", letterSpacing: "-0.5px" }}>Gomitas Ácidas</span>
              <small style={{ fontSize: "0.9rem", marginTop: "4px", opacity: "0.85", fontStyle: "italic" }}>power trío de mujeres</small> 
            </span>
          </a>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            MENU
          </button>

          <nav className={menuOpen ? "open" : ""}>
            <a href="#blog" onClick={() => setMenuOpen(false)}> BLOG </a>
            <a href="#musica" onClick={() => setMenuOpen(false)}> MÚSICA </a>
            <a href="#portafolio" onClick={() => setMenuOpen(false)}> PORTAFOLIO </a>
            <a href="#nosotras" onClick={() => setMenuOpen(false)}> NOSOTRAS </a>
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
                <strong> CHICAS <br /> DEL INTERNET </strong>
                <span>✦</span>
              </div>
            </section>

            <section className="module contact-box">
              <h2 className="module-title">Contactar a Gomitas Ácidas</h2>
              <div className="contact-grid">
                <button onClick={() => setFriend(!friend)}>
                  <Icon name="heart" /> {friend ? "Amigas!" : "Agregar"}
                </button>
                <a href="mailto:gomitasacidasband@gmail.com">
                  <Icon name="mail" /> Mensaje
                </a>
                <a href="https://www.instagram.com/gomitasacidasband/" target="_blank" rel="noreferrer">
                  <b>IG</b> Instagram
                </a>
                <a href="#whatsapp" onClick={handleWhatsAppJoke}>
                  <b>WA</b> WhatsApp
                </a>
              </div>
            </section>

            {/* Reproductor de música */}
            <MusicPlayer
              currentTrackIndex={currentTrackIndex}
              playingParent={playingParent}
              setPlayingParent={setPlayingParent}
              onTrackEnd={handleTrackEnd}
              refAudio={audioRef}
              onNext={handleNext}
              onPrev={handlePrev}
            />

            {/* Tracklist con las letras justo debajo del reproductor */}
            <EpSection onSelectTrack={handleSelectTrack} />

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
            <section className="hero-panel module">
              <div className="hero-art">
                <img src={images.singer} alt="Cantante de la banda durante una tocata" />
                <div className="star-field">✦ · ✧ · ✦</div>
              </div>
              <div className="hero-copy">
                <p>BIENVENIDES A NUESTRA WEB </p>
                <h2> Un blog de  <em>Música</em> </h2>
                <span>.fotos borrosas y canciones tristes pero rosa jej</span>
                <a href="#portafolio">VER NUESTROS RECUERDOS &gt;&gt;</a>
              </div>
            </section>

            <section className="top-finds module">
              <h2 className="module-title">❀ MERCH ❀</h2>
              <div className="find-grid">
                {merchItems.map((item) => (
                  <MerchCard key={item.label} item={item} />
                ))}
              </div>
            </section>

            <Portfolio />

            <section className="blog module" id="blog">
              <h2 className="module-title"> Gomitas Ácidas' Latest Blog Entries </h2>
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
                <p> EDITAR ESTO JEJEJEJE </p>
              </div>
            </section>
          </div>
        </main>

        <div className="moving-message">
          <div>
            · NUEVO EP DISPONIBLE · DULCES SUEÑOS · PRÓXIMA TOCATA 20.12 · NUEVO EP DISPONIBLE · DULCES SUEÑOS · PRÓXIMA TOCATA 20.12 · NUEVO EP DISPONIBLE ·
          </div>
        </div>

        <footer>
          <b>Gomitas Ácidas ★ online since 2026</b>
          <div>
            <a href="https://www.instagram.com/gomitasacidasband/" target="_blank" rel="noreferrer">Instagram</a> ·{" "}
            <a href="https://www.tiktok.com/@gomitasacidasband" target="_blank" rel="noreferrer">TikTok</a> ·{" "}
            <a href="https://music.youtube.com/channel/UCKvMjhecKcWIOYxsQrPjhhQ" target="_blank" rel="noreferrer">YouTube Music</a> ·{" "}
            <a href="https://open.spotify.com/intl-es/artist/6q7wZHn3kDxlRLOADXM2Qt" target="_blank" rel="noreferrer">Spotify</a>
          </div>
          <span>© 2026 GOMITAS ÁCIDAS — HECHO CON CARIÑO </span>
        </footer>
      </div>
    </div>
  );
}
