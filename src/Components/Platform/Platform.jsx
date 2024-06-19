import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GamesByPlatform from "../GamesByPlatform/GamesByPlatform";

const Platform = ({mode}) => {
    const platformId=useParams().id
    const[platformDetails, setPlatformDetails] = useState({})
    useEffect(() => {
        fetch(`https://api.rawg.io/api/platforms/${platformId}?key=4bc0eac8b3e74a84a29fa89b0d4181a8`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setPlatformDetails(data)
        })
    },[])
    return(
        <div className={`category-container gen-height ${mode === false ? 'category-container-l-mode' : 'category-container-d-mode'}`}>
            <h1>{platformDetails.name}</h1>
            <div className="description">
                {!platformDetails.description &&  <h4>No Description Available</h4>}
                {platformDetails.description?.replace(/(<([^>]+)>)/gi, "").replace(/&#39;/gi, "'")}
            </div>
            <div className="games">
            <GamesByPlatform  platformId={platformId} mode={mode} />
            </div>
        </div>
    )
}

export default Platform;