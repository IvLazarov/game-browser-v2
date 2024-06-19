import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

const GamesByPlatform = ({platformId, mode}) => {
    const[gamesByPlatform, setGamesByPlatform] = useState([])

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&platform=${platformId}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.results)
            setGamesByPlatform(data.results)
        })
    },[])

    return(
        <>
            {
              gamesByPlatform.length === 0 ?
              
              <Oval 
                height={100}
                width={300}
                color={'grey'}
                secondaryColor={'lightgrey'}
                />
              :
              gamesByPlatform.map(gameByPlatform => {
                    return <div className={`items ${mode === false ? 'category-l-mode': 'category-d-mode'}`}>
                        <Link key={gameByPlatform.id} to={`/game-description/${gameByPlatform.slug}`}>
                        <img src={gameByPlatform.background_image} alt="game-image" loading="lazy" />
                        <h3>{gameByPlatform.name}</h3>
                        </Link>
                    </div>
                })
            }
        </>
    )
}

export default GamesByPlatform;