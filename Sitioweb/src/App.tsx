import { useEffect, useRef, useState } from "react";
// 1. Importas la imagen desde la carpeta media en src
import mainPortada from "./media1/4.jpg";
import main1 from "./media1/1.jpg";
import logo1 from "./media1/5.png";
import logo2 from "./media1/2.png";
const images = {
  // 2. Usas la variable directamente sin comillas
  main: mainPortada,
  singer: main1,
  band : logo1,
  guitar: logo2,
};

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
      <h2 className="module-title">Ep "dulces sueños"</h2>
      <div className="music-screen">
        <p>NOW PLAYING:</p>
        <strong>despertar</strong>
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
