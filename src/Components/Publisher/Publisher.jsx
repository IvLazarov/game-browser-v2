import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GamesByPublisher from "../GamesByPublisher/GamesByPublisher";

const Publisher = ({ mode }) => {
  const publisherId = useParams().id;
  const [publisherDetails, setPublisherDetails] = useState({});

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/publishers/${publisherId}?key=4bc0eac8b3e74a84a29fa89b0d4181a8`
    )
      .then((response) => response.json())
      .then((data) => {
        setPublisherDetails(data);
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
      <h1>{publisherDetails.name}</h1>
      <div className="description">
        {publisherDetails?.description
          ?.replace(/(<([^>]+)>)/gi, "")
          ?.replace(/&#39;/gi, "'")}
      </div>
      <div className="games">
        <GamesByPublisher publisherId={publisherId} mode={mode} />
      </div>
    </div>
  );
};

export default Publisher;
