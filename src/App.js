import React, { useState, useEffect } from 'react';
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';
import MovieListHeading from "./components/MovieListHeading";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  
  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6841c32b`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect( () => { getMovieRequest(searchValue);}, [searchValue]);

  useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);

		if (movieFavorites) {
			setFavorites(movieFavorites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-faorites", JSON.stringify(items));
  };

  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const RemoveFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) =>favorite.imdbID !==movie.imdbID 
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className="App container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Pointless Movie Website'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="d-flex flex-row">
          <MovieList 
            movies={movies}
            handleFavoritesClick={AddFavoriteMovie}
            favoriteComponent={AddFavorites}
          />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Your Favorites' />
      </div>
      <div className="d-flex flex-row">
        <MovieList 
          movies={favorites}
          handleFavoritesClick={RemoveFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};

export default App;
