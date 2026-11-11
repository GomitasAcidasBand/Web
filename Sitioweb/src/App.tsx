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
  { 
    number: "01", 
    title: "Despertar", 
    duration: "03:42", 
    file: cancion1,
    lyrics: "Abro los ojos y el cielo está rosado...\nYa no hay tiempo para mirar atrás,\nsolo queda avanzar oyendo este ruido.\n(Despertar, despertar...)"
  },
  { 
    number: "02", 
    title: "Mariposas", 
    duration: "03:15", 
    file: cancion2,
    lyrics: "Vuelan sin rumbo por la habitación,\nvidrios rotos y una vieja canción.\nTus ojos tristes bajo la luz de neón,\nhicieron eco en mi corazón."
  },
  { 
    number: "03", 
    title: "No Volverás", 
    duration: "02:50", 
    file: cancion3,
    lyrics: "Guardé las fotos en el cajón de abajo,\nlas guitarras suenan fuerte hoy.\nYa no duele tu voz al teléfono,\nsolo soy yo y este gran descontrol."
  },
  { 
    number: "04", 
    title: "Trágico Amor", 
    duration: "03:30", 
    file: cancion4,
    lyrics: "Un drama pop en blanco y negro,\ncorriendo tarde bajo la lluvia en invierno.\nEras perfecto para un final abierto,\npero prefiero seguir tocando este instrumento."
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

function MusicPlayer({ currentTrackIndex, setPlayingParent, playingParent, onTrackEnd, refAudio }: any) {
  const [progress, setProgress] = useState(0);
  const activeTrack = epTracks[currentTrackIndex];

  useEffect(() => {
    const player = refAudio.current;
    if (!player) return;
    const update = () => setProgress((player.currentTime / (player.duration || 1)) * 100);
    const handleEnded = () => {
      onTrackEnd(); // Pasa automáticamente a la siguiente canción en orden
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
      <audio
        ref={refAudio}
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
          if (!refAudio.current?.duration) return;
          const rect = event.currentTarget.getBoundingClientRect();
          refAudio.current.currentTime =
            ((event.clientX - rect.left) / rect.width) * refAudio.current.duration;
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
          aria-label={playingParent ? "Pausar" : "Reproducir"}
        >
          <Icon name={playingParent ? "pause" : "play"} />
        </button>
        <button aria-label="Canción siguiente">
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
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", color: "#777" }}>{track.duration}</span>
                <button
                  onClick={() => setSelectedLyricsIndex(selectedLyricsIndex === index ? null : index)}
                  style={{
                    fontSize: "11px",
                    background: "#ffb6c1",
                    color: "#fff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {selectedLyricsIndex === index ? "Ocultar Letra" : "Ver Letra ✍️"}
                </button>
                <button
                  onClick={() => onSelectTrack(index)}
                  style={{
                    fontSize: "11px",
                    background: "#ff69b4",
                    color: "#fff",
                    border: "none",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ♪ Play
                </button>
              </div>
            </div>

            {/* Desplegable de la letra */}
            {selectedLyricsIndex === index && (
              <div style={{
                marginTop: "12px",
                padding: "10px",
                background: "#ffffff",
                border: "1px solid #ff69b4",
                borderRadius: "4px",
                whiteSpace: "pre-line",
                fontSize: "13px",
                color: "#444",
                fontStyle: "italic"
              }}>
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playingParent, setPlayingParent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Cambiar y reproducir al hacer click en una canción de la lista
  const handleSelectTrack = async (index: number) => {
    setCurrentTrackIndex(index);
    setPlayingParent(true);
    setTimeout(async () => {
      if (audioRef.
