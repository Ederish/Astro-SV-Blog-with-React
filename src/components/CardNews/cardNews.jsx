import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardNew.css";

const CardNews = ({ customEndpoint, site = "https://astro.org.sv", title = "Noticias" }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const perPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    if (!site) return;

    // ✅ Usa customEndpoint si está definido
    const endpointToUse = customEndpoint
      ? `${site}/wp-json/wp/v2/${customEndpoint}&page=${page}&per_page=${perPage}&_embed`
      : `${site}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`;

    fetch(endpointToUse)
      .then((resp) => {
        if (!resp.ok) throw new Error("Error al cargar datos");
        const total = resp.headers.get("X-WP-TotalPages");
        setTotalPages(parseInt(total, 10));
        return resp.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error("Error al cargar datos:", err);
        setError("No se pudo cargar la información.");
      });
  }, [page, site, customEndpoint]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <h2 className="section-title">{title}</h2>
      {error && <p>{error}</p>}

      {data.length === 0 && !error ? (
        <p>Cargando noticias...</p>
      ) : (
        <>
          <div className="card-container">
            {data.map((post) => {
              const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              return (
                <div
                  className="card"
                  key={post.id}
                  onClick={() =>
                    navigate(
                      `/post/${post.id}?site=${encodeURIComponent(site)}&endpoint=posts`
                    )
                  }

                  style={{ cursor: "pointer" }}
                >
                  <h2>{post.title.rendered}</h2>
                  {featuredImage && (
                    <img src={featuredImage} alt={post.title.rendered} />
                  )}
                  <div
                    className="excerpt"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 1}>
              ← Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Siguiente →
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default CardNews;