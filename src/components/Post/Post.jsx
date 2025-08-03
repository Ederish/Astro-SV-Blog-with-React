import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./post.css";

const Post = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const site = queryParams.get("site");

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!site) {
      setError("No se proporcionó la URL del sitio.");
      return;
    }

    fetch(`${site}/wp-json/wp/v2/posts/${id}?_embed`)
      .then((resp) => resp.json())
      .then((data) => setPost(data))
      .catch((err) => {
        console.error("Error al cargar el post:", err);
        setError("No se pudo cargar el contenido.");
      });
  }, [id, site]);

  if (error) return <p>{error}</p>;
  if (!post) return <p>Cargando post...</p>;

  const title = post.title?.rendered;
  const content = post.content?.rendered;
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      <h1 className="post-title">{title}</h1>
      <div
        className="header-banner"
        style={featuredImage ? { backgroundImage: `url(${featuredImage})` } : {}}
      ></div>
      <div className="clear"></div>
      <section>
        <article>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </section>
    </>
  );
};

export default Post;