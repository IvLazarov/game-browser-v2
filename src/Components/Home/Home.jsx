import { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import { Oval } from "react-loader-spinner";
import "../Home/Home.scss";

const Home = ({ mode }) => {
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8`)
      .then((response) => response.json())
      .then((data) => {
        setTrendingGames(data.results);
      });
  }, []);

  return (
    <div className={`container c-size ${mode === false ? "l-mode" : "d-mode"}`}>
      <h1>#Trending Games</h1>
      {trendingGames.length === 0 ? (
        <div className="oval-container">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        trendingGames.map((trendingGame) => {
          return (
            <GameCard
              key={trendingGame.id}
              name={trendingGame.name}
              img={trendingGame.background_image}
              slug={trendingGame.slug}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
