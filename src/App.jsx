import { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import GameDescription from './Components/GameDescription/GameDescription';
import Genres from './Components/Genres/Genres';
import Genre from './Components/Genre/Genre';
import Developers from './Components/Developers/Developers';
import Developer from './Components/Developer/Developer';
import Tag from './Components/Tag/Tag';
import Publishers from './Components/Publishers/Publishers';
import SearchResults from './Components/SearchResults/SearchResults';
import Publisher from './Components/Publisher/Publisher';
import Platforms from './Components/Platforms/Platforms';
import Platform from './Components/Platform/Platform';
import ErrorPage from './Components/ErrorPage/ErrorPage';

function App() {
  const[searchQuery, setSearchQuery] = useState("")
  const[searchResults, setSearchResults] = useState([])
  const[loading, setLoading] = useState(false)
  const[searchTerm, setSearchTerm] = useState(false)
  const[mode, setMode]=useState(false)
  let navigateTo = useNavigate()

  const handleInput=(event) => {
    
    setSearchQuery(event.target.value)
  }

  const handleKeyDown=(event) => {
    navigateTo("/search-results")
    if(event.key === 'Enter'){
      setLoading(true)
      fetch(`https://api.rawg.io/api/games?key=4bc0eac8b3e74a84a29fa89b0d4181a8&search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        
        setSearchResults(data?.results)
        setLoading(false)
      })

      if(searchQuery.length > 0){
        setSearchTerm(true)
      }
    }
    
  }

  function toggleMode(){
    setMode(!mode)
  }

  


  return (
    <>
    <Navbar 
    handleInput={handleInput}
    searchQuery={searchQuery}
    handleKeyDown={handleKeyDown}
    mode={mode}
    toggleMode={toggleMode}
    />
    <Routes>
      <Route path='/' element={<Home mode={mode} />} 
      />
      <Route path='/game-description/:id' element={<GameDescription mode={mode} />} />
      <Route path='/genres' element={<Genres mode={mode} />} />
      <Route path='/genres/:id' element={<Genre mode={mode} />} />
      <Route path='/developers' element={<Developers mode={mode} />} />
      <Route path='/developers/:id' element={<Developer mode={mode} />} />
      <Route path='/tags/:id' element={<Tag mode={mode} />} />
      <Route path='/publishers' element={<Publishers mode={mode} />} />
      <Route path='/search-results' element={<SearchResults 
      searchResults={searchResults} 
      searchTerm={searchTerm}
      loading={loading}
      mode={mode}
      />}
      />
      < Route path='/publishers/:id' element={<Publisher mode={mode} />} />
      < Route path='/platforms' element={<Platforms mode={mode} />} />
      < Route path='/platforms/:id' element={<Platform mode={mode} />} />
      <Route path='/*' element={<ErrorPage mode={mode} />} />
      </Routes>
     
    </>
  )
}

export default App
