import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    if (item.endpoint === "internal") {
      // Navegación interna, por ejemplo al Home
      navigate(item.link);
    } else {
      // Si es página o categoría, construimos la URL con parámetros
      navigate(
        `/post/${item.id}?site=https://astro.org.sv&endpoint=${item.endpoint}`
      );
    }
  };

  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => (
          <li
            key={key}
            className="row"
            onClick={() => handleNavigation(val)}
          >
            <div id="title">{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;