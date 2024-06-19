import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 

const GameStores = ({gameId}) => {

    const [gameStores, setGameStores] = useState([])
    const allStores = [
        "Steam",
        "Xbox Store",
        "PlayStation Store",
        "App Store",
        "GOG",
        "Nintendo Store",
        "Xbox 360 Store",
        "Google Play",
        "itch.io",
        "",
        "Epic Games",
      ];

    useEffect(()=>{
        fetch(`https://api.rawg.io/api/games/${gameId}/stores?key=4bc0eac8b3e74a84a29fa89b0d4181a8`)
        .then(response => response.json())
        .then((data)=>{
            console.log(data.results)
            setGameStores(data.results)
        })
    },[])

    return <>
        {
               gameStores.map(store => {
                    return <Link to={store.url} 
                    key={store.id}
                    target="_blank">
                    {allStores[store.store_id - 1]}
                    </Link>
                })
            }
    </>
}

export default GameStores;