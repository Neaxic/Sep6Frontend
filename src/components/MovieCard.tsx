import React from "react";

interface Movie {
  image: string;
  title: string;
  description: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div
    style={{
      border: "1px solid #ddd",
      margin: "10px",
      padding: "10px",
      width: "200px",
    }}
  >
    <img
      src={movie.image}
      alt={movie.title}
      style={{ width: "100%", height: "300px", objectFit: "cover" }}
    />
    <h2>{movie.title}</h2>
    <p>{movie.description}</p>
  </div>
);

export default MovieCard;
