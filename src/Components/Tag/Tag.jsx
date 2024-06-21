import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Tag = ({ mode }) => {
  const tagId = useParams().id;
  const [gamesByTag, setGamesByTag] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&tags=${tagId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGamesByTag(data.results);
      });
  }, []);
  return (
    <div className={`container ${mode === false ? "l-mode" : "d-mode"}`}>
      <h1>{tagId[0].toUpperCase() + tagId.substring(1)} Games</h1>
      {gamesByTag.length === 0 ? (
        <Oval
          height={100}
          width={300}
          color={"grey"}
          secondaryColor={"lightgrey"}
        />
      ) : (
        gamesByTag.map((gameByTag) => {
          return (
            <Link
              key={gameByTag.id}
              to={`/game-description/${gameByTag.slug}`}
              className="card"
            >
              <img
                src={gameByTag.background_image}
                alt="game-image"
                loading="lazy"
              />
              <h3>{gameByTag.name}</h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Tag;
