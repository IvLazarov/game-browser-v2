import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Developers = ({ mode }) => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/developers?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setDevelopers(data.results);
      });
  }, []);

  return (
    <div className={`container p-size ${mode === false ? "l-mode" : "d-mode"}`}>
      <h1>Developers</h1>
      {developers.length === 0 ? (
        <div className="oval-container">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        developers.map((developer) => {
          return (
            <Link
              key={developer.id}
              to={`/developers/${developer.slug}`}
              className="card"
            >
              <img
                src={developer.image_background}
                alt="dev-image"
                loading="lazy"
              />
              <h3>{developer.name}</h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Developers;
