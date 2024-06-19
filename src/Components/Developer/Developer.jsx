import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Oval } from 'react-loader-spinner';


const Developer= ({mode})=>{
    const devId=useParams().id
    const [gamesByDeveloper, setGamesByDeveloper] = useState([])

    useEffect(()=>{
        fetch(`https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&developers=${devId}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.results)
            setGamesByDeveloper(data.results)
        })
    },[])

    return (
        <div className={`container c-size ${mode === false ? 'l-mode' : 'd-mode'}`}>
            <h1>Developed by {devId[0].toUpperCase() + devId.substring(1)}</h1>
            
                {
                  gamesByDeveloper.length === 0 ?
                  <div className="oval-container">
                  <Oval 
                    height={100}
                    width={300}
                    color={'grey'}
                    secondaryColor={'lightgrey'}
                    / >
                </div>
                :
                  gamesByDeveloper.map( gameByDeveloper => {
                        return <Link key={gameByDeveloper.id} 
                        to={`/game-description/${gameByDeveloper.slug}`}
                        className='card'
                        >
                        <img src={gameByDeveloper.background_image} alt="game-image" loading="lazy" />
                        <h3>{gameByDeveloper.name}</h3>
                        </Link>
                    })
                }
            
        </div>
    )
}

export default Developer;