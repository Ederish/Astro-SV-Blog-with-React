import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

const sections = {
  "Sobre Nosotros": [
    "Nuestra Historia",
    "Junta Directiva",
    "Observatorio",
    "Nuestras Actividades",
    "Únete A Nosotros",
  ],
  "Publicaciones": [
    "Imagen Del Día",
    "Ponencias",
    "Podcast",
    "Revistas",
    "Videos",
    "Galería",
    "Boletines",
  ],
  "Eventos": [
    "Eventos Del Mes",
    "Calendario Lunar",
  ],
};

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    if (item.endpoint === "internal") {
      navigate(item.link);
    } else {
      navigate(
        `/post/${item.id}?site=https://astro.org.sv&endpoint=${item.endpoint}`
      );
    }
  };

  const getItemsBySection = (titles) =>
    SidebarData.filter((item) => titles.includes(item.title));

  return (
    <aside className="sidebar">
      <ul className="sidebarList">
        {/* INICIO */}
        <li className="row">
          <button
            className="link-btn"
            onClick={() => handleNavigation(SidebarData[0])}
          >
            Inicio
          </button>
        </li>

        {/* SECCIONES CON DETAILS / SUMMARY */}
        {Object.entries(sections).map(([sectionTitle, items]) => (
          <li key={sectionTitle} className="row">
            <details>
              <summary>{sectionTitle}</summary>

              <ul className="submenu">
                {getItemsBySection(items).map((item, index) => (
                  <li key={index}>
                    <button
                      className="submenu-btn"
                      onClick={() => handleNavigation(item)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}

        {/* ENLACES */}
        <li className="row">
          <button
            className="link-btn"
            onClick={() =>
              handleNavigation(
                SidebarData.find((i) => i.title === "Enlaces")
              )
            }
          >
            Enlaces
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
