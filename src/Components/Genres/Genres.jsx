import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

const Genres = ({mode}) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(`https://api.rawg.io/api/genres?key=4bc0eac8b3e74a84a29fa89b0d4181a8`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.results)
            setGenres(data.results)
        })
    },[])

    return (
    <div className={`container c-size ${mode === false ? 'l-mode' : 'd-mode'}`}>
        <h1>Genres</h1>
        {
          genres.length === 0 ?
          <div className='oval-container'>
           <Oval 
                    height={100}
                    width={300}
                    color={'grey'}
                    secondaryColor={'lightgrey'}
            / > 
          </div>
          
          :
          genres.map( genre => {
                return <Link key={genre.id} 
                to={`/genres/${genre.slug}`}
                name={genre.name} 
                className='card'
                >
                    <img src={genre.image_background} alt="genre-image" loading='lazy' />
                    <h3>{genre.name}</h3>
                </Link>
            })
        }
    </div>
    )
}

export default Genres;