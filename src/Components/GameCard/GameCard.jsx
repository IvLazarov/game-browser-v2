import { Link } from 'react-router-dom';
import '../GameCard/GameCard.scss';

const GameCard=({ name, img, slug})=>{
    return (
        <Link to={`/game-description/${slug}`} className='card'>
            
            <img src={img} alt="game-image" loading='lazy' />
            <h3>{name}</h3>          
            
        </Link>
    )
}

export default GameCard;