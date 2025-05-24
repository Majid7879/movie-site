import { useEffect, useState } from 'react'
import './App.css'
import Search from './component/Search.jsx'
import Card from './component/Card.jsx'
import { getQueryCount, getQueryID, createQueryCount, updateQueryCount } from './appwrite.js'





function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isFiald, setIsFiald] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  let cardContainerContent;

  async function fetchData(query = '') {
    const URL = "https://www.omdbapi.com"
    const API_KEY = "2735b850";
    const option = {
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    }

    let endpoint = `${URL}/?s=${query || 'batman'}&apikey=${API_KEY}`;

    setIsLoading(true);
    try {
      let response = await fetch(endpoint, option);

      if (!response.ok) {
        throw Error('There is something went wrong!');
      }

      let data = await response.json();

      if (data.hasOwnProperty("Error")) {
        throw Error(data.Error);
      }
      //  add query data to database
      if (query && data.Search.length > 0) {
        console.log('passed')
        getQueryCount(query).then(count => {
          if (count < 1) {
            createQueryCount(query);
          } else {
            updateQueryCount(query, count + 1)
          }
          console.log(count)
        })
      }
      // throw Error('test')
      setIsFiald(false);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  }

  useEffect(() => {
    fetchData(searchTerm)
      .then(data => setMovies(data['Search'] || []))
      .catch(error => {
        setIsFiald(true);
        setError(error);
      })
  }, [searchTerm])

  if (isLoading) {
    cardContainerContent = (
      <div className="loader"></div>
    )
  } else if (isFiald) {
    cardContainerContent = (
      <h2
        style={{ color: 'red' }}
        className='error'
      >{error.message}</h2>
    )
  } else {
    cardContainerContent = (movies.map((movie, index) =>
      <Card
        key={index}
        title={movie.Title}
        img={movie.Poster} />))

  }

  return (
    <>
      <header>
        <h1 className='logo'><span style={{ color: "red" }}>M</span>ovie</h1>
      </header>
      <main>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="card-container">
          {cardContainerContent}
        </div>
      </main>
    </>
  )
}

export default App
