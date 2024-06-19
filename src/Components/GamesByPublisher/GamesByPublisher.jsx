import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Oval } from 'react-loader-spinner';

const GamesByPublisher = ({publisherId, mode}) => {
    const[gamesByPublisher, setGamesByPublisher] = useState([])

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&publishers=${publisherId}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.results)
            setGamesByPublisher(data.results)
        })
    }, [])
    
    return(
        <>
            {
              gamesByPublisher.length === 0 ?
              
              <Oval 
                height={100}
                width={300}
                color={'grey'}
                secondaryColor={'lightgrey'}
                />
              :
              gamesByPublisher.map(gameByPublisher => {
                    return <div className={`items ${mode === false ? 'category-l-mode' : 'category-d-mode'}`}>
                        <Link key={gameByPublisher.id} to={`/game-description/${gameByPublisher.slug}`}>
                        <img src={gameByPublisher.background_image} alt="game-img" loading="lazy" />
                        <h3>{gameByPublisher.name}</h3>
                        </Link>
                    </div>
                })
            }
        </>
    )
}

export default GamesByPublisher;