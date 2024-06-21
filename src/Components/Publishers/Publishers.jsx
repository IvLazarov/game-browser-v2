import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Publishers/Publishers.scss";
import { Oval } from "react-loader-spinner";

const Publishers = ({ mode }) => {
  const [gamePublishers, setGamePublishers] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/publishers?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setGamePublishers(data.results);
      });
  }, []);
  return (
    <div className={`container p-size ${mode === false ? "l-mode" : "d-mode"}`}>
      <h1>Pubslishers</h1>
      {gamePublishers.length === 0 ? (
        <div className="oval-container">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        gamePublishers.map((gamePublisher) => {
          return (
            <Link
              key={gamePublisher.id}
              to={gamePublisher.slug}
              className="card"
            >
              <img
                src={gamePublisher.image_background}
                alt="publisher-image"
                loading="lazy"
              />
              <h3>{gamePublisher.name}</h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Publishers;
