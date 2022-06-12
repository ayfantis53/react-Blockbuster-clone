const MovieList = (props) => {

    const FavoriteComponent = props.favoriteComponent;

    return (
        <>
            {props.movies.map( (movie, index) => (
                <div className="image-container justify-content-start m-3" key={movie.imdbID}> 
                    <img src={movie.Poster} alt="movie"/>
                    <div onClick = {() => props.handleFavoritesClick(movie)} className='overlay d-flex justify-content-center'>
                        <FavoriteComponent />
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;