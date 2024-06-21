import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import "../SearchResults/SearchResults.scss";

const SearchResults = ({ searchResults, searchTerm, loading, mode }) => {
  return (
    <div className={`container c-size ${mode === false ? "l-mode" : "d-mode"}`}>
      {searchTerm && searchResults.length === 0 && !loading && (
        <h1>Game not found!</h1>
      )}
      {loading ? (
        <div className="oval-container-2">
          <Oval
            height={100}
            width={300}
            color={"grey"}
            secondaryColor={"lightgrey"}
          />
        </div>
      ) : (
        searchResults.map((searchResult) => {
          return (
            <Link
              key={searchResult.id}
              to={`/game-description/${searchResult.slug}`}
              className="card"
            >
              {searchResult.background_image === null ? (
                <img
                  src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="bg-image"
                  loading="lazy"
                />
              ) : (
                <img
                  src={searchResult.background_image}
                  alt="game-img"
                  loading="lazy"
                />
              )}

              <h3>{searchResult.name}</h3>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SearchResults;
