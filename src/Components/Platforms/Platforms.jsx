import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "../Platforms/Platforms.scss";

const Platforms = ({ mode }) => {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setPlatforms(data.results);
      });
  }, []);

  return (
    <div
      className={`container platforms-size ${
        mode === false ? "l-mode" : "d-mode"
      }`}
    >
      <h1>Platforms</h1>
      {platforms.length === 0 ? (
        <div className="oval-container">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        platforms.map((platform) => {
          return (
            <Link
              key={platform.id}
              to={`/platforms/${platform.slug}`}
              className="card"
            >
              <img
                src={platform.image_background}
                alt="platform-image"
                loading="lazy"
              />
              <h3>{platform.name}</h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Platforms;
