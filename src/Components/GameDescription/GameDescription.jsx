import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GameStores from "../GameStores/GameStores";
import { Oval } from "react-loader-spinner";
import "../GameDescription/GameDescription.scss";

const GameDescription = ({ mode }) => {
  const gameId = useParams().id;
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${gameId}?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setGameData(data);
      });
  }, []);

  if (gameData.detail)
    return (
      <div
        className={`game-not-found ${
          mode === false ? "game-data-l-mode" : "game-data-d-mode"
        }`}
      >
        <h1>Game not found!</h1>
        <Link to={"/search-results"}> Back to search results </Link>
      </div>
    );

  return (
    <>
      {Object.keys(gameData).length === 0 ? (
        <Oval
          height={100}
          width={300}
          color={"grey"}
          secondaryColor={"lightgrey"}
        />
      ) : (
        <div
          className={`game-data ${
            mode === false ? "game-data-l-mode" : "game-data-d-mode"
          }`}
        >
          <div className="title">
            <h1>{gameData.name}</h1>
            <div
              className={`metacritic-rating 
           ${Number(gameData.metacritic) >= 80 && "positive-rating"}
           ${
             Number(gameData.metacritic) >= 45 &&
             Number(gameData.metacritic) <= 79 &&
             "mid-rating"
           }
           ${Number(gameData.metacritic) <= 44 && "negative-rating"}
           ${
             mode === false
               ? "metacritic-rating-l-mode"
               : "metacritic-rating-d-mode"
           }
           `}
            >
              {gameData.metacritic ? gameData.metacritic : "0"}
            </div>
          </div>
          <div>
            <div className="game-images">
              <div className="background-image">
                {gameData.background_image === null ? (
                  <img
                    src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="bg-image"
                  />
                ) : (
                  <img
                    src={gameData.background_image}
                    loading="lazy"
                    alt="bg-image"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="game-description">
            {gameData.description_raw
              ? gameData.description_raw
              : "No description available"}
          </div>

          <div className="additional-info">
            <div className="game-info">
              {gameData.genres.length === 0 ? null : (
                <div className="game-genres">
                  <h4>Genres</h4>
                  {gameData?.genres?.map((genre) => {
                    return (
                      <Link to={`/genres/${genre.slug}`} key={genre.id}>
                        {genre.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {gameData.developers.length === 0 ? null : (
                <div className="game-developers">
                  <h4>Developers</h4>

                  {gameData?.developers?.map((developer) => {
                    return (
                      <Link
                        key={developer.id}
                        to={`/developers/${developer.slug}`}
                      >
                        {developer.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {gameData.publishers.length === 0 ? null : (
                <div className="publishers">
                  <h4>Publishers</h4>
                  {gameData?.publishers?.map((publisher) => {
                    return (
                      <Link
                        key={publisher.id}
                        to={`/publishers/${publisher.slug}`}
                      >
                        {publisher.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {gameData.platforms.length === 0 ? null : (
                <div className="platforms">
                  <h4>Platforms</h4>
                  {gameData?.platforms?.map((platform) => {
                    return (
                      <Link
                        key={platform.platform.id}
                        to={`/platforms/${platform.platform.slug}`}
                      >
                        {platform.platform.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {gameData.tags.length === 0 ? null : (
              <div className="tags">
                <h4>Tags</h4>
                {gameData?.tags?.map((tag) => {
                  return (
                    <Link key={tag.id} to={`/tags/${tag.slug}`}>
                      {tag.name}
                    </Link>
                  );
                })}
              </div>
            )}

            {gameData.stores.length === 0 ? null : (
              <div className="stores">
                <h4>Stores</h4>
                <GameStores gameId={gameId} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameDescription;
