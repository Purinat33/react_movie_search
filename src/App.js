import React, { useState } from 'react';
import axios from 'axios';
import iso6391 from 'iso-639-1';
import './components/style.css'
import Criteria from './components/Criteria';


function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('title');

  const handleSearch = async () => {
  try {
    let response;
    switch (searchCriteria) {
      case 'title':
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=21cc39220a188ea7ce6c328f408c80f6&query=${query}`
        );
        break;
      case 'director':
        response = await axios.get(
          `https://api.themoviedb.org/3/search/person?api_key=21cc39220a188ea7ce6c328f408c80f6&query=${query}`
        );
        const personId = response.data.results[0].id;
        response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=21cc39220a188ea7ce6c328f408c80f6&with_crew=${personId}`
        );
        break;
      case 'originalTitle':
        response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=21cc39220a188ea7ce6c328f408c80f6&query=${query}&search_type=ngram&include_adult=false`
        );
        break;
        case 'year':
          response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=21cc39220a188ea7ce6c328f408c80f6&query=all&primary_release_year=${query}`
        );
        break;
        default:
        break;
    }

    if (response.data.results) {
      setResults(response.data.results);
    } else {
      setResults([]);
    }
  } catch (error) {
    console.error(error);
  }
  };



  const handleResultClick = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=21cc39220a188ea7ce6c328f408c80f6`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} style={{ display: 'block', margin: 'auto', width: '600px', marginTop: '20px'}} placeholder='Type here...'/>
      <button onClick={handleSearch} style={{ display: 'block', margin: 'auto', borderRadius: '20px', boxShadow: 'none', marginTop: "3px"}}>Search</button>
      <Criteria searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}/>
      
      {results.length > 0 ? (
        <ul>
        {results.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result.id)}>
            <a href={`https://www.themoviedb.org/movie/${result.id}`} className='titleName'>{result.title} ({result.release_date[0]}{result.release_date[1]}{result.release_date[2]}{result.release_date[3]})</a>
            <br />
            <img src={result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : '/logo512.png'} alt={result.title} style={{marginRight: "auto"}}/>
            <br />
            <span><strong>Original Language</strong>: {result.original_language ? iso6391.getName(result.original_language) : "Unknown"}</span>
            <br />
            <span><strong>Original Title</strong>: {result.original_title ? result.original_title : "NA"}</span>
            <br />
            <span><strong>Overview</strong>: {result.overview ? result.overview : "NA"}</span>
          </li>
        ))}
      </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default App;
