export const SidebarData = [
  {
    title: "Inicio",
    link: "/",            // ruta directa en React Router
    endpoint: "internal", // navegación interna
  },
  {
    title: "Nuestra Historia",
    id: 19,
    endpoint: "pages",    // WordPress usa "pages" en la API
  },
  {
    title: "Junta Directiva",
    id: 17,
    endpoint: "pages",
  },
  {
    title: "Observatorio",
    id: 26,
    endpoint: "pages",
  },
  {
    title: "Nuestras Actividades",
    id: 7,
    endpoint: "pages",
  },
  {
    title: "Únete A Nosotros",
    id: 11,
    endpoint: "pages",
  },

  // Aquí solo indicas `posts` y el id se pasa en la URL como ?categories=ID
  {
    title: "Imagen Del Día",
    id: 4,
    endpoint: "posts",
  },
  {
    title: "Ponencias",
    id: 7,
    endpoint: "posts",
  },
  {
    title: "Podcast",
    id: 10,
    endpoint: "posts",
  },
  {
    title: "Revistas",
    id: 8441,
    endpoint: "pages",
  },
  {
    title: "Videos",
    id: 13,
    endpoint: "posts",
  },
  {
    title: "Galería",
    id: 5,
    endpoint: "posts",
  },
  {
    title: "Boletines",
    id: 13,
    endpoint: "pages",
  },
  {
    title: "Eventos Del Mes",
    id: 3,
    endpoint: "posts",
  },
  {
    title: "Calendario Lunar",
    id: 2858,
    endpoint: "pages",
  },
  {
    title: "Enlaces",
    id: 8444,
    endpoint: "pages",
  },
];
