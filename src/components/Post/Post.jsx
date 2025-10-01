import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardNews from "../CardNews/cardNews";
import "./post.css";

const Post = () => {
  const { id } = useParams();
  const location = useLocation();

  // Obtiene parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const site = queryParams.get("site");
  const endpoint = queryParams.get("endpoint");

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site || !endpoint) {
      setError("Faltan parámetros necesarios para cargar el contenido.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let apiUrl = `${site}/wp-json/wp/v2/${endpoint}`;

        // Si el endpoint es posts, hay que decidir si es categoría o post individual
        if (endpoint === "posts") {
          // Si el ID es menor a 100, asumimos que es categoría (categorías tienen IDs pequeños)
          if (Number(id) < 100) {
            apiUrl += `?categories=${id}&_embed`; // Listado por categoría
          } else {
            apiUrl += `/${id}?_embed`; // Post individual
          }
        } else {
          // Para páginas u otros endpoints
          apiUrl += `/${id}?_embed`;
        }


        console.log("URL Fetch:", apiUrl); // Debug

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("No se pudo cargar el contenido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, site, endpoint]);

  // Estados de carga y error
  if (loading) return <p>Cargando contenido...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>No se encontró contenido para mostrar.</p>;

  // ✅ Si es un listado de posts de categoría reutilizamos CardNews
  if (Array.isArray(data)) {
    return (
      <div className="category-news">
        <CardNews
          customEndpoint={`posts?categories=${id}`}
          site={site}
        />
      </div>
    );
  }

  // ✅ Si es un solo post o página
  const title = data.title?.rendered || "Sin título";
  const content = data.content?.rendered || "<p>Contenido no disponible</p>";
  const featuredImage = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="post-container">
      <h1 className="post-title">{title}</h1>

      {/* Imagen destacada */}
      {featuredImage && (
        <div
          className="header-banner"
          style={{ backgroundImage: `url(${featuredImage})` }}
        ></div>
      )}

      <div className="clear"></div>

      {/* Contenido */}
      <section>
        <article>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </section>
    </div>
  );
};
export default Post;