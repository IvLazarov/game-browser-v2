import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../GamesByGenre/GamesByGenre.scss";
import { Oval } from "react-loader-spinner";

const GamesByGenre = ({ genreId, mode }) => {
  const [gamesByGenre, setGamesByGenre] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&genres=${genreId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGamesByGenre(data.results);
      });
  }, []);

  return (
    <>
      {gamesByGenre.length === 0 ? (
        <div className="oval-container">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        gamesByGenre.map((gameByGenre) => {
          return (
            <div
              className={`items ${
                mode === false ? "category-l-mode" : "category-d-mode"
              }`}
            >
              <Link
                key={gameByGenre.id}
                to={`/game-description/${gameByGenre.slug}`}
              >
                <img
                  src={gameByGenre.background_image}
                  alt="game-image"
                  loading="lazy"
                />
                <h3>{gameByGenre.name}</h3>
              </Link>
            </div>
          );
        })
      )}
    </>
  );
};

export default GamesByGenre;
