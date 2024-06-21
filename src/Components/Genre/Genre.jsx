import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GamesByGenre from "../GamesByGenre/GamesByGenre";
import "../Genre/Genre.scss";

const Genre = ({ mode }) => {
  const genreId = useParams().id;
  const [genreDescription, setGenreDescription] = useState("");

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/genres/${genreId}?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenreDescription(data.description);
      });
  }, []);

  return (
    <div
      className={`category-container gen-height ${
        mode === false
          ? "category-container-l-mode"
          : "category-container-d-mode"
      }`}
    >
      <h1>{genreId.substring(0, 1).toUpperCase() + genreId.substring(1)}</h1>
      <div className="description">
        {genreDescription.replace(/(<([^>]+)>)/gi, "").replace(/&#39;/gi, "'")}
      </div>
      <div className={`games `}>
        <GamesByGenre genreId={genreId} mode={mode} />
      </div>
    </div>
  );
};

export default Genre;
